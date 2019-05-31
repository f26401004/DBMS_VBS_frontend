<template lang="pug">
  el-container( class="vbs_index_page_root" )
    el-row
      el-col( v-bind:span="24" )
        el-row
          el-col( v-bind:span="24" )
            el-row( type="flex" justify="start" align="middle" v-bind:gutter="16" )
              el-col( v-bind:span="0.5" )
                i( class="el-icon-s-marketing" )
              el-col( v-bind:span="23.5" )
                h3 Exchange Rates
        el-row
          el-col( v-bind:span="24" )
            el-alert(
              title="info"
              type="info"
              description="Here display the recent year of, the 1st of each month of exchange rate and current exchange rate."
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
        el-row
          el-divider
        el-row
          el-col( v-bind:span="24" )
            el-row( type="flex" justify="start" align="middle" )
              el-col( v-bind:span="22" )
                el-tag Current Exchange Rates
              el-col( v-bind:span="2" )
                el-link( href="https://rate.bot.com.tw/xrt?Lang=zh-TW" target="_blank" ) See More
            el-row( v-bind:gutter="16" )
              el-col( v-bind:span="8" )
                el-card( shadow="hover" )
                  div( slot="header" ) USD TO TWD
                  div {{ currentExchangeData.USDTWD }}
              el-col( v-bind:span="8" )
                el-card( shadow="hover" )
                  div( slot="header" ) USD TO EUR
                  div {{ currentExchangeData.USDEUR }}
              el-col( v-bind:span="8" )
                el-card( shadow="hover" )
                  div( slot="header" ) USD TO JPY
                  div {{ currentExchangeData.USDJPY }}
            el-row( v-bind:gutter="16" )
              el-col( v-bind:span="8" )
                el-card( shadow="hover" )
                  div( slot="header" ) USD TO GBP
                  div {{ currentExchangeData.USDGBP }}
              el-col( v-bind:span="8" )
                el-card( shadow="hover" )
                  div( slot="header" ) USD TO CAD
                  div {{ currentExchangeData.USDCAD }}
              el-col( v-bind:span="8" )
                el-card( shadow="hover" )
                  div( slot="header" ) USD TO SGD
                  div {{ currentExchangeData.USDSGD }}
      el-col( v-bind:span="24" )
        el-row
          el-col( v-bind:span="24" )
            el-row( type="flex" justify="start" align="middle" v-bind:gutter="16" )
              el-col( v-bind:span="0.5" )
                i( class="el-icon-money" )
              el-col( v-bind:span="23.5" )
                h3 Recent Transactions
        el-row
          el-col( v-bind:span="24" )
            el-alert(
              title="info"
              type="info"
              description="Here display all transactions in recent two month."
              show-icon
              v-bind:closable="false"
            )
        el-row
          el-col( v-bind:span="24" )
            ve-histogram( v-bind:data="transactionData" v-bind:extend="exchangeRatioExtends" )

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
      },
      currentExchangeData: [],
      transactionData: {
        columns: ['timestamp', 'value'],
        rows: []
      },
      tables: ['Users', 'Cards', 'CardTypes', 'Transactions', 'TransactionTypes', 'Insruances', 'InsuranceTypes', 'Deposits', 'DepositTypes', 'InterestRates']
    }
  },
  mounted: async function () {
    try {
      const key = config.accessKey
      const date = new Date()
      date.setMonth(date.getMonth() - 12)
      date.setDate(1)
      for (let i = 0 ; i < 12 ; ++i) {
        const dateString = `${date.getFullYear()}-${date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1) }-${date.getDate() > 9 ? date.getDate() : '0' + (date.getDate())}`
        const request = await fetch(`http://apilayer.net/api/historical?date=${dateString}&access_key=${key}`)
        const result = await request.json()
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
      // fetch for all current exchange rate based on USD
      let request = await fetch(`http://apilayer.net/api/live?currencies=JPY,EUR,GBP,CAD,SGD,TWD&access_key=${key}`)
      let result = await request.json()
      console.log(result)
      this.currentExchangeData = result.quotes
      // fetch for transaction amount
      const currentDate = new Date()
      currentDate.setMonth(currentDate.getMonth() - 2)
      let sentence = `SELECT value, createdAt, type FROM Transactions WHERE createdAt BETWEEN '${currentDate.getFullYear()}-${currentDate.getMonth() + 1 > 9 ? currentDate.getMonth() + 1 : '0' + (currentDate.getMonth() + 1)}-${currentDate.getDate() > 9 ? currentDate.getDate() : '0' + currentDate.getDate()} 00:00:00'`
      currentDate.setMonth(currentDate.getMonth() + 2)
      sentence = `${sentence} AND '${currentDate.getFullYear()}-${currentDate.getMonth() + 1 > 9 ? currentDate.getMonth() + 1 : '0' + (currentDate.getMonth() + 1)}-${currentDate.getDate() > 9 ? currentDate.getDate() : '0' + currentDate.getDate()} 23:59:59'`
      request = await fetch('http://localhost:3000/raw-sql', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          sentence: sentence,
          permission: 1,
          tableName: 'Transactions'
        })
      })
      result = await request.json()
      this.transactionData.rows = result.filter(target => target.type < 11).map(target => {
        return {
          value: target.value,
          timestamp: target.createdAt
        }
      }).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
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
