<template lang="pug">
  el-scrollbar( wrapClass="vbs_scrollbar_wrap_container" viewClass="vbs_aside_scrollbar_view_container" )
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
          el-menu-item( index="/general" )
            template( slot="title" )
              i( class="el-icon-money" )
              span General
          el-menu-item( index="/users" )
            template( slot="title" )
              i( class="el-icon-user-solid" )
              span User
          el-submenu( index="/submenu-insurance" )
            template( slot="title" )
              i( class="el-icon-notebook-2" )
              span Insurance
            el-menu-item( index="/insurance/apply" ) Apply
            el-menu-item( index="/insurance/check" ) Check
          el-menu-item( index="/statistics" )
            template( slot="title" )
              i( class="el-icon-data-analysis" )
              span Statistics
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
            el-menu-item( index="/table/transactionTypes" ) TransactionTypes
            el-menu-item( index="/table/insurances" ) Insurances
            el-menu-item( index="/table/insuranceTypes" ) InsurancesTypes
            el-menu-item( index="/table/insurancePayments" ) InsurancesPayments
            el-menu-item( index="/table/deposits" ) Deposits
            el-menu-item( index="/table/depositTypes" ) DepositTypes
            el-menu-item( index="/table/depositPayments" ) DepositPayments
            el-menu-item( index="/table/costs" ) Costs

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
    width: 256px;
    height: calc(100vh - 60px);
  }
  .vbs_menu_vertical {
    width: 256px;
    height: calc(100vh - 60px);
  }
  .vbs_aside_scrollbar_view_container {
    width: 256px !important;
  }
</style>
