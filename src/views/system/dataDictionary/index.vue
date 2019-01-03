<template>
  <div class="tab-item-contianer">
    <el-input class="fileterInput" placeholder="输入关键字进行过滤" size="medium" v-model="filterText"></el-input>
    <el-row>
      <el-col :span="24" style="margin-top:15px;">
        <el-card class="card">
          <span class="tree-title common-font-color-success">
            <span style="padding-left: 30px">名称</span>
            <span class="tree-operation">
              <span class="data-authority">
                <span>数据权限</span>
              </span>
              <span class="menu-authority">
                <span>更新时间</span>
              </span>
              <span class="data-operate">
                <span>操作</span>
                <el-tooltip :open-delay="1200" class="item" content="在跟节点下新增" effect="dark" placement="top-start">
                  <el-button @click.stop="nodeAdd" type="text" v-if="groupManager_btn_add">
                    <span class="el-icon-plus common-font-color-success"/>
                  </el-button>
                </el-tooltip>
              </span>
            </span>
          </span>
          <el-tree :data="treeData" :filter-node-method="filterNode" :props="defaultProps" default-expand-all highlight-current ref="groupTree">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label}}</span>
              <span class="tree-operation">
                <span class="data-authority">
                  <span>数据权限</span>
                </span>
                <span class="menu-authority">
                  <span>
                    {{ data.updTime || data.crtTime}}
                    <!-- <el-button @click.stop="handlerAuthority(data)" type="text">
                      <svg-icon icon-class="key"/>
                    </el-button>-->
                  </span>
                </span>
                <span class="data-operate">
                  <el-tooltip :open-delay="1200" class="item" content="添加节点" effect="dark" placement="top-start">
                    <el-button @click.stop="checkDebug" type="text">
                      <el-dropdown trigger="click" type="text">
                        <span class="el-icon-plus common-font-color-success"/>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item @click.native="nodeAdd(data)">新增节点</el-dropdown-item>
                          <!-- <el-dropdown-item @click.native="userAdd(data)">新增人员</el-dropdown-item> -->
                        </el-dropdown-menu>
                      </el-dropdown>
                    </el-button>
                  </el-tooltip>
                  <el-tooltip :open-delay="1200" class="item" content="编辑当前节点" effect="dark" placement="top-start">
                    <el-button @click.stop="nodeEdit(data)" type="text">
                      <span class="el-icon-edit common-font-color-waring"/>
                    </el-button>
                  </el-tooltip>
                  <el-tooltip :open-delay="1200" class="item" content="删除当前" effect="dark" placement="top-start">
                    <el-button @click.stop="nodeDelete(data)" type="text">
                      <span class="el-icon-delete common-font-color-danger"/>
                    </el-button>
                  </el-tooltip>
                </span>
              </span>
            </span>
          </el-tree>
        </el-card>
      </el-col>
      <el-dialog :title="dialogRoleTitle" :visible.sync="dialogRoleVisible">
        <el-form :label-position="labelPosition" :model="form" label-width="80px" ref="form">
          <el-form-item label="名称">
            <el-input :disabled="formEdit" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="编码">
            <el-input :disabled="formEdit" v-model="form.code"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input :disabled="formEdit" v-model="form.description"></el-input>
          </el-form-item>
          <el-form-item v-if="formStatus == 'update'">
            <el-button @click="update" type="primary" v-if="groupManager_btn_edit">更新</el-button>
            <el-button @click="onCancel">取消</el-button>
          </el-form-item>
          <el-form-item v-if="formStatus == 'create'">
            <el-button @click="create" type="primary" v-if="groupManager_btn_add">保存</el-button>
            <el-button @click="onCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
