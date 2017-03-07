<template>
  <transition name="slide">
    <div class="main-comments" v-show="show">
      <div class="back" @click="_hideComments">&lt;</div>
      <div class="wrapper">
        <div class="info">
          <div class="title">
            <span class="hot"></span>
            <span class="name">好评排行</span>
            <span class="time">更新时间{{getDate}}</span>
            <span class="more">更多>></span>
          </div>
          <div class="nav">
            <span class="rank">排名</span>
            <span class="count">赞同</span>
            <span class="comments">评价</span>
          </div>
          <ul class="list-wrapper">
            <li class="list" v-for="(item,index) in posArray" @click="_getDetail($event,item.opinionWord)">
              <span class="rank">{{index+1}}</span>
              <span class="count">{{item.count}}人</span>
              <span class="comments">{{item.opinionWord}}</span>
            </li>
          </ul>
        </div>
        <div class="info">
          <div class="title">
            <span class="hot" id="hot2"></span>
            <span class="name">差评排行</span>
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
            <li class="list" v-for="(item,index) in negArray" @click="_getDetail($event,item.opinionWord)">
              <span class="rank">{{index+1}}</span>
              <span class="count">{{item.count}}人</span>
              <span class="comments">{{item.opinionWord}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="detail" v-show="sentence.length">
        <div class="title">特征句子</div>
        <div class="wrapper-content">
          <ul>
            <li v-for="(item,index) in sentence" class="item">
              <div class="num">{{index}}</div>
              <div class="content" v-html="replace(item.detail,item.opinionWord)"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import API from 'api'
  export default {
    name: 'comments',
    data () {
      return {
        show: false,
        comments: [],
        posArray: [],
        negArray: [],
        sentence: [],
        time: ''
      }
    },
    props: ['value'],
    computed: {
      getDate () {
        let date = new Date();
        date = date.toLocaleDateString();
        return date;
      }
    },
    methods: {
      replace (value, word) {
        if (!value) {
          return;
        }
        let count = value.indexOf(word);
        if (count === -1) {
          return;
        }
        let word1 = value.substr(0, count);
        let word2 = value.substr(count + word.length);
        let word3 = '<mark>' + word + '</mark>';
        word = word1 + word3 + word2;
        return word;
      },
      showComments () {
        this.show = true;
      },
      _hideComments () {
        this.show = false;
      },
      getComments () {
        let that = this;
        API.getMore(that.value)
          .then(function (res) {
            res = res.data;
            if (res.errno === 0) {
              that.comments = res.data;
              that.comments.forEach(function (value) {
                if (value.polarity === 1) {
                  that.posArray.push(value);
                } else {
                  that.negArray.push(value);
                }
              });
            }
          })
          .catch(function (res) {
            console.log(res);
          })
      },
      _getDetail (event, word) {
        let that = this;
        API.getDetail(that.value, word)
          .then(function (res) {
            res = res.data;
            if (res.errno === 0) {
              that.sentence = res.data;
            }
          })
          .catch(function (err) {
            console.log(err);
          })
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .main-comments
    width 100%
    position absolute
    top 170px
    bottom 0
    left 0
    background #fff
    color #2f4554
    box-sizing border-box
    padding 50px
    transform translate3d(0, 0, 0)
    z-index 999
    overflow auto
    &.slide-enter-active, &.slide-leave-active
      transition all .5s
    &.slide-enter, &.slide-leave-active
      opacity 0
      transform translate3d(100%, 0, 0)
    .back
      position: absolute
      top 0px
      left 25px
      font-size 40px
      line-height: 40px
      text-align center
      cursor: pointer;
    .wrapper
      display flex
      margin-bottom 50px
      .info
        margin 0 51.5px
        .title
          width 302px
          padding 0 10px 0 15px
          height 42px
          line-height 42px
          font-size 16px
          background #f9e5c9
          position: relative
          .hot, .name, .time, .more
            display inline-block
            vertical-align top
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
          width 300px
          height 35px
          line-height 35px
          padding 0 10px 0 15px
          background-color: #f6f6f6
          font-size 0
          color #999
          border-left 1px solid #ececec
          border-right 1px solid #ececec
          .rank, .comments, .count
            display inline-block
            font-size 12px
            text-align center
          .rank
            width 30px
          .count
            width 60px
          .comments
            width 110px

        .list-wrapper
          width 300px
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
            cursor: pointer;
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
              width 60px
            .comments
              width 110px
              font-size 16px
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

    .detail
      .title
        height 42px
        line-height 42px
        font-size 16px
        padding 0 10px 0 15px
        background-color: #f9e5c9
      .wrapper-content
        border 1px solid #ececec
        border-top 0
        .item
          display flex
          margin 0 15px
          height 50px
          border-bottom 1px solid #ececec
          .num
            display inline-block
            flex 0 0 18px
            width 18px
            height 18px
            line-height 18px
            margin-top 16px
            background #d6d6d6
            color #fff
            text-align center
          .content
            display inline-block
            flex 1
            padding 0 15px
            line-height 50px
            overflow hidden
            white-space: nowrap
            text-overflow: ellipsis

</style>
