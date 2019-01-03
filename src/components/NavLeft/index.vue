<template>
  <div class="nav-bar">
    <el-scrollbar class="nav-scroll-container">
      <el-row class="nav-bar-head">
        <svg-icon :icon-class="iconClass" class="system"/>
        <span class="nav-title">{{navData&&navData.meta.title}}</span>
      </el-row>
      <el-row>
        <el-col>
          <div class="nav-content">
            <el-menu :default-active="activeIndex" @select="handleSelect" background-color="#f4f5f6" class="nav-menu" ref="menu">
              <el-menu-item :index="index.toString()" :key="index" class="menu-item" v-for="(item,index) in navData.children">
                <span>{{item.meta&&item.meta.title}}</span>
              </el-menu-item>
            </el-menu>
          </div>
        </el-col>
      </el-row>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'NavLeft',
  data() {
    return {
      empty: {
        children: [],
        meta: {}
      }
    }
  },
  computed: {
    iconClass: function() {
      if (this.navData && this.navData.meta && this.navData.meta.icon) {
        return this.navData.meta.icon
      } else {
        return ''
      }
    },
    navData: function() {
      return this.$store.getters.navData ? this.$store.getters.navData : this.empty
    },
    activeIndex: function() {
      if (this.navData && this.navData.children && this.navData.children.length > 0) {
        for (let i in this.$route.matched) {
          const bl = this.navData.children.filter(m => {
            if (m.meta.title) {
              return m.meta.title === this.$route.matched[i].meta.title
            } else {
              return false
            }
          })
          if (bl.length > 0) {
            return this.navData.children.indexOf(bl[0]).toString()
          }
        }
        return ''
      } else {
        return ''
      }
    }
  },
  mounted() {},
  methods: {
    handleSelect: function(index) {
      if (this.navData) {
        if (this.navData.children[index].meta.type === 'normal') {
          this.$router.push({ name: this.navData.children[index].name })
        } else {
          window.open(this.checkHttp(this.navData.children[index].meta.href), '_blank')
          this.$refs.menu.updateActiveIndex(this.activeIndex)
        }
      }
    },
    checkHttp: function(url) {
      if (url && url.match(/^http:\/\//g)) {
        return url
      } else {
        return 'http://' + url
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-bar {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #f4f5f6;
  .nav-scroll-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    /deep/ .el-scrollbar__wrap {
      overflow-x: hidden;
    }
    .nav-bar-head {
      width: 100%;
      height: 3.5rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-left: 1.25rem;
      .system {
        height: 1.25rem;
        width: 1.25rem;
      }
      .nav-title {
        font-size: 1.125rem;
        margin-left: 0.625rem;
      }
    }
    .nav-content {
      .nav-menu {
        .is-active {
          color: #ffffff !important;
          background-color: #0bba6b !important;
        }
        .menu-item {
          font-size: 0.9375rem;
          height: 2.375rem;
          width: 100%;
          display: inline-flex;
          align-items: center;
          margin-top: 0.1875rem;
          margin-bottom: 0.1875rem;
        }
      }
    }
  }
}
</style>
