<template lang="pug">
  div( id="app" )
    el-header( class="vbs_header_container" )
      el-row( v-bind:style="{ width: '100%' }" type="flex" justify="flex-start" align="middle" )
        el-col( v-bind:span="4" )
          router-link( tag="h3" to="/" class="vbs_header_title" ) Virtual Bank v0.1
        el-col(
          v-bind:span="20"
        )
          el-row( type="flex" justify="end" align="middle"  v-bind:gutter="8" )
            el-col( v-bind:span="3" )
              el-row( type="flex" justify="center" v-bind:gutter="8" )
                el-col( v-bind:span=".5" )
                  i( class="el-icon-s-custom" )
                el-col( v-bind:span="23.5" )
                  label Hello, f26401004
            el-col( v-bind:span=".5" )
              router-link(
                tag="i"
                class="el-icon-s-home vbs_hover_button"
                to="/"
              )
            el-col( v-bind:span=".5" )
              i( class="el-icon-bell vbs_hover_button" )
            el-col( v-bind:span=".5" )
              i( class="el-icon-s-tools vbs_hover_button" )
    el-container( class="vbs_main_container" )
      el-aside( width="256px" )
        nav-menu
      el-scrollbar( wrapClass="vbs_scrollbar_wrap_container" viewClass="vbs_scrollbar_view_container" )
        router-view
</template>

<script>
import NavMenu from '@/components/NavMenu.vue'

export default {
  name: 'app',
  components: {
    NavMenu
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  width: 100%;
  height: 100%;
}
body {
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
}

.vbs_main_container {
  width: 100vw;
  height: calc(100vh - 60px);
}
.vbs_header_container {
  display: flex;
  justify-content: space-between;
  justify-items: flex-start;
  align-items: center;
  align-content: center;
  background-color: #2c3e50;

  color: white;
  .vbs_header_info_container {
    display: grid;
    grid-template-columns: 32px auto 32px 32px 32px;
    grid-template-rows: 1fr;
    grid-column-gap: 16px;
    justify-content: flex-end;
    justify-items: center;
    align-content: center;
    align-items: center;
  }
}

.vbs_hover_button[class^=el-icon-] {
  display: inline-flex;
  justify-content: center;
  justify-items: center;
  align-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  margin: 0;
  padding: 0;
  background-color: transparent;
  border-radius: 100%;
  cursor: pointer;

  color: darken(white, 10%);
  &:before {
    font-size: 16px;
  }
  &:hover {
    background-color: darken(white, 50%);
  }
}
.vbs_header_title {
  cursor: pointer;
  &:hover {
    color: darken(white, 20%);
  }
}
.vbs_scrollbar_view_container {
  width: calc(100vw - 256px);
}
.vbs_scrollbar_wrap_container {
  overflow: auto !important;
}
</style>
