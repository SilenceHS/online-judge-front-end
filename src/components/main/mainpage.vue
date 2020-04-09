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
      <Cell :xs='24' :sm='24' :md='24' :lg='24' :xl='24'>
        <div class="h-panel">
          <div class="h-panel-bar">
            <div class="h-panel-title">答题统计</div>
            <div class="h-panel-right"><span class="gray-color">总共答题</span><i class="h-split"></i><span class="font20 primary-color">{{allCount}}</span><i class="h-split"></i><span class="gray-color"></span></div>
          </div>
          <div class="h-panel-body progress-div">
            <p><Progress :percent="99" color="blue"><span slot="title">AC</span><span slot="text">{{acCount}}个</span></Progress></p>
            <p><Progress :percent="88" color="blue"><span slot="title">WA</span><span slot="text">{{waCount}}个</span></Progress></p>
            <p><Progress :percent="55" color="red"><span slot="title">CE</span><span slot="text">{{ceCount}}个</span></Progress></p>
            <p><Progress :percent="77" color="blue"><span slot="title">PE</span><span slot="text">{{peCount}}个</span></Progress></p>
            <p><Progress :percent="66" color="yellow"><span slot="title">TLE</span><span slot="text">{{tleCount}}个</span></Progress></p>
            <p><Progress :percent="55" color="red"><span slot="title">MLE</span><span slot="text">{{mleCount}}个</span></Progress></p>
            <p><Progress :percent="77" color="blue"><span slot="title">RE</span><span slot="text">{{reCount}}个</span></Progress></p>
            <p><Progress :percent="88" color="blue"><span slot="title">OLE</span><span slot="text">{{oleCount}}个</span></Progress></p>
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
      type: 'type1',
      allCount:20,
      acCount:0,
      waCount:0,
      ceCount:0,
      peCount:0,
      tleCount:0,
      mleCount:0,
      reCount:0,
      oleCount:0,
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
  mounted:function() {

  }
};
</script>
