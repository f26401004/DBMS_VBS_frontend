<template lang="pug">
  div
    el-row
      el-col( v-bind:span="24" )
        ve-histogram( v-bind:data="info" v-bind:extend="chartExtends" )
</template>

<script>
export default {
  data: function () {
    return {
      chartExtends: {
        series: {
          label: {
            normal: {
              show: true
            }
          }
        }
      },
      info: {
        columns: ['type', 'value'],
        rows: []
      }
    }
  },
  mounted: async function () {
    try {
      const request = await fetch('http://localhost:3000/raw-sql', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          sentence: 'SELECT COUNT(*) AS num, SUM(value) AS sum, AVG(value) AS avg, MAX(value) AS max, MIN(value) AS min FROM Transactions'
        })
      })
      const result = (await request.json())[0]
      this.info.rows = Object.keys(result).map(key => ({
        type: key,
        value: result[key]
      }))
    } catch (error) {
      console.log(error)
      // this.$message.error(msg)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
