<template>
  <div class="app-container">
    <el-container>
      <el-aside width="250px">
        <div class="left-content">
          <el-input class="filter" placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
          <el-button @click="handlerAdd(null)" class="add" icon="el-icon-plus" style="margin-left: 10px;" type="text" v-if="menu_btn_add"></el-button>
          <el-tree :data="treeData" :filter-node-method="filterNode" :props="defaultProps" @node-click="getNodeData" class="filter-tree" default-expand-all node-key="id" ref="menuTree">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span :class="{'common-font-color-success':data.isSelected}">{{ node.label }}</span>
              <span>
                <span @click.stop="handlerView(data)" class="el-icon-view"/>
                <span @click.stop="handlerAdd(data)" class="el-icon-plus" v-if="menu_btn_add"/>
                <span @click.stop="handlerEdit(data)" class="el-icon-edit-outline" v-if="menu_btn_edit"/>
                <span @click.stop="handleDelete(data)" class="el-icon-delete" v-if="menu_btn_del"/>
              </span>
            </span>
          </el-tree>
        </div>
      </el-aside>
      <el-container>
        <div class="right-content">
          <menu-element :menu-id="currentId" ref="menuElement"></menu-element>
        </div>
      </el-container>
    </el-container>
    <el-dialog :title="formTitle" :visible.sync="dialogFormVisible">
      <el-form :label-position="labelPosition" :model="form" label-width="100px" ref="form">
        <el-form-item label="前端路由编码" prop="code">
          <el-input :disabled="!formEdit" placeholder="请输入前端路由编码" v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="菜单标题" prop="title">
          <el-input :disabled="!formEdit" placeholder="请输入菜单标题" v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="父菜单ID" prop="parentId">
          <el-input :disabled="!formEdit" readonly v-model="form.parentId"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input :disabled="!formEdit" placeholder="仅第二级菜单有效" v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select :disabled="!formEdit" class="filter-item" placeholder="请输入资源请求类型" v-model="form.type">
            <el-option :key="index" :label="item.name" :value="item.value" v-for="(item,index) in typeOptions"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="外部链接" prop="href" v-if="form.type!=='menu'">
          <el-input :disabled="!formEdit" placeholder="请输入资源路径" v-model="form.href"></el-input>
        </el-form-item>
        <el-form-item label="前端路由" prop="path" v-else>
          <el-input :disabled="!formEdit" placeholder="请输入路由地址" v-model="form.path"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="orderNum">
          <el-input :disabled="!formEdit" placeholder="请输入排序" v-model="form.orderNum"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input :disabled="!formEdit" placeholder="请输入描述" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item v-if="formStatus == 'update'">
          <el-button @click="update" type="primary">更新</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
        <el-form-item v-if="formStatus == 'create'">
          <el-button @click="create" type="primary">保存</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getMenuTree, addMenu, deleteMenu, updateMenu } from '@/api/system/menu/index'
