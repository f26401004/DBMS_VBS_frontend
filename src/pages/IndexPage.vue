<template lang="pug">
  el-container( class="vbs_index_page_root" )
    el-row
      el-col( v-bind:span="24" )
        el-row
          el-col( v-bind:span="24" )
            el-row( type="flex" justify="start" align="middle" v-bind:gutter="16" )
              el-col( v-bind:span="0.5" )
                i( class="el-icon-money" )
              el-col( v-bind:span="23.5" )
                h3 Exchange Rate
        el-row
          el-col( v-bind:span="24" )
            el-alert(
              title="info alert"
              type="info"
              description="Here display the recent year of, the 1st of each month of exchange rate."
              show-icon
              v-bind:closable="false"
            )
        el-row
          el-col( v-bind:span="8" )
            el-row
              el-col( v-bind:span="24" )
                el-tag USD to TWD
              el-col( v-bind:span="24" )
                ve-line( v-bind:data="exchangeTWDData" v-bind:extend="exchangeRatioExtends" )
          el-col( v-bind:span="8" )
            el-row
              el-col( v-bind:span="24" )
                el-tag USD to JPY
              el-col( v-bind:span="24" )
                ve-line( v-bind:data="exchangeJPYData" v-bind:extend="exchangeRatioExtends" )
          el-col( v-bind:span="8" )
            el-row
              el-col( v-bind:span="24" )
                el-tag USD to EUR
              el-col( v-bind:span="24" )
                ve-line( v-bind:data="exchangeEURData" v-bind:extend="exchangeRatioExtends" )

</template>

<script>
import config from '@/plugins/config.json'

export default {
  data: function () {
    return {
      exchangeRatioExtends: {
        series: {
          label: {
            normal: {
              show: true
            }
          }
        }
      },
      exchangeTWDData: {
        columns: ['timestamp', 'value'],
        rows: []
      },
      exchangeJPYData: {
        columns: ['timestamp', 'value'],
        rows: []
      },
      exchangeEURData: {
        columns: ['timestamp', 'value'],
        rows: []
      }
    }
  },
  mounted: async function () {
    try {
      const key = config.accessKey
      const date = new Date()
      date.setMonth(date.getMonth() - 11)
      date.setDate(1)
      for (let i = 0 ; i < 12 ; ++i) {
        const dateString = `${date.getFullYear()}-${date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1) }-${date.getDate() > 9 ? date.getDate() : '0' + (date.getDate())}`
        const request = await fetch(`http://apilayer.net/api/historical?date=${dateString}&access_key=${key}`)
        const result = await request.json()
        console.log(result)
        this.exchangeTWDData.rows.push({
          timestamp: dateString,
          value: result.quotes.USDTWD.toFixed(2)
        })
        this.exchangeJPYData.rows.push({
          timestamp: dateString,
          value: result.quotes.USDJPY.toFixed(2)
        })
        this.exchangeEURData.rows.push({
          timestamp: dateString,
          value: result.quotes.USDEUR.toFixed(2)
        })
        date.setMonth(date.getMonth() + 1)
      }
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style lang="scss" scoped>
  .vbs_index_page_root {
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
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>
