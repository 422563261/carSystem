<template>
  <div id="app">
    <v-header></v-header>
    <div class="bodyer">
      <form action="" class="chooseCar" id="chooseCar">
        <span class="name">汽车型号:</span>
        <select name="car" id="car" class="car" @change="_updateData($event)">
          <option value=""></option>
          <option :value="item.category" v-for="item in category">{{item.category}}</option>
        </select>
      </form>
      <div class="origin">
        <span class="name">口碑来源:</span>
        <span class="text" v-show="origin">汽车之家</span>
      </div>
      <analysis :value="value" ref="analysis" v-show="origin"></analysis>
      <div class="tips" v-show="origin"><a @click="_showComments">查看更多评论</a></div>
      <comments ref="comments" :value="value"></comments>
      <feature ref="feature" :value="value" v-show="origin"></feature>
    </div>
  </div>
</template>

<script>
  import API from 'api'
  import analysis from 'components/analysis/analysis'
  import comments from 'components/comments/comments'
  import feature from 'components/feature/feature'
  import header from 'components/header/header'
  export default {
    name: 'app',
    data () {
      return {
        'value': '',
        'origin': false,
        'category': [],
        'countScore': [],
        'countTop5': []
      }
    },
    components: {
      analysis, comments, feature, 'v-header': header
    },
    created () {
      let that = this;
      API.getCategory()
        .then(function (res) {
          res = res.data;
          if (res.errno === 0) {
            that.category = res.data;
          }
        })
        .catch(function (err) {
          console.log(err);
        })
    },
    mounted () {
    },
    methods: {
      _updateData (event) {
        this.value = event.target.value;
        if (!this.value) {
          this.origin = false;
        } else {
          this.$nextTick(function () {
            this._originFrom();
            this._getCountScore();
            this._getCountTop5();
            this._getCommons();
            this._getFeature();
          })
        }
      },
      _getCountScore () {
        this.$refs['analysis'].getCountScore();
      },
      _getCountTop5 () {
        this.$refs['analysis'].getCountTop5();
      },
      _getCommons () {
        this.$refs['comments'].getComments();
      },
      _getFeature () {
        this.$refs['feature'].getFeature();
      },
      _originFrom () {
        this.origin = true
      },
      _showComments () {
        this.$refs['comments'].showComments();
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    cursor default
    .bodyer
      position relative
      overflow hidden
      width 1000px
      min-height 300px
      margin 0 auto
      padding 50px 25px
      box-sizing border-box
      border-top none
      .chooseCar
        .name
          display inline-block
          line-height 20px
        .car
          display inline-block
          width 120px
          margin-left 10px
          padding-left 5px
          vertical-align top
      .origin
        position: absolute
        width 150px
        right 80px
        top 50px
        line-height 20px
        .name
          position: relative
          left 0
        .text
          margin-left 10px
      .tips
        height 16px
        font-size 16px
        padding-left 300px
        text-align center
</style>
