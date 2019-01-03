<template>
  <div class="errPage-container">
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">Oops! No!</h1>
        <span>网管说您没有权限哦</span>
        <div class="back">
          <el-button @click="back" type="primary">返回</el-button>
        </div>
      </el-col>
      <el-col :span="12">
        <img :src="errGif" alt="Girl has dropped her ice cream." height="428" width="313">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import errGif from '@/assets/img/401.gif'

export default {
  name: 'Page401',
  data() {
    return {
      errGif: errGif
    }
  },
  methods: {
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: '/login' })
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.errPage-container {
  width: 800px;
  max-width: 100%;
  margin: 100px auto;
  .back{
    margin-top:50px;
  }
  .pan-gif {
    margin: 0 auto;
    display: block;
  }
  .pan-img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }

}
</style>
