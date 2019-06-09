<template lang="pug">
  div
    el-row( type="flex" justify="start" align="start" v-bind:gutter="24" )
      el-col( v-bind:span="10" )
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
                    el-col( v-bind:span="4" )
                      label Username
                    el-col( v-bind:span="20" )
                      el-input( v-model="applyer.username" )
                el-form-item
                  el-row( type="flex" justify="start" align="middle" )
                    el-col( v-bind:span="4" )
                      label Sex
                    el-col( v-bind:span="20" )
                      el-select( v-model.number="applyer.sex" )
                        el-option( v-bind:value="0" label="Male" ) Male
                        el-option( v-bind:value="1" label="Female" ) Female
                el-form-item  
                  el-row( type="flex" justify="start" align="middle" )
                    el-col( v-bind:span="4" )
                      label birthday
                    el-col( v-bind:span="20" )
                      el-date-picker( v-model="applyer.birthday" type="date" placeholder="Select the birthday" )
                el-form-item
                  el-row( type="flex" justify="start" align="middle" )
                    el-col( v-bind:span="4" )
                      label SSN
                    el-col( v-bind:span="20" )
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
                      el-col( v-bind:span="22" )
                        h4 Insured Information
                      el-col( v-bind:span="1" )
                        el-tooltip( effect="dark" content="Copy Applyer Info" )
                          el-button(type="primary" icon="el-icon-edit" circle v-on:click="handleSameApplyer")
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
                    el-col( v-bind:span="4" )
                      label Username
                    el-col( v-bind:span="20" )
                      el-input( v-model="insured.username" )
                el-form-item
                  el-row( type="flex" justify="start" align="middle" )
                    el-col( v-bind:span="4" )
                      label Sex
                    el-col( v-bind:span="20" )
                      el-select( v-model.number="insured.sex" )
                        el-option( v-bind:value="0" label="Male" ) Male
                        el-option( v-bind:value="1" label="Female" ) Female
                el-form-item
                  el-row( type="flex" justify="start" align="middle" )
                    el-col( v-bind:span="4" )
                      label birthday
                    el-col( v-bind:span="20" )
                      el-date-picker( v-model="insured.birthday" type="date"  placeholder="Select the birthday" )
                el-form-item
                  el-row( type="flex" justify="start" align="middle" )
                    el-col( v-bind:span="4" )
                      label SSN
                    el-col( v-bind:span="20" )
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
                      el-col( v-bind:span="22" )
                        h4 Beneficiary Information
                      el-col( v-bind:span="1" )
                        el-tooltip( effect="dark" content="Copy Insured Info" )
                          el-button(type="primary" icon="el-icon-edit" circle v-on:click="handleSameInsured")
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
                    el-col( v-bind:span="4" )
                      label Username
                    el-col( v-bind:span="20" )
                      el-input( v-model="beneficiary.username" )
                el-form-item
                  el-row( type="flex" justify="start" align="middle" )
                    el-col( v-bind:span="4" )
                      label Sex
                    el-col( v-bind:span="20" )
                      el-select( v-model.number="beneficiary.sex" )
                        el-option( v-bind:value="0" label="Male" ) Male
                        el-option( v-bind:value="1" label="Female" ) Female
                el-form-item
                  el-row( type="flex" justify="start" align="middle" )
                    el-col( v-bind:span="4" )
                      label birthday
                    el-col( v-bind:span="20" )
                      el-date-picker( v-model="beneficiary.birthday" type="date" placeholder="Select the birthday" )
                el-form-item
                  el-row( type="flex" justify="start" align="middle" )
                    el-col( v-bind:span="4" )
                      label SSN
                    el-col( v-bind:span="20" )
                      el-input( v-model="beneficiary.SSN" )
      el-col( v-bind:span="14" )
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
                          el-select( v-model.number="insurance.type" )
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
                    el-col( v-bind:span="12" )
                      el-tag Total Amount
                    el-col( v-bind:span="12" )
                      label {{ insuranceTypes[insurance.type] ? insuranceTypes[insurance.type].value : 0 }}
                el-col( v-bind:span="8" )
                  el-row( type="flex" justify="start" align="middle" v-bind:gutter="24" )
                    el-col( v-bind:span="12" )
                      el-tag Interest Rate
                    el-col( v-bind:span="12" )
                      label {{ insuranceTypes[insurance.type] ? insuranceTypes[insurance.type].interestRate : 0 }}
              el-table( v-bind:data="records" height="1080" )
                el-table-column( prop="term" label="Term" )
                el-table-column( prop="amount" label="Amount" )
                el-table-column( prop="deadline" label="Deadline" )
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
      sameAsApplyer: false,
      sameAsInsured: false,
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
      const amount = Math.round(insurance.value * insurance.interestRate / insurance.terms)
      const currentDate = new Date()
      currentDate.setMonth(currentDate.getMonth() + 1)
      currentDate.setDate(1)
      for (let i = 0 ; i < insurance.terms ; ++i) {
        let currentTotal
        if (temp.length === 0) {
          currentTotal = 0
        } else  {
          currentTotal = temp.reduce((accumulator, target) => {
            return accumulator + target.amount
          }, 0)
        }
        temp.push({
          term: i + 1,
          amount: amount,
          deadline: currentDate.toISOString(),
          currentTotal: Math.round((amount + currentTotal) * 100) / 100
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
    handleSameApplyer: function () {
      this.insured = Object.assign({}, this.applyer)
    },
    handleSameInsured: function () {
      this.beneficiary = Object.assign({}, this.insured)
    },
    applyGeneralInsurance: async function () {
      try {
        const insertUsersExpression = gql`
          mutation($username: String!, $password: String!, $SSN: String!, $birthday: String!, $sex: Int!, $permission: Int!) {
            insertUsers(username: $username, password: $password, SSN: $SSN, permission: $permission, sex: $sex, birthday: $birthday ) {
              username
            }
          }`
        const insertUsersRequest = []
        // insert all user info first
        insertUsersRequest.push(this.$apollo.mutate({
          mutation: insertUsersExpression,
          variables: {
            username: this.applyer.username,
            password: '0000',
            SSN: this.applyer.SSN,
            birthday: this.applyer.birthday.toISOString(),
            sex: this.applyer.sex,
            permission: 0
          }
        }))
        insertUsersRequest.push(this.$apollo.mutate({
          mutation: insertUsersExpression,
          variables: {
            username: this.insured.username,
            password: '0000',
            SSN: this.insured.SSN,
            birthday: this.insured.birthday.toISOString(),
            sex: this.insured.sex,
            permission: 0
          }
        }))
        insertUsersRequest.push(this.$apollo.mutate({
          mutation: insertUsersExpression,
          variables: {
            username: this.beneficiary.username,
            password: '0000',
            SSN: this.beneficiary.SSN,
            birthday: this.beneficiary.birthday.toISOString(),
            sex: this.beneficiary.sex,
            permission: 0
          }
        }))
        console.log(insertUsersRequest)
        // parellel send the request to the server
        await Promise.all(insertUsersRequest)
        const insertInsuranceExpression = gql`
          mutation ($user: String!, $insured: String!, $beneficiary: String!, $type: Int!) {
            insertInsurances(user: $user, insured: $insured, beneficiary: $beneficiary, type: $type) {
              id
            }
          }
        `
        const result = await this.$apollo.mutate({
          mutation: insertInsuranceExpression,
          variables: {
            user: this.applyer.SSN,
            insured: this.insured.SSN,
            beneficiary: this.beneficiary.SSN,
            type: this.insurance.type
          }
        })
        const insuranceID = result.data.insertInsurances.id
        const insertInsurancePaymentsExpression = gql`
          mutation {
            initInsurancePayments(id: "${insuranceID}", terms: ${this.insuranceTypes[this.insurance.type].terms}) {
              id
            }
          }
        `
        await this.$apollo.mutate({
          mutation: insertInsurancePaymentsExpression,
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
