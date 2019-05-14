<template lang="pug">
  div(class="vbs_table_page_root")
    h2 {{ $route.params.type.toUpperCase() }} Table
    el-breadcrumb( separator-class="el-icon-arrow-right" )
      el-breadcrumb-item( to="/" ) Homepage
      el-breadcrumb-item( to="/table" ) Table
      el-breadcrumb-item( v-bind:to="`/table/${$route.params.type}`" ) {{ $route.params.type.toUpperCase() }}
    el-divider
    el-container( class="vbs_query_container" )
      i( class="el-icon-s-promotion" )
      h4 Query Section
      el-alert(
        title="Description:"
        type="info"
        description="You can input the formal SQL expression to query the database in your need."
      )
      el-col( v-bind:span="24" )
        el-input(
          placeholder="Please input formal SQL expression here ..."
          v-model="targetCode"
          v-bind:clearable="true"
        )
          el-button(
            slot="append"
            icon="el-icon-search"
          )
    el-divider
    el-container( class="vbs_result_container" )
      el-row(
        type="flex"
        justify="space-between"
      )
        el-col( v-bind:span="22" )
          i( class="el-icon-receiving" )
          h4 Result Section
        el-col( v-bind:span="2" )
          el-button(
            type="primary"
            icon="el-icon-plus"
          ) Add row
      el-alert(
        title="Description:"
        type="info"
        description="The query result will display in here. Also, you can add some data to the database with table operation."
      )
      el-table
        el-table-column(
          v-for="(iter, index) of tableTypes[$route.params.type]"
          v-bind:key="`vbs_${$route.params.type}_table_${iter}`"
          v-bind:prop="iter.name"
          v-bind:label="iter.name"
          v-bind:width="iter.width"
        )
        el-table-column(
          fixed="right"
          label="Operation"
          width="120"
        )
          template( slot-scope="scope" )
            el-button(
              type="text"
              size="small"
              icon="el-icon-delete"
            ) Delete
            el-button(
              type="text"
              size="small"
              icon="el-icon-edit"
            ) Edit
</template>

<script>
export default {
  data: function () {
    return {
      targetCode: '',
      tableTypes: {
        users: [
          {
            name: 'username',
            width: 250
          },
          {
            name: 'authCode',
            width: 200
          },
          {
            name: 'SSN',
            width: 150
          },
          {
            name: 'assets',
            width: 200
          },
          {
            name: 'permission',
            width: 100
          },
          {
            name: 'createdAt',
            width: 250
          },
          {
            name: 'updatedAt',
            width: 250
          }
        ],
        cards: [
          {
            name: 'cardNo',
            width: 200
          },
          {
            name: 'csc',
            width: 100
          },
          {
            name: 'type',
            width: 100
          },
          {
            name: 'assets',
            width: 200
          },
          {
            name: 'owner',
            width: 250
          },
          {
            name: 'createdAt',
            width: 250
          },
          {
            name: 'updatedAt',
            width: 250
          }
        ],
        cardTypes: [
          {
            name: 'id',
            width: 100
          },
          {
            name: 'name',
            width: 800
          },
          {
            name: 'createdAt',
            width: 250
          },
          {
            name: 'updatedAt',
            width: 250
          }
        ],
        transactions: [
          {
            name: 'id',
            width: 200
          },
          {
            name: 'user',
            width: 250
          },
          {
            name: 'target',
            width: 250
          },
          {
            name: 'type',
            width: 80
          },
          {
            name: 'value',
            width: 100
          },
          {
            name: 'createdAt',
            width: 250
          },
          {
            name: 'updatedAt',
            width: 250
          }
        ],
        transactionTypes: [
          {
            name: 'id',
            width: 100
          },
          {
            name: 'name',
            width: 800
          },
          {
            name: 'createdAt',
            width: 250
          },
          {
            name: 'updatedAt',
            width: 250
          }
        ],
        insurances: [
          {
            name: 'id',
            width: 200
          },
          {
            name: 'user',
            width: 250
          },
          {
            name: 'type',
            width: 200
          },
          {
            name: 'term',
            width: 100
          },
          {
            name: 'paid',
            width: 100
          },
          {
            name: 'createdAt',
            width: 250
          },
          {
            name: 'updatedAt',
            width: 250
          }
        ],
        insuranceTypes: [
          {
            name: 'id',
            width: 100
          },
          {
            name: 'name',
            width: 800
          },
          {
            name: 'createdAt',
            width: 250
          },
          {
            name: 'updatedAt',
            width: 250
          }
        ],
        deposits: [
          {
            name: 'id',
            width: 200
          },
          {
            name: 'user',
            width: 250
          },
          {
            name: 'type',
            width: 200
          },
          {
            name: 'term',
            width: 100
          },
          {
            name: 'paid',
            width: 100
          },
          {
            name: 'createdAt',
            width: 250
          },
          {
            name: 'updatedAt',
            width: 250
          }
        ],
        depositTypes: [
          {
            name: 'id',
            width: 100
          },
          {
            name: 'name',
            width: 800
          },
          {
            name: 'createdAt',
            width: 250
          },
          {
            name: 'updatedAt',
            width: 250
          }
        ],
        interestRates: [
          {
            name: 'id',
            width: 100
          },
          {
            name: 'name',
            width: 650
          },
          {
            name: 'value',
            width: 150
          },
          {
            name: 'createdAt',
            width: 250
          },
          {
            name: 'updatedAt',
            width: 250
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .vbs_table_page_root {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 60px 14px 50px 157px 50px 1fr;
    grid-row-gap: 8px;
    justify-content: flex-start;
    justify-items: flex-start;
    align-content: center;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    padding: 0 24px;
    box-sizing: border-box;

    .vbs_query_container {
      display: grid;
      grid-template-columns: 32px 1fr;
      grid-template-rows: 32px auto auto;
      grid-template-areas: "icon title"
        "info info"
        "input input";
      grid-row-gap: 16px;
      width: 100%;
      & > i {
        grid-area: icon;
      }
      & > h4 {
        grid-area: title;
        padding: 0;
        margin: 0;
      }
      & > div:nth-child(3) {
        grid-area: info;
      }
      & > div:nth-child(4) {
        grid-area: input;
      }
    }
    .vbs_result_container {
      display: grid;
      grid-template-columns: 100%;
      grid-template-rows: 32px auto auto;
      grid-template-areas: "title"
        "info"
        "table";
      grid-row-gap: 16px;
      width: 100%;
      & > div:nth-child(1) {
        display: flex;
        align-content: center;
        align-items: center;
        grid-area: title;
        h4 {
          display: inline;
          margin: 0 16px;
        }
      }
      & > div:nth-child(2) {
        grid-area: info;
      }
      & > div:nth-child(3) {
        grid-area: table;
      }
    }
  }
</style>
