<template lang="pug">
  div( class="vbs_user_page_root" )
    el-row
      el-col( v-bind:span="24" )
        h2 User Page
    el-row
      el-col( v-bind:span="24" )
        el-breadcrumb( separator-class="el-icon-arrow-right" )
          el-breadcrumb-item( to="/" ) Homepage
          el-breadcrumb-item( to="/users" ) User
    el-row
      el-col( v-bind:span="24" )
        el-divider
    el-row
      el-col( v-bind:span="24" )
        el-row( type="flex" justify="space-between" align="middle" v-bind:gutter="24" )
          el-col( v-bind:span="2" )
            el-button( type="primary" icon="el-icon-plus" v-on:click="displayNewUserModal = true" ) New User
          el-col( v-bind:span="6" )
            el-input( v-model.lazy="querySSN" placeholder="Search SSN ..." )
        el-row
          el-col( v-bind:span="24" )
            el-table(
              v-bind:data="displayUsers"
              stripe
              row-class-name="vbs_clickable_rows"
            )
              el-table-column(
                prop="SSN"
                label="SSN"
              )
              el-table-column(
                prop="username"
                label="username"
              )
              el-table-column(
                prop="sex"
                label="sex"
              )
              el-table-column(
                prop="permission"
                label="permission"
              )
              el-table-column(
                prop="birthday"
                label="birthday"
              )
              el-table-column(
                prop="createdAt"
                label="updatedAt"
              )
              el-table-column(
                fixed="right"
                label=""
                width="120"
              )
                template( slot-scope="scope" )
                  el-button(
                    v-on:click.stop="rowClick(scope.row)"
                    type="text"
                    size="small"
                  ) Check
    el-dialog(
      title="New User"
      v-bind:visible.sync="displayNewUserModal"
    )
      el-form
        el-form-item( label="Username" )
          el-input( v-model="newUser.username" )
        el-form-item( label="Sex" )
          el-select( v-model.number="newUser.sex" )
            el-option( v-bind:value="0" label="Male" ) Male
            el-option( v-bind:value="1" label="Female" ) Female
        el-form-item( label="SSN" )
          el-input( v-model="newUser.SSN" )
        el-form-item( label="Birthday" )
          el-date-picker( v-model="newUser.birthday" type="date" )
        el-form-item( label="Permission" )
          el-select( v-model.number="newUser.permission" )
            el-option( v-bind:value="0" label="General User" ) General User
            el-option( v-bind:value="1" label="Stuff" ) Stuff
            el-option( v-bind:value="2" label="Admin" ) Admin
      span( slot="footer" )
        el-button( v-on:click="displayNewUserModal = false" ) Cancel
        el-button( v-on:click="newUserOperation" type="primary" )
          span( v-show="!loading" ) Submit
          span( v-show="loading" )
            i( class="el-icon-loading" )
</template>

<script>
import gql from 'graphql-tag'

export default {
  data: function () {
    return {
      querySSN: '',
      cards: [],
      users: [],
      displayUsers: [],
      displayNewUserModal: false,
      newUser: {
        usename: '',
        sex: 0,
        SSN: '',
        birthday: '',
        permission: 0
      }
    }
  },
  apollo: {
    users: {
      query: gql`
        query {
          users {
            SSN, sex, username, permission, birthday, createdAt, updatedAt
          }
        }
      `,
      update: function (data) {
        data = data.users
        this.displayUsers = data.slice()
        console.log(data)
        return data
      }
    }
  },
  created: function () {
    this.$watch('querySSN', function (newValue) {
      if (newValue.length === 0) {
        this.displayUsers = this.users.slice()
        return
      }
      this.displayUsers = this.users.filter(target => target.SSN.indexOf(newValue) > -1)
    })
  },
  methods: {
    rowClick: function (row) {
      this.$router.push(`/users/${row.SSN}`)
    },
    newUserOperation: async function () {
      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation ($username: String!, $password: String!, $sex: Int!, $birthday: String!, $SSN: String!, $permission: Int!) {
              insertUsers (username: $username, password: $password, sex: $sex, birthday: $birthday, SSN: $SSN, permission: $permission) {
                SSN
              }
            }
          `,
          variables: Object.assign({}, this.newUser, { password: '0000' })
        })
        // erase the newUser data
        this.newUser = Object.assign({}, {
          username: '',
          sex: 0,
          SSN: '',
          birthday: '',
          permission: 0
        })
        this.$message.success('Success operation!')
        this.displayNewUserModal = false
      } catch (error) {
        console.log(error)
        this.$message.error(error.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .vbs_user_page_root {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 24px 48px;
    box-sizing: border-box;
  }
</style>
