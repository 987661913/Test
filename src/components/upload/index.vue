<template>
  <div class="main">
    <header-container/>
    <div class="mainContainer">
      <el-container class="mainWrap">
        <el-aside class="nav-left" width="183px">
          <el-tree :data="allDirectoryList" :props="defaultProps" @node-click="testClik" @node-contextmenu="rihgtClick" default-expand-all highlight-current node-key="id" ref="viewTree">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>
                <i :class="node.icon" v-if="node.icon"></i>
                <i class="el-icon-date" v-if="!node.icon"></i>
                {{ node.label }}
              </span>
            </span>
          </el-tree>
        </el-aside>
        <el-main>
          <el-scrollbar class="scroll-container">
            <div :style="{'padding-right':rightPadding+'px'}" class="scroll-container-wrap">
              <transition mode="out-in" name="fade-transform">
                <el-upload :auto-upload="false" :file-list="fileList" :http-request="beforeUpload" action class="upload-demo" ref="upload" style="width: 260px;float:left;" v-if="fileListId">
                  <el-button slot="trigger" type="primary">选取文件</el-button>
                  <el-button @click="submitUpload" style="margin-left: 10px;" type="success">上传到服务器</el-button>
                  <br>
                  <div class="el-upload__tip" slot="tip"></div>
                </el-upload>
              </transition>
              <el-input placeholder="请输入姓名" style="width:240px;float:left;margin-right: 20px;" v-if="fileListId" v-model="searchList"></el-input>
              <el-button @click="searchData" type="primary" v-if="fileListId">搜 索</el-button>
              <el-table :data="categoryFileList" style="width: 100%;margin-top: 20px;" tooltip-effect="dark">
                <el-table-column type="selection"></el-table-column>
                <el-table-column label="名称">
                  <template slot-scope="scope">{{ scope.row.fileName }}</template>
                </el-table-column>
                <el-table-column label="文件大小">
                  <template slot-scope="scope">{{ calculateFileSize(scope.row.fileSize) }}</template>
                </el-table-column>
                <el-table-column label="文件类型" prop="fileType"></el-table-column>
                <el-table-column label="创造时间" prop="crtTime" show-overflow-tooltip></el-table-column>
                <el-table-column label="最新操作人" prop="crtName" show-overflow-tooltip></el-table-column>
                <el-table-column label="最新操作时间" prop="updTime" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-tag @click="deleteList(scope.row.id)" type="danger">删除</el-tag>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-scrollbar>
        </el-main>
      </el-container>
    </div>
    <!--鼠标右键点击出现页面-->
    <div v-show="menuVisible">
      <el-menu @select="handleRightSelect" active-text-color="#fff" class="el-menu-vertical" id="rightClickMenu" text-color="#fff">
        <el-menu-item class="menuItem" index="1">
          <span slot="title">添加同级</span>
        </el-menu-item>
        <el-menu-item class="menuItem" index="2">
          <span slot="title">添加子级</span>
        </el-menu-item>
        <el-menu-item class="menuItem" index="3">
          <span slot="title">修改分类</span>
        </el-menu-item>
        <el-menu-item class="menuItem" index="4">
          <span slot="title">删除分类</span>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 右键菜单新增弹出层 -->
    <el-dialog :title="textTitlt" :visible.sync="dialogFormVisible">
      <el-form label-width="80px">
        <el-form-item label="标签名称">
          <el-input autocomplete="off" v-model="tagName"></el-input>
        </el-form-item>
        <el-form-item label="标签图标">
          <el-input autocomplete="off" v-model="tagIcon"></el-input>
        </el-form-item>
        <el-form-item label="标签类型">
          <el-select placeholder="请选择" v-model="tagType">
            <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in options"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="dialogNewFormVisible = false">取 消</el-button>
        <el-button @click="increasePeerNodes()" type="primary" v-if="selectKey == 1">确 定</el-button>
        <el-button @click="addingChildNodes()" type="primary" v-if="selectKey == 2">确 定</el-button>
        <el-button @click="updateDirectoryInfo()" type="primary" v-if="selectKey == 3">更 新</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addDirectory, getDirectoryAll, deleteDirectoryOne, getDirectoryOne, updateDirectory, uploadImg, getUploadFile, deleteDirectoryFile } from '@/api/system/upload'
