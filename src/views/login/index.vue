<template>
  <div class="login-container">
    <el-row>
      <el-col :span="10" class="slider-img">
        <div class="grid-content bg-purple">
          <el-carousel arrow="never" trigger="click">
            <el-carousel-item>
              <img alt height="400px" src="@/assets/img/slider.svg" width="100%">
              <div class="slider-title">自动扫描识别疑点1</div>
              <div class="slider-content">系统根据审计工作的特点，基于不同审计场景匹配不同审计模型，自动生成疑点信息，提高审计工作效率。</div>
            </el-carousel-item>
            <el-carousel-item>
              <img alt height="400px" src="@/assets/img/slider.svg" width="100%">
              <div class="slider-title">自动扫描识别疑点2</div>
              <div class="slider-content">系统根据审计工作的特点，基于不同审计场景匹配不同审计模型，自动生成疑点信息，提高审计工作效率。</div>
            </el-carousel-item>
            <el-carousel-item>
              <img alt height="400px" src="@/assets/img/slider.svg" width="100%">
              <div class="slider-title">自动扫描识别疑点3</div>
              <div class="slider-content">系统根据审计工作的特点，基于不同审计场景匹配不同审计模型，自动生成疑点信息，提高审计工作效率。</div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light">
          <div class="slider-main">
            <div class="main-header">
              <img alt height="100%" src="@/assets/img/logo.svg" width="100%">
            </div>
            <el-form :model="loginForm" :rules="loginRules" autocomplete="on" class="login-form" label-position="left" ref="loginForm"> 
              <el-form-item prop="username">
                <span class="svg-container">
                  <svg-icon icon-class="user"/>
                </span>
                <el-input autocomplete="on" name="username" placeholder="用户名" type="text" v-model="loginForm.username"/>
              </el-form-item>
              <el-form-item prop="password">
                <span class="svg-container">
                  <svg-icon icon-class="password"/>
                </span>
                <el-input :type="passwordType" @keyup.enter.native="handleLogin" autocomplete="on" name="password" placeholder="请输入密码" v-model="loginForm.password"/>
                <span @click="showPwd" class="show-pwd">
                  <svg-icon icon-class="eye"/>
                </span>
              </el-form-item>
              <el-button :loading="loading" @click.native.prevent="handleLogin" style="width:100%;margin-bottom:30px;" type="primary">登录</el-button> 
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-form :model="loginForm" :rules="loginRules" autocomplete="on" class="login-form" label-position="left" ref="loginForm" style="display: none;">
      <div class="title-container">
        <h3 class="title">郫都区审计局</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
        <el-input autocomplete="on" name="username" placeholder="用户名" type="text" v-model="loginForm.username"/>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input :type="passwordType" @keyup.enter.native="handleLogin" autocomplete="on" name="password" placeholder="请输入密码" v-model="loginForm.password"/>
        <span @click="showPwd" class="show-pwd">
          <svg-icon icon-class="eye"/>
        </span>
      </el-form-item>
      <el-button :loading="loading" @click.native.prevent="handleLogin" style="width:100%;margin-bottom:30px;" type="primary">登录</el-button>
      <div class="tips">
        <span>账号 : admin</span>
        <span>密码: 任意</span>
      </div>
      <div class="tips">
        <span style="margin-right:18px;">账号: editor</span>
        <span>密码: 任意</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'

export default {
  name: 'Login',
  components: {},
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('长度4-16，数字或大小写字母'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码至少5位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('LoginByUsername', this.loginForm)
            .then(() => {
              this.loading = false
              this.$router.push({ path: this.redirect || '/' })
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #283443;
$light_gray: #222;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
    &::first-line {
      color: $light_gray;
    }
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border-bottom: 1px solid #d8d8d8;
    // background: rgba(0, 0, 0, 0.1);
    // border-radius: 5px;
    color: #222;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #1d2d4d;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 192px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
// 新版登录样式
.slider-img {
  margin: 0 auto;
  margin-top: 15vh;
  margin-left: 200px;
  .slider-title {
    font-size: 34px;
    color: #ffffff;
    letter-spacing: 0.94px;
  }
  .slider-content {
    margin-top: 10px;
    width: 500px;
    opacity: 0.7;
    font-size: 18px;
    color: #ffffff;
    letter-spacing: 0.75px;
    line-height: 30px;
  }
}
/deep/ .el-carousel__container {
  height: 560px;
}
/deep/ .el-carousel__indicators {
  left: 5%;
}
/deep/ .el-carousel__button {
  width: 8px;
  height: 8px;
  opacity: 0.37;
  border-radius: 8px;
  background: #c2c8d5;
}
/deep/ .is-active {
  // background: #00ff8c;
  // box-shadow: 0 0 6px 0 #07c276;
}
.slider-main {
  position: relative;
  width: 346px;
  height: 500px;
  margin-top: 18vh;
  margin-left: 20%;
  background: #ffffff;
  box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  flex: 0;
  .main-header {
    width: 100%;
    height: 139px;
    margin-top: 56px;
  }
}
.el-button{
  margin-top: 29px;
  padding: 17px 20px;
}
</style>
