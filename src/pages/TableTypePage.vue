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
            i( class="el-icon-search" )
          el-col( v-bind:span="23.5" )
            h4 Search Attribute Section
        el-row 
          el-col( v-bind:span="24" )
            el-alert(
              title="Description:"
              type="info"
              v-bind:description="`You can select the attribute and input the keyword to query the database in your need. But you are ONLY allowed to query within ${$route.params.type.toUpperCase()} table!!`"
              show-icon
              v-bind:closable="false"
            )
        el-row( v-bind:gutter="24" )
          el-col( v-bind:span="4" )
            el-select(
              placeholder="Select the attribute ..."
              v-model="queryAttribute"
              v-bind:clearable="true"
            )
              el-option(
                v-for="(target, index) of tableColumns[$route.params.type]"
                v-bind:key="`${$route.params.type}-search-select-option-${index}`"
                v-bind:label="target"
                v-bind:value="target"
              )
          el-col( v-bind:span="18" )
            el-input(
              placeholder="Please input the keyword here ..."
              v-model="queryKeyword"
              v-bind:clearable="true"
            )
          el-col( v-bind:span="2" )
            el-button(
              type="primary"
              v-on:click="attributeQuery"
            ) Search
      el-col( v-bind:span="24" )
        el-row( type="flex" align="middle" v-bind:gutter="16" )
          el-col( v-bind:span="0.5" )
            i( class="el-icon-s-promotion" )
          el-col( v-bind:span="23.5" )
            h4 Raw Query Section
        el-row 
          el-col( v-bind:span="24" )
            el-alert(
              title="Description:"
              type="info"
              v-bind:description="`You can input the formal SQL expression to query the database in your need. But you are ONLY allowed to query within ${$route.params.type.toUpperCase()} table!!`"
              show-icon
              v-bind:closable="false"
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
          el-col( v-bind:span="$route.params.type === 'transactions' ? 22 : 20" )
            el-row( type="flex" align="middle" v-bind:gutter="16" )
              el-col( v-bind:span="0.5" )
                i( class="el-icon-receiving" )
              el-col( v-bind:span="23.5" )
                h4 Result Section
          el-col( v-bind:span="2" )
            el-button(
              type="primary"
              icon="el-icon-search"
              v-on:click="fetchOperation"
            ) Fetch
          el-col( v-if="$route.params.type !== 'transactions'" v-bind:span="2" )
            el-button(
              type="primary"
              icon="el-icon-plus"
              v-on:click="displayModal()"
            ) Add record
        el-row
          el-col( v-bind:span="24" )
            el-alert(
              title="Description:"
              type="info"
              v-bind:description="`The query result will display in here. ${$route.params.type === 'transactions' ? 'However, you are not allowed to insert/update/destroy any data with general permission' : 'Also, you can insert/update/destroy some data to the database.'}`"
              show-icon
              v-bind:closable="false"
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
                v-if="$route.params.type !== 'transactions'"
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
                    v-on:click="displayModal(scope.$index, tableData[scope.$index])"
                  ) Edit
    el-dialog(
      v-bind:title="modalMode === 'insert' ? `Add new record to ${$route.params.type.toUpperCase()} table` : `Modify record`"
      v-bind:visible.sync="showModal"
    )
      el-form
        el-form-item(
          v-for="(iter, index) of formColumns"
          v-bind:key="`${$route.params.type}-table-form-${index}`"
          v-bind:label="iter.name"
        )
          el-input(v-if="iter.type === 'input'" v-model="currentInput[iter.name]")
          el-input(v-if="iter.type === 'input-password'" type="password" v-model="currentInput[iter.name]")
          el-input(v-if="iter.type === 'input-number'" type="number" v-model.number="currentInput[iter.name]")
          el-select(v-if="iter.type === 'select'" v-model="currentInput[iter.name]")
            el-option(
              v-for="(target, idx) of iter.options"
              v-bind:key="`${$route.params.type}-table-form-select-option${idx}`"
              v-bind:label="target"
              v-bind:value="iter.values[idx]"
            )
          el-select(v-if="iter.type === 'select-number'" v-model.number="currentInput[iter.name]")
            el-option(
              v-for="(target, idx) of iter.options"
              v-bind:key="`${$route.params.type}-table-form-select-option${idx}`"
              v-bind:label="target"
              v-bind:value="iter.values[idx]"
            )
      span( slot="footer" )
        el-button( v-on:click="showModal = false" ) Cancel
        el-button( v-on:click="modalMode === 'insert' ? addOperation() : editOperation()" type="primary" )
          span( v-show="!loading" ) Submit
          span( v-show="loading" )
            i( class="el-icon-loading" )

</template>

<script>
import gql from 'graphql-tag'
import sqlParser from 'js-sql-parse'

export default {
  data: function () {
    return {
      showModal: false,
      loading: false,
      querySentence: '',
      queryAttribute: '',
      queryKeyword: '',
      modalMode: 'insert',
      currentInput: { init: '' },
      currentIndex: -1,
      displayTableColumns: {
        users: [ 'username', 'authCode', 'SSN', 'permission', 'createdAt', 'updatedAt' ],
        cards: [ 'cardNo', 'csc', 'type', 'assets', 'owner', 'createdAt', 'updatedAt' ],
        cardTypes: [ 'id', 'name', 'bonusRate', 'interestRate', 'createdAt', 'updatedAt' ],
        transactions: [ 'id', 'userCard', 'targetCard', 'type', 'value', 'createdAt', 'updatedAt' ],
        transactionTypes: [ 'id', 'name', 'createdAt', 'updatedAt' ],
        insurances: [ 'id', 'user', 'type', 'term', 'paid', 'createdAt', 'updatedAt' ],
        insuranceTypes: [ 'id', 'name', 'interest_rate', 'createdAt', 'updatedAt' ],
        deposits: [ 'id', 'user', 'type', 'term', 'paid', 'createdAt', 'updatedAt' ],
        depositTypes: [ 'id', 'name', 'createdAt', 'updatedAt' ],
        costs: [ 'id', 'name', 'value', 'createdAt', 'updatedAt' ]
      },
      tableColumns: {
        users: [ 'username', 'authCode', 'SSN', 'permission', 'createdAt', 'updatedAt' ],
        cards: [ 'cardNo', 'csc', 'type', 'assets', 'owner', 'createdAt', 'updatedAt' ],
        cardTypes: [ 'id', 'name', 'bonusRate', 'interestRate', 'createdAt', 'updatedAt' ],
        transactions: [ 'id', 'userCard', 'targetCard', 'type', 'value', 'createdAt', 'updatedAt' ],
        transactionTypes: [ 'id', 'name', 'createdAt', 'updatedAt' ],
        insurances: [ 'id', 'user', 'type', 'term', 'paid', 'createdAt', 'updatedAt' ],
        insuranceTypes: [ 'id', 'name', 'interest_rate', 'createdAt', 'updatedAt' ],
        deposits: [ 'id', 'user', 'type', 'term', 'paid', 'createdAt', 'updatedAt' ],
        depositTypes: [ 'id', 'name', 'createdAt', 'updatedAt' ],
        costs: [ 'id', 'name', 'value', 'createdAt', 'updatedAt' ]
      },
      tableQueryColumns: {
        users: [ 'username', 'authCode', 'SSN', 'permission', 'createdAt', 'updatedAt' ],
        cards: [ 'cardNo', 'csc', 'type { id }', 'assets', 'owner { username }', 'createdAt', 'updatedAt' ],
        cardTypes: [ 'id', 'name', 'bonusRate', 'interestRate', 'createdAt', 'updatedAt' ],
        transactions: [ 'id', 'userCard { cardNo }', 'targetCard { cardNo }', 'type { id }', 'value', 'createdAt', 'updatedAt' ],
        transactionTypes: [ 'id', 'name', 'createdAt', 'updatedAt' ],
        insurances: [ 'id', 'user { username }', 'type { id }', 'term', 'paid', 'createdAt', 'updatedAt' ],
        insuranceTypes: [ 'id', 'name', 'interest_rate', 'createdAt', 'updatedAt' ],
        deposits: [ 'id', 'user { username }', 'type { id }', 'term', 'paid', 'createdAt', 'updatedAt' ],
        depositTypes: [ 'id', 'name', 'createdAt', 'updatedAt' ],
        costs: [ 'id', 'name', 'value', 'createdAt', 'updatedAt' ]
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
        data = data[this.$route.params.type]
        // flatten the object value to one depth in order to display on the table
        data.forEach(target => {
          Object.keys(target).forEach(key => {
            if (typeof target[key] === 'object') {
              target[key] = Object.values(target[key])[0]
            }
          })
        })
        return data
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
        case 'costs':
          return 'id'
      }
      return null
    },
    formColumns: function () {
      switch (this.$route.params.type) {
        case 'users':
          return this.modalMode === 'insert' ? [
            { name: 'username', type: 'input', datatype: 'String!' },
            { name: 'password', type: 'input-password', datatype: 'String!' },
            { name: 'SSN', type: 'input', datatype: 'String!' },
            { name: 'permission', type: 'select', options: ['General', 'Admin'], values: [0, 1], datatype: 'Int!' }
          ] : [
            { name: 'username', type: 'input', datatype: 'String!' },
            { name: 'authCode', type: 'input', datatype: 'String!' },
            { name: 'SSN', type: 'input', datatype: 'String!' },
            { name: 'permission', type: 'select', options: ['General', 'Admin'], values: [0, 1], datatype: 'Int!' }
          ]
        case 'cards':
          return [
            { name: 'cardNo', type: 'input', datatype: 'String!' },
            { name: 'csc', type: 'input', datatype: 'String!' },
            { name: 'type', type: 'select-number', options: ['晶片金融卡', 'VISA 金融卡'], values: [1, 2], datatype: 'Int!' },
            { name: 'assets', type: 'input-number', datatype: 'Float!' },
            { name: 'owner', type: 'input', datatype: 'String!' }
          ]
        case 'cardTypes':
          return [
            { name: 'id', type: 'input-number', datatype: 'Int!' },
            { name: 'name', type: 'input', datatype: 'String!' }
          ]
        case 'transactionTypes':
          return [
            { name: 'id', type: 'input-number', datatype: 'Int!' },
            { name: 'name', type: 'input', datatype: 'String!' }
          ]
        case 'insurances':
          return [
            { name: 'id', type: 'input', datatype: 'String!' },
            { name: 'user', type: 'input', datatype: 'String!' },
            { name: 'type', type: 'select', options: [], values: [], datatype: 'Int!' },
            { name: 'term', type: 'input-number', datatype: 'Int!' }
          ]
        case 'insuranceTypes':
          return [
            { name: 'id', type: 'input-number', datatype: 'Int!' },
            { name: 'name', type: 'input', datatype: 'String!' },
            { name: 'interest_rate', type: 'input-number', datatype: 'Float!' }
          ]
        case 'deposits':
          return [
            { name: 'id', type: 'input-number', datatype: 'String!' },
            { name: 'user', type: 'input', datatype: 'String!' },
            { name: 'type', type: 'select', options: [], values: [], datatype: 'Int!' },
            { name: 'term', type: 'input-number', datatype: 'Int!' }
          ]
        case 'depositTypes':
          return [
            { name: 'id', type: 'input-number', datatype: 'Int!' },
            { name: 'name', type: 'input', datatype: 'String!' }
          ]
        case 'costs':
          return [
            { name: 'id', type: 'input-number', datatype: 'Int!' },
            { name: 'name', type: 'input', datatype: 'String!' },
            { name: 'value', type: 'input-number', datatype: 'Float!' }
          ]
      }
      return []
    },
    fetchExpression: function () {
      return gql`query {
        ${this.$route.params.type} {
          ${this.tableQueryColumns[this.$route.params.type].join(',', )}
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
    addExpression: function (params) {
      let parameterString = ''
      let argumentString = ''
      for (let [index, key] of Object.keys(params).entries()) {
        if (index === 0) {
          parameterString += `$${key}: ${params[key]}`
          argumentString += `${key}: $${key}`
        } else {
          parameterString += `, $${key}: ${params[key]}`
          argumentString += `, ${key}: $${key}`
        }
      }
      return gql`mutation (${parameterString}) {
        insert${this.tableName} (${argumentString}) {
          ${this.tableQueryColumns[this.$route.params.type].join(',', )}
        }
      }`
    },
    updateExpression: function (params) {
      let parameterString = ''
      let argumentString = ''
      Object.keys(params).forEach(key => {
        parameterString += `, $${key}: ${params[key]}`
        argumentString += `, ${key}: $${key}`
      })
      return gql`mutation ($targetKey: ${params[this.tablePK]}${parameterString}) {
        update${this.tableName} (key: $targetKey${argumentString}) {
          ${this.tablePK}
        }
      }`
    },
    attributeQuery: async function () {
      if (this.queryAttribute.length === 0 || this.queryKeyword.length === 0) {
        this.$message.error('You must give two condition (attribute and keyword) to execute search operation!!')
        return
      }
      try {
        this.loading = true
        const result = await fetch('http://localhost:3000/search', {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify({
            attribute: this.queryAttribute,
            keyword: this.queryKeyword,
            tableName: this.tableName
          })
        })
        if (result.status !== 200) {
          throw result
        }
        this.tableData = JSON.parse(await result.text())
        const selectedColumns = Object.keys(this.tableData[0])
        this.displayTableColumns[this.$route.params.type] = selectedColumns
        this.$message.success('Successful operation!!')
        this.loading = false
      } catch (error) {
        this.loading = false
        const msg = await error.text()
        this.$message.error(msg)
        console.log(msg)
      }
    },
    rawQuery: async function () {
      this.loading = true
      // use js-sql-parse to prevent from illegal select query
      if (this.querySentence.toLowerCase().indexOf('select') > -1) {
        const test = sqlParser.parse(this.querySentence)
        const referenceTableNames = test.referencedTables
        console.log(referenceTableNames)
        if (referenceTableNames.length > 1 || !referenceTableNames.includes(this.tableName)) {
          this.$message.error(`You are allowd to query with ${this.tableName} table ONLY!!`)
          return
        }
      } else {
        // use simple regular expression to prevent from illegal insert/update/delete query
        let regx
        if (this.querySentence.toLowerCase().indexOf('insert') > -1) {
          regx = /(?<=into|INTO)\s+(\w+)/g
        } else if (this.querySentence.toLowerCase().indexOf('update') > -1) {
          regx = /(?<=update|UPDATE)\s+(\w+)/g
        } else if (this.querySentence.toLowerCase().indexOf('delete') > -1) {
          regx = /(?<=from|FROM)\s+(\w+)/g
        }
        const queryTableName = this.querySentence.match(regx).map(target => target.replace(' ', ''))[0]
        if (queryTableName !== this.tableName) {
          this.$message.error(`You are allowd to query with ${this.tableName} table ONLY!!`)
          return
        }
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
            sentence: this.querySentence,
            permission: 2,
            tableName: this.tableName
          })
        })
        if (result.status !== 200) {
          throw result
        }
        // if the operation is select operation
        if (this.querySentence.toLowerCase().indexOf('select') > -1) {
          this.tableData = JSON.parse(await result.text())
          const selectedColumns = Object.keys(this.tableData[0])
          this.displayTableColumns[this.$route.params.type] = selectedColumns
        } else {
          this.querySentence = ''
        }
        this.$message.success('Successful operation!!')
        this.loading = false
      } catch (error) {
        this.loading = false
        const msg = await error.text()
        this.$message.error(msg)
        console.log(msg)
      }
    },
    fetchOperation: async function () {
      try {
        const result = await this.$apollo.mutate({
          mutation: this.fetchExpression
        })
        this.tableData = result.data[this.$route.params.type]
      } catch (error) {
        this.loading = false
        const msg = await error.message
        this.$message.error(msg)
        console.log(msg)
      }
    },
    addOperation: async function () {
      this.loading = true
      // get the params
      const params = {}
      Object.values(this.formColumns).forEach(target => {
        params[target.name] = target.datatype
      })
      try {
        await this.$apollo.mutate({
          mutation: this.addExpression(params),
          variables: this.currentInput,
          update: function (store, { data }) {
            // get the data from query
            const cache = store.readQuery({
              query: this.fetchExpression
            })[this.$route.params.type]
            const target = data[`insert${this.tableName}`]
            cache.push(target)
            // write back to the cache
            store.writeQuery({
              query: this.fetchExpression,
              data: cache
            })
          }.bind(this)
        })
        this.showModal = false
        this.loading = false
      } catch (error) {
        this.loading = false
        const msg = await error.message
        this.$message.error(msg)
        console.log(msg)
      }
    },
    deleteOperation: async function (index) {
      this.loading = true
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
            const cache = store.readQuery({
              query: this.fetchExpression
            })[this.$route.params.type]
            // find the index of the data in apollo cache
            const index = cache.findIndex(target => target[this.tablePK] === primaryKey)
            if (index > -1 && index < cache.length) {
              cache.splice(index, 1)
              // write back to the cache
              store.writeQuery({
                query: this.fetchExpression,
                data: cache
              })
            }
          }.bind(this)
        })
        this.$message.success(`SuccessFul delete primary key: ${primaryKey} record in ${this.tableName}`)
        this.showModal = false
        this.loading = false
      } catch (error) {
        this.loading = false
        const msg = await error.message
        this.$message.error(msg)
        console.log(msg)
      }
    },
    editOperation: async function () {
      this.loading = true
      // get the record primary key
      const primaryKey = this.tableData[this.currentIndex][this.tablePK]
      // get the params
      const params = {}
      Object.values(this.formColumns).forEach(target => {
        params[target.name] = target.datatype
      })
      try {
        await this.$apollo.mutate({
          mutation: this.updateExpression(params),
          variables: Object.assign({
            targetKey: primaryKey
          }, this.currentInput),
          update: function (store) {
            // get the data from query
            const cache = store.readQuery({
              query: this.fetchExpression
            })[this.$route.params.type]
            // find the index of the data in apollo cache
            const index = cache.findIndex(target => target[this.tablePK] === primaryKey)
            if (index > -1 && index < cache.length) {
              Object.keys(cache[index]).forEach(key => {
                if (cache[index][key] !== this.currentInput[key]) {
                  cache[index][key] = this.currentInput[key]
                }
              })
              // write back to the cache
              store.writeQuery({
                query: this.fetchExpression,
                data: cache
              })
            }
          }.bind(this)
        })
        this.$message.success(`SuccessFul delete primary key: ${primaryKey} record in ${this.tableName}`)
        this.showModal = false
        this.loading = false
      } catch (error) {
        this.loading = false
        const msg = await error.message
        this.$message.error(msg)
        console.log(msg)
      }
    },
    displayModal: function (index, data) {
      if (index !== undefined) {
        this.currentInput = Object.assign({}, data)
        this.currentIndex = index
        this.modalMode = 'update'
      } else {
        const temp = {}
        this.formColumns.forEach(key => {
          temp[key.name] = ''
        })
        this.currentInput = Object.assign({}, temp)
        this.modalMode = 'insert'
      }
      this.showModal = true
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
