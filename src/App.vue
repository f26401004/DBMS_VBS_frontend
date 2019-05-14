<template lang="pug">
  div( id="app" )
    el-header( class="vbs_header_container" )
      h3 Virtual Bank v0.1
      el-col(
        class="vbs_header_info_container"
        v-bind:xs="{ span: 12 }"
        v-bind:sm="{ span: 9 }"
        v-bind:md="{ span: 6 }"
        v-bind:lg="{ span: 5 }"
        v-bind:xl="{ span: 3 }"
      )
        i( class="el-icon-s-custom" )
        label Hello, f26401004
        router-link(
          tag="i"
          class="el-icon-s-home hover-button"
          to="/"
        )
        i( class="el-icon-bell hover-button" )
        i( class="el-icon-s-tools hover-button" )
    el-container( class="vbs_main_container" )
      el-aside( width="256px" )
        nav-menu
      router-view
</template>

<script>
import NavMenu from '@/components/NavMenu.vue'

export default {
  name: 'app',
  components: {
    NavMenu
  },
  mounted: function () {
    console.log(this.$route)
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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

.hover-button[class^=el-icon-] {
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
</style>
