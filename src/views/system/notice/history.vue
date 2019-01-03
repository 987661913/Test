<template>
  <div>
    <template>
      <el-container :key="list" v-for="(index, list) in listNotice">
        <el-main>
          <h4 @click="queryList(index.id)">{{index.title}}</h4>
          <p @click="queryList(index.id)">{{index.content}}</p>
        </el-main>
        <el-aside width="150px">
          <el-row>
            <el-button @click="queryList(index.id)" type="primary">重新编辑</el-button>
            <el-button @click="aginNotices(index.id, index.isPublish)">再次发送</el-button>
          </el-row>
        </el-aside>
      </el-container>
    </template>
  </div>
</template>
<script>
import { addNotice, noticeList, queryNotice, againNotice, updateNotice } from '@/api/system/notice'
export default {
  data() {
    return {
      title: '',
      tabOneHide: false,
      content: '',
      inscription: '',
      dialogFormVisible: false,
      textTitlt: '公告预览',
      dataNow: '',
      listNotice: '',
      noticeId: '',
      tabValues: 1,
      isUpdate: false   
    }
  },
  created() {
    this.tabValues = 1
  },
  mounted() {
    this.bus.$on('openDia', value => {
      this.tabValues = value
      this.bus.$emit('backOpen', value)
    })
    this.getNoticeList()
  },
  methods: {
    clearAll() {
      // 清空
      this.title = ''
      this.content = ''
      this.inscription = ''
    },
    preview() {
      // 预览
      if (!this.title) {
        this.$notify({
          title: '提示',
          message: '标题还未填写，可能会影响您的预览体验！',
          type: 'warning',
          duration: 2000
        })
        return
      } else if (!this.content) {
        this.$notify({
          title: '提示',
          message: '内容还未填写，可能会影响您的预览体验！',
          type: 'warning',
          duration: 2000
        })
        return
      } else if (!this.inscription) {
        this.$notify({
          title: '提示',
          message: '落款还未填写，可能会影响您的预览体验！',
          type: 'warning',
          duration: 2000
        })
        return
      }
      this.dialogFormVisible = true
      this.getFullYear()
    },
    getFullYear() {
      // 获取当前时间
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      this.dataNow = year + '年' + month + '月' + day + '日'
    },
    subMission() {
      // 提交
      if (!this.title) {
        this.$notify({
          title: '提示',
          message: '标题还未填写！',
          type: 'warning',
          duration: 2000
        })
        return
      } else if (!this.content) {
        this.$notify({
          title: '提示',
          message: '内容还未填写！',
          type: 'warning',
          duration: 2000
        })
        return
      } else if (!this.inscription) {
        this.$notify({
          title: '提示',
          message: '落款还未填写！',
          type: 'warning',
          duration: 2000
        })
        return
      }
      addNotice(this.title, this.content, this.inscription).then(() => {
        this.clearAll()
        this.getNoticeList()
        this.$notify({
          title: '成功',
          message: '新增成功！',
          type: 'success',
          duration: 2000
        })
        this.bus.$emit('backOpen', 2)
        this.tabValues = 2
      })
    },
    getNoticeList() {
      noticeList(1, 10)
        .then(data => {
          this.listNotice = data.data.rows
        })
        .catch(e => {})
    },
    queryList(id) {
      // 查询单个公告
      queryNotice(id).then(data => {
        this.noticeId = id
        this.title = data.data.title
        this.content = data.data.content
        this.inscription = data.data.publishDept
      })
      this.$router.push({ path: '/notice/publish', query: { id: id }})
    },
    replyMission() {
      // 更新公告
      if (!this.title) {
        this.$notify({
          title: '提示',
          message: '标题还未填写！',
          type: 'warning',
          duration: 2000
        })
        return
      } else if (!this.content) {
        this.$notify({
          title: '提示',
          message: '内容还未填写！',
          type: 'warning',
          duration: 2000
        })
        return
      } else if (!this.inscription) {
        this.$notify({
          title: '提示',
          message: '落款还未填写！',
          type: 'warning',
          duration: 2000
        })
        return
      }
      updateNotice(this.noticeId, this.title, this.content, this.inscription).then(() => {
        this.clearAll()
        this.getNoticeList()
        this.$notify({
          title: '成功',
          message: '更新成功！',
          type: 'success',
          duration: 2000
        })
        this.isUpdate = false
        this.bus.$emit('backOpen', 2)
        this.tabValues = 2
      })
    },
    aginNotices(id, isAgain) {
      // 重新发布
      againNotice(id, isAgain).then(data => {
        this.$notify({
          title: '成功',
          message: '重新发布成功！',
          type: 'success',
          duration: 2000
        })
      })
    },
    openDia(id) {
      alert(id)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-row {
  width: 100%;
  text-align: right;
}
.source {
  padding: 10px 0 30px 0;
}
p {
  font-size: 14px;
  color: #5e6d82;
  line-height: 1.5em;
}
h3 {
  text-align: center;
}
.dia-content {
  padding: 20px 0 0 0;
  text-indent: 2rem;
  line-height: 25px;
}
.dia-inscription {
  width: 100%;
  text-align: right;
  padding: 20px 0 10px 0;
}
.dia-inscription-time {
  width: 100%;
  text-align: right;
}
.el-main {
  padding: 0;
  cursor: pointer;
  h4 {
    margin-bottom: 15px;
  }
  p {
    font-size: 13px;
    color: #000;
  }
}
.el-row {
  button {
    margin-top: 15px;
  }
}
.el-container {
  border-bottom: 1px solid #d7d7d7;
  padding-bottom: 30px;
  padding-top: 20px;
}
</style>
