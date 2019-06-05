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
          el-breadcrumb-item( to="/insurance/apply" ) Apply
    el-row  
      el-col( v-bind:span="24" )
        el-divider
    el-row( type="flex" align="middle" )
      el-col( v-bind:span="22" )
        el-radio-group( v-model="currentType" )
          el-radio-button( label="General" ) General 
          el-radio-button( label="Saving" ) Saving 
      el-col( v-bind:span="2" )
        el-row( type="flex" justify="end" align="middle" )
          el-button( type="primary" v-on:click="addTab" ) New Case
    el-row
      el-col( v-bind:span="24" )
        el-tabs(
          v-model="editableTabsValue[currentType.toLowerCase()]"
          type="card"
          v-on:tab-remove="removeTab"
          closable
        )
          el-tab-pane(
            v-for="(item, index) of editableTabs[currentType.toLowerCase()]"
            v-bind:key="item.name"
            v-bind:label="item.title"
            v-bind:name="item.name"
            v-on:tab-remove="removeTab(editableTabsValue[currentType.toLowerCase()])"
          )
            component( v-bind:is="item.content" )
</template>

<script>
import SavingInsuranceForm from '@/components/SavingInsuranceForm.vue'
import GeneralInsuranceForm from '@/components/GeneralInsuranceForm.vue'
import UUIDV4 from 'uuid/v4'

export default {
  components: {
    SavingInsuranceForm,
    GeneralInsuranceForm
  },
  data: function () {
    return {
      currentType: 'General',
      editableTabsValue: {
        general: '',
        saving: ''
      },
      editableTabs: {
        general: [
          {
            title: 'New Case',
            name: UUIDV4(),
            content: GeneralInsuranceForm
          }
        ],
        saving: [
          {
            title: 'New Case',
            name: UUIDV4(),
            content: SavingInsuranceForm
          }
        ]
      }
    }
  },
  methods: {
    removeTab: function (targetName) {
      if (this.editableTabsValue[this.currentType.toLowerCase()] === targetName) {
        console.log('test')
        const index = this.editableTabs[this.currentType.toLowerCase()].findIndex(target => target.name === this.editableTabsValue)
        if (index !== this.editableTabs[this.currentType.toLowerCase()].length - 1) {
          this.editableTabsValue[this.currentType.toLowerCase()] = this.editableTabs[this.currentType.toLowerCase()][index + 1].name
        } else {
          if (index - 1 > 0) {
            this.editableTabsValue[this.currentType.toLowerCase()] = this.editableTabsValue[this.currentType.toLowerCase()][index - 1].name
          } else {
            this.editableTabsValue[this.currentType.toLowerCase()] = ''
          }
        }
      }
      this.editableTabs[this.currentType.toLowerCase()] = this.editableTabs[this.currentType.toLowerCase()].filter(tab => tab.name !== targetName)
    },
    addTab: function () {
      this.editableTabs[this.currentType.toLowerCase()].push({
        title: `New Case`,
        name: UUIDV4(),
        content: this.currentType === 'General' ? GeneralInsuranceForm : SavingInsuranceForm
      })
    }
  },
  mounted: function () {
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
</style>
