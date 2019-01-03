<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" class="filter-item" placeholder="姓名或账户" style="width: 200px;" v-model="listQuery.name"></el-input>
      <el-button @click="handleFilter" class="filter-item" icon="search" type="primary" v-waves>搜索</el-button>
      <el-button @click="handleCreate" class="filter-item" icon="edit" style="margin-left: 10px;" type="primary" v-if="roleType_btn_add">添加</el-button>
    </div>
    <el-table :data="list" :key="tableKey" border fit highlight-current-row style="width: 100%" v-loading.body="listLoading">
      <el-table-column align="center" label="序号" width="49px">
        <template slot-scope="scope">
          <span>{{scope.row.tRow}}</span>
        </template>
      </el-table-column>
      <el-table-column align="left" header-align="center" label="编码">
        <template slot-scope="scope">
          <span>{{scope.row.code}}</span>
        </template>
      </el-table-column>
      <el-table-column align="left" header-align="center" label="类型名称">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="left" header-align="center" label="描述">
        <template slot-scope="scope">
          <span>{{scope.row.description}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="最后更新时间" min-width="120px">
        <template slot-scope="scope">
          <span>{{scope.row.updTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="最后更新人">
        <template slot-scope="scope">
          <span>{{scope.row.updName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="left" label="最后更新主机">
        <template slot-scope="scope">
          <span>{{scope.row.updHost}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" v-if="roleType_btn_edit||roleType_btn_delete" width="150">
        <template slot-scope="scope">
          <el-button @click="handleUpdate(scope.row)" size="small" type="success" v-if="roleType_btn_edit">编辑</el-button>
          <el-button @click="handleDelete(scope.row)" size="small" type="danger" v-if="roleType_btn_delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container" v-show="!listLoading">
      <el-pagination :current-page.sync="listQuery.page" :page-size="listQuery.limit" :page-sizes="[10,20,30, 50]" :total="total" @current-change="handleCurrentChange" @size-change="handleSizeChange" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" label-width="100px" ref="form">
        <el-form-item label="编码" prop="code">
          <el-input placeholder="请输入编码" v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="类型名称" prop="name">
          <el-input placeholder="请输入类型名称" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input placeholder="请输入描述" v-model="form.description"></el-input>
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
import { getRoleTypeList, addRoleType, getRoleType, deleteRoleType, updateRoleType } from '@/api/system/roleType/index'
import { mapGetters } from 'vuex'
export default {
  name: 'GroupType',
  data() {
    return {
      form: {
        code: undefined,
        name: undefined,
        description: undefined
      },
      rules: {
        code: [
          {
            required: true,
            message: '请输入编码',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入类型名称',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'blur'
          }
        ],
        description: [
          {
            required: true,
            message: '请输入描述',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'blur'
          }
        ]
      },
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      roleType_btn_add: false,
      roleType_btn_delete: false,
      roleType_btn_edit: false,
      textMap: {
        update: '编辑',
        create: '创建'
      },
      tableKey: 0
    }
  },
  computed: {
    ...mapGetters(['elements'])
  },
  created() {
    this.getList()
    this.roleType_btn_add = this.elements['roleType_btn_add']
    this.roleType_btn_delete = this.elements['roleType_btn_delete']
    this.roleType_btn_edit = this.elements['roleType_btn_edit']
    // this.groupTypeManager_btn_edit = this.elements['groupTypeManager:btn_edit']
    // this.groupTypeManager_btn_del = this.elements['groupTypeManager:btn_del']
    // this.groupTypeManager_btn_add = this.elements['groupTypeManager:btn_add']
  },
  methods: {
    getList() {
      this.listLoading = true
      getRoleTypeList(this.listQuery).then(response => {
        this.addRowNum(response.data.rows)
        this.list = response.data.rows
        this.total = response.data.total
        this.listLoading = false
      })
    },
    addRowNum(data) {
      if (data && Array.isArray(data)) {
        data.forEach((el, index, arr) => {
          el.tRow = index + 1
        })
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
      getRoleType(row.id).then(response => {
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
        deleteRoleType(row.id).then(() => {
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
      this.$refs[formName].validate(valid => {
        if (valid) {
          addRoleType(this.form).then(() => {
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
    cancel(formName) {
      this.dialogFormVisible = false
      this.$refs[formName].resetFields()
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false
          this.form.password = undefined
          updateRoleType(this.form.id, this.form).then(() => {
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
    resetTemp() {
      this.form = {
        code: undefined,
        name: undefined,
        description: undefined
      }
    }
  }
}
</script>
