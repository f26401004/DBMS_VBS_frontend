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
                  description="Fill in SSN here. The user must be a bank user and hold at least one financial card."
                  show-icon
                  v-bind:closable="false"
                )
          el-form
            el-form-item
              el-row( type="flex" justify="start" align="middle" )
                el-col( v-bind:span="2" )
                  label SSN
                el-col( v-bind:span="22" )
                  el-input( v-model="applyer.SSN" )
            el-form-item
              el-row( type="flex" justify="start" align="middle" )
                el-col( v-bind:span="2" )
                  label Card No.
                el-col( v-bind:span="22" )
                  el-input( v-model="applyer.cardNo" )
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
                    h4 Saving Insurance Information
              el-col( v-bind:span="24" )
                el-alert(
                  title="Description:"
                  type="info"
                  description="Fill in some information about the savings insurance here."
                  show-icon
                  v-bind:closable="false"
                )
          el-row
            el-col( v-bind:span="24" )
              el-form
                el-form-item
                  el-row( type="flex" justify="start" align="middle" )
                    el-col( v-bind:span="2" )
                      label Target Amount
                    el-col( v-bind:span="22" )
                      el-input( v-model.number="insurance.amount" type="number" )
                el-form-item
                  el-row( type="flex" justify="start" align="middle" )
                    el-col( v-bind:span="2" )
                      label Type
                    el-col( v-bind:span="22" )
                      el-select( v-model.number="insurance.type" )
                        el-option(
                          v-for="(iter, index) of typeFilter"
                          v-bind:key="`deposit-type-${index}-${iter.name}`"
                          v-bind:label="iter.name"
                          v-bind:value="iter.id"
                        ) {{ iter.name }}
                el-form-item
                  el-row( type="flex" justify="start" align="middle" )
                    el-col( v-bind:span="2" )
                      label Rate Type
                    el-col( v-bind:span="22" )
                      el-select( v-model.number="insurance.rate" )
                        el-option( v-if="insurance.type !== null" v-bind:value="0" v-bind:label="`Fixed Rate - ${depositTypes[insurance.type].fixedInterest}`" ) Fixed Rate - {{ depositTypes[insurance.type].fixedInterest }}
                        el-option( v-if="insurance.type !== null" v-bind:value="1" v-bind:label="`Floating Rate - ${depositTypes[insurance.type].floatingInterest}`" ) Floating Rate - {{ depositTypes[insurance.type].floatingInterest }}
                el-form-item
                  el-row( type="flex" justify="start" align="middle" )
                    el-col( v-bind:span="2" )
                      label Total Terms
                    el-col( v-bind:span="22" )
                      el-select( v-model="insurance.term" )
                        el-option(
                          v-for="(iter, index) of Array.from({ length: termBounder[1] - termBounder[0] + 1 }, (v, i) => termBounder[0] + i)"
                          v-bind:value="iter"
                          v-bind:key="`term-${iter}`"
                          v-bind:label="`${iter} month(s)`"
                        ) {{ iter }} month(s)
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
                  label {{ insurance.term }}
            el-col( v-bind:span="8" )
              el-row( type="flex" justify="start" align="middle" v-bind:gutter="24" )
                el-col( v-bind:span="8" )
                  el-tag Total Amount
                el-col( v-bind:span="16" )
                  label {{ insurance.amount }}
            el-col( v-bind:span="8" )
              el-row( type="flex" justify="start" align="middle" v-bind:gutter="24" )
                el-col( v-bind:span="8" )
                  el-tag Interest Rate
                el-col( v-bind:span="16" )
                  label {{ insurance.rate === null ? 0 : (insurance.rate ? depositTypes[insurance.type].floatingInterest : depositTypes[insurance.type].fixedInterest) }}
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
          el-button( type="primary" v-on:click="applySavingInsurance" ) Apply
</template>

<script>
import gql from 'graphql-tag'

