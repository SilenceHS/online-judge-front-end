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
      <Cell :xs='24' :sm='24' :md='24' :lg='9' :xl='9'>
        <div class="h-panel">
          <div class="h-panel-bar">
            <div class="h-panel-title">判题结果说明</div>
          </div>
          <div class="h-panel-body progress-div">
            <p><span slot="title"><strong>AC(Accepted)：</strong>完全正确！</span></p>
            <p><span slot="title"><strong>WA(Wrong Answer)：</strong>某个测试数据的输出答案不正确</span></p>
            <p><span slot="title"><strong>CE(Compilation Error)：</strong>编译失败，无法编译你的程序</span></p>
            <p><span slot="title"><strong>PE(Presentation Error)：</strong>答案正确，但是结果格式不正确，请检查空格和换行</span></p>
            <p><span slot="title"><strong>TLE(Time Limit Exceeded)：</strong>程序运行时间超过了题目限制</span></p>
            <p><span slot="title"><strong>MLE(Memory Limit Exceeded)：</strong>程序运行内存超过了题目限制</span></p>
            <p><span slot="title"><strong>RE(Runtime Error)：</strong>程序运行过程中出错</span></p>
            <p><span slot="title"><strong>OLE(Output Limit Exceeded)：</strong>程序的输出已经超出了这个题目的输出限制</span></p>
            <p><span slot="title"><strong>NZEC(Non-zero Exit Code)：</strong>程序非零返回,一般为异常退出</span></p>
          </div>
        </div>
      </Cell>
       <Cell :xs='24' :sm='24' :md='24' :lg='15' :xl='15'>
        <div class="h-panel">
          <div class="h-panel-bar">
            <div class="h-panel-title">答题统计</div>
            <div class="h-panel-right"><span class="gray-color">总共答题</span><i class="h-split"></i><span class="font20 primary-color">{{allCount}}</span><i class="h-split"></i><span class="gray-color"></span></div>
          </div>
          <div class="h-panel-body progress-div">
            <p><Progress :percent="acCount/allCount*100" color="green"><span slot="title">AC</span><span slot="text">{{acCount}}个</span></Progress></p>
            <p><Progress :percent="waCount/allCount*100" color="blue"><span slot="title">WA</span><span slot="text">{{waCount}}个</span></Progress></p>
            <p><Progress :percent="ceCount/allCount*100" color="blue"><span slot="title">CE</span><span slot="text">{{ceCount}}个</span></Progress></p>
            <p><Progress :percent="peCount/allCount*100" color="blue"><span slot="title">PE</span><span slot="text">{{peCount}}个</span></Progress></p>
            <p><Progress :percent="tleCount/allCount*100" color="blue"><span slot="title">TLE</span><span slot="text">{{tleCount}}个</span></Progress></p>
            <p><Progress :percent="mleCount/allCount*100" color="blue"><span slot="title">MLE</span><span slot="text">{{mleCount}}个</span></Progress></p>
            <p><Progress :percent="reCount/allCount*100" color="blue"><span slot="title">RE</span><span slot="text">{{reCount}}个</span></Progress></p>
            <p><Progress :percent="oleCount/allCount*100" color="blue"><span slot="title">OLE</span><span slot="text">{{oleCount}}个</span></Progress></p>
            <p><Progress :percent="nzeCount/allCount*100" color="blue"><span slot="title">NZEC</span><span slot="text">{{oleCount}}个</span></Progress></p>
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
      nzeCount:0,
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
    var self=this
    this.$http
          .post(
            "http://" + this.Parms.host + this.Parms.port + "/api/getMainCount/",
            {
              username: JSON.parse(localStorage.getItem("User")).userName,
            },
            { emulateJSON: true }
          )
          .then(
            response => {
              if (response.body.status == "200") {
                console.log(response.body)
                self.allCount=response.body.allCount
                self.acCount=response.body.acCount
                self.waCount=response.body.waCount
                self.ceCount=response.body.ceCount
                self.peCount=response.body.peCount
                self.tleCount=response.body.tleCount
                self.mleCount=response.body.mleCount
                self.reCount=response.body.reCount
                self.oleCount=response.body.oleCount
                self.nzeCount=response.body.nzeCount
              }
            },
            response => {
              alert("服务器维护中");
            }
          );
  }
};
</script>
