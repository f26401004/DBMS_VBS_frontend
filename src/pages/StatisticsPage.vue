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
</template>

<script>
export default {

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