export default {
  data: function () {
    return {
      applyer: {
        username: '',
        cardNo: '',
      },
      insurance: {
        amount: null,
        type: null,
        term: null,
        rate: null
      },
      depositTypes: []
    }
  },
  apollo: {
    depositTypes: {
      query: gql`query {
        depositTypes {
          id, name, fixedInterest, floatingInterest
        }
      }`,
      update: function (data) {
        data = data.depositTypes
        console.log(data)
        const temp = {}
        // map to an object
        data.forEach(target => {
          temp[target.id] = {
            id: target.id,
            name: target.name,
            fixedInterest: target.fixedInterest,
            floatingInterest: target.floatingInterest
          }
        })
        return temp
      }
    }
  },
  computed: {
    typeFilter: function () {
      console.log(Object.values(this.depositTypes).filter(target => target.id % 2 === (this.insurance.amount > 5000000 ? 0 : 1)))
      return Object.values(this.depositTypes).filter(target => target.id % 2 === (this.insurance.amount > 5000000 ? 0 : 1))
    },
    termBounder: function () {
      switch (this.insurance.type) {
        case 1:
        case 2:
          return [1, 3]
        case 3:
        case 4:
          return [4, 6]
        case 5:
        case 6:
          return [7, 9]
        case 7:
        case 8:
          return [10, 12]
        case 9:
        case 10:
          return [12, 24]
        case 11:
        case 12:
          return [25, 36]
        case 13:
        case 14:
          return [36, 100]
        default:
          return [0, 0]
      }
    },
    records: function () {
      if (this.insurance.rate === null) {
        return []
      }
      const temp = []
      const amount = Math.round(this.insurance.amount / this.insurance.term)
      const currentDate = new Date()
      currentDate.setMonth(currentDate.getMonth() + 1)
      currentDate.setDate(1)
      for (let i = 0 ; i < this.insurance.term ; ++i) {
        let currentTotal
        if (temp.length === 0) {
          currentTotal = 0
        } else  {
          currentTotal = temp.reduce((accumulator, target) => {
            return accumulator + target.amount + target.profit
          }, 0)
        }
        // get rate
        const rate = this.insurance.rate === 0 ? this.depositTypes[this.insurance.type].floatingInterest : this.depositTypes[this.insurance.type].fixedInterest
        temp.push({
          term: i + 1,
          amount: amount,
          deadline: currentDate.toDateString(),
          profit: Math.round((currentTotal * rate) * 100) / 100,
          currentTotal: Math.round((amount + currentTotal * (1 + rate)) * 100) / 100
        })
        currentDate.setMonth(currentDate.getMonth() + 1)
      }
      console.log(temp)
      return temp
    }
  },
  methods: {
    clear: function () {
      this.applyer = Object.assign({}, {
        username: '',
        cardNo: ''
      })
      this.insurance = Object.assign({}, {
        amount: null,
        type: null,
        term: null,
        rate: null
      })
      this.$message.info('Clear the form success.')
    },
    ownerAuth: async function () {
      await this.$apollo.mutate({
        mutation: gql`
          mutation($cardNo: String!, $SSN: String!) {
            ownerAuth(cardNo: $cardNo, SSN: $SSN)
          }`,
        variables: {
          cardNo: this.applyer.cardNo,
          SSN: this.applyer.SSN
        }
      })
    },
    applySavingInsurance: async function () {
      try {
        await this.ownerAuth()
        const result = await this.$apollo.mutate({
          mutation: gql`
            mutation ($user: String!, $type: Int!, $amount: Int!, $interestType: Int!, $terms: Int!) {
              insertDeposits(user: $user, type: $type, terms: $terms, amount: $amount, interestType: $interestType) {
                id
              }
            }
          `,
          variables: {
            user: this.applyer.SSN,
            type: this.insurance.type,
            amount: this.insurance.amount,
            interestType: this.insurance.rate,
            terms: this.insurance.term
          }
        })
        const savingInsuranceID = result.data.insertDeposits.id
        console.log(savingInsuranceID)
        const initSavingInsurancePayments = gql`
          mutation {
            initSavingInsurancePayments(id: "${savingInsuranceID}", terms: ${this.insurance.term}) {
              id
            }
          }
        `
        console.log(initSavingInsurancePayments)
        await this.$apollo.mutate({
          mutation: initSavingInsurancePayments
        })
        this.$message.success('Success operation')
        // emit the signal to erase the tab
        this.$parent.$emit('tab-remove')
      } catch (error) {
        console.log(error)
        this.$message.error(error.message)
      }
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
