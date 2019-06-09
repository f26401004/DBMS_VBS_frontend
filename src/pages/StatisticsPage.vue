<template lang="pug">
  div( class="vbs_statistics_page_root" )
    el-row
      el-col( v-bind:span="24" )
        h2 Statistics Page
    el-row
      el-col( v-bind:span="24" )
        el-breadcrumb( separator-class="el-icon-arrow-right" )
          el-breadcrumb-item( to="/" ) Homepage
          el-breadcrumb-item( to="/statistics" ) Statistics
    el-row
      el-tabs( type="card" )
        el-tab-pane(
          v-for="(iter, index) of tabs"
          v-bind:key="`tab-${iter.name}-${index}`"
          v-bind:label="iter.label"
          v-bind:name="iter.name"
        )
          component( v-bind:is="iter.content" )

</template>

<script>
import UserAnalysis from '@/components/statistics/UserAnalysis.vue'
import TransactionAnalysis from '@/components/statistics/TransactionAnalysis.vue'

export default {
  components: {
    UserAnalysis,
    TransactionAnalysis
  },
  data: function () {
    return {
      tabs: [
        {
          name: 'Users',
          label: 'Users',
          content: UserAnalysis
        },
        {
          name: 'Transactions',
          label: 'Transactions',
          content: TransactionAnalysis
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .vbs_statistics_page_root {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 24px 48px;
    box-sizing: border-box;
  }
</style>
