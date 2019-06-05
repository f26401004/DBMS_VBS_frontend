<template lang="pug">
  div( class="vbs_table_page_root" )
    el-row
      el-col( v-bind:span="24" )
        h2 Table Page
    el-row
      el-col( v-bind:span="24" )
        el-breadcrumb( separator-class="el-icon-arrow-right" )
          el-breadcrumb-item( to="/" ) Homepage
          el-breadcrumb-item( to="/table" ) Table
    el-row
      el-col( v-bind:span="24" )
        el-divider
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
                v-on:click="rawQuery"
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
      displayTableColumns: [],
      tableData: []
    }
  },
  methods: {
    rawQuery: async function () {
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
          const selectedColumns = Object.keys(this.tableData[0])
          this.displayTableColumns = selectedColumns
        } else {
          this.querySentence = ''
        }
        this.$message.success('Successful operation!!')
      } catch (error) {
        const msg = await error.text()
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
