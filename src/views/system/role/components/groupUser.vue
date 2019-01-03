<template>
  <el-dialog :title="title" :visible.sync="visible">
    <el-form label-width="80px">
      <el-form-item label="姓名">
        <el-select :loading="loading" :remote-method="remoteMemberMethod" filterable clearable placeholder="请输入关键词" remote v-model="userid">
          <el-option :key="item.id" :label="item.name" :value="item.id" v-for="item in mItems">
            <span class="common-font-color-success" style="float: left">{{ item.name }}</span>
            <span style="float: right">{{ item.username }}</span>
          </el-option>
        </el-select>
        <el-checkbox v-model="isLeader">领导</el-checkbox>
      </el-form-item>
    </el-form>
    <span class="dialog-footer" slot="footer">
      <el-button :disabled="!btnEnable" @click="onSubmit" type="primary" v-if="groupManager_btn_userManager">增加</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getUserList } from '@/api/system/user/index'
import { addUserInRole } from '@/api/system/role/index'
import { mapGetters } from 'vuex'
export default {
  props: {
    groupId: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      mItems: [],
      visible: false,
      userid: null,
      isLeader: false,
      addSuccess: false,
      loading: false,
      groupManager_btn_userManager: true
    }
  },
  computed: {
    btnEnable: function() {
      if (!this.userid || this.userid === '') {
        return false
      } else {
        return true
      }
    },
    ...mapGetters(['elements'])
  },
  watch: {
    dialogVisible(val) {
      this.visible = val
      if (val) {
        this.addSuccess = false
        this.isLeader = false
        this.userid = null
      }
    },
    visible(val) {
      if (!val) {
        this.$emit('closeUserDialog', val)
      }
    }
  },
  created() {
    // this.groupManager_btn_userManager = this.elements['groupManager:btn_userManager']
  },
  methods: {
    remoteMemberMethod(query) {
      if (query !== '') {
        this.loading = true
        getUserList({
          name: query
        }).then(response => {
          this.mItems = response.data.rows
          this.loading = false
        })
      } else {
        this.loading = false
        this.mItems = []
      }
    },
    onSubmit() {
      if (!this.userid || this.userid === '') {
        return
      }
      addUserInRole(this.groupId, this.userid, this.isLeader).then(() => {
        this.addSuccess = true
        this.$notify({
          title: '成功',
          message: '保存成功',
          type: 'success',
          duration: 2000
        })
        this.visible = false
      })
    }
  }
}
</script>
