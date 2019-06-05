<template lang="pug">
  div( class="vbs_insuance_check_page_root" )
    el-row
      el-col( v-bind:span="24" )
        h2 Insurance Check Page
    el-row
      el-col( v-bind:span="24" )
        el-breadcrumb( separator-class="el-icon-arrow-right" )
          el-breadcrumb-item( to="/" ) Homepage
          el-breadcrumb-item( to="/insurance" ) Insurance
          el-breadcrumb-item( to="/insurance/check" ) Check
    el-row  
      el-col( v-bind:span="24" )
        el-divider
    el-row( type="flex" align="middle" )
      el-col( v-bind:span="18" )
        el-radio-group( v-model="currentType" )
          el-radio-button( label="General" ) General 
          el-radio-button( label="Saving" ) Saving 
      el-col( v-bind:span="6" )
        el-input(
          placeholder="Type the SSN here ..."
          prefix-icon="el-icon-search"
          v-model.lazy="querySSN"
        )
    el-row( v-if="$apollo.loading" ) Loading...
    el-row( v-else )
      el-col( v-bind:span="24" v-if="currentType === 'General'" )
        el-collapse( v-model="activeTarget[currentType]" )
          el-collapse-item(
            v-for="(iter, index) of displayCaseData[currentType.toLowerCase()]"
            v-bind:key="`insurance-case-${iter.user}-${index}`"
            v-bind:name="iter.id"
          )
            template( slot="title" )
              el-container
                el-row( type="flex" justify="start" align="middle" v-bind:gutter="16" )
                  el-col( v-bind:span="5" )
                    h4 {{ iter.id }}
                  el-col( v-bind:span="3" )
                    label {{ iter.user }}
                  el-col( v-bind:span="4" )
                    el-row( v-bind:gutter="16" )
                      el-col( v-bind:span="8" )
                        el-tag( effect="dark" ) Type
                      el-col( v-bind:span="16" )
                        label {{ typeData.general.find(target => target.id === iter.type).name }}
                  el-col( v-bind:span="4" )
                    el-row( v-bind:gutter="16" )
                      el-col( v-bind:span="8" )
                        el-tag( effect="dark" ) Amount
                      el-col( v-bind:span="16" )
                        label {{ typeData.general.find(target => target.id === iter.type).value }}
                  el-col( v-bind:span="2" )
                    el-row( v-bind:gutter="16" )
                      el-col( v-bind:span="16" )
                        el-tag( effect="dark" ) Terms
                      el-col( v-bind:span="8" )
                        label {{ typeData.general.find(target => target.id === iter.type).terms }}
                  el-col( v-bind:span="4" )
                    el-row( v-bind:gutter="16" )
                      el-col( v-bind:span="8" )
                        el-tag( effect="dark" ) Start At
                      el-col( v-bind:span="16" )
                        label {{ new Date(iter.createdAt).toDateString() }}
                  el-col( v-bind:span="2" )
                    el-row( type="flex" justify="end" align="middle" )
                      el-button( type="primary" v-on:click="savePayment($event, iter.id, currentType)" ) Save
            el-table( v-bind:data="fileterPayments(iter.id, currentType)" )
              el-table-column(
                prop="term"
                label="Term"
              )
              el-table-column(
                prop="amount"
                label="Amount"
              )
              el-table-column(
                prop="deadline"
                label="deadline"
              )
              el-table-column(
                prop="status"
                label="Status"
              )
              el-table-column(
                fixed="right"
                label="Operations"
                width="120"
              )
                template( slot-scope="scope" )
                  el-select( v-model.number="scope.row.status" )
                    el-option( v-bind:value="0" ) Unpaid
                    el-option( v-bind:value="1" ) Paid   
      el-col( v-if="currentType === 'Saving'" )
        el-collapse( v-model="activeTarget[currentType]" accordion )
          el-collapse-item(
            v-for="(iter, index) of displayCaseData[currentType.toLowerCase()]"
            v-bind:key="`saving-case-${iter.user}-${index}`"
            v-bind:name="iter.id"
          )
            template( slot="title" )
              el-container
                el-row( type="flex" justify="start" align="middle" v-bind:gutter="16" )
                  el-col( v-bind:span="5" )
                    h4 {{ iter.id }}
                  el-col( v-bind:span="4" )
                  el-col( v-bind:span="3" )
                    label {{ iter.user }}
                  el-col( v-bind:span="4" )
                    el-row( v-bind:gutter="16" )
                      el-col( v-bind:span="8" )
                        el-tag( effect="dark" ) Amount
                      el-col( v-bind:span="16" )
                        label {{ iter.amount }}
                  el-col( v-bind:span="2" )
                    el-row( v-bind:gutter="16" )
                      el-col( v-bind:span="16" )
                        el-tag( effect="dark" ) Terms
                      el-col( v-bind:span="8" )
                        label {{ iter.terms }}
                  el-col( v-bind:span="4" )
                    el-row( v-bind:gutter="16" )
                      el-col( v-bind:span="8" )
                        el-tag( effect="dark" ) Start At
                      el-col( v-bind:span="16" )
                        label {{ new Date(iter.createdAt).toDateString() }}
                  el-col( v-bind:span="2" )
                    el-row( type="flex" justify="end" align="middle" )
                      el-button( type="primary" v-on:click="savePayment($event, iter.id, currentType)" ) Save
            el-table( v-bind:data="fileterPayments(iter.id, currentType)" )
              el-table-column(
                prop="term"
                label="Term"
              )
              el-table-column(
                prop="amount"
                label="Amount"
              )
              el-table-column(
                prop="deadline"
                label="deadline"
              )
              el-table-column(
                prop="status"
                label="Status"
              )
              el-table-column(
                fixed="right"
                label="Operations"
                width="120"
              )
                template( slot-scope="scope" )
                  el-select( v-model.number="scope.row.status" )
                    el-option( v-bind:value="0" ) Unpaid
                    el-option( v-bind:value="1" ) Paid              

