<template lang="pug">
  div( class="vbs_user_detail_page_root" )
    el-row
      el-col( v-bind:span="24" )
        h2 User Detail Page - {{ $route.params.SSN }}
    el-row( type="flex" justify="start" align="middle" )
      el-col( v-bind:span="22" )
        el-breadcrumb( separator-class="el-icon-arrow-right" )
          el-breadcrumb-item( to="/" ) Homepage
          el-breadcrumb-item( to="/users" ) User
          el-breadcrumb-item( v-bind:to="`/users/${$route.params.SSN}`" ) {{ $route.params.SSN }}
      el-col( v-bind:span="2" )
        el-button( icon="el-icon-search" type="primary" v-on:click="fetchTransactionOperation" ) Fetch
    el-row
      el-col( v-bind:span="24" )
        el-divider
    el-row( type="flex" justify="start" align="start" v-bind:gutter="24" )
      el-col( v-bind:span="10" )
        el-row
          el-col( v-bind:span="24" )
            el-card( shadow="hover" )
              el-row( type="flex" align="middle" v-bind:gutter="16" )
                el-col( v-bind:span="0.5" )
                  i( class="el-icon-user-solid" )
                el-col( v-bind:span="19" )
                  h4 User Information
                el-col( v-bind:span="2" )
                  el-button( icon="el-icon-edit" type="primary" v-on:click="displayEditUserModal = true" ) Edit
                el-col( v-bind:span="1" )
              el-divider
              el-row( type="flex" justify="space-between" align="middle" v-bind:gutter="16" )
                el-tag Username
                label {{ userData.username }}
              el-row( type="flex" justify="space-between" align="middle" v-bind:gutter="16" )
                el-tag Sex
                label {{ userData.sex === 0 ? 'Male' : 'Female' }}
              el-row( type="flex" justify="space-between" align="middle" v-bind:gutter="16" )
                el-tag SSN
                label {{ userData.SSN }}
              el-row( type="flex" justify="space-between" align="middle" v-bind:gutter="16" )
                el-tag Birthday
                label {{ userData.birthday }}
              el-row( type="flex" justify="space-between" align="middle" v-bind:gutter="16" )
                el-tag Permission
                label {{ userData.permission === 0 ? 'General User' : (userData.permission === 1 ? 'Stuff' : 'Admin') }}
              el-row( type="flex" justify="space-between" align="middle" v-bind:gutter="16" )
                el-tag CreatedAt
                label {{ userData.createdAt }}
              el-row( type="flex" justify="space-between" align="middle" v-bind:gutter="16" )
                el-tag UpdatedAt
                label {{ userData.updatedAt }}
              el-divider
              el-row( type="flex" justify="space-between" align="middle" v-bind:gutter="16" )
                el-tag Total Transaction
                label {{ userData.transactionInfo.totalNumber }}
              el-row( type="flex" justify="space-between" align="middle" v-bind:gutter="16" )
                el-tag Total Transaction Value
                label {{ userData.transactionInfo.totalValue }}
              el-row( type="flex" justify="space-between" align="middle" v-bind:gutter="16" )
                el-tag Average Transaction Value
                label {{ (userData.transactionInfo.totalValue / userData.transactionInfo.totalNumber).toFixed(2) }}
        el-row
          el-col( v-bind:span="24" )
            el-card( shadow="hover" )
              el-row( type="flex" align="middle" v-bind:gutter="16" )
                el-col( v-bind:span="0.5" )
                  i( class="el-icon-bank-card" )
                el-col( v-bind:span="19" )
                  h4 Cards
                el-col( v-bind:span="4" )
                  el-button( icon="el-icon-plus" type="primary" v-on:click="displayNewCardModal = true" ) New Card
                el-col( v-bind:span="1" )
              el-divider
              el-row( type="flex" justify="space-between" align="middle" )
                el-col( v-bind:span="4" )
                  label Total: {{ userData.cards.length }}
                el-col( v-bind:span="8" )
                  label Total Assets: {{ userData.cards.reduce((accumulator, currentValue) => accumulator + currentValue.assets, 0) }}
              el-collapse( accordion )
                el-collapse-item(
                  v-for="(card, index) of userData.cards"
                  v-bind:key="`user-cards-${card.cardNo}-${index}`"
                )
                  el-container( slot="title" )
                    el-row( type="flex" align="middle" v-bind:gutter="16" )
                      el-col( v-bind:span="0.5" )
                        i( class="el-icon-bank-card" )
                      el-col( v-bind:span="19" )
                        h4 {{ card.cardNo }}
                      el-col( v-bind:span="5" )
                        label {{ card.type.name }}
                  el-row( type="flex" justify="start" align="middle" )
                    el-col( v-bind:span="4" )
                      el-tag Assets
                    el-col( v-bind:span="4" )
                      label {{ card.assets }}
                    el-col( v-bind:span="4" )
                      el-tag Bonus Point
                    el-col( v-bind:span="4" )
                      label {{ card.bonusPoint }}
                    el-col( v-bind:span="4" )
                      el-tag CreatedAt
                    el-col( v-bind:span="4" )
                      label {{ card.createdAt }}
      el-col( v-bind:span="14" )
        el-row( type="flex" align="middle" v-bind:gutter="16" )
          el-col( v-bind:span="0.5" )
            i( class="el-icon-money" )
          el-col( v-bind:span="23.5" )
            h4 Transaction Record
        el-row
          el-col( v-bind:span="24" )
            el-tabs( type="card" v-model="currentTransactionCard" )
              el-tab-pane(
                v-for="(card, index) of userData.cards"
                v-bind:key="`card-transaction-${card.cardNo}-${index}`"
                v-bind:label="card.cardNo"
                v-bind:name="card.cardNo"
              )
                el-row( type="flex" justify="end" align="middle" v-bind:gutter="16" )
                  el-col( v-bind:span="4" )
                    el-tag Total Transaction
                  el-col( v-bind:span="2" )
                    label {{ card.transactions.length }}
                  el-col( v-bind:span="5" )
                    el-tag Total Transaction Value
                  el-col( v-bind:span="3" )
                    label {{ card.transactions.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0) }}
                el-table( v-bind:data="card.transactions.slice((currentPage - 1) * 10, currentPage * 10)" )
                  el-table-column(
                    prop="id"
                    label="id"
                  )
                  el-table-column(
                    prop="userCard.cardNo"
                    label="userCard"
                  )
                  el-table-column(
                    prop="targetCard.cardNo"
                    label="targetCard"
                  )
                  el-table-column(
                    prop="type.name"
                    label="type"
                  )
                  el-table-column(
                    prop="value"
                    label="value"
                  )
                  el-table-column(
                    prop="createdAt"
                    label="createdAt"
                  )
                  el-table-column(
                    prop="updatedAt"
                    label="updatedAt"
                  )
                el-row( type="flex" justify="end" )
                  el-pagination(
                    layout="prev, pager, next"
                    v-bind:total="card.transactions.length"
                    v-on:current-change="pageChange"
                  )
    el-dialog(
      title="Edit User Infomation"
      v-bind:visible.sync="displayEditUserModal"
    )
      el-form
        el-form-item( label="Username" )
          el-input( v-model="editUserData.username" )
        el-form-item( label="Sex" )
          el-select( v-model.number="editUserData.sex" )
            el-option( v-bind:value="0" label="Male" ) Male
            el-option( v-bind:value="1" label="Female" ) Female
        el-form-item( label="SSN" )
          el-input( v-model="editUserData.SSN" )
        el-form-item( label="Birthday" )
          el-date-picker( v-model="editUserData.birthday" type="date" )
        el-form-item( label="Permission" )
          el-select( v-model.number="editUserData.permission" )
            el-option( v-bind:value="0" label="General User" ) General User
            el-option( v-bind:value="1" label="Stuff" ) Stuff
            el-option( v-bind:value="2" label="Admin" ) Admin
      span( slot="footer" )
        el-button( v-on:click="displayEditUserModal = false" ) Cancel
        el-button( v-on:click="editUserOperation" type="primary" )
          span( v-show="!loading" ) Submit
          span( v-show="loading" )
            i( class="el-icon-loading" )
    el-dialog(
      title="Edit User Infomation"
      v-bind:visible.sync="displayNewCardModal"
    )
      el-form
        el-form-item( label="CardNo" )
          el-input( v-model="newCard.cardNo" )
        el-form-item( label="Card Type" )
          el-select( v-model.number="newCard.type" )
            el-option(
              v-for="(iter, index) of cardTypes"
              v-bind:key="`card-type-${iter.name}-${index}`"
              v-bind:label="iter.name"
              v-bind:value="iter.id"
            ) {{ iter.name }}
        el-form-item( label="Bonus Point" )
          el-input( v-model.number="newCard.bonusPoint" type="number" )
        el-form-item( label="Assets" )
          el-input( v-model.number="newCard.assets" type="number" )
      span( slot="footer" )
        el-button( v-on:click="displayNewCardModal = false" ) Cancel
        el-button( v-on:click="newCardOperation" type="primary" )
          span( v-show="!loading" ) Submit
          span( v-show="loading" )
            i( class="el-icon-loading" )

