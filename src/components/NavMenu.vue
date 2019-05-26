<template lang="pug">
  el-row( class="tac" )
    el-col(
      class="tac"
      v-bind:span="24"
    )
      el-menu(
        v-bind:router="true"
        class="el-menu-vertical"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      )
        el-menu-item( index="/table" ) 
          template( slot="title" )
            i( class="el-icon-menu" )
            span All Table
        el-submenu( index="/submenu-table" )
          template( slot="title" )
            i( class="el-icon-document" )
            span Tables
          el-menu-item( index="/table/users" ) Users
          el-menu-item( index="/table/cards" ) Cards
          el-menu-item( index="/table/cardTypes" ) CardTypes
          el-menu-item( index="/table/transactions" ) Transactions
          el-menu-item( index="/table/transactionTypes" ) transactionTypes
          el-menu-item( index="/table/insurances" ) Insurances
          el-menu-item( index="/table/insuranceTypes" ) InsurancesTypes
          el-menu-item( index="/table/deposits" ) Deposits
          el-menu-item( index="/table/depositTypes" ) DepositTypes
          el-menu-item( index="/table/interestRates" ) InterestRates
        el-menu-item( index="/admin" )
          i( class="el-icon-location" )
          span( slot="title" ) Admin
        el-menu-item( index="/client" )
          i( class="el-icon-location" )
          span( slot="title" ) client

</template>

<script>
export default {
  mounted: function () {
    console.log(this.$route)
  }
}
</script>

<style lang="scss" scoped>
  .tac {
    height: 100%;
  }
  .el-menu-vertical {
    height: 100%;
  }
</style>