import { mapGetters } from 'vuex'
export default {
  name: 'Menu',
  components: {
    'menu-element': () => import('./components/element')
  },
  data() {
    return {
      filterText: '',
      list: null,
      total: null,
      formEdit: true,
      formAdd: true,
      formStatus: '',
      typeOptions: [{ name: '功能菜单', value: 'menu' }, { name: '外部链接', value: 'dirt' }],
      listQuery: {
        name: undefined
      },
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      labelPosition: 'right',
      dialogFormVisible: false,
      tagNodeName: '',
      form: {
        code: undefined,
        title: undefined,
        parentId: undefined,
        href: undefined,
        icon: undefined,
        orderNum: undefined,
        description: undefined,
        path: undefined,
        enabled: undefined,
        type: undefined,
        attr1: undefined
      },
      currentForm: null,
      currentId: '-1',
      // 菜单资源
      menu_btn_add: false,
      menu_btn_edit: false,
      menu_btn_del: false
    }
  },
  computed: {
    ...mapGetters(['elements']),
    formTitle: function() {
      if (!this.currentForm) {
        return '在根节点下新增'
      }
      if (this.formStatus === 'update') {
        return '编辑"' + this.currentForm.title + '"菜单'
      } else if (this.formStatus === 'create') {
        if (this.currentForm.parentId !== '-1') {
          return '在"' + this.currentForm.title + '"菜单下新增'
        } else {
          return '在根节点下新增'
        }
      } else {
        return '查看"' + this.currentForm.title + '"菜单'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.menuTree.filter(val)
    }
  },
  created() {
    this.getList()
    this.menu_btn_add = this.elements['menu_btn_add']
    this.menu_btn_del = this.elements['menu_btn_delete']
    this.menu_btn_edit = this.elements['menu_btn_update']
  },
  methods: {
    getList() {
      getMenuTree(this.listQuery).then(data => {
        this.sortByOrder(data.data)
        // 初始化selected对象
        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
          this.recursiveChange(data.data, data.data[0].id)
          this.$refs.menuElement.menuId = data.data[0].id
          this.$refs.menuElement.getList()
        }
        this.treeData = data.data
      })
    },
    changeSelect(id) {
      if (this.treeData && Array.isArray(this.treeData)) {
        this.recursiveChange(this.treeData, id)
      }
    },
    recursiveChange(arr, id) {
      for (let i in arr) {
        if (arr[i].id === id) {
          arr[i].isSelected = true
        } else {
          arr[i].isSelected = false
        }
        if (arr[i].children && Array.isArray(arr[i].children) && arr[i].children.length > 0) {
          this.recursiveChange(arr[i].children, id)
        }
      }
    },
    sortByOrder(data) {
      if (data && Array.isArray(data)) {
        data.sort((a, b) => {
          return a.orderNum - b.orderNum
        })
        for (let i in data) {
          if (data[i].children && Array.isArray(data[i].children) && data[i].children.length > 0) {
            this.sortByOrder(data[i].children)
          }
        }
      }
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    getNodeData(data) {
      this.currentId = data.id
      this.currentForm = data
      this.form = data
      this.changeSelect(data.id)
      this.$refs.menuElement.menuId = data.id
      this.$refs.menuElement.getList()
    },
    handlerEdit(data) {
      this.currentForm = data
      this.dialogFormVisible = true
      this.form = data
      this.formEdit = true
      this.formStatus = 'update'
    },
    handlerAdd(data) {
      if (data) {
        this.currentForm = data
        this.currentId = data.id
      } else {
        this.currentId = '-1'
      }
      this.resetForm()
      this.dialogFormVisible = true
      this.formEdit = true
      this.formStatus = 'create'
    },
    handlerView(data) {
      this.currentForm = data
      this.form = data
      this.dialogFormVisible = true
      this.formEdit = false
      this.formStatus = 'view'
    },
    handleDelete(data) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMenu(data.id).then(() => {
          this.getList()
          this.resetForm()
          this.onCancel()
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        })
      })
    },
    update() {
      updateMenu(this.form.id, this.form).then(() => {
        this.getList()
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
        this.dialogFormVisible = false
      })
    },
    create() {
      addMenu(this.form).then(() => {
        this.getList()
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
        this.dialogFormVisible = false
      })
    },
    onCancel() {
      this.formEdit = true
      this.dialogFormVisible = false
      this.formStatus = ''
    },
    resetForm() {
      this.form = {
        code: undefined,
        title: undefined,
        parentId: this.currentId,
        href: undefined,
        icon: undefined,
        orderNum: undefined,
        description: undefined,
        path: undefined,
        enabled: undefined
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container {
  .filter-tree {
    margin-top: 0.625rem;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.875rem;
    padding-right: 0.5rem;
  }
  .left-content {
    width: 100%;
    height: 100%;
    padding: 0.3125rem;
    min-height: 37.5rem;
    border: 0.0625rem solid #c5c5c5;
    .filter {
      width: 90%;
    }
    .add {
      width: 8%;
      margin-left: 0px !important;
    }
  }
  .right-content {
    margin-left: 0.9375rem;
    padding-left: 0.3125rem;
    padding-top: 0.3125rem;
    padding-right: 1.25rem;
    width: 100%;
    min-height: 37.5rem;
    border: 0.0625rem solid #c5c5c5;
  }
}
</style>

