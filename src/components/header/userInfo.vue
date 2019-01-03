<template>
  <span class="user-info">
    <span class="welcome">您好,{{username}}</span>
    <img :src="headPic" class="round_icon">
    <svg-icon icon-class="arrow-down" class="arrow"/>
  </span>
</template>

<script>
export default {
  name: 'UserInfo',
  props: {},
  data() {
    return {}
  },
  computed: {
    username: function() {
      return this.$store.getters.name
    },
    headPic: function() {
      return this.$store.getters.head_pic
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.user-info {
  height: 100%;
  width: 100%;
  display: inline-flex;
  align-items: Center;
  justify-content: center;
  cursor: pointer;
  .welcome {
    font-size: 0.75rem;
    color: #7688AD;
  }
  .round_icon {
    width: 36px;
    height: 36px;
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border: 0.125rem solid #ffffff;
    margin-left: 0.25rem;
  }
  .arrow {
    margin-left: 0.25rem;
  }
}
</style>
