<template>
  <span :class="{'header-bar-select':isSelect}" @click="jumpToAction" class="header-bar-active">{{BarText}}</span>
</template>

<script>
export default {
  name: 'HeaderNav',
  props: {
    BarText: {
      type: String,
      required: true
    },
    ActionUrl: {
      type: String,
      default: '/404'
    },
    NavData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {}
  },
  computed: {
    isSelect: function() {
      const result =
        this.$route.matched.filter(el => {
          return el.meta.title === this.NavData.meta.title
        }).length > 0
      if (result) {
        // 当URL切换时，将导航数据也切换 vuex 通知刷新 
        this.$store.dispatch('setNavData', this.NavData)
        return true
      }
      return false
    }
  },
  methods: {
    jumpToAction: function() {
      this.$router.push(this.ActionUrl)
    }
  }
}
</script>

<style lang="scss" scoped>
.header-bar-active {
  height: 100%;
  width: 140px;
  display: inline-flex;
  align-items: Center;
  justify-content: center;
  cursor: pointer;
}
</style>
