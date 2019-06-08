<template lang="pug">
  div( class="vbs_deposit_page_root" )
    el-row
      el-col( v-bind:span="24" )
        h2 General Page
    el-row
      el-col( v-bind:span="24" )
        el-breadcrumb( separator-class="el-icon-arrow-right" )
          el-breadcrumb-item( to="/" ) Homepage
          el-breadcrumb-item( to="/general" ) General
    el-row  
      el-col( v-bind:span="24" )
        el-divider
    el-row  
      el-col( v-bind:span="24" )
        el-row( type="flex" justify="first" align="top" v-bind:gutter="24" )
          el-col( v-bind:span="16" )
            el-tabs( v-model="tab" v-on:tab-click="handleClick" )
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
                          el-input( v-model.number="amount" type="number" )
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
                      el-button( v-on:click="submitOperation" type="primary" )
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
                          el-input( v-model.number="amount" type="number" )
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
                      el-button( v-on:click="submitOperation" type="primary" )
                        span( v-show="!loading" ) Submit
                        span( v-show="loading" )
                          i( class="el-icon-loading" )
          el-col( v-bind:span="8" )
            el-row
              el-col( v-bind:span="24" )
                el-row( type="flex" align="middle" v-bind:gutter="16" )
                  el-col( v-bind:span="0.5" )
                    i( class="el-icon-bank-card" )
                  el-col( v-bind:span="23.5" )
                    h4 Search Card Data
              el-col( v-bind:span="24" )
                el-card( shadow="hover" )
                  div( slot="header" )
                    el-row( type="flex" justify="start" align="middle" v-bind:gutter="16")
                      el-col( v-bind:span="4" )
                        label CardNo
                      el-col( v-bind:span="16" )
                        el-input( v-model="queryCardNo" )
                      el-col( v-bind:span="4" )
                        el-button( type="primary" v-on:click="searchCard" ) Search
                  div( v-if="Object.keys(queryCardData).length" )
                    el-row( type="flex" justify="space-between" align="middle" )
                      el-tag CardNo
                      label {{ queryCardData.cardNo }}
                    el-row( type="flex" justify="space-between" align="middle" )
                      el-tag Owner
                      label {{ queryCardData.owner.SSN }}
                    el-row( type="flex" justify="space-between" align="middle" )
                      el-tag Assets
                      label {{ queryCardData.assets }}
                    el-row( type="flex" justify="space-between" align="middle" )
                      el-tag Type
                      label {{ queryCardData.type.name }}
                    el-row( type="flex" justify="space-between" align="middle" )
                      el-tag Bonus Point
                      label {{ queryCardData.bonusPoint }}
                    el-row( type="flex" justify="space-between" align="middle" )
                      el-tag Created At
                      label {{ queryCardData.createdAt }}
                    el-row( type="flex" justify="space-between" align="middle" )
                      el-tag Updated At
                      label {{ queryCardData.updatedAt }}
</template>

<script>
import gql from 'graphql-tag'

export default {
  data: function () {
    return {
      loading: false,
      tab: 'withdraw',
      cardNo: '',
      amount: 0,
      username: '',
      password: '',
      queryCardNo: '',
      queryCardData: {}
    }
  },
  methods: {
    handleClick: function () {
      this.cardNo = ''
      this.amount = 0
      this.username = ''
      this.password = ''
    },
    cardAuth: async function () {
      await this.$apollo.mutate({
        mutation: gql`
          mutation($cardNo: String!, $username: String!, $password: String!) {
            cardAuth(cardNo: $cardNo, username: $username, password: $password)
          }`,
        variables: {
          cardNo: this.cardNo,
          username: this.username,
          password: this.password
        }
      })
    },
    submitOperation: async function () {
      try {
        await this.cardAuth()
        await this.$apollo.mutate({
          mutation: gql`
            mutation($cardNo: String!, $value: Int!) {
              cardAssetsOperation(cardNo: $cardNo, value: $value) {
                cardNo, assets
              }
            }`,
          variables: {
            cardNo: this.cardNo,
            value: (this.tab === 'withdraw' ? this.amount * -1 : this.amount)
          }
        })
        this.$message.success('Success operation')
        // erase the data
        this.cardNo = ''
        this.amount = 0
        this.username = ''
        this.password = ''
      } catch (error) {
        console.log(error)
        this.$message.error(error.message)
      }
    },
    searchCard: async function () {
      try {
        const searchExpression = gql`
          query {
            card (cardNo: "${this.queryCardNo}") {
              cardNo, assets, bonusPoint, owner { SSN }, type { name } ,createdAt, updatedAt
            }
          }
        `
        console.log(searchExpression)
        const result = await this.$apollo.mutate({
          mutation: searchExpression
        })
        this.queryCardData = Object.assign({}, result.data.card)
        console.log(result.data)
        this.$message.success('Success operation!')
      } catch (error) {
        console.log(error)
        this.$message.error(error.message)
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
</style>
