<template lang="pug">
  el-row( class="vbs_tac" )
    el-col(
      class="vbs_tac"
      v-bind:span="24"
    )
      el-menu(
        v-bind:router="true"
        class="vbs_menu_vertical"
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

</template>

<script>
export default {
  mounted: function () {
    console.log(this.$route)
  }
}
</script>

<style lang="scss" scoped>
  .vbs_tac {
    height: 100%;
  }
  .vbs_menu_vertical {
    height: 100%;
  }
</style>