import HeaderContainer from '@/components/Header'
import NavLeft from '@/components/NavLeft'
export default {
  components: {
    HeaderContainer,
    NavLeft
  },
  data() {
    return {
      fileListId: '',
      options: [
        {
          value: '1',
          label: '个人'
        },
        {
          value: '2',
          label: '项目'
        },
        {
          value: '3',
          label: '群组'
        }
      ],
      categoryFileList: [],
      searchList: '',
      tagType: '', // 标签类型
      tagName: '', // 标签名称
      tagIcon: '', // 标签图标
      menuVisible: false,
      dialogFormVisible: false,
      textTitlt: '新增节点',
      fileList: [],
      allDirectoryList: [],
      rightPadding: 0,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      rightClickMenuData: '', // 右键菜单数据
      selectKey: ''
    }
  },
  created() {
    this.getAllDirectory()
  },
  mounted() {
    this.rightPadding = document.querySelector('.mainWrap').clientWidth * 0.0416667
    window.addEventListener('resize', e => {
      document.querySelector('.mainWrap').clientWidth * 0.0416667
    })
  },
  methods: {
    deleteList(id) {
      this.$confirm('此操作将永久删除该目录和其子目录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDirectoryFile(id).then(() => {
          getUploadFile(this.fileListId, '').then(data => {
            this.categoryFileList = data.data
          })
          this.$notify({
            title: '成功',
            message: '删除成功！',
            type: 'success',
            duration: 2000
          })
        })
      })
    },
    searchData() {
      // 搜索
      getUploadFile(this.fileListId, this.searchList).then(data => {
        this.categoryFileList = data.data
      })
    },
    calculateFileSize(fileSize) {
      // 计算文件
      if (fileSize / 1024 < 1000) {
        return (fileSize / 1024).toFixed(2) + 'kb'
      } else if (fileSize / 1024 > 1000) {
        return (fileSize / 1024 / 1024).toFixed(2) + 'MB'
      }
    },
    testClik(event, object, value, element) {
      this.fileListId = object.key
      getUploadFile(object.key, '').then(data => {
        this.categoryFileList = data.data
      })
    },
    beforeUpload(obj) {
      let fd = new FormData()
      fd.append('file', obj.file)
      uploadImg(fd, this.fileListId).then(data => {
        this.fileList = []
        getUploadFile(this.fileListId, '').then(data => {
          this.categoryFileList = data.data
        })
        if (data.status === 200) {
          this.$notify({
            title: '成功',
            message: '上传成功！',
            type: 'success',
            duration: 2000
          })
        }
      })
      return
    },
    handleRightSelect(key) {
      this.selectKey = key
      if (parseInt(key) === 1 || parseInt(key) === 2) {
        // 新增目录
        this.dialogFormVisible = true
      } else if (parseInt(key) === 3) {
        this.dialogFormVisible = true
        this.queryTheCurrentNode()
      } else if (parseInt(key) === 4) {
        // 删除目录
        this.deleteTheCurrentNode(this.rightClickMenuData.id)
      }
    },
    rihgtClick(event, object, value, element) {
      this.rightClickMenuData = object
      if (this.objectID !== object.id) {
        this.objectID = object.id
        this.menuVisible = true
        this.DATA = object
        this.NODE = value
      } else {
        this.menuVisible = !this.menuVisible
      }
      document.addEventListener('click', e => {
        this.menuVisible = false
      })
      let menu = document.querySelector('#rightClickMenu')
      /* 菜单定位基于鼠标点击位置 */
      menu.style.left = event.clientX + 20 + 'px'
      menu.style.top = event.clientY - 30 + 'px'
      menu.style.position = 'absolute' // 为新创建的DIV指定绝对定位
      menu.style.width = 160 + 'px'
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    updateDirectoryInfo() {
      // 更新文件夹信息
      updateDirectory(this.tagIcon, this.tagName, this.tagType, this.rightClickMenuData.id, this.$store.getters.userid, this.rightClickMenuData.id).then(() => {
        this.dialogFormVisible = false
        this.getAllDirectory()
        this.$notify({
          title: '成功',
          message: '更新成功！',
          type: 'success',
          duration: 2000
        })
      })
    },
    getAllDirectory() {
      // 获取文件夹列表
      getDirectoryAll().then(data => {
        this.allDirectoryList = data.data
      })
    },
    queryTheCurrentNode() {
      // 查询当前节点
      getDirectoryOne(this.rightClickMenuData.id).then(data => {
        this.tagName = data.data.name
        this.tagIcon = data.data.icon
        this.tagType = data.data.type
      })
    },
    deleteTheCurrentNode() {
      // 删除当前节点
      this.$confirm('此操作将永久删除该目录和其子目录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDirectoryOne(this.rightClickMenuData.id).then(() => {
          this.getAllDirectory()
          this.$notify({
            title: '成功',
            message: '删除成功！',
            type: 'success',
            duration: 2000
          })
        })
      })
    },
    increasePeerNodes(typeId) {
      // 新增同级节点 icon, name, type, parentId, typeId
      addDirectory(this.tagIcon, this.tagName, this.tagType, this.rightClickMenuData.parentId, this.$store.getters.userid).then(() => {
        this.dialogFormVisible = false
        this.getAllDirectory()
        this.$notify({
          title: '成功',
          message: '新增成功！',
          type: 'success',
          duration: 2000
        })
      })
    },
    addingChildNodes(typeId) {
      // 新增子级节点 icon, name, type, parentId, typeId
      addDirectory(this.tagIcon, this.tagName, this.tagType, this.rightClickMenuData.id, this.$store.getters.userid).then(() => {
        this.dialogFormVisible = false
        this.getAllDirectory()
        this.$notify({
          title: '成功',
          message: '新增成功！',
          type: 'success',
          duration: 2000
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  min-width: 1350px;
  height: 100%;
  display: flex;
  flex-direction: column;
  .mainContainer {
    // width: 91.667%;
    // margin: 0 auto;
    width: 100%;
    flex-grow: 1;
    overflow-y: auto;
    position: relative;
    .mainWrap {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      .nav-left {
        margin-left: 4.66667%;
      }
      /deep/ .el-main {
        padding-right: 0 !important;
      }
      .scroll-container {
        height: 100%;
        .scroll-container-wrap {
          position: relative;
          width: 100%;
        }
        /deep/ .el-scrollbar__wrap {
          overflow-x: hidden;
        }
      }
    }
  }
}
/*************************标签鼠标右击页面样式******************************/
.el-menu-vertical {
  border: 3px solid rgb(84, 92, 100);
  border-radius: 10px;
  z-index: 100;
}
.el-menu-vertical i {
  color: #777777;
}
.menuItem {
  height: 40px;
  line-height: 40px;
  background-color: #545c64;
  font-size: 15px;
  text-align: center;
}
.menuItem:hover {
  background-color: #909399;
}
.el-aside {
  padding-top: 20px;
  border-left: 1px solid #d7d7d7;
  border-right: 1px solid #d7d7d7;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
