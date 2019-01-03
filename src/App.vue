<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import './assets/css/common.css'
export default {
  name: 'App'
}
</script>

<style>
  #app{
    width: 100%;
    height: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
