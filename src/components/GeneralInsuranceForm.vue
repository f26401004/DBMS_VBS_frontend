<template lang="pug">
  div
    el-row
      el-col( v-bind:span="24" )
        el-card
          el-container( slot="header" )
            el-row
              el-col( v-bind:span="24" )
                el-row( type="flex" align="middle" v-bind:gutter="16" )
                  el-col( v-bind:span="0.5" )
                    i( class="el-icon-user-solid" )
                  el-col( v-bind:span="23.5" )
                    h4 Applyer Information
              el-col( v-bind:span="24" )
                el-alert(
                  title="Description:"
                  type="info"
                  description="Fill in some information about the user here. The user must be a bank user and hold at least one financial card."
                  show-icon
                  v-bind:closable="false"
                )
          el-form
            el-form-item
              el-row( type="flex" justify="start" align="middle" )
                el-col( v-bind:span="2" )
                  label Username
                el-col( v-bind:span="22" )
                  el-input( v-model="applyer.username" )
            el-form-item
              el-row( type="flex" justify="start" align="middle" )
                el-col( v-bind:span="2" )
                  label Sex
                el-col( v-bind:span="22" )
                  el-select( v-model="applyer.sex" )
                    el-option( v-bind:value="0" ) Male
                    el-option( v-bind:value="1" ) Female
            el-form-item
              el-row( type="flex" justify="start" align="middle" )
                el-col( v-bind:span="2" )
                  label birthday
                el-col( v-bind:span="22" )
                  el-date-picker( v-model="applyer.birthday" type="date" placeholder="Select the birthday" )
            el-form-item
              el-row( type="flex" justify="start" align="middle" )
                el-col( v-bind:span="2" )
                  label SSN
                el-col( v-bind:span="22" )
                  el-input( v-model="applyer.SSN" )
    el-row
      el-col( v-bind:span="24" )
        el-card
          el-container( slot="header" )
            el-row
              el-col( v-bind:span="24" )
                el-row( type="flex" align="middle" v-bind:gutter="16" )
                  el-col( v-bind:span="0.5" )
                    i( class="el-icon-user-solid" )
                  el-col( v-bind:span="23.5" )
                    h4 Insured Information
              el-col( v-bind:span="24" )
                el-alert(
                  title="Description:"
                  type="info"
                  description="Fill in some information about the insured here. The insured will be a new bank user if the insured is not."
                  show-icon
                  v-bind:closable="false"
                )
          el-form
            el-form-item
              el-row( type="flex" justify="start" align="middle" )
                el-col( v-bind:span="2" )
                  label Username
                el-col( v-bind:span="22" )
                  el-input( v-model="insured.username" )
            el-form-item
              el-row( type="flex" justify="start" align="middle" )
                el-col( v-bind:span="2" )
                  label Sex
                el-col( v-bind:span="22" )
                  el-select( v-model="insured.sex" )
                    el-option( v-bind:value="0" ) Male
                    el-option( v-bind:value="1" ) Female
            el-form-item
              el-row( type="flex" justify="start" align="middle" )
                el-col( v-bind:span="2" )
                  label birthday
                el-col( v-bind:span="22" )
                  el-date-picker( v-model="insured.birthday" type="date" placeholder="Select the birthday" )
            el-form-item
              el-row( type="flex" justify="start" align="middle" )
                el-col( v-bind:span="2" )
                  label SSN
                el-col( v-bind:span="22" )
                  el-input( v-model="insured.SSN" )
    el-row
      el-col( v-bind:span="24" )
        el-card
          el-container( slot="header" )
            el-row
              el-col( v-bind:span="24" )
                el-row( type="flex" align="middle" v-bind:gutter="16" )
                  el-col( v-bind:span="0.5" )
                    i( class="el-icon-user-solid" )
                  el-col( v-bind:span="23.5" )
                    h4 Beneficiary Information
              el-col( v-bind:span="24" )
                el-alert(
                  title="Description:"
                  type="info"
                  description="Fill in some information about the beneficiary here. The beneficiary will be a new bank user if the beneficiary is not."
                  show-icon
                  v-bind:closable="false"
                )
          el-form
            el-form-item
              el-row( type="flex" justify="start" align="middle" )
                el-col( v-bind:span="2" )
                  label Username
                el-col( v-bind:span="22" )
                  el-input( v-model="beneficiary.username" )
            el-form-item
              el-row( type="flex" justify="start" align="middle" )
                el-col( v-bind:span="2" )
                  label Sex
                el-col( v-bind:span="22" )
                  el-select( v-model="beneficiary.sex" )
                    el-option( v-bind:value="0" ) Male
                    el-option( v-bind:value="1" ) Female
            el-form-item
              el-row( type="flex" justify="start" align="middle" )
                el-col( v-bind:span="2" )
                  label birthday
                el-col( v-bind:span="22" )
                  el-date-picker( v-model="beneficiary.birthday" type="date" placeholder="Select the birthday" )
            el-form-item
              el-row( type="flex" justify="start" align="middle" )
                el-col( v-bind:span="2" )
                  label SSN
                el-col( v-bind:span="22" )
                  el-input( v-model="beneficiary.SSN" )
    el-row
      el-col( v-bind:span="24" )
        el-card
          el-container( slot="header" )
            el-row
              el-col( v-bind:span="24" )
                el-row( type="flex" align="middle" v-bind:gutter="16" )
                  el-col( v-bind:span="0.5" )
                    i( class="el-icon-s-order" )
                  el-col( v-bind:span="23.5" )
                    h4 Insurance Information
              el-col( v-bind:span="24" )
                el-alert(
                  title="Description:"
                  type="info"
                  description="Select the insurance type."
                  show-icon
                  v-bind:closable="false"
                )
          el-row
            el-col( v-bind:span="24" )
              el-form
                el-form-item
                  el-row( type="flex" justify="start" align="middle" )
                    el-col( v-bind:span="2" )
                      label Type
                    el-col( v-bind:span="22" )
                      el-select( v-model="insurance.type" )
                        el-option(
                          v-for="(iter, index) of Object.values(insuranceTypes)"
                          v-bind:key="`insurance-type-${index}-${iter.name}`"
                          v-bind:label="iter.name"
                          v-bind:value="iter.id"
                        ) {{ iter.name }}
                
    el-row
      el-col( v-bind:span="24" )
        el-card
          el-container( slot="header" )
            el-row( type="flex" align="middle" v-bind:gutter="16" )
              el-col( v-bind:span="0.5" )
                i( class="el-icon-s-order" )
              el-col( v-bind:span="23.5" )
                h4 Computed Terms Information
          el-row
            el-col( v-bind:span="8" )
              el-row( type="flex" justify="start" align="middle" v-bind:gutter="24" )
                el-col( v-bind:span="8" )
                  el-tag Terms
                el-col( v-bind:span="16" )
                  label {{ insuranceTypes[insurance.type] ? insuranceTypes[insurance.type].terms : 0 }}
            el-col( v-bind:span="8" )
              el-row( type="flex" justify="start" align="middle" v-bind:gutter="24" )
                el-col( v-bind:span="8" )
                  el-tag Total Amount
                el-col( v-bind:span="16" )
                  label {{ insuranceTypes[insurance.type] ? insuranceTypes[insurance.type].value : 0 }}
            el-col( v-bind:span="8" )
              el-row( type="flex" justify="start" align="middle" v-bind:gutter="24" )
                el-col( v-bind:span="8" )
                  el-tag Interest Rate
                el-col( v-bind:span="16" )
                  label {{ insuranceTypes[insurance.type] ? insuranceTypes[insurance.type].interestRate : 0 }}
          el-table( v-bind:data="records" )
            el-table-column( prop="term" label="Term" )
            el-table-column( prop="amount" label="Amount" )
            el-table-column( prop="deadline" label="Deadline" )
            el-table-column( prop="profit" label="Profit" )
            el-table-column( prop="currentTotal" label="Current Total" )
    el-row( type="flex" justify="end" align="middle" )
      el-col( v-bind:span="8" )
        el-row( type="flex" justify="end" align="middle" )
          el-button( v-on:click="clear" ) Clear
          el-button( type="primary" v-on:click="applyGeneralInsurance" ) Apply
