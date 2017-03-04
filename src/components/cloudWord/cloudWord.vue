<template>
  <div class="cloud" id="cloud"></div>
</template>
<script type="text/ecmascript-6">
  import API from 'api'
  import echarts from 'echarts'
  export default {
    name: 'cloudWord',
    data () {
      return {
        countTop5: []
      }
    },
    mounted () {
      this._getCountTop5();
    },
    props: ['value'],
    methods: {
      _getCountTop5 () {
        let that = this;
        API.getCountTop5(that.value)
          .then(function (res) {
            res = res.data;
            if (res.errno === 0) {
              that.countTop5 = res.data;
              let cloudOption = {
                title: {
                  text: 'Google Trends',
                  link: 'http://www.google.com/trends/hottrends'
                },
                tooltip: {
                  show: true
                },
                series: [{
                  name: 'Google Trends',
                  type: 'wordcloud',
                  size: ['80%', '80%'],
                  textRotation: [0, 45, 90, -45],
                  textPadding: 0,
                  autoSize: {
                    enable: true,
                    minSize: 14
                  },
                  data: [
                    {
                      name: that.countTop5[0].opinionWord,
                      value: 10000,
                      itemStyle: {
                        normal: {
                          color: 'black'
                        }
                      }
                    },
                    {
                      name: that.countTop5[1].opinionWord,
                      value: 6181,
                      itemStyle: that.createRandomItemStyle()
                    },
                    {
                      name: that.countTop5[2].opinionWord,
                      value: 4386,
                      itemStyle: that.createRandomItemStyle()
                    },
                    {
                      name: that.countTop5[3].opinionWord,
                      value: 4055,
                      itemStyle: that.createRandomItemStyle()
                    },
                    {
                      name: that.countTop5[4].opinionWord,
                      value: 2467,
                      itemStyle: that.createRandomItemStyle()
                    },
                    {
                      name: that.countTop5[5].opinionWord,
                      value: 2244,
                      itemStyle: that.createRandomItemStyle()
                    },
                    {
                      name: that.countTop5[6].opinionWord,
                      value: 1898,
                      itemStyle: that.createRandomItemStyle()
                    },
                    {
                      name: that.countTop5[7].opinionWord,
                      value: 1484,
                      itemStyle: that.createRandomItemStyle()
                    },
                    {
                      name: that.countTop5[8].opinionWord,
                      value: 1112,
                      itemStyle: that.createRandomItemStyle()
                    },
                    {
                      name: that.countTop5[9].opinionWord,
                      value: 965,
                      itemStyle: that.createRandomItemStyle()
                    }
                  ]
                }]
              };
              that._setCloud(cloudOption);
            }
          })
          .catch(function (err) {
            console.log(err);
          })
      },
      _setCloud (option) {
        console.log(echarts)
        let cloud = echarts.init(document.getElementById('cloud'));
        cloud.setOption(option)
      },
      createRandomItemStyle () {
        return {
          normal: {
            color: 'rgb(' + [
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160)
            ].join(',') + ')'
          }
        };
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .cloud
    height 300px
</style>
