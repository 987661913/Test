<template>
  <el-dialog :title="title" :visible.sync="visible" @closed="dialogClose" @opened="dialogOpened" class="dialog-container">
    <div class="container">
      <el-container>
        <el-aside width="200px">
          <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
          <div class="tree-container">
            <div class="scroll-tree-container">
              <el-scrollbar class="scroll-container">
                <el-tree :data="treeData" :filter-node-method="filterNode" :props="defaultProps" @node-click="getNodeData" check-strictly class="filter-tree" default-expand-all highlight-current node-key="id" ref="menuTree" show-checkbox></el-tree>
              </el-scrollbar>
            </div>
          </div>
        </el-aside>
        <el-main>
          <div class="table-container">
            <el-table :data="list" :height="tableHeight" @select="handleSelectionChange" border fit highlight-current-row ref="elementTable" style="width: 100%;height:100%;">
              <el-table-column :selectable="selectedable" type="selection" width="35"></el-table-column>
              <el-table-column align="center" label="资源名称" min-width="100px">
                <template slot-scope="scope">
                  <span>{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" header-align="center" label="资源编码" width="180px">
                <template slot-scope="scope">
                  <span>{{scope.row.code}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="资源类型" min-width="100px">
                <template slot-scope="scope">
                  <span>{{scope.row.type}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="资源地址" min-width="160px">
                <template slot-scope="scope">
                  <span>{{scope.row.uri}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="请求类型" width="100px">
                <template slot-scope="scope">
                  <span>{{scope.row.method}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-main>
      </el-container>
    </div>
    <span class="dialog-footer" slot="footer">
      <el-button @click="update" type="primary" v-if="authority_btn_ok">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getMenuTree } from '@/api/system/menu/index'
import { getElementsByMenuId } from '@/api/system/element/index'
import { removeElementAuthority, addElementAuthority, getElementAuthority, modifyMenuAuthority, getMenuAuthority } from '@/api/system/role/index'
import { mapGetters } from 'vuex'
export default {
  name: 'Menu',
  props: {
    groupId: {
      type: String,
      default: '1'
    },
    title: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      filterText: '',
      visible: false,
      list: null,
      total: null,
      listQuery: {
        name: undefined
      },
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      authority_btn_ok: false,
      authority_checkbox1: false,
      authority_checkbox2: false,
      tableHeight: 200
      //   currentId: -1
    }
  },
  computed: {
    ...mapGetters(['elements'])
  },
  watch: {
    filterText(val) {
      this.$refs.menuTree.filter(val)
    },
    value(val) {
      this.visible = val
      if (val) {
        this.getList()
      }
    },
    visible(val) {
      if (!val) {
        this.$emit('closeAuthorityDialog', val)
      }
    }
  },
  created() {
    this.authority_btn_ok = this.elements['authority_btn_ok']
    this.authority_checkbox1 = this.elements['authority_checkbox1']
    this.authority_checkbox2 = this.elements['authority_checkbox2']
    // this.groupManager_menu = this.elements['groupManager:menu']
    // this.groupManager_element = this.elements['groupManager:element']
  },
  mounted() {
    if (this.value) {
      this.visible = true
    }
    // 注册resize事件 动态改变table高度
    window.addEventListener('resize', this.justContainer)
  },
  destroyed() {
    // 销毁注册事件
    window.removeEventListener('resize', this.justContainer)
  },
  methods: {
    selectedable(row, index) {
      return this.authority_checkbox1 && this.authority_checkbox2
    },
    dialogOpened() {
      // 动态设置Table高度，否则内容过多时显示不全
      this.justContainer()
    },
    dialogClose() {
      this.value = false
    },
    getList() {
      getMenuTree(this.listQuery).then(data => {
        this.sortByOrder(data.data)
        this.treeData = data.data
        this.initAuthoritys()
      })
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
    justContainer() {
      if (document.querySelector('.table-container')) {
        this.tableHeight = document.querySelector('.table-container').clientHeight
      }
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    getNodeData(data) {
      getElementsByMenuId(data.id).then(res => {
        this.sortByCode(res.data)
        this.list = res.data
        getElementAuthority(this.groupId).then(data => {
          const obj = {}
          for (let i = 0; i < this.list.length; i++) {
            obj[this.list[i].id] = this.list[i]
          }
          const toggle = {}
          for (let i = 0; i < data.data.length; i++) {
            const id = data.data[i]
            if (obj[id] !== undefined && toggle[id] === undefined) {
              this.$refs.elementTable.toggleRowSelection(obj[data.data[i]])
              toggle[id] = true
            }
          }
        })
      })
      this.currentId = data.id
      this.showElement = true
    },
    sortByCode(data) {
      if (data && Array.isArray(data)) {
        data.sort((a, b) => {
          if (a.code === b.code) {
            return 0
          } else {
            return a.code < b.code ? -1 : 1
          }
        })
      }
    },
    getTreeNodeKey(node) {
      return node.id
    },
    handleSelectionChange(val, row) {
      let flag = true
      for (let i = 0; i < val.length; i++) {
        if (val[i].id === row.id) {
          addElementAuthority(this.groupId, {
            menuId: this.currentId,
            elementId: row.id
          })
          flag = false
          break
        }
      }
      if (flag) {
        removeElementAuthority(this.groupId, {
          menuId: this.currentId,
          elementId: row.id
        })
      }
    },
    update() {
      this.$emit('closeAuthorityDialog')
      const nodes = this.$refs.menuTree.getCheckedNodes()
      const ids = []
      for (let i = 0; i < nodes.length; i++) {
        ids.push(nodes[i].id)
      }
      modifyMenuAuthority(this.groupId, {
        menuTrees: ids.join()
      }).then(() => {
        this.$notify({
          title: '成功',
          message: '保存成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    initAuthoritys() {
      getMenuAuthority(this.groupId).then(data => {
        const result = []
        for (let i = 0; i < data.data.length; i++) {
          result.push(data.data[i].id)
        }
        this.$refs.menuTree.setCheckedKeys(result)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.dialog-container {
  /deep/ .el-dialog {
    height: 75vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 80%;
    /deep/ .el-dialog__body {
      flex-grow: 1;
      position: relative;
      .container {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        padding-left: 1.25rem;
        padding-right: 1.25rem;
        overflow-x: hidden;
        /deep/ .el-container {
          width: 100%;
          height: 100%;
          /deep/ .el-aside {
            display: flex;
            flex-direction: column;
            overflow: hidden;
            border: solid 1px rgb(235, 238, 245);
            padding: 4px;
            .tree-container {
              flex-grow: 1;
              width: 100%;
              position: relative;
              .scroll-tree-container {
                height: 100%;
                width: 100%;
                position: absolute;
                top: 0px;
                left: 0px;
                .scroll-container {
                  height: 100%;
                  width: 100%;
                }
              }
            }
          }
          /deep/ .el-main {
            padding-top: 0px;
            padding-bottom: 0px;
            .table-container {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
}
</style>

