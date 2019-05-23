<template lang="pug">
  el-container( class="vbs_table_type_page_root" )
    el-row
      el-col( v-bind:span="24" )
        h2 {{ $route.params.type.toUpperCase() }} Table
      el-col( v-bind:span="24" )
        el-breadcrumb( separator-class="el-icon-arrow-right" )
          el-breadcrumb-item( to="/" ) Homepage
          el-breadcrumb-item( to="/table" ) Table
          el-breadcrumb-item( v-bind:to="`/table/${$route.params.type}`" ) {{ $route.params.type.toUpperCase() }}
      el-col( v-bind:span="24" )
        el-divider
      el-col( v-bind:span="24" )
        el-row( type="flex" align="middle" v-bind:gutter="16" )
          el-col( v-bind:span="0.5" )
            i( class="el-icon-s-promotion" )
          el-col( v-bind:span="23.5" )
            h4 Query Section
        el-row 
          el-col( v-bind:span="24" )
            el-alert(
              title="Description:"
              type="info"
              description="You can input the formal SQL expression to query the database in your need."
            )
        el-row
          el-col( v-bind:span="24" )
            el-input(
              placeholder="Please input formal SQL expression here ..."
              v-model="targetCode"
              v-bind:clearable="true"
            )
              el-button(
                slot="append"
                icon="el-icon-search"
              )
      el-col( v-bind:span="24" )
        el-divider
      el-col( v-bind:span="24" )
        el-row( type="flex" align="middle" )
          el-col( v-bind:span="22" )
            el-row( type="flex" align="middle" v-bind:gutter="16" )
              el-col( v-bind:span="0.5" )
                i( class="el-icon-receiving" )
              el-col( v-bind:span="23.5" )
                h4 Result Section
          el-col( v-bind:span="2" )
            el-button(
              type="primary"
              icon="el-icon-plus"
            ) Add row
        el-row
          el-col( v-bind:span="24" )
            el-alert(
              title="Description:"
              type="info"
              description="The query result will display in here. Also, you can add some data to the database with table operation."
            )
        el-row
          el-col( v-bind:span="24" )
            el-table( v-bind:data="tableData" )
              el-table-column(
                v-for="(iter, index) of tableColumns[$route.params.type]"
                v-bind:key="`vbs_${$route.params.type}_table_${iter}`"
                v-bind:prop="iter"
                v-bind:label="iter"
              )
              el-table-column(
                fixed="right"
                label="Operation"
                width="120"
              )
                template( slot-scope="scope" )
                  el-button(
                    type="text"
                    size="small"
                    icon="el-icon-delete"
                  ) Delete
                  el-button(
                    type="text"
                    size="small"
                    icon="el-icon-edit"
                  ) Edit
</template>

<script>
import gql from 'graphql-tag'

export default {
  data: function () {
    return {
      targetCode: '',
      tableColumns: {
        users: [ 'username', 'authCode', 'SSN', 'assets', 'permission', 'createdAt', 'updatedAt' ],
        cards: [ 'cardNo', 'csc', 'type', 'assets', 'owner', 'createdAt', 'updatedAt' ],
        cardTypes: [ 'id', 'name', 'createdAt', 'updatedAt' ],
        transactions: [ 'id', 'user', 'target', 'type', 'value', 'createdAt', 'updatedAt' ],
        transactionTypes: [ 'id', 'name', 'createdAt', 'updatedAt' ],
        insurances: [ 'id', 'user', 'type', 'term', 'paid', 'createdAt', 'updatedAt' ],
        insuranceTypes: [ 'id', 'name', 'createdAt', 'updatedAt' ],
        deposits: [ 'id', 'user', 'type', 'term', 'paid', 'createdAt', 'updatedAt' ],
        depositTypes: [ 'id', 'name', 'createdAt', 'updatedAt' ],
        interestRates: [ 'id', 'name', 'value', 'createdAt', 'updatedAt' ]
      },
      tableData: []
    }
  },
  apollo: {
    tableData: {
      query: function () {
        console.log(this.tableColumns[this.$route.params.type].join(',', ))
        return gql`query {
          ${this.$route.params.type} {
            ${this.tableColumns[this.$route.params.type].join(',', )}
          }
        }`
      },
      update: function (data) {
        console.log(data[this.$route.params.type])
        return data[this.$route.params.type]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .vbs_table_type_page_root {
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
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>