</template>

<script>
import gql from 'graphql-tag'

export default {
  data: function () {
    return {
      applyer: {
        username: '',
        sex: '',
        SSN: '',
        birthday: ''
      },
      insured: {
        username: '',
        sex: '',
        SSN: '',
        birthday: ''
      },
      beneficiary: {
        username: '',
        sex: '',
        SSN: '',
        birthday: ''
      },
      insurance: {
        type: 1
      },
      insuranceTypes: {}
    }
  },
  apollo: {
    insuranceTypes: {
      query: gql`query {
        insuranceTypes {
          id, name, terms, value, interestRate
        }
      }`,
      update: function (data) {
        data = data.insuranceTypes
        const temp = {}
        // map to an object
        data.forEach(target => {
          temp[target.id] = {
            id: target.id,
            name: target.name,
            terms: target.terms,
            value: target.value,
            interestRate: target.interestRate
          }
        })
        console.log(temp)
        return temp
      }
    }
  },
  computed: {
    records: function () {
      const insurance = this.insuranceTypes[this.insurance.type]
      console.log(insurance)
      if (!insurance) {
        return []
      }
      const temp = []
      const amount = Math.round(insurance.value / insurance.terms)
      const currentDate = new Date()
      currentDate.setMonth(currentDate.getMonth() + 1)
      currentDate.setDate(1)
      for (let i = 0 ; i < insurance.terms ; ++i) {
        let currentTotal
        if (temp.length === 0) {
          currentTotal = 0
        } else  {
          currentTotal = temp.reduce((accumulator, target) => {
            return accumulator + target.amount + target.profit
          }, 0)
        }
        temp.push({
          term: i + 1,
          amount: amount,
          deadline: currentDate.toDateString(),
          profit: Math.round((currentTotal * insurance.interestRate) * 100) / 100,
          currentTotal: Math.round((amount + currentTotal * (1 + insurance.interestRate)) * 100) / 100
        })
        currentDate.setMonth(currentDate.getMonth() + 1)
      }
      return temp
    }
  },
  methods: {
    clear: function () {
      this.applyer = Object.assign({}, {
        username: '',
        sex: '',
        SSN: '',
        birthday: ''
      })
      this.insured = Object.assign({}, {
        username: '',
        sex: '',
        SSN: '',
        birthday: ''
      })
      this.beneficiary = Object.assign({}, {
        username: '',
        sex: '',
        SSN: '',
        birthday: ''
      })
      this.insurance.type = 1
      this.$message.success('Clear the form success.')
    },
    applyGeneralInsurance: async function () {

    }
  }
}
</script>

<style lang="scss" scoped>
  .el-row {
    width: 100%;
    margin-bottom: 12px;
  }
</style>
