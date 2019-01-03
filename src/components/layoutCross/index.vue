<template>
  <div class="main">
    <header-container/>
    <div class="mainContainer">
      <el-container class="mainWrap">
        <el-aside class="nav-left" width="183px">
          <nav-left/>
        </el-aside>
        <el-main>
          <el-scrollbar class="scroll-container">
            <div :style="{'padding-right':rightPadding+'px'}" class="scroll-container-wrap">
              <transition mode="out-in" name="fade-transform">
                <router-view/>
              </transition>
            </div>
          </el-scrollbar>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import HeaderContainer from '@/components/Header'
import NavLeft from '@/components/NavLeft'
export default {
  name: 'LayoutCross',
  components: {
    HeaderContainer,
    NavLeft
  },
  data() {
    return {
      rightPadding: 0
    }
  },
  mounted() {
    this.resize()
    window.addEventListener('resize', this.resize)
  },
  destroyed() {
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    resize: function() {
      this.rightPadding = document.querySelector('.mainWrap').clientWidth * 0.0416667
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
</style>
