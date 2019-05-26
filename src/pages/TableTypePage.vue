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
              v-bind:description="`You can input the formal SQL expression to query the database in your need. But you are ONLY allowed to query within ${$route.params.type.toUpperCase()} table!!`"
            )
        el-row
          el-col( v-bind:span="24" )
            el-input(
              placeholder="Please input formal SQL expression here ..."
              v-model="querySentence"
              v-bind:clearable="true"
            )
              el-button(
                slot="append"
                icon="el-icon-search"
                v-on:click="rawQuery"
              )
      el-col( v-bind:span="24" )
        el-divider
      el-col( v-bind:span="24" )
        el-row( type="flex" align="middle" )
          el-col( v-bind:span="20" )
            el-row( type="flex" align="middle" v-bind:gutter="16" )
              el-col( v-bind:span="0.5" )
                i( class="el-icon-receiving" )
              el-col( v-bind:span="23.5" )
                h4 Result Section
          el-col( v-bind:span="2" )
            el-button(
              type="primary"
              icon="el-icon-search"
              v-on:click=""
            ) Fetch
          el-col( v-bind:span="2" )
            el-button(
              type="primary"
              icon="el-icon-plus"
              v-on:click="showAddModal = true"
            ) Add record
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
                v-for="(iter, index) of displayTableColumns[$route.params.type]"
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
                    v-on:click="deleteOperation(scope.$index)"
                  ) Delete
                  el-button(
                    type="text"
                    size="small"
                    icon="el-icon-edit"
                  ) Edit
    el-dialog(
      v-bind:title="`Add new record to ${$route.params.type.toUpperCase()} table`"
      v-bind:visible.sync="showAddModal"
    )
      el-form
        el-form-item(
          v-for="(iter, index) of formColumns"
          v-bind:key="`${$route.params.type}-table-form-${index}`"
          v-bind:label="iter.name"
        )
          el-input(v-if="iter.type === 'input'")
          el-select(v-if="iter.type === 'select'")
            el-option(
              v-for="(target, idx) of iter.options"
              v-bind:key="`${$route.params.type}-table-form-select-option${idx}`"
              v-bind:label="target"
              v-bind:value="iter.values[idx]"
            )
      span( slot="footer" )
        el-button( v-on:click="showAddModal = false" ) Cancel
        el-button( v-on:click="showAddModal = false" type="primary" ) Submit
</template>

<script>
import gql from 'graphql-tag'

export default {
  data: function () {
    return {
      showAddModal: false,
      querySentence: '',
      displayTableColumns: {
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
        return this.fetchExpression
      },
      update: function (data) {
        console.log(data[this.$route.params.type])
        return data[this.$route.params.type]
      }
    }
  },
  computed: {
    tableName: function () {
      return this.$route.params.type[0].toUpperCase() + this.$route.params.type.substr(1)
    },
    tablePK: function () {
      switch (this.$route.params.type) {
        case 'users':
          return 'username'
        case 'cards':
          return 'cardNo'
        case 'cardTypes':
          return 'id'
        case 'transactions':
          return 'id'
        case 'transactionTypes':
          return 'id'
        case 'insurances':
          return 'id'
        case 'insuranceTypes':
          return 'id'
        case 'deposits':
          return 'id'
        case 'depositTypes':
          return 'id'
        case 'interestRates':
          return 'id'
      }
      return null
    },
    formColumns: function () {
      switch (this.$route.params.type) {
        case 'users':
          return [
            { name: 'useranme', type: 'input' },
            { name: 'authCode', type: 'input' },
            { name: 'SSN', type: 'input' },
            { name: 'assets', type: 'input' },
            { name: 'permission', type: 'select', options: ['Admin', 'General'], values: [0, 1] }
          ]
        case 'cards':
          return [
            { name: 'cardNo', type: 'input' },
            { name: 'csc', type: 'input' },
            { name: 'type', type: 'select', options: ['晶片金融卡', 'VISA 金融卡'], values: [1, 2] },
            { name: 'assets', type: 'input' },
            { name: 'owner', type: 'input' }
          ]
        case 'cardTypes':
          return [
            { name: 'name', type: 'input' }
          ]
        case 'transactionTypes':
          return [
            { name: 'name', type: 'input' }
          ]
        case 'insurances':
          return [
            { name: 'user', type: 'input' },
            { name: 'type', type: 'select', options: [], values: [] },
            { name: 'term', type: 'input' }
          ]
        case 'insuranceTypes':
          return [
            { name: 'name', type: 'input' }
          ]
        case 'deposits':
          return [
            { name: 'user', type: 'input' },
            { name: 'type', type: 'select', options: [], values: [] },
            { name: 'term', type: 'input' }
          ]
        case 'depositTypes':
          return [
            { name: 'name', type: 'input' }
          ]
        case 'interestRates':
          return [
            { name: 'name', type: 'input' },
            { name: 'value', type: 'input' }
          ]
      }
      return []
    },
    fetchExpression: function () {
      return gql`query {
        ${this.$route.params.type} {
          ${this.tableColumns[this.$route.params.type].join(',', )}
        }
      }`
    },
    deleteExpression: function () {
      return gql`mutation ($targetKeys: [String!]!) {
        delete${this.tableName} (keys: $targetKeys) {
          ${this.tablePK}
        }
      }`
    }
  },
  methods: {
    rawQuery: async function () {
      // prevent from illegal query
      const regx = /(?<=from|join|FROM|JOIN)\s+(\w+)/g
      const queryTableName = this.querySentence.match(regx).map(target => target.replace(' ', ''))
      console.log(queryTableName)
      if (queryTableName.length > 1 || !queryTableName.includes(this.$route.params.type)) {
        this.$message.error(`You are allowd to query with ${this.tableName} table ONLY!!`)
        return
      }
      if (!this.querySentence) {
        return
      }
      try {
        const result = await fetch('http://localhost:3000/raw-sql', {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify({
            sentence: this.querySentence
          })
        })
        if (result.status !== 200) {
          throw result
        }
        // if the operation is select operation
        if (this.querySentence.toLowerCase().indexOf('select') > -1) {
          this.tableData = await result.json()
          const selectedColumns = Object.keys(this.tableData[0])
          this.displayTableColumns[this.$route.params.type] = selectedColumns
        }
        this.$message.success('Successful operation!!')
      } catch (error) {
        const msg = await error.text()
        this.$message.error(msg)
        console.log(msg)
      }
    },
    deleteOperation: async function (index) {
      // get the record primary key
      const primaryKey = this.tableData[index][this.tablePK]
      // confirm the operation
      try {
        await this.$confirm(`Are you sure you want to delete primary key ${primaryKey} record?`, 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
      } catch (error) {
        return
      }
      try {
        await this.$apollo.mutate({
          mutation: this.deleteExpression,
          variables: {
            targetKeys: [primaryKey]
          },
          update: function (store) {
            // get the data from query
            const data = store.readQuery({
              query: this.fetchExpression
            })[this.$route.params.type]
            // find the index of the data in apollo cache
            const index = data.findIndex(target => target[this.tablePK] === primaryKey)
            if (index > -1 && index < data.length) {
              data.splice(index, 1)
              // write back to the cache
              store.writeQuery({
                query: this.fetchExpression,
                data: data
              })
            }
          }.bind(this)
        })
        this.$message.success(`SuccessFul delete primary key: ${primaryKey} record in ${this.tableName}`)
      } catch (error) {
        const msg = await error.message
        this.$message.error(msg)
        console.log(msg)
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
