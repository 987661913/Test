<template>
  <div>
    <template>
      <el-row>
        <el-button @click="clearAll">清 空</el-button>
        <el-button @click="preview">预 览</el-button>
        <el-button @click="subMission" type="success" v-if="notice_btn_publish" v-show="!isUpdate">发 送</el-button>
        <el-button @click="replyMission" type="success" v-show="isUpdate">更 新</el-button>
      </el-row>
      <p>标题</p>
      <div class="source">
        <el-input placeholder="请输入标题" v-model="title"></el-input>
      </div>
      <p>内容</p>
      <div class="source">
        <el-input :autosize="{ minRows: 12, maxRows: 4}" placeholder="请输入内容" type="textarea" v-model="content"></el-input>
      </div>
      <p>落款</p>
      <div class="source">
        <el-input placeholder="请输入落款" v-model="inscription"></el-input>
      </div>
      <el-dialog :title="textTitlt" :visible.sync="dialogFormVisible">
        <h3>{{title}}</h3>
        <div class="dia-content">{{content}}</div>
        <div class="dia-inscription">{{inscription}}</div>
        <div class="dia-inscription-time">{{dataNow}}</div>
      </el-dialog>
    </template>
  </div>
</template>
<script>
import { addNotice, noticeList, queryNotice, againNotice, updateNotice } from '@/api/system/notice'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      notice_btn_publish: false,
      title: '',
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
  computed: {
    ...mapGetters(['elements'])
  },
  created() {
    this.notice_btn_publish = this.elements['notice_btn_publish']
    if (this.$route.query.id) {
      this.isUpdate = true
      this.queryList(this.$route.query.id)
    }
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
        this.$router.push({ path: '/notice/history' })
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
        this.$router.push({ path: '/notice/history' })
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
