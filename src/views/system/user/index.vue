<template>
  <div class="main-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" class="filter-item" placeholder="姓名或账户" prefix-icon="el-icon-search" size="small" style="width: 200px;" v-model="listQuery.name"></el-input>
      <el-button @click="handleFilter" class="filter-item" icon="search" size="small" type="primary" v-waves>搜索</el-button>
      <el-button @click="handleCreate" class="filter-item" icon="edit" size="small" style="margin-left: 10px;" type="primary" v-if="userBtnAdd">添加</el-button>
    </div>
    <el-table :data="list" :key="tableKey" :row-class-name="rowStyle" border class="user-table" style="width:100%" v-loading.body="listLoading">
      <el-table-column align="center" header-align="center" label="序号" width="50px">
        <template slot-scope="scope">
          <span>{{scope.row.tRow}}</span>
        </template>
      </el-table-column>
      <el-table-column align="left" header-align="center" label="姓名" min-width="120px">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="left" header-align="center" label="账户" min-width="120px">
        <template slot-scope="scope">
          <span>{{scope.row.username}}</span>
        </template>
      </el-table-column>
      <el-table-column align="left" header-align="center" label="组织架构">
        <template slot-scope="scope">
          <el-tag :key="index" :type="item.obj.style" class="tag" v-for="(item,index) in scope.row.deptFullPaths">{{item.path}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="left" header-align="center" label="岗位">
        <template slot-scope="scope">
          <el-tag :key="index" :type="item.obj.style" class="tag" v-for="(item,index) in scope.row.postFullPaths">{{item.path}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="状态" width="75px">
        <template slot-scope="scope" v-if="scope.row.id!==null&&scope.row.status">
          <el-tag :type="getTagStyle(scope.row.status)" class="tag">{{getStatusText(scope.row.status)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="性别" width="50px">
        <template slot-scope="scope">
          <span>{{scope.row.sex}}</span>
        </template>
      </el-table-column>
      <el-table-column align="left" header-align="center" label="手机">
        <template slot-scope="scope">
          <span>{{scope.row.mobilePhone}}</span>
        </template>
      </el-table-column>
      <el-table-column align="left" header-align="center" label="备注">
        <template slot-scope="scope">
          <span>{{scope.row.description}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" min-width="150px" v-if="userBtnUpdate||userBtnDel">
        <template slot-scope="scope" v-if="scope.row.id!==null">
          <el-button @click="handleUpdate(scope.row)" size="mini" type="success" v-if="userBtnUpdate">编辑</el-button>
          <el-button @click="handleDelete(scope.row)" size="mini" type="danger" v-if="userBtnDel">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container" v-show="!listLoading">
      <el-pagination :current-page.sync="listQuery.page" :page-size="listQuery.limit" :page-sizes="[10,20,30]" :total="total" @current-change="handleCurrentChange" @size-change="handleSizeChange" layout="total, prev, pager, next,sizes"></el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" label-width="100px" ref="form">
        <el-form-item label="账户" prop="username">
          <el-input placeholder="请输入账户" v-if="dialogStatus == 'create'" v-model="form.username"></el-input>
          <el-input :disabled="true" placeholder="请输入账户" readonly v-else v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" placeholder="请输入密码" prop="password" v-if="dialogStatus == 'create'">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select class="filter-item" placeholder="请选择" v-model="form.sex">
            <el-option :key="index" :label="item" :value="item" v-for="(item,index) in sexOptions"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select class="filter-item" placeholder="请选择" v-model="form.status">
            <el-option :key="index" :label="item.label" :value="item.value" v-for="(item,index) in statusOptions"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机">
          <el-input placeholder="请输入手机号码" v-model="form.mobilePhone"></el-input>
        </el-form-item>
        <el-form-item label="组织部门">
          <el-tag :key="index" :type="item.obj.style" @close="deleteDept(item.obj)" class="tag" closable v-for="(item,index) in form.deptFullPaths">{{item.path}}</el-tag>
          <span>
            <el-button @click="selectOrg(form.depts)" circle size="mini" type="primary">
              <svg-icon class="org" icon-class="organization"/>
            </el-button>
            <Organiztion :selected="form.deptIds" :show="organiztionVisiable" @close="closeOrg" @on-select="selectedOrg"/>
          </span>
        </el-form-item>
        <el-form-item label="岗位">
          <el-tag :key="index" :type="item.obj.style" @close="deletePost(item.obj)" class="tag" closable v-for="(item,index) in form.postFullPaths">{{item.path}}</el-tag>
          <span>
            <el-button @click="selectPost(form.posts)" circle size="mini" type="primary">
              <svg-icon class="org" icon-class="usercard"/>
            </el-button>
            <post :selected="form.postIds" :show="postVisiable" @close="closePost" @on-select="selectedPost"/>
          </span>
        </el-form-item>
        <el-form-item label="描述">
          <el-input :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入内容" type="textarea" v-model="form.description"></el-input>
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
import { getUserList, addUser, getUser, deleteUser, updateUser } from '@/api/system/user'
import { getDeptTree, getPostTree } from '@/api/common'
import { mapGetters } from 'vuex'
import { isvalidUsername } from '@/utils/validate'
import Organiztion from '@/components/Organization'
import Post from '@/components/Post'
export default {
  name: 'User',
  components: {
    Organiztion,
    Post
  },
  data() {
    return {
      form: {
        username: null,
        name: null,
        sex: '男',
        password: null,
        status: null,
        description: null
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入用户',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ],
        username: [
          {
            required: true,
            message: '请输入账户',
            trigger: 'blur'
          },
          {
            min: 4,
            max: 16,
            message: '长度4-16，数字或大小写字母',
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (!isvalidUsername(value)) {
                callback(new Error('长度4-16，数字或大小写字母'))
              } else {
                callback()
              }
            }
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 20,
            message: '长度在 5 到 20 个字符',
            trigger: 'blur'
          }
        ]
      },
      dept: null,
      post: null,
      tagStyles: ['', 'success', 'info', 'warning', 'danger'],
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        name: undefined
      },
      sexOptions: ['男', '女'],
      statusOptions: [{ label: '在岗', value: 1 }, { label: '离职', value: 2 }, { label: '兼职', value: 3 }],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      tableKey: 0,
      emptyData: {
        id: null,
        username: null,
        password: null,
        name: null,
        birthday: null,
        mobilePhone: null,
        status: null,
        email: null,
        sex: null,
        description: null,
        updTime: null,
        updUser: null,
        updName: null,
        updHost: null,
        depts: null,
        posts: null
      },
      organiztionVisiable: false,
      postVisiable: false,
      // 菜单权限
      userBtnAdd: false,
      userBtnUpdate: false,
      userBtnDel: false
    }
  },
  computed: {
    ...mapGetters(['elements'])
  },
  mounted() {
    this.getDeptsAndPosts(this.getList)
    this.getList()
    // 初始化权限
    this.userBtnUpdate = this.elements['user_btn_update']
    this.userBtnDel = this.elements['user_btn_delete']
    this.userBtnAdd = this.elements['user_btn_add']
  },
  methods: {
    getList() {
      this.listLoading = true
      getUserList(this.listQuery)
        .then(response => {
          this.dealDeptAndPost(response.data.rows)
          this.addRowNum(response.data.rows)
          this.list = response.data.rows
          this.total = response.data.total
          this.listLoading = false
          this.fillEmptyRow()
        })
        .catch(e => {})
    },
    addRowNum(data) {
      if (data && Array.isArray(data)) {
        data.forEach((el, index, arr) => {
          el.tRow = index + 1
        })
      }
    },
    fillEmptyRow() {
      const emptyRowCount = this.listQuery.limit - this.list.length
      for (let i = 0; i < emptyRowCount; i++) {
        this.list.push(this.emptyData)
      }
    },
    // 处理部门与岗位的数据结构 修改成fullpath
    dealDeptAndPost(people) {
      if (people && Array.isArray(people)) {
        people.forEach((person, index, array) => {
          if (this.dept && Array.isArray(this.dept) && person.depts && Array.isArray(person.depts)) {
            person.deptFullPaths = []
            for (let m in person.depts) {
              let tempPath = null
              for (let i in this.dept) {
                tempPath = this.dealDeptAndPostTree(this.dept[i], person.depts[m].id)
                if (tempPath) {
                  break
                }
              }
              if (tempPath) {
                if (person.depts[m].style === undefined) {
                  person.depts[m].style = this.tagStyles[Math.floor(Math.random() * 5)]
                }
                person.deptFullPaths.push({ obj: person.depts[m], path: tempPath })
              }
            }
          }
          if (this.post && Array.isArray(this.post) && person.posts && Array.isArray(person.posts)) {
            person.postFullPaths = []
            for (let m in person.posts) {
              let tempPath = null
              for (let i in this.post) {
                tempPath = this.dealDeptAndPostTree(this.post[i], person.posts[m].id)
                if (tempPath) {
                  break
                }
              }
              if (tempPath) {
                if (person.posts[m].style === undefined) {
                  person.posts[m].style = this.tagStyles[Math.floor(Math.random() * 5)]
                }
                person.postFullPaths.push({ obj: person.posts[m], path: tempPath })
              }
            }
          }
        })
      }
    },
    dealDeptAndPostTree(data, id) {
      const tagPath = data.name
      if (data && data.id === id) {
        return tagPath
      } else if (data && data.children && Array.isArray(data.children)) {
        for (let i in data.children) {
          const tempPath = this.dealDeptAndPostTree(data.children[i], id)
          if (tempPath) {
            return tagPath + '/' + tempPath
          }
        }
      }
      return null
    },
    getParentNode(data, id) {},
    rowStyle(e) {
      if (e.rowIndex % 2 === 1) {
        return 'el-row-skiprow'
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
      getUser(row.id).then(response => {
        this.dealDeptAndPost([response.data])
        response.data.deptIds = response.data.depts.map((el, index, arr) => {
          return el.id
        })
        response.data.postIds = response.data.posts.map((el, index, arr) => {
          return el.id
        })
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
        deleteUser(row.id).then(() => {
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
      set[formName].validate(valid => {
        if (valid) {
          addUser(this.form).then(() => {
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
          this.form.password = undefined
          updateUser(this.form.id, this.form).then(() => {
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
        username: undefined,
        name: undefined,
        sex: '男',
        password: undefined,
        description: undefined,
        deptIds: [],
        postIds: []
      }
    },
    getTagStyle(index) {
      return this.tagStyles[index % 5]
    },
    getStatusText(index) {
      if (index === null || index === undefined) {
        return ''
      } else {
        switch (index) {
          case 1:
            return '在岗'
          case 2:
            return '离职'
          case 3:
            return '兼职'
          default:
            return ''
        }
      }
    },
    getDeptsAndPosts(callback) {
      getDeptTree()
        .then(res => {
          this.dept = res.data
          getPostTree()
            .then(m => {
              this.post = m.data
              if (typeof callback && callback) {
                callback()
              }
            })
            .catch(n => {
              if (typeof callback && callback) {
                callback()
              }
            })
        })
        .catch(e => {
          if (typeof callback && callback) {
            callback()
          }
        })
    },
    selectOrg(slected) {
      this.organiztionVisiable = true
    },
    closeOrg() {
      this.organiztionVisiable = false
    },
    selectedOrg(data) {
      this.form.depts = data.objs
      this.dealDeptAndPost([this.form])
      this.form.deptIds = this.form.depts.map((el, index, arr) => {
        return el.id
      })
    },
    selectPost(slected) {
      this.postVisiable = true
    },
    closePost() {
      this.postVisiable = false
    },
    selectedPost(data) {
      this.form.posts = data.objs
      this.dealDeptAndPost([this.form])
      this.form.postIds = this.form.posts.map((el, index, arr) => {
        return el.id
      })
    },
    deleteDept(data) {
      this.form.depts = this.form.depts.filter((el, i, arr) => {
        return el.id !== data.id
      })
      this.dealDeptAndPost([this.form])
      this.form.deptIds = this.form.depts.map((el, i, arr) => {
        return el.id
      })
    },
    deletePost(data) {
      this.form.posts = this.form.posts.filter((el, i, arr) => {
        return el.id !== data.id
      })
      this.dealDeptAndPost([this.form])
      this.form.postIds = this.form.posts.map((el, i, arr) => {
        return el.id
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.main-container {
  .user-table {
    margin-top: 1rem;
  }
  .tag {
    margin-left: 5px;
  }
  .org {
    cursor: pointer;
  }
}
</style>

