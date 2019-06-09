<template lang="pug">
  div( class="vbs_table_page_root" )
    el-row
      el-col( v-bind:span="24" )
        h2 Test Page
    el-row
      el-col( v-bind:span="24" )
        el-divider
    el-row
      el-col( v-bind:span="24" )
        el-row( type="flex" align="middle" v-bind:gutter="16" )
          el-col( v-bind:span="0.5" )
            i( class="el-icon-search" )
          el-col( v-bind:span="23.5" )
            h4 Fixed Search Section
        el-row 
          el-col( v-bind:span="24" )
            el-alert(
              title="Description:"
              type="info"
              description="You can click the button to execute the corresponding fixed raw SQL expression"
              show-icon
              v-bind:closable="false"
            )
        el-row
          el-col( v-bind:span="24" )
            el-card( shadow="hover" )
              div
                h4 Basic Query
              el-divider
              el-row
                el-col( v-bind:span="4" )
                  el-tooltip( content="SELECT * FROM Users WHERE SSN = 'F130003604';" placement="top-start" )
                    el-button( type="primary" v-on:click="rawQuery(`SELECT * FROM Users WHERE SSN = 'F130003604';`)" ) Select Users F130003604
                el-col( v-bind:span="4" )
                  el-tooltip( content="INSERT INTO Users ( SSN, username, sex, birthday, authCode, permission, createdBy, updatedBy , createdAt, updatedAt) VALUES ( 'F130216541', 'testInsert', 0, '1997-11-11', '0ubHrtw76Hru6R5YuVmG', 0, 'root', 'root', NOW(), NOW() );" placement="top-start" )
                    el-button( type="primary" v-on:click="rawQuery(`INSERT INTO Users ( SSN, username, sex, birthday, authCode, permission, createdBy, updatedBy , createdAt, updatedAt) VALUES ( 'F130216541', 'testInsert', 0, '1997-11-11', '0ubHrtw76Hru6R5YuVmG', 0, 'root', 'root', NOW(), NOW() );`)" ) New User F130216541
                el-col( v-bind:span="6" )
                  el-tooltip( content="UPDATE Users SET sex = 1 WHERE SSN = 'F130216541';" placement="top-start" )
                    el-button( type="primary" v-on:click="rawQuery(`UPDATE Users SET sex = 1 WHERE SSN = 'F130216541';`)" ) Update User F130216541 sex to 1
                el-col( v-bind:span="4" )
                  el-tooltip( content="DELETE FROM Users WHERE SSN = 'F130216541';" placement="top-start" )
                    el-button( type="primary" v-on:click="rawQuery(`DELETE FROM Users WHERE SSN = 'F130216541';`)" ) Remove User F130216541
        el-row
          el-col( v-bind:span="24" )
            el-card( shadow="hover" )
              div
                h4 Complex Query
              el-divider
              el-row
                el-col( v-bind:span="12" )
                  el-tooltip( content="SELECT * FROM Users WHERE SSN IN (SELECT DISTINCT owner AS SSN FROM Cards);" placement="top-start" )
                    el-button( type="primary" v-on:click="rawQuery(`SELECT * FROM Users WHERE SSN IN (SELECT DISTINCT owner AS SSN FROM Cards);`)" ) Select Users owning at least one card (IN)
                el-col( v-bind:span="12" )
                  el-tooltip( content="SELECT * FROM Users WHERE SSN NOT IN (SELECT DISTINCT owner AS SSN FROM Cards);" placement="top-start" )
                    el-button( type="primary" v-on:click="rawQuery(`SELECT * FROM Users WHERE SSN NOT IN (SELECT DISTINCT owner AS SSN FROM Cards);`)" ) Select Users owning no cards (IN)
              el-row
                el-col( v-bind:span="12" )
                  el-tooltip( content="SELECT * FROM Users WHERE EXISTS (SELECT * FROM Cards WHERE owner = SSN );" placement="top-start" )
                    el-button( type="primary" v-on:click="rawQuery(`SELECT * FROM Users WHERE EXISTS (SELECT * FROM Cards WHERE owner = SSN );`)" ) Select Users owning at least one card (EXIST)
                el-col( v-bind:span="12" )
                  el-tooltip( content="SELECT * FROM Users WHERE NOT EXISTS (SELECT * FROM Cards WHERE owner = SSN );" placement="top-start" )
                    el-button( type="primary" v-on:click="rawQuery(`SELECT * FROM Users WHERE NOT EXISTS (SELECT * FROM Cards WHERE owner = SSN );`)" ) Select Users owning no cards (EXIST)
              el-row
                el-col( v-bind:span="4" )
                  el-tooltip( content="SELECT COUNT(*) FROM Transactions;" placement="top-start" )
                    el-button( type="primary" v-on:click="rawQuery(`SELECT COUNT(*) FROM Transactions;`)" ) Count Transaction
                el-col( v-bind:span="4" )
                  el-tooltip( content="SELECT SUM(value) FROM Transactions;" placement="top-start" )
                    el-button( type="primary" v-on:click="rawQuery(`SELECT SUM(value) FROM Transactions;`)" ) Sum Transaction Value
                el-col( v-bind:span="4" )
                  el-tooltip( content="SELECT MAX(value) FROM Transactions;" placement="top-start" )
                    el-button( type="primary" v-on:click="rawQuery(`SELECT MAX(value) FROM Transactions;`)" ) Max Transaction Value
                el-col( v-bind:span="4" )
                  el-tooltip( content="SELECT MIN(value) FROM Transactions;" placement="top-start" )
                    el-button( type="primary" v-on:click="rawQuery(`SELECT MIN(value) FROM Transactions;`)" ) Min Transaction Value
              el-row
                el-col( v-bind:span="24" )
                  el-tooltip( content="SELECT SSN, SUM(value) FROM Users AS U, Transactions AS T, Cards AS C WHERE T.userCard = C.cardNo AND C.owner = U.SSN GROUP BY SSN HAVING SSN = 'F130003604';" placement="top-start" )
                    el-button( type="primary" v-on:click="rawQuery(`SELECT SSN, SUM(value) FROM Users AS U, Transactions AS T, Cards AS C WHERE T.userCard = C.cardNo AND C.owner = U.SSN GROUP BY SSN HAVING SSN = 'F130003604';`)" ) Sum all transaction value of the user whose SSN is F130003604
          
          
    el-row
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
              description="You can input the formal SQL expression to query the database in your need. You are allowed to query all tables with complex query in the page!!"
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
                v-on:click="rawQuery()"
              )
      el-col( v-bind:span="24" )
        el-divider
      el-col( v-bind:span="24" )
        el-row( type="flex" align="middle" )
          el-col( v-bind:span="24" )
            el-row( type="flex" align="middle" v-bind:gutter="16" )
              el-col( v-bind:span="0.5" )
                i( class="el-icon-receiving" )
              el-col( v-bind:span="23.5" )
                h4 Result Section
        el-row
          el-col( v-bind:span="24" )
            el-alert(
              title="Description:"
              type="info"
              description="The query result will display in here. Also, you can add some data to the database with table operation."
              show-icon
              v-bind:closable="false"
            )
        el-row
          el-col( v-bind:span="24" )
            el-table( v-bind:data="tableData" )
              el-table-column(
                v-for="(iter, index) of displayTableColumns"
                v-bind:key="`vbs_table_${iter}`"
                v-bind:prop="iter"
                v-bind:label="iter"
              )
