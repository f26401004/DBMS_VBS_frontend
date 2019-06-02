<template lang="pug">
  div( class="vbs_deposit_page_root" )
    el-row
      el-col( v-bind:span="24" )
        h2 Deposit Page
    el-row
      el-col( v-bind:span="24" )
        el-breadcrumb( separator-class="el-icon-arrow-right" )
          el-breadcrumb-item( to="/" ) Homepage
          el-breadcrumb-item( to="/deposit" ) Deposit
    el-row  
      el-col( v-bind:span="24" )
        el-divider
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
                    i( class="el-icon-s-order" )
                  el-col( v-bind:span="23.5" )
                    h4 Deposit Information
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
                      el-input( v-model="insurance.amount" )
                el-form-item
                  el-row( type="flex" justify="start" align="middle" )
                    el-col( v-bind:span="2" )
                      label Deposit type
                    el-col( v-bind:span="22" )
                      el-select( v-model="insurance.type" )
                        el-option(
                          v-for="(iter, index) of Object.values(depositTypes)"
                          v-bind:key="`deposit-type-${index}-${iter.name}`"
                          v-bind:value="iter.id"
                        ) {{ iter.name }}
                el-form-item( v-if="insurance.type !== 0" )
                  el-row( type="flex" justify="start" align="middle" )
                    el-col( v-bind:span="2" )
                      label Rate Type
                    el-col( v-bind:span="22" )
                      el-select( v-model="insurance.rate" )
                        el-option( v-bind:value="depositTypes[insurance.type].fixed_interest" ) Fixed Rate - {{ depositTypes[insurance.type].fixed_interest }}
                        el-option( v-bind:value="depositTypes[insurance.type].floating_interest" ) Floating Rate - {{ depositTypes[insurance.type].floating_interest }}
                el-form-item
                  el-row( type="flex" justify="start" align="middle" )
                    el-col( v-bind:span="2" )
                      label Total Terms
                    el-col( v-bind:span="22" )
                      el-input( v-model="insurance.term" )
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
                  el-tag Profit Rate
                el-col( v-bind:span="16" )
                  label {{ insurance.rate }}
          el-table( v-bind:data="records" )
            el-table-column( prop="term" label="Term" )
            el-table-column( prop="amount" label="Amount" )
            el-table-column( prop="deadline" label="Deadline" )
            el-table-column( prop="profit" label="Profit" )
            el-table-column( prop="currentTotal" label="Current Total" )
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
      insurance: {
        amount: 0,
        type: 0,
        term: 0,
        rate: 0
      },
      depositTypes: []
    }
  },
  apollo: {
    depositTypes: {
      query: gql`query {
        depositTypes {
          id, name, fixed_interest, floating_interest
        }
      }`,
      update: function (data) {
        data = data.depositTypes
        const temp = {}
        // map to an object
        data.forEach(target => {
          temp[target.id] = {
            id: target.id,
            name: target.name,
            fixed_interest: target.fixed_interest,
            floating_interest: target.floating_interest
          }
        })
        return temp
      }
    }
  },
  computed: {
    records: function () {
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
        console.log(currentTotal)
        temp.push({
          term: i + 1,
          amount: amount,
          deadline: currentDate.toDateString(),
          profit: Math.round((currentTotal * this.insurance.rate) * 100) / 100,
          currentTotal: Math.round((amount + currentTotal * (1 + this.insurance.rate)) * 100) / 100
        })
        currentDate.setMonth(currentDate.getMonth() + 1)
      }
      console.log(temp)
      return temp
    }
  }
}
</script>

<style lang="scss" scoped>
  .vbs_deposit_page_root {
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
  }
</style>