</template>

<script>
import gql from 'graphql-tag'

export default {
  data: function () {
    return {
      loading: false,
      userData: {},
      editUserData: {
        username: '',
        sex: 0,
        SSN: '',
        birthday: '',
        permission: 0
      },
      newCard: {
        cardNo: '',
        type: 0,
        bonusPoint: 0,
        assets: 0
      },
      cardTypes: [],
      currentPage: 1,
      currentTransactionCard: '',
      displayEditUserModal: false,
      displayNewCardModal: false
    }
  },
  apollo: {
    userData: {
      query: gql`
        query ($SSN: String!) {
          user (SSN: $SSN) {
            SSN, sex, username, permission, birthday, createdAt, updatedAt
            cards {
              cardNo, type { id, name }, assets, bonusPoint, createdAt, updatedAt,
              transactions {
                id, userCard { cardNo }, targetCard { cardNo }, type { name }, value, createdAt, updatedAt
              }
            }
          }
        }
      `,
      variables: function () {
        return {
          SSN: this.$route.params.SSN
        }
      },
      update: function (data) {
        data = data.user
        // compute the data
        data.transactionInfo = {
          totalNumber: 0,
          totalValue: 0
        }
        data.cards.forEach(card => {
          card.transactions.forEach(transaction => {
            data.transactionInfo.totalNumber += 1
            data.transactionInfo.totalValue += transaction.value
          })
        })
        this.editUserData.username = data.username
        this.editUserData.sex = data.sex
        this.editUserData.birthday = data.birthday
        this.editUserData.permission = data.permission
        this.editUserData.SSN = data.SSN
        console.log(data)
        return data
      }
    },
    cardTypes: {
      query: gql`
        query {
          cardTypes {
            id, name, bonusRate, interestRate, createdAt, updatedAt
          }
        }
      `,
      update: function (data) {
        data = data.cardTypes
        return data
      }
    }
  },
  mounted: function () {
    console.log('test')
  },
  methods: {
    pageChange: function (pageNum) {
      this.currentPage = pageNum
    },
    editUserOperation: async function () {
      try {
        const updateExpression = gql`
          mutation {
            updateUsers (key: "${this.userData.SSN}", username: "${this.editUserData.username}", SSN: "${this.editUserData.SSN}", permission: ${this.editUserData.permission}, sex: ${this.editUserData.sex}, birthday: "${this.editUserData.birthday}") {
              SSN
            }
          }
        `
        await this.$apollo.mutate({
          mutation: updateExpression
        })
        this.$message.success('Success operation!')
        this.displayEditUserModal = false
        // update current userData
        this.userData = {
          ...this.userData,
          username: this.editUserData.username,
          sex: this.editUserData.sex,
          SSN: this.editUserData.SSN,
          birthday: this.editUserData.birthday,
          permission: this.editUserData.permission
        }
      } catch (error) {
        console.log(error)
        this.$message.error(error.message)
      }
    },
    newCardOperation: async function () {
      try {
        const insertExpression = gql`
          mutation {
            insertCards (cardNo: "${this.newCard.cardNo}", type: ${this.newCard.type}, bonusPoint: ${this.newCard.bonusPoint}, assets: ${this.newCard.assets}, owner: "${this.userData.SSN}") {
              cardNo
            }
          }
        `
        await this.$apollo.mutate({
          mutation: insertExpression
        })
        this.$message.success('Success operation!')
        this.displayNewCardModal = false
        // update current userData and erase newCard
        this.userData.cards.push({
          cardNo: this.newCard.cardNo,
          type: this.newCard.type,
          bonusPoint: this.newCard.bonusPoint,
          assets: this.newCard.assets,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          transactions: []
        })
        this.newCard = {
          ...this.newCard,
          cardNo: '',
          type: 0,
          bonusPoint: 0,
          assets: 0
        }
      } catch (error) {
        console.log(error)
        this.$message.error(error.message)
      }
    },
    fetchTransactionOperation: async function () {
      try {
        await this.$apollo.queries.userData.refetch()
      } catch (error) {
        console.log(error)
        this.$message.error(error.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .vbs_user_detail_page_root {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 24px 48px;
    box-sizing: border-box;
  }
</style>
