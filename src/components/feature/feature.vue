<template>
  <div class="feature">
    <div class="wrapper">
      <div class="info">
        <h1>{{info1[0].feature}}</h1>
        <ul>
          <li v-for="(item,index) in info1">{{index+1}}.{{item.opinionWord}}({{item.count}})</li>
        </ul>
      </div>
      <div class="info">
        <h1>{{info2[0].feature}}</h1>
        <ul>
          <li v-for="(item,index) in info2">{{index+1}}.{{item.opinionWord}}({{item.count}})</li>
        </ul>
      </div>
    </div>
    <div class="wrapper">
      <div class="info">
        <h1>{{info3[0].feature}}</h1>
        <ul>
          <li v-for="(item,index) in info3">{{index+1}}.{{item.opinionWord}}({{item.count}})</li>
        </ul>
      </div>
      <div class="info">
        <h1>{{info4[0].feature}}</h1>
        <ul>
          <li v-for="(item,index) in info4">{{index+1}}.{{item.opinionWord}}({{item.count}})</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import API from 'api'
  export default {
    name: 'feature',
    data () {
      return {
        feature: {},
        info1: [],
        info2: [],
        info3: [],
        info4: []
      }
    },
    props: ['value'],
    methods: {
      getFeature () {
        let that = this;
        API.getFeature(that.value)
          .then(function (res) {
            res = res.data;
            if (res.errno === 0) {
              that.feature = res.data;
              that._splitFeature();
            }
          })
          .catch(function (err) {
            console.log(err)
          })
      },
      _splitFeature () {
        this.info1 = this.feature[0];
        this.info2 = this.feature[1];
        this.info3 = this.feature[2];
        this.info4 = this.feature[3];
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .feature
    margin-top 100px
    .wrapper
      display flex
      margin-bottom 50px
      .info
        flex 1
        text-align center
        h1
          font-size 28px
          line-height 28px
          margin-bottom 20px
        ul
          width 200px
          margin 0 auto
          li
            font-size 16px
            line-height 16px
            margin-top 10px
</style>
