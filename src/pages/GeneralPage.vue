<template lang="pug">
  el-container( class="vbs_deposit_page_root" )
    el-row
      el-col( v-bind:span="24" )
        h2 General Page
      el-col( v-bind:span="24" )
        el-breadcrumb( separator-class="el-icon-arrow-right" )
          el-breadcrumb-item( to="/" ) Homepage
          el-breadcrumb-item( to="/general" ) General
      el-col( v-bind:span="24" )
        el-divider
      el-col( v-bind:span="24" )
        el-row( type="flex" justify="first" align="top" v-bind:gutter="24" )
          el-col( v-bind:span="16" )
            el-tabs( value="withdraw" )
              el-tab-pane( label="Withdraw" name="withdraw" )
                el-card( shadow="hover" )
                  el-container( slot="header" )
                    el-row
                      el-col( v-bind:span="24" )
                        el-row( type="flex" align="middle" v-bind:gutter="16" )
                          el-col( v-bind:span="0.5" )
                            i( class="el-icon-s-promotion" )
                          el-col( v-bind:span="23.5" )
                            h4 Withdraw Form
                      el-col( v-bind:span="24" )
                        el-alert(
                          title="Description:"
                          type="info"
                          description="You can withdraw for the user in this page by fill out the form below."
                          show-icon
                          v-bind:closable="false"
                        )
                  el-form
                    el-form-item
                      el-row( type="flex" justify="start" align="middle" )
                        el-col( v-bind:span="2" )
                          label CardNo
                        el-col( v-bind:span="22" )
                          el-input( v-model="cardNo" )
                    el-form-item
                      el-row( type="flex" justify="start" align="middle" )
                        el-col( v-bind:span="2" )
                          label Value
                        el-col( v-bind:span="22" )
                          el-input( v-model="amount" type="number" )
                    el-form-item
                      el-row( type="flex" justify="start" align="middle" )
                        el-col( v-bind:span="2" )
                          label Username
                        el-col( v-bind:span="22" )
                          el-input( v-model="username" )
                    el-form-item
                      el-row( type="flex" justify="start" align="middle" )
                        el-col( v-bind:span="2" )
                          label Password
                        el-col( v-bind:span="22" )
                          el-input( v-model="password" type="password" )
                    el-form-item
                      el-button( v-on:click="depositOperation" type="primary" )
                        span( v-show="!loading" ) Submit
                        span( v-show="loading" )
                          i( class="el-icon-loading" )
              el-tab-pane( label="Deposit" name="deposit" )
                el-card( shadow="hover" )
                  el-container( slot="header" )
                    el-row
                      el-col( v-bind:span="24" )
                        el-row( type="flex" align="middle" v-bind:gutter="16" )
                          el-col( v-bind:span="0.5" )
                            i( class="el-icon-s-promotion" )
                          el-col( v-bind:span="23.5" )
                            h4 Deposit Form
                      el-col( v-bind:span="24" )
                        el-alert(
                          title="Description:"
                          type="info"
                          description="You can deposit for the user in this page by fill out the form below."
                          show-icon
                          v-bind:closable="false"
                        )
                  el-form
                    el-form-item
                      el-row( type="flex" justify="start" align="middle" )
                        el-col( v-bind:span="2" )
                          label CardNo
                        el-col( v-bind:span="22" )
                          el-input( v-model="cardNo" )
                    el-form-item
                      el-row( type="flex" justify="start" align="middle" )
                        el-col( v-bind:span="2" )
                          label Value
                        el-col( v-bind:span="22" )
                          el-input( v-model="amount" type="number" )
                    el-form-item
                      el-row( type="flex" justify="start" align="middle" )
                        el-col( v-bind:span="2" )
                          label Username
                        el-col( v-bind:span="22" )
                          el-input( v-model="username" )
                    el-form-item
                      el-row( type="flex" justify="start" align="middle" )
                        el-col( v-bind:span="2" )
                          label Password
                        el-col( v-bind:span="22" )
                          el-input( v-model="password" type="password" )
                    el-form-item
                      el-button( v-on:click="depositOperation" type="primary" )
                        span( v-show="!loading" ) Submit
                        span( v-show="loading" )
                          i( class="el-icon-loading" )
          el-col( v-bind:span="8" )
            el-row
              el-col( v-bind:span="24" )
                el-row( type="flex" align="middle" v-bind:gutter="16" )
                  el-col( v-bind:span="0.5" )
                    i( class="el-icon-coin" )
                  el-col( v-bind:span="23.5" )
                    h4 Deposit Record
              el-col( v-bind:span="24" )
                el-table
                  el-table-column( prop="cardNo" label="CardNo" width="300" )
                  el-table-column( prop="value" label="Amount" )
</template>

<script>
export default {
  data: function () {
    return {
      loading: false,
      cardNo: '',
      amount: 0,
      username: '',
      password: ''
    }
  },
  methods: {
    depositOperation: async function () {
      try {
        console.log('test')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .vbs_deposit_page_root {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 24px 48px;
    box-sizing: border-box;
  }
  .el-row {
    width: 100%;
    margin-bottom: 12px;
  }
</style>
