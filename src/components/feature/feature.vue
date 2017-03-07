<template>
  <div class="feature">
    <div class="wrapper">
      <div class="info">
        <div class="title">
          <span class="hot"></span>
          <span class="name">{{info1Title}}</span>
          <span class="time">更新时间{{getDate}}</span>
          <span class="more">更多>></span>
        </div>
        <div class="nav">
          <span class="rank">排名</span>
          <span class="count">赞同</span>
          <span class="comments">评价</span>
          <span class="kinds">类别</span>
          <span class="cmp">较昨日排名</span>
        </div>
        <ul class="list-wrapper">
          <li class="list" v-for="(item,index) in info1">
            <span class="rank">{{index+1}}</span>
            <span class="count">{{item.count}}人</span>
            <span class="comments">{{item.opinionWord}}</span>
            <span class="kinds">{{info1Title}}</span>
            <span class="cmp">持平</span>
            <span class="hot">热</span>
          </li>
        </ul>
      </div>
      <div class="info">
        <div class="title">
          <span class="hot" id="hot2"></span>
          <span class="name">{{info2Title}}</span>
          <span class="time">更新时间{{getDate}}</span>
          <span class="more">更多>></span>
        </div>
        <div class="nav">
          <span class="rank">排名</span>
          <span class="count">赞同</span>
          <span class="comments">评价</span>
          <span class="kinds">类别</span>
          <span class="cmp">较昨日排名</span>
        </div>
        <ul class="list-wrapper">
          <li class="list" v-for="(item,index) in info2">
            <span class="rank">{{index+1}}</span>
            <span class="count">{{item.count}}人</span>
            <span class="comments">{{item.opinionWord}}</span>
            <span class="kinds">{{info2Title}}</span>
            <span class="cmp">持平</span>
            <span class="hot">热</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="wrapper">
      <div class="info">
        <div class="title">
          <span class="hot" id="hot3"></span>
          <span class="name">{{info3Title}}</span>
          <span class="time">更新时间{{getDate}}</span>
          <span class="more">更多>></span>
        </div>
        <div class="nav">
          <span class="rank">排名</span>
          <span class="count">赞同</span>
          <span class="comments">评价</span>
          <span class="kinds">类别</span>
          <span class="cmp">较昨日排名</span>
        </div>
        <ul class="list-wrapper">
          <li class="list" v-for="(item,index) in info3">
            <span class="rank">{{index+1}}</span>
            <span class="count">{{item.count}}人</span>
            <span class="comments">{{item.opinionWord}}</span>
            <span class="kinds">{{info3Title}}</span>
            <span class="cmp">持平</span>
            <span class="hot">热</span>
          </li>
        </ul>
      </div>
      <div class="info">
        <div class="title">
          <span class="hot" id="hot4"></span>
          <span class="name">{{info4Title}}</span>
          <span class="time">更新时间{{getDate}}</span>
          <span class="more">更多>></span>
        </div>
        <div class="nav">
          <span class="rank">排名</span>
          <span class="count">赞同</span>
          <span class="comments">评价</span>
          <span class="kinds">类别</span>
          <span class="cmp">较昨日排名</span>
        </div>
        <ul class="list-wrapper">
          <li class="list" v-for="(item,index) in info4">
            <span class="rank">{{index+1}}</span>
            <span class="count">{{item.count}}人</span>
            <span class="comments">{{item.opinionWord}}</span>
            <span class="kinds">{{info4Title}}</span>
            <span class="cmp">持平</span>
            <span class="hot">热</span>
          </li>
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
        info4: [],
        info1Title: '',
        info2Title: '',
        info3Title: '',
        info4Title: ''
      }
    },
    props: ['value'],
    computed: {
      getDate () {
        let date = new Date();
        this.time = date.toLocaleDateString();
      }
    },
    methods: {
      getFeature () {
        let that = this;
        API.getFeature(that.value)
          .then(function (res) {
            console.log(res)
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
        this.info1Title = this.info1[0].feature;
        this.info2Title = this.info2[0].feature;
        this.info3Title = this.info3[0].feature;
        this.info4Title = this.info4[0].feature;
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
        margin 0 51.5px
        .title
          width 347px
          padding 0 10px 0 15px
          height 42px
          line-height 42px
          font-size 16px
          background #f9e5c9
          position: relative
          .hot, .name, .time, .more
            display inline-block
            vertical-align top
          .hot
            width 30px
            height 42px
            background url("./hot.png") no-repeat 0 8px
            margin-right 10px
          .time
            margin-left 10px
            font-size 12px
            color #999
          .more
            position absolute
            right 10px
            font-size 12px
            color #555
            cursor pointer
        .nav
          width 345px
          height 35px
          line-height 35px
          padding 0 10px 0 15px
          background-color: #f6f6f6
          font-size 0
          color #999
          border-left 1px solid #ececec
          border-right 1px solid #ececec
          .rank, .product, .comments, .cmp, .count, .kinds
            display inline-block
            font-size 12px
            text-align center
          .rank
            width 30px
          .count
            width 40px
          .comments
            width 110px
          .kinds
            width 42px
          .cmp
            width 83px

        .list-wrapper
          width 345px
          padding 0 10px 0 15px
          max-height 500px
          overflow auto
          border 1px solid #ececec
          border-top none
          .list
            height 50px
            font-size 0
            border-bottom 1px solid #ececec
            color #555
            .rank, .comments, .cmp, .count, .kinds, .hot
              display inline-block
              font-size 12px
              line-height 50px
              text-align center
            .hot
              font-size 0
            .rank
              width 18px
              height 18px
              line-height 18px
              margin-top 16px
              margin-right 12px
              font-size 16px
              color #fff
              background #d6d6d6
            .count
              width 40px
            .comments
              width 110px
              font-size 16px
            .kinds
              width 42px
            .cmp
              width 83px
              color #999
            &:nth-of-type(1), &:nth-of-type(2), &:nth-of-type(3)
              .rank
                background #ff6e3b
              .hot
                width 16px
                height 16px
                line-height 16px
                margin-top 17px
                font-size 12px
                color #fff
                background #ff3737

      #hot2
        background url("./hot.png") no-repeat -72px 7px
      #hot4
        background url("./hot.png") no-repeat -171px 8px
</style>
