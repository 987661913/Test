<template>
  <div class="header">
    <el-row justify="center" type="flex">
      <el-col :span="22">
        <div class="head-container">
          <span class="logo-container">
            <span class="logo-svg">
              <svg-icon class="logo" icon-class="logo"/>
            </span>
            <span class="logo-text">郫都区拆迁审计系统</span>
            <span class="nav-container">
              <header-nav :action-url="item.path" :bar-text="item.meta.title" :key="key" :nav-data="item" v-for="(item,key) in routers"/>
            </span>
          </span>
          <span class="user-container">
            <user-info/>
          </span>
        </div>
      </el-col>
    </el-row>
    <el-dialog :title="dialogNoticeText" :visible.sync="dialogNoticeVisible">
      <div @click="handleDialogClose" class="restCloseWindow"></div>
      <h3 v-if="dialogNoticeVisible">{{noticeList[0].title}}</h3>
      <div class="dia-content" v-if="dialogNoticeVisible">{{noticeList[0].content}}</div>
      <div class="dia-inscription" v-if="dialogNoticeVisible">{{noticeList[0].publishDept}}</div>
      <div class="dia-inscription-time" v-if="dialogNoticeVisible">{{noticeList[0].crtTime}}</div>
    </el-dialog>
  </div>
</template>

<script>
import HeaderNav from './navItem'
import UserInfo from './userInfo'
import { getOnceNotice, alreadyReadNotice, getConfigGet } from '@/api/common'
export default {
  name: 'HeaderContainer',
  components: {
    HeaderNav,
    UserInfo
  },
  data() {
    return {
      dialogNoticeText: '公告',
      dialogNoticeVisible: false,
      noticeTime: 0,
      noticeList: [
        {
          title: '',
          content: '',
          publishDept: '',
          crtTime: '',
          noticeTime: '',
          set1: ''
        }
      ]
    }
  },
  computed: {
    routers: function() {
      return this.$store.getters.addRouters
    }
  },
  created() {
    getConfigGet().then(data => {
      this.noticeTime = data.data.noticeTime * 10
    })
    // 登录成功请求一次公告
    this.getShowNoticeOnce()
    setInterval(() => {
      this.getShowNoticeOnce()
    }, 600000)
  },
  methods: {
    getShowNoticeOnce() {
      getOnceNotice().then(data => {
        if (data.data) {
          this.noticeList = data.data
          if (this.noticeList !== '') {
            this.dialogNoticeVisible = true // 控制公告显示
          }
        }
      })
    },
    handleDialogClose() {
      // 表示公告已读
      this.dialogNoticeVisible = false
      alreadyReadNotice(this.noticeList[0].id).then(data => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 3.625rem;
  .el-row {
    height: 100%;
    .el-col {
      height: 100%;
    }
    .head-container {
      height: 100%;
      width: 100%;
      display: inline-flex;
      align-content: right;
      justify-content: space-between;
      .logo-container {
        height: 100%;
        margin-left: 0.625rem;
        display: inline-flex;
        flex-wrap: nowrap;
        align-items: Center;
        span {
          display: inline-flex;
          align-items: Center;
          justify-content: center;
        }
        .logo-svg {
          width: 2rem;
          height: 2rem;

          .logo {
            width: 100%;
            height: 100%;
          }
        }
        .logo-text {
          width: 8.375rem;
          color: #ffffff;
          font-size: 0.875rem;
        }
        .nav-container {
          height: 100%;
        }
      }

      .user-container {
        height: 100%;
        width: 12.5rem;
      }
    }
  }
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
.restCloseWindow {
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 50px;
  cursor: pointer;
}
</style>