</template>

<script>
export default {
  data: function () {
    return {
      showAddModal: false,
      querySentence: '',
      tables: ['Users', 'Cards', 'CardTypes', 'Transactions', 'TransactionTypes', 'Insurances', 'InsuranceTypes', 'InsurancePayments', 'Deposits', 'DepositTypes', 'DepositPayments', 'Costs'],
      tableColumns: {
        users: [ 'username', 'authCode', 'SSN', 'permission', 'sex', 'createdAt', 'updatedAt' ],
        cards: [ 'cardNo', 'csc', 'type', 'assets', 'owner', 'bonusPoint', 'createdAt', 'updatedAt' ],
        cardTypes: [ 'id', 'name', 'bonusRate', 'interestRate', 'createdAt', 'updatedAt' ],
        transactions: [ 'id', 'userCard', 'targetCard', 'type', 'value', 'createdAt', 'updatedAt' ],
        transactionTypes: [ 'id', 'name', 'createdAt', 'updatedAt' ],
        insurances: [ 'id', 'user', 'type', 'insured', 'beneficiary', 'createdAt', 'updatedAt' ],
        insuranceTypes: [ 'id', 'name', 'value', 'terms', 'interestRate', 'createdAt', 'updatedAt' ],
        insurancePayments: [ 'id', 'deadline', 'term', 'status', 'createdAt', 'updatedAt' ],
        deposits: [ 'id', 'user', 'type', 'interestType', 'terms', 'createdAt', 'updatedAt' ],
        depositTypes: [ 'id', 'name', 'fixedInterest', 'floatingInterest', 'createdAt', 'updatedAt' ],
        depositPayments: [ 'id', 'deadline', 'term', 'status', 'createdAt', 'updatedAt' ],
        costs: [ 'id', 'name', 'value', 'createdAt', 'updatedAt' ]
      },
      displayTableColumns: [],
      tableData: []
    }
  },
  computed: {
    avalableColumns: function () {
      let temp = []
      this.queryTable.forEach(table => {
        const name = table.charAt(0).toLowerCase() + table.substr(1)
        temp = [...this.tableColumns[name].map(attr => `${attr} - ${table}`), ...temp]
      })
      return temp
    }
  },
  methods: {
    rawQuery: async function (sentence) {
      if (sentence) {
        this.querySentence = sentence
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
            permission: 2
          })
        })
        if (result.status !== 200) {
          throw result
        }
        // if the operation is select operation
        if (this.querySentence.toLowerCase().indexOf('select') > -1) {
          this.tableData = await result.json()
          if (this.tableData.length > 0) {
            const selectedColumns = Object.keys(this.tableData[0])
            this.displayTableColumns = selectedColumns
          } else {
            this.displayTableColumns = []
          }
        } else {
          this.querySentence = ''
        }
        this.$message.success('Successful operation!!')
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
  .vbs_table_page_root {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 24px 48px;
    box-sizing: border-box;
  }
</style>