</template>

<script>
import gql from 'graphql-tag'

export default {
  data: function () {
    return {
      currentType: 'General',
      querySSN: '',
      activeTarget: {
        general: '',
        saving: ''
      },
      caseData: {
        general: [],
        saving: []
      },
      displayCaseData: {
        general: [],
        saving: []
      },
      casePaymentData: {
        general: [],
        saving: []
      },
      displayPaymentData: {
        general: [],
        saving: []
      },
      typeData: {
        general: [],
        saving: []
      }
    }
  },
  apollo: {
    'caseData.general': {
      query: gql`
        query {
          insurances {
            id, user { SSN }, insured { SSN }, beneficiary { SSN }, type { id }, createdAt, updatedAt
          }
        }
      `,
      update: function (data) {
        data = data.insurances
        // flatten the object value to one depth in order to display on the table
        data.forEach(target => {
          console.log(target)
          Object.keys(target).forEach(key => {
            if (typeof target[key] === 'object' && target[key] !== null) {
              console.log(Object.values(target[key]))
              target[key] = Object.values(target[key])[0]
            }
          })
        })
        this.caseData.general = data.slice()
        this.displayCaseData.general = data.slice()
        return data
      }
    },
    'caseData.saving': {
      query: gql`
        query {
          deposits {
            id, user { SSN }, type { id }, interestType, terms, amount, createdAt, updatedAt
          }
        }
      `,
      update: function (data) {
        data = data.deposits
        // flatten the object value to one depth in order to display on the table
        data.forEach(target => {
          console.log(target)
          Object.keys(target).forEach(key => {
            if (typeof target[key] === 'object' && target[key] !== null) {
              console.log(Object.values(target[key]))
              target[key] = Object.values(target[key])[0]
            }
          })
        })
        this.caseData.saving = data.slice()
        this.displayCaseData.saving = data.slice()
        return data
      }
    },
    'casePaymentData.general': {
      query: gql`
        query {
          insurancePayments {
            id, term, deadline, status
          }
        }
      `,
      update: function (data) {
        data = data.insurancePayments
        this.casePaymentData.general = data.slice()
        this.displayPaymentData.general = data.slice()
        return data
      }
    },
    'casePaymentData.saving': {
      query: gql`
        query {
          depositPayments {
            id, term, deadline, status
          }
        }
      `,
      result: function (data) {
        console.log(data)
        return data
      },
      update: function (data) {
        console.log(data)
        data = data.depositPayments
        this.casePaymentData.saving = data.slice()
        this.displayPaymentData.saving = data.slice()
        return data
      }
    },
    'typeData.general': {
      query: gql`
        query {
          insuranceTypes {
            id, name, value, interestRate, terms
          }
        }
      `,
      update: function (data) {
        data = data.insuranceTypes
        this.typeData.general = data.slice()
        return data
      }
    },
    'typeData.saving': {
      query: gql`
        query {
          depositTypes {
            id, name, floatingInterest, fixedInterest
          }
        }
      `,
      update: function (data) {
        data = data.depositTypes
        this.typeData.saving = data.slice()
        return data
      }
    }
  },
  watch: {
    querySSN: function (newValue) {
      this.displayCaseData[this.currentType.toLowerCase()] = this.caseData[this.currentType.toLowerCase()].filter(target => target.user.indexOf(newValue) > 0)
    }
  },
  methods: {
    fileterPayments: function (id, type) {
      const temp = this.displayPaymentData[type.toLowerCase()].filter(target => target.id === id)
        .sort((a, b) => a.term - b.term)
      if (type === 'Saving') {
        const savingInsuranceData = this.caseData.saving.find(target => target.id === id)
        if (!temp[0].amount) {
          temp.forEach(target => {
            target.amount = Math.round(savingInsuranceData.amount / savingInsuranceData.terms)
          })
        }
        
      } else {
        const generalInsuranceData = this.caseData.general.find(target => target.id === id)
        console.log(generalInsuranceData)
        const generalInsuranceTypeData = this.typeData.general.find(target => target.id === generalInsuranceData.type)
        if (!temp[0].amount) {
          temp.forEach(target => {
            target.amount = Math.round(generalInsuranceTypeData.value * generalInsuranceTypeData.interestRate / generalInsuranceTypeData.terms * 100) / 100
          })
        }
      }
      return temp
    },
    savePayment: async function (event, id, type) {
      event.stopPropagation()
      try {
        let target = this.displayPaymentData[type.toLowerCase()].filter(target => target.id === id)
        const origin = this.casePaymentData[type.toLowerCase()].filter(target => target.id === id)
        target.filter(iter => {
          const compare = origin.find(t => t.term === iter.term)
          return iter.status !== compare.status
        })
        const updateSavingInsuranceExpression = gql`
          mutation ($id: String!, $term: Int!, $status: Int!) {
            updateDepositPaymentStatus(id: $id, term: $term, status: $status) {
              id, term, deadline, status
            }
          }
        `
        const updateGeneralInsurnaceExpression = gql`
          mutation ($id: String!, $term: Int!, $status: Int!) {
            updateInsurancePaymentStatus(id: $id, term: $term, status: $status) {
              id, term, deadline, status
            }
          }
        `
        const updateRequest = []
        target.forEach(iter => {
          updateRequest.push(this.$apollo.mutate({
            mutation: this.currentType === 'General' ? updateGeneralInsurnaceExpression : updateSavingInsuranceExpression,
            variables: {
              id: iter.id,
              term: iter.term,
              status: iter.status
            }
          }))
        })
        await Promise.all(updateRequest)
        this.$message.success('Success operation')
      } catch (error) {
        console.log(error)
        this.$message.error(error.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .vbs_insuance_check_page_root {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 24px 48px;
    box-sizing: border-box;
  }
</style>
