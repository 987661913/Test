<template>
  <div class="tab-container">
    <el-tabs class="tabs" v-model="activeName">
      <el-tab-pane :key="item.id" :label="item.name" :name="item.code" v-for="item in tabMapOptions">
        <keep-alive>
          <tab-pane :type="item.id" :type-code="item.code" v-if="activeName==item.code"></tab-pane>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import tabPane from './components/groupDetail'
import { getAllGroupTypes } from '@/api/system/role/index'
export default {
  name: 'Group',
  components: {
    tabPane
  },
  data() {
    return {
      tabMapOptions: [],
      activeName: 'role'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getAllGroupTypes().then(data => {
        this.tabMapOptions = data.data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.tab-container {
  width: 100%;
  height: 100%;
  .tabs {
    /deep/ .el-tabs__content {
      overflow: visible !important;
    }
    /deep/ .el-tabs__header {
      width: calc(100% - 170px) !important;
    }
  }
}
</style>
