<template>
  <div id="app">
    <div class="header">
      <h1>口碑特征提取与情感分析系统</h1>
    </div>
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
    </div>
  </div>
</template>

<script>
  import API from 'api'
  import analysis from 'components/analysis/analysis'
  import comments from 'components/comments/comments'
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
      analysis, comments
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
          this._originFrom();
          this._getCountScore();
          this._getCountTop5();
        }
      },
      _getCountScore () {
        this.$refs['analysis'].getCountScore();
      },
      _getCountTop5 () {
        this.$refs['analysis'].getCountTop5();
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
    .header
      width 1000px
      margin 0 auto
      font-size 40px
      text-align center
      padding 20px 10px
      box-sizing border-box
      border 1px solid #999898
    .bodyer
      position relative
      overflow hidden
      width 1000px
      min-height 300px
      margin 0 auto
      padding 50px 50px
      box-sizing border-box
      border 1px solid #999898
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
