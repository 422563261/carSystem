<template>
  <transition name="slide">
    <div class="comments" v-show="show">
      <div class="back" @click="_hideComments">&lt;</div>
      <div class="content">
        <div class="pos">
          <h1>好评排行</h1>
          <ul>
            <li v-for="item in posArray" class="item" @click="_getDetail($event)">{{item.opinionWord}}({{item.count}})
            </li>
          </ul>
        </div>
        <div class="neg">
          <h1>差评</h1>
          <ul>
            <li v-for="item in negArray" class="item" @click="_getDetail($event)">{{item.opinionWord}}({{item.count}})</li>
          </ul>
        </div>
      </div>
      <div class="detail">
        <ul>
          <li v-for="(item,index) in sentence" class="item">{{index}}.{{item.detail}}</li>
        </ul>
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
        sentence: []
      }
    },
    props: ['value'],
    methods: {
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
      _getDetail (event) {
        let that = this;
        let word = event.target.textContent;
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
  .comments
    width 898px
    height 516px
    position absolute
    top 170px
    background #83cef4
    color #2f4554
    box-sizing border-box
    padding 50px
    transform translate3d(0, 0, 0)
    &.slide-enter-active, &.slide-leave-active
      transition all .5s
    &.slide-enter, &.slide-leave-active
      opacity 0
      transform translate3d(100%, 0, 0)
    .back
      position: absolute
      top 15px
      left 25px
      font-size 40px
      line-height: 40px
      text-align center
      cursor: pointer;
    .content
      display flex
      .pos, .neg
        display inline-block
        flex 1
        text-align center
        h1
          font-size 24px
          line-height 28px
          margin-bottom 20px
        ul
          width 150px
          margin 0 auto
        .item
          font-size 16px
          line-height 16px
          margin-top 5px
          padding 5px 0
          cursor pointer
    .detail
      width 700px
      margin 20px auto 0
      font-size 16px
      overflow auto
      .item
        font-size 16px
        line-height 16px
        margin-top 5px
</style>
