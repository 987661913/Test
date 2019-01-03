<template>
  <div class="nav-bar">
    <el-row justify="center" type="flex">
      <el-col :span="22">
        <div class="nav-content">
          <el-menu :default-active="activeIndex" @select="handleSelect" class="nav-menu" mode="horizontal">
            <el-menu-item :index="index.toString()" :key="index" class="menu-item" v-for="(item,index) in navData.children" v-waves>
              <span>{{item.meta&&item.meta.title}}</span>
              <span v-if="item.meta&&item.meta.count">
                <span>(</span>
                <span class="common-font-color">{{item.meta.count}}</span>
                <span>)</span>
              </span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'NavTop',
  data() {
    return {
      empty: {
        children: [],
        meta: {}
      }
    }
  },
  computed: {
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
  methods: {
    handleSelect(index) {
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
  height: 3.5rem;

  .el-row {
    height: 100%;
    .el-col {
      height: 100%;
    }
    .nav-content {
      height: 100%;
      padding-top: 0.25rem;
      .nav-menu {
        border-bottom-color: #eeeeee;
        .el-menu-item {
          > span {
            padding-bottom: 5px;
          }
          &:first-child {
            margin-left: 0;
          }
          &:last-child {
            margin-right: 0;
          }
          color: #222222;
          font-size: 1rem;
          height: 3.125rem;
          padding-left: 3px;
          padding-right: 3px;
          margin-left: 20px;
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
