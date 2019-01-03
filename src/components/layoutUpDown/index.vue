<template>
  <div class="main">
    <header-container/>
    <component :is="nav"/>
    <div class="mainContainer">
      <el-scrollbar :noresize="true" class="scroll-container">
        <div class="scroll-container-wrap">
          <transition mode="out-in" name="fade-transform">
            <router-view/>
          </transition>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import HeaderContainer from '@/components/Header'
import NavTop from '@/components/NavTop'
import BreadCrumb from '@/components/BreadCrumb'
export default {
  name: 'LayoutUpDown',
  components: {
    HeaderContainer,
    NavTop,
    BreadCrumb
  },
  data() {
    return {
      nav: NavTop
    }
  },
  computed: {},
  created() {
    if (this.$route.matched.length === 2) {
      this.nav = NavTop
    } else if (this.$route.matched.length > 2) {
      this.nav = BreadCrumb
    } else {
      this.nav = null
    }
  },

  methods: {},
  beforeRouteUpdate(to, from, next) {
    if (this.$route.matched.length === 2) {
      this.nav = NavTop
    } else if (this.$route.matched.length > 2) {
      this.nav = BreadCrumb
    } else {
      this.nav = null
    }
    next()
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
    width: 100%;
    flex-grow: 1;
    position: relative;
    .scroll-container {
      position: absolute;
      width: 100%;
      height: 100%;
      .scroll-container-wrap {
        position: relative;
        width: 91.66667%;
        margin: 0 auto;
      }
      /deep/ .el-scrollbar__wrap {
        overflow-x: hidden !important;
      }
    }
  }
}
</style>