import { getdicTreee, getdicDetails, updateDetails, deleteDetails, adddicDetails } from '@/api/system/dataDictionary/index'
import { mapGetters } from 'vuex'
export default {
  name: 'GroupDetail',
  components: {
    // 'group-user': () => import('./groupUser'),
    // 'group-authority': () => import('./groupAuthority')
  },
  props: {
    type: {
      type: String,
      default: '1'
    },
    typeCode: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      filterText: '',
      list: null,
      total: null,
      formEdit: true,
      formAdd: true,
      formStatus: '',
      dialogUserVisible: false,
      dialogUserName: '新增成员',
      dialogAuthorityVisible: false,
      dialogAuthorityName: '关联菜单资源',
      listQuery: {
        groupType: this.type,
        name: undefined
      },
      treeData: [],
      defaultProps: {
        children: 'childs',
        label: 'name'
      },
      dialogRoleTitle: '新增节点',
      dialogRoleVisible: false,
      labelPosition: 'right',
      groupManager_btn_edit: true,
      groupManager_btn_del: true,
      groupManager_btn_add: true,
      groupManager_btn_userManager: true,
      groupManager_btn_resourceManager: true,
      listDataId: '',
      form: {
        code: '',
        id: '',
        name: '',
        orderNum: 0,
        parentCode: '',
        type: '',
        description: undefined
      },
      currentId: '1'
    }
  },
  computed: {
    ...mapGetters(['elements'])
  },
  watch: {
    filterText(val) {
      this.$refs.groupTree.filter(val)
    }
  },
  created() {
    this.getList()
    // this.groupManager_btn_edit = this.elements['groupManager:btn_edit']
    // this.groupManager_btn_del = this.elements['groupManager:btn_del']
    // this.groupManager_btn_add = this.elements['groupManager:btn_add']
    // this.groupManager_btn_userManager = this.elements['groupManager:btn_userManager']
    // this.groupManager_btn_resourceManager = this.elements['groupManager:btn_resourceManager']
  },
  methods: {
    checkDebug(value, event) {
      // 空事件用于阻止checkbox click事件冒泡
    },
    getList() {
      getdicTreee(this.listQuery).then(data => {
        this.treeData = data.data
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    getNodeData(data) {
      getdicDetails(data.id).then(response => {
        this.form = response.data
      })
    },
    nodeEdit(data) {
      this.listDataId = data.id
      this.dialogRoleVisible = true
      this.dialogRoleTitle = '编辑节点'
      this.getNodeData(data)
      this.formEdit = false
      this.formStatus = 'update'
    },
    nodeAdd(data) {
      this.dialogRoleVisible = true
      this.dialogRoleTitle = '新增节点'
      this.resetForm(data.id)
      this.formEdit = false
      this.formStatus = 'create'
    },
    // 删除角色节点或者删除该节点下的人员
    nodeDelete(data) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (data.node_type === 'role') {
          deleteDetails(data.id).then(() => {
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
        } else {
          deleteDetails(data.id).then(() => {
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
        }
      })
    },
    update() {
      updateDetails(this.listDataId, this.form.code, this.form.description, this.form.name, this.form.orderNum, '').then(() => {
        this.getList()
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
        this.dialogRoleVisible = false
      })
    },
    create() {
      // id, name, description, code, orderNum, type, parentCode
      adddicDetails(this.form.code, this.form.description, this.form.name, this.form.orderNum, 1, '').then(data => {
        this.getList()
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
        this.dialogRoleVisible = false
      })
    },
    onCancel() {
      this.formEdit = true
      this.dialogRoleVisible = false
      this.formStatus = ''
    },
    resetForm(parentId) {
      if (parentId === undefined) {
        parentId = '-1'
      }
      this.form = {
        parentId: parentId,
        code: undefined,
        name: undefined,
        description: undefined,
        groupType: this.type
      }
    },
    userAdd(data) {
      this.currentId = data.id
      this.dialogUserVisible = true
    },
    handlerAuthority(data) {
      this.currentId = data.id
      this.dialogAuthorityVisible = true
    },
    closeUserDialog() {
      this.dialogUserVisible = false
    },
    closeAuthorityDialog() {
      this.dialogAuthorityVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.tab-item-contianer {
  width: 100;
  height: 100%;
  .fileterInput {
    width: 10rem;
    position: absolute;
    right: 0;
    top: -3.25rem;
  }
  .card {
    min-height: 37.5rem;
    /deep/ .el-tree-node__content {
      height: 2.5rem !important;
    }
    .custom-tree-node {
      width: 100%;
      height: 2.5rem;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.875rem;
      padding-right: 0.5rem;
      border-bottom: 0.0625rem solid #f2f6fc;
      > span {
        display: inline-block;
      }
      .tree-operation {
        // display: inline-block;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 46.875rem;
        .el-icon-plus,
        .el-icon-edit,
        .el-icon-delete {
          font-weight: bold;
        }
        > span {
          display: inline-block;
          width: 24%;
        }
        .data-authority {
          text-align: center;
        }
        .menu-authority {
          text-align: center;
        }
        .is-leader {
          text-align: center;
        }
        .data-operate {
          text-align: right;
        }
      }
    }
  }
  .tree-title {
    height: 1.5625rem;
    width: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 0.5rem;
    border-bottom: 0.125rem solid#E4E7ED;
    font-size: 0.9375rem;
    > span {
      display: inline-block;
    }
    .tree-operation {
      // display: inline-block;
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-width: 46.875rem;
      .el-icon-plus {
        font-weight: bold;
      }
      > span {
        display: inline-block;
        width: 24%;
      }
      .data-authority {
        text-align: center;
      }
      .is-leader {
        text-align: center;
      }
      .menu-authority {
        text-align: center;
      }
      .data-operate {
        text-align: right;
      }
    }
  }
}
.el-tabs__content {
  overflow: visible;
}
</style>
