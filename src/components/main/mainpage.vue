<style lang='less'>

.app-home-vue {
  .home-part-body {
    height: 350px;
    .echarts-vue {
      height: 350px;
    }
  }

  .home-part-body2 {
    height: 420px;
    .echarts-vue {
      height: 420px;
    }
  }

  .progress-div {
    >p {
      padding: 8px 0;
    }
    .h-progress {
      &-title {
        color: @dark2-color;
        font-size: 15px;
      }
      &-text {
        width: 40px;
      }
    }
  }
}
</style>


<template>
  <div class="app-home-vue frame-page">
    <Row :space="30">
      <Cell :xs='24' :sm='24' :md='24' :lg='16' :xl='16'>
        <div class="h-panel">
          <div class="relative">
            <Tabs class="common-panel-tabs" v-model="type" :datas="{type1: '数据走势', type2: '数据分布'}"></Tabs>
            <div class="middle-right" style="right: 25px;"><span class="text-hover" @click="openMore">查看更多</span></div>
          </div>
          <div class="home-part-body">
            <Chart :options="data1" v-if="type=='type1'" key="type1"></Chart>
            <Chart :options="data3" v-if="type=='type2'" key="type2"></Chart>
          </div>
        </div>
      </Cell>

      <Cell :xs='24' :sm='24' :md='24' :lg='8' :xl='8'>
        <div class="h-panel">
          <div class="h-panel-bar">
            <div class="h-panel-title">答题统计</div>
            <div class="h-panel-right"><span class="gray-color">总共答题</span><i class="h-split"></i><span class="font20 primary-color">200</span><i class="h-split"></i><span class="gray-color"></span></div>
          </div>
          <div class="h-panel-body progress-div home-part-body">
            <p><Progress :percent="99" color="green"><span slot="title">AC</span><span slot="text">4个</span></Progress></p>
            <p><Progress :percent="88" color="blue"><span slot="title">WA</span><span slot="text">0个</span></Progress></p>
            <p><Progress :percent="55" color="red"><span slot="title">CE</span><span slot="text">0个</span></Progress></p>
            <p><Progress :percent="77" color="blue"><span slot="title">PE</span><span slot="text">0个</span></Progress></p>
            <p><Progress :percent="66" color="yellow"><span slot="title">TLE</span><span slot="text">0个</span></Progress></p>
          </div>
        </div>
      </Cell>
    </Row>
  </div>
</template>
<script>
import data1 from 'js/datas/data1';
import data2 from 'js/datas/data2';
import data3 from 'js/datas/data4';

export default {
  data() {
    return {
      data1,
      data2,
      data3,
      type: 'type1'
    };
  },
  methods: {
    openMore() {
      this.$router.push({ name: 'Chart' });
    }
  },
  beforeCreate(){
    this.User=JSON.parse(localStorage.getItem('User'));
    if (this.User==null)
      this.$router.replace("/login");
  },
};
</script>
