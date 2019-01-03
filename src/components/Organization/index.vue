<template>
  <div :style="{'left':coverOffsetLeft+'px','top':coverOffsetTop+'px'}" @click.stop="cancel" class="org-container" v-show="visiable">
    <div :style="{'width':width+'px','height':height+'px','margin-left':dialogX+'px','margin-top':dialogY+'px'}" @click.stop="doNoThing">
      <el-card class="card-container">
        <div class="clearfix" slot="header">
          <span>部门选择</span>
          <el-button @click="cancel" icon="el-icon-close" type="text"></el-button>
        </div>
        <div class="body-container">
          <div class="tree-container">
            <div class="scroll-tree-container">
              <el-scrollbar class="scroll-container">
                <el-tree :data="treeData" :props="defaultProps" default-expand-all>
                  <span class="custom-tree-node" slot-scope="{ node, data }">
                    <el-button @click.stop="doNoThing" type="text">
                      <el-checkbox @change="changeSelect" v-model="data.isChecked"></el-checkbox>
                    </el-button>
                    <span>{{ node.label }}</span>
                  </span>
                </el-tree>
              </el-scrollbar>
            </div>
          </div>
          <div class="operate-container">
            <el-button :disabled="saveEnable" @click="saveClick" size="small" type="primary">确定</el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getDeptTree } from '@/api/common'
import { minus } from '@/utils'
export default {
  name: 'Organization',
  props: {
    parentNode: {
      // 加载指定的父节点下的内容
      type: String,
      default: '-1'
    },
    type: {
      type: String,
      default: 'org' // org/orguser
    },
    show: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Array,
      default() {
        return []
      }
    },
    width: {
      type: Number,
      default: 250
    },
    height: {
      type: Number,
      default: 400
    },
    offsetLeft: {
      type: Number,
      default: 0
    },
    offsetTop: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      treeData: [],
      visiable: false,
      tagSelected: [],
      tagSelectedDetail: [],
      coverOffsetLeft: 0,
      coverOffsetTop: 0,
      parentRec: null,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  computed: {
    dialogX: function() {
      if (this.parentRec) {
        return this.parentRec.x + this.offsetLeft
      } else {
        return this.offsetLeft
      }
    },
    dialogY: function() {
      if (this.parentRec) {
        const temp = this.parentRec.y + this.offsetTop
        if (temp - this.height > 0) {
          return temp - this.height - 10
        } else {
          return this.parentRec.y + this.offsetTop + this.parentRec.height + 10
        }
      } else {
        return this.offsetLeft
      }
    },
    saveEnable: function() {
      return !this.equalArray()
    }
  },
  watch: {
    show(val) {
      this.visiable = val
      if (val) {
        this.calcCoverPos()
        this.loadTreeData()
      }
    },
    visiable(val) {
      if (!val) {
        this.$emit('close')
      }
    }
  },
  mounted() {
    this.calcCoverPos()
    window.addEventListener('resize', this.calcCoverPos)
  },
  destroyed() {
    window.removeEventListener('resize', this.calcCoverPos)
  },
  methods: {
    calcCoverPos: function() {
      this.parentRec = document.querySelector('.org-container').parentNode.getBoundingClientRect()
      this.coverOffsetLeft = -this.parentRec.x
      this.coverOffsetTop = -this.parentRec.y
    },
    loadTreeData: function() {
      getDeptTree().then(res => {
        this.dealData(res.data)
        this.treeData = res.data
      })
    },
    dealData(data) {
      this.tagSelected = this.selected
      for (let i in data) {
        if (this.tagSelected.indexOf(data[i].id) > -1) {
          data[i].isChecked = true
        } else {
          data[i].isChecked = false
        }
        if (data[i].children && Array.isArray(data[i].children)) {
          this.dealData(data[i].children)
        }
      }
    },
    changeSelect() {
      this.tagSelected = this.getSelectIds(this.treeData)
      this.tagSelectedDetail = this.getSelectItems(this.treeData)
    },
    getSelectIds(arr) {
      let temp = []
      for (let i in arr) {
        if (arr[i].isChecked) {
          temp.push(arr[i].id)
        }
        if (arr[i].children && Array.isArray(arr[i].children)) {
          temp.push(...this.getSelectIds(arr[i].children))
        }
      }
      return temp
    },
    getSelectItems(arr) {
      let temp = []
      for (let i in arr) {
        if (arr[i].isChecked) {
          temp.push(arr[i])
        }
        if (arr[i].children && Array.isArray(arr[i].children)) {
          temp.push(...this.getSelectItems(arr[i].children))
        }
      }
      return temp
    },
    equalArray() {
      return minus(this.selected, this.tagSelected).length > 0 || minus(this.tagSelected, this.selected).length > 0
    },
    saveClick: function() {
      this.$emit('on-select', { ids: this.tagSelected, objs: this.tagSelectedDetail })
      this.visiable = false
    },
    cancel: function() {
      this.visiable = false
    },
    doNoThing: function() {}
  }
}
</script>

<style lang="scss" scoped>
.org-container {
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  .card-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    /deep/ .el-card__header {
      padding: 1px 12px;
    }
    /deep/ .el-card__body {
      padding: 0px;
      flex-grow: 1;
      width: 100%;
      position: relative;
      .body-container {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        display: flex;
        flex-direction: column;
        .tree-container {
          flex-grow: 1;
          width: 100%;
          position: relative;
          border-bottom: 1px solid #dcdfe6;
          .scroll-tree-container {
            padding: 10px;
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
        .operate-container {
          padding: 10px 15px;
          width: 100%;
          display: flex;
          justify-content: flex-end;
        }
      }
    }
    .clearfix {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>

