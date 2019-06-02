<template lang="pug">
  div( class="vbs_insurance_page_root" )
    el-row
      el-col( v-bind:span="24" )
        h2 Insurance Page
    el-row
      el-col( v-bind:span="24" )
        el-breadcrumb( separator-class="el-icon-arrow-right" )
          el-breadcrumb-item( to="/" ) Homepage
          el-breadcrumb-item( to="/insurance" ) Insurance
    el-row  
      el-col( v-bind:span="24" )
        el-divider
    el-row
      el-col( v-bind:span="24" )
        el-tabs( v-model="currentTab" )
          el-tab-pane( label="General" name="general" )
            general-insurance-form
          el-tab-pane( label="Saving" name="saving" )
            saving-insurance-form

</template>

<script>
import SavingInsuranceForm from '@/components/SavingInsuranceForm.vue'
import GeneralInsuranceForm from '@/components/GeneralInsuranceForm.vue'

export default {
  components: {
    SavingInsuranceForm,
    GeneralInsuranceForm
  },
  data: function () {
    return {
      currentTab: 'general'
    }
  }
}
</script>

<style lang="scss" scoped>
  .vbs_insurance_page_root {
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
