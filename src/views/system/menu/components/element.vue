<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" class="filter-item" placeholder="资源名称" style="width: 200px;" v-model="listQuery.name"></el-input>
      <el-button @click="handleFilter" class="filter-item" icon="search" type="primary" v-waves>搜索</el-button>
      <el-button @click="handleCreate" class="filter-item" icon="edit" style="margin-left: 10px;" type="primary" v-if="elelment_btn_add">添加</el-button>
    </div>
    <el-table :data="list" :key="tableKey" :row-class-name="rowStyle" border style="width: 100%;margin-top:10px;" v-loading.body="listLoading">
      <el-table-column align="center" label="编号" width="50px">
        <span slot-scope="scope">{{scope.row.tRow}}</span>
      </el-table-column>
      <el-table-column align="left" header-align="center" label="资源编码" min-width="180px">
        <span slot-scope="scope">{{scope.row.code}}</span>
      </el-table-column>
      <el-table-column align="center" label="资源类型">
        <span slot-scope="scope">{{scope.row.type}}</span>
      </el-table-column>
      <el-table-column align="center" label="资源名称" min-width="200px">
        <span slot-scope="scope">{{scope.row.name}}</span>
      </el-table-column>
      <el-table-column align="center" label="资源地址" min-width="160px">
        <span slot-scope="scope">{{scope.row.uri}}</span>
      </el-table-column>
      <el-table-column align="center" label="资源请求类型" min-width="105px">
        <span slot-scope="scope">{{scope.row.method}}</span>
      </el-table-column>
      <el-table-column align="center" label="描述" min-width="200px">
        <span slot-scope="scope">{{scope.row.description}}</span>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" v-if="elelment_btn_edit||elelment_btn_del" width="150">
        <span slot-scope="scope">
          <el-button @click="handleUpdate(scope.row)" size="small" type="success" v-if="elelment_btn_edit&&scope.row.id!=null">编辑</el-button>
          <el-button @click="handleDelete(scope.row)" size="small" type="danger" v-if="elelment_btn_del&&scope.row.id!=null">删除</el-button>
        </span>
      </el-table-column>
    </el-table>
    <div class="pagination-container" v-show="!listLoading">
      <el-pagination :current-page.sync="listQuery.page" :page-size="listQuery.limit" :page-sizes="[10,15,20]" :total="total" @current-change="handleCurrentChange" @size-change="handleSizeChange" layout="total, prev, pager, next,sizes"></el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" label-width="110px" ref="form">
        <el-form-item label="资源编码" prop="code">
          <el-input placeholder="请输入资源编码" v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="资源类型" prop="type">
          <el-select class="filter-item" placeholder="请输入资源类型" v-model="form.type">
            <el-option :key="item" :label="item" :value="item" v-for="item in typeOptions"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资源名称" prop="name">
          <el-input placeholder="请输入资源名称" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="资源地址" prop="uri">
          <el-input placeholder="请输入资源地址" v-model="form.uri"></el-input>
        </el-form-item>
        <el-form-item label="资源请求类型" prop="method">
          <el-select class="filter-item" placeholder="请输入资源请求类型" v-model="form.method">
            <el-option :key="item" :label="item" :value="item" v-for="item in methodOptions"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button @click="create('form')" type="primary" v-if="dialogStatus=='create'">确 定</el-button>
        <el-button @click="update('form')" type="primary" v-else>确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getElementList, addElement, getElement, deleteElement, updateElement } from '@/api/system/element/index'
import { mapGetters } from 'vuex'
export default {
  name: 'Element',
  data() {
    return {
      methodOptions: ['GET', 'POST', 'PUT', 'DELETE'],
      typeOptions: ['uri', 'button'],
      form: {
        code: undefined,
        type: undefined,
        name: undefined,
        uri: undefined,
        menuId: undefined,
        method: undefined,
        description: undefined
      },
      rules: {
        code: [
          {
            required: true,
            message: '请输入资源编码',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '请输入资源类型',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入资源名称',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'blur'
          }
        ],
        uri: [
          {
            required: true,
            message: '请输入',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 200,
            message: '长度在 3 到 200 个字符',
            trigger: 'blur'
          }
        ],
        method: [
          {
            required: true,
            message: '请输入资源请求类型',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ],
        description: [
          {
            required: true,
            message: '请输入',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ]
      },
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        name: undefined,
        menuId: this.menuId
      },
      emptyData: {
        id: null,
        code: null,
        type: null,
        name: null,
        uri: null,
        menuId: null,
        method: null,
        description: null
      },
      dialogFormVisible: false,
      dialogStatus: '',
      menuId: -1,
      textMap: {
        update: '编辑',
        create: '创建'
      },
      tableKey: 0,
      // 资源权限
      elelment_btn_add: false,
      elelment_btn_edit: false,
      elelment_btn_del: false
    }
  },
  computed: {
    ...mapGetters(['elements'])
  },
  created() {
    this.getList()
    this.elelment_btn_add = this.elements['element_btn_add']
    this.elelment_btn_edit = this.elements['element_btn_update']
    this.elelment_btn_del = this.elements['element_btn_delete']
  },
  methods: {
    getList() {
      this.listLoading = true
      this.listQuery.menuId = this.menuId
      getElementList(this.listQuery).then(response => {
        // debugger
        this.addRowNum(response.data.rows)
        this.sortByCode(response.data.rows)
        this.list = response.data.rows
        this.total = response.data.total
        this.listLoading = false
        this.fillEmptyRow()
      })
    },
    addRowNum(data) {
      if (data && Array.isArray(data)) {
        data.forEach((el, index, arr) => {
          el.tRow = index + 1
        })
      }
    },
    sortByCode(data) {
      if (data && Array.isArray(data)) {
        data.sort((a, b) => {
          if (a.code === b.code) {
            return 0
          } else {
            return a.code < b.code ? -1 : 1
          }
        })
      }
    },
    fillEmptyRow() {
      const emptyRowCount = this.listQuery.limit - this.list.length
      for (let i = 0; i < emptyRowCount; i++) {
        this.list.push(this.emptyData)
      }
    },
    handleFilter() {
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleUpdate(row) {
      getElement(row.id).then(response => {
        this.form = response.data
        this.dialogFormVisible = true
        this.dialogStatus = 'update'
      })
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteElement(row.id).then(() => {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          const index = this.list.indexOf(row)
          this.list.splice(index, 1)
        })
      })
    },
    create(formName) {
      const set = this.$refs
      this.form.menuId = this.menuId
      set[formName].validate(valid => {
        if (valid) {
          addElement(this.form).then(() => {
            this.dialogFormVisible = false
            this.getList()
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        } else {
          return false
        }
      })
    },
    rowStyle(e) {
      if (e.rowIndex % 2 === 1) {
        return 'el-row-skiprow'
      }
    },
    cancel(formName) {
      this.dialogFormVisible = false
      const set = this.$refs
      set[formName].resetFields()
    },
    update(formName) {
      const set = this.$refs
      this.form.menuId = this.menuId
      set[formName].validate(valid => {
        if (valid) {
          this.form.password = undefined
          updateElement(this.form.id, this.form).then(() => {
            this.dialogFormVisible = false
            this.getList()
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
          })
        } else {
          return false
        }
      })
    },
    resetTemp() {
      this.form = {
        code: undefined,
        type: undefined,
        name: undefined,
        uri: undefined,
        menuId: undefined,
        method: undefined,
        description: undefined
      }
    }
  }
}
</script>

