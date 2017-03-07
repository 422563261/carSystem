<template>
  <div class="header">
    <div class="logo">
      <img src="./logo.png" alt="logo" width="186" height="53">
    </div>
    <div class="title">口碑分析网站</div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'header',
    data () {
      return {}
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .header
    padding 0 10px 10px 10px
    background #0a6cda
    overflow hidden
    .logo
      float left
    .title
      float left
      font-size 28px
      margin-top 17px
      margin-left 15px
      color #fff
</style>
