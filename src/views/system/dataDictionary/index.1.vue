<template>
  <div class="tab-item-contianer">
    <el-table style="width: 100%">
      <el-table-column label="日期">&nbsp;</el-table-column>
      <el-table-column label="姓名"></el-table-column>
      <el-table-column label="地址"></el-table-column>
    </el-table>
    <el-collapse @change="handleChange" v-model="activeNames">
      <el-collapse-item :key="index" :title="val.name" name="1" v-for="(val, index) in tableList">
        <div>
          <el-table :data="tableList[index].childs" style="width: 100%">
            <el-table-column label="日期" prop="crtTime"></el-table-column>
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="地址" prop="updTime"></el-table-column>
          </el-table>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { getdicTreee } from '@/api/system/dataDictionary/index'
export default {
  props: {},
  data() {
    return {
      tableList: '',
      activeNames: ['1'],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {
    getdicTreee().then(data => {
      this.tableList = data.data
    })
  },
  methods: {
    handleChange(val) {
      console.log(val)
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .el-table__empty-block {
  display: none !important;
}
/deep/ .el-collapse-item .el-table__header {
  display: none !important;
}
.el-table--border::after,
.el-table--group::after,
.el-table::before {
  background-color: transparent;
}
</style>
