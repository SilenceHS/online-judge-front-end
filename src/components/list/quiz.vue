<style lang='less'>
.divcenter{text-align:center;font-size: 180%;border-bottom: solid 2px #eee;} 
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
    > p {
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

  .body-text {
    font-size: 15px;
    font-weight: 500;
    color: #808080;
  }
}
</style>
<template>
  <div class="app-home-vue frame-page">
     <Row :space="30">
      <Cell :xs="18" :sm="18" :md="18" :lg="17" :xl="17">
        <div class="h-panel">
          <div class="h-panel-bar">
            <div class="divcenter">{{datas.name}}</div>
            <div style="text-align:center;border-bottom: solid 2px #eee;line-height: 2.5em;">
                <span style="font-size: 16px;color: green;">
                    时间限制
                </span>
                <span style="font-size: 17px;">
                :1000ms&ensp;
                </span>
                <span style="font-size: 16px;color: green;">               
                    内存限制
                </span>
                 <span style="font-size: 17px;">
                :65536KB
                 </span>
            </div>
            <div style="font-size: 180%;line-height: 2.5em;">
                题目描述
            </div>
            <div style="font-size: 16px;">
                {{datas.description}}
            </div>
             <div style="font-size: 180%;line-height: 2.5em;">
                输入规则
            </div>
            <div style="font-size: 16px;">
                {{datas.input}}
            </div>
            <div style="font-size: 180%;line-height: 2.5em;">
                输出规则
            </div>
            <div style="font-size: 16px;">
                {{datas.output}}
            </div>

            <div style="font-size: 180%;line-height: 2.5em;">
                输入样例
            </div>
            <div style="font-size: 16px;">
                {{datas.sampleinput}}
            </div>
            <div style="font-size: 180%;line-height: 2.5em;">
                输出样例
            </div>
            <div style="font-size: 16px;">
                {{datas.sampleoutput}}
            </div>

            
          </div>
          <div>
           
          </div>
        </div>
      </Cell>
    </Row>
  </div>
</template>
<script>
import data1 from "js/datas/data1";
import data2 from "js/datas/data2";
import data3 from "js/datas/data4";

export default {
  data() {
    return {
      show: false,
      border: false,
      stripe: true,
      checkbox: false,
      serial: true,
      loading: false,
      datas: [
      ]
    };
  },
  methods: {
    openMore() {
      this.$router.push({ name: "Chart" });
    },
    messageRender(data, index) {
      return 'style="color: #ff0;"';
    },
  },
  mounted: function() {
    this.$Loading('加载中~~');
    var self=this
    var user=JSON.parse(localStorage.getItem('User'));
    this.$http
        .get("http://127.0.0.1:8000/api/getquiz/"+self.$route.query.list+"/"+self.$route.query.quiz+"/"+user.username)
        .then(
          response => {
            if (response.body.status == "200") {
             self.datas=response.body.quiz[0].fields
             console.log( self.datas)
             this.$Loading.close();
            } else {
             self.msg="404"
             this.$Loading.close();
            }
          },
          response => {
            alert("服务器维护中");
            this.$Loading.close();
          }
        );
    
  },
};
</script>
