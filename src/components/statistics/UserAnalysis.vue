<template lang="pug">
  div
    el-row
      el-col( v-bind:span="8" )
        el-row
          el-col( v-bind:span="24" )
            el-card( shadow="hover" )
              el-row( type="flex" align="middle" v-bind:gutter="16" )
                el-col( v-bind:span="0.5" )
                  i( class="el-icon-s-flag" )
                el-col( v-bind:span="23.5" )
                  h4 User Transaction Ranking
              el-divider
              el-table( v-bind:data="transactionRank" )
                el-table-column(
                  type="index"
                )
                el-table-column(
                  prop="SSN"
                  label="SSN"
                )
                el-table-column(
                  prop="username"
                  label="Username"
                )
                el-table-column(
                  prop="value"
                  label="Value"
                )
        el-row
          el-col( v-bind:span="24" )
            el-card( shadow="hover" )
              el-row( type="flex" align="middle" v-bind:gutter="16" )
                el-col( v-bind:span="0.5" )
                  i( class="el-icon-chat-dot-round" )
                el-col( v-bind:span="23.5" )
                  h4 No Transaction Users
              el-divider
              el-table( v-bind:data="noTransactionUser" )
                el-table-column(
                  type="index"
                )
                el-table-column(
                  prop="SSN"
                  label="SSN"
                )
                el-table-column(
                  prop="username"
                  label="Username"
                )
                el-table-column(
                  prop="ownCard"
                  label="Own Card ?"
                )

      el-col( v-bind:span="16" )
</template>

<script>
import gql from 'graphql-tag'

export default {
  data: function () {
    return {
      users: [],
      transactionInfo: {}
    }
  },
  apollo: {
    users: {
      query: gql`
        query {
          users {
            SSN, username, sex, birthday, permission, createdAt, updatedAt,
            cards {
              cardNo, type { id, name }, assets, bonusPoint, createdAt, updatedAt
              transactions {
                id, userCard { cardNo }, targetCard { cardNo }, type { name }, value, createdAt, updatedAt
              }
            }
          }
        }
      `,
      update: function (data) {
        data = data.users
        return data
      }
    }
  },
  computed: {
    transactionRank: function () {
      const temp = this.users.map(user => {
        return {
          SSN: user.SSN,
          username: user.username,
          value: user.cards.reduce(
            (accumulator, card) => 
              accumulator + card.transactions.reduce(
                (accumulator, currentValue) => accumulator + currentValue.value, 0)
            , 0)
        }
      }).sort((a, b) => a.value < b.value ? 1 : ( b.value < a.value ? -1 : 0 )).slice(0, 10)
      return temp
    },
    noTransactionUser: function () {
      const temp = this.users.filter(user => {
        let flag = true
        for (let i = 0 ; i < user.cards.length ; ++i) {
          if (user.cards[i].transactions.length > 0) {
            flag = false
            break;
          }
        }
        console.log(flag, user)
        return flag
      }).map(user => {
        return {
          SSN: user.SSN,
          username: user.username,
          ownCard: user.cards.length > 0 ? 'true' : 'false'
        }
      })
      return temp
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
