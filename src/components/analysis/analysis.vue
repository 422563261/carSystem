<template>
  <div class="analysis">
    <div class="pie" id="pie"></div>
    <div class="bar" id="bar"></div>
    <div class="tips">123</div>
  </div>
</template>
<script type="text/ecmascript-6">
  import echarts from 'echarts'
  import API from 'api'
  export default {
    name: 'analysis',
    data () {
      return {}
    },
    props: ['value'],
    methods: {
      getCountScore () {
        console.log(1)
        let that = this;
        API.getCountScore(that.value)
          .then(function (res) {
            res = res.data;
            if (res.errno === 0) {
              that.countScore = res.data[0];
              let pieOption = {
                title: {
                  text: '口碑指数',
                  subtext: that.value,
                  x: 'center'
                },
                series: [{
                  name: '评价',
                  type: 'pie',
                  radius: '50%',
                  data: [
                    {
                      value: that.countScore.positiveScore,
                      name: '好'
                    },
                    {
                      value: that.countScore.negativeScore,
                      name: '不好'
                    }
                  ],
                  itemStyle: {
                    emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }]
              };
              that.$nextTick(function () {
                that.setPie(pieOption);
              })
            }
          })
          .catch(function (err) {
            console.log(err)
          })
      },
      getCountTop5 () {
        let that = this;
        API.getCountTop5(that.value)
          .then(function (res) {
            res = res.data;
            if (res.errno === 0) {
              that.countTop5 = res.data;
              let posArray = [];
              let negArray = [];
              that.countTop5.forEach(function (value) {
                if (value.polarity === 1) {
                  posArray.push(value);
                } else {
                  negArray.push(value);
                }
              });
              let barOption = {
                title: {
                  text: '评价TOP5',
                  subtext: that.value,
                  left: 'center',
                  top: 'top'
                },
                tooltip: {
                  trigger: 'item',
                  formatter: '{a} <br/>{b} : {c}'
                },
                toolbox: {
                  orient: 'vertical',
                  top: 'center'
                },
                legend: {
                  orient: 'vertical',
                  left: 'left'
                },
                calculable: true,
                series: [
                  {
                    name: '好评TOP5',
                    type: 'funnel',
                    width: '30%',
                    height: '45%',
                    left: '10%',
                    top: '30%',
                    data: [
                      {value: posArray[0].count, name: posArray[0].opinionWord},
                      {value: posArray[1].count, name: posArray[1].opinionWord},
                      {value: posArray[2].count, name: posArray[2].opinionWord},
                      {value: posArray[3].count, name: posArray[3].opinionWord},
                      {value: posArray[4].count, name: posArray[4].opinionWord}
                    ]
                  },
                  {
                    name: '差评TOP5',
                    type: 'funnel',
                    width: '30%',
                    height: '45%',
                    left: '55%',
                    top: '30%',
                    data: [
                      {value: negArray[0].count, name: negArray[0].opinionWord},
                      {value: negArray[1].count, name: negArray[1].opinionWord},
                      {value: negArray[2].count, name: negArray[2].opinionWord},
                      {value: negArray[3].count, name: negArray[3].opinionWord},
                      {value: negArray[4].count, name: negArray[4].opinionWord}
                    ]
                  }
                ]
              };
              that.$nextTick(function () {
                that.setBar(barOption);
              })
            }
          })
          .catch(function (err) {
            console.log(err);
          })
      },
      setPie (option) {
        let pie = echarts.init(document.getElementById('pie'));
        pie.setOption(option);
      },
      setBar (option) {
        let bar = echarts.init(document.getElementById('bar'));
        bar.setOption(option);
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .analysis
    margin-top 100px
    display flex
    height 300px
    .pie
      display inline-block
      width 300px
      height 300px
    .bar
      display inline-block
      flex 1
      position: relative
</style>
