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
            <div class="h-panel-title">修改密码</div>
          </div>
          <div class="h-panel-body progress-div">
            <p><span slot="title"><strong>原密码</strong> <input type="password" v-model="oldPass"/></span></p>
            <p><span slot="title"><strong>新密码</strong><input type="password" v-model="newPass1"/></span></p>
            <p><span slot="title"><strong>重新输入新密码</strong><input type="password" v-model="newPass2"/></span></p>
            <Button color="primary" size="l" @click="reset()">确认</Button>
          </div>
        </div>
      </Cell>
    </Row>
  </div>
</template>
<script>


export default {
  data() {
    return {
        oldPass:"",
        newPass1:"",
        newPass2:"",
    };
  },
  methods: {
      reset(){
          if(this.newPass1!=this.newPass2)
            alert("两次密码不相同")
        else{
            this.$http
        .post(
          "http://" + this.Parms.host + this.Parms.port + "/api/resetPass/",
          {
            username:JSON.parse(localStorage.getItem("User")).userName,
            newpassword:this.newPass1,
            oldpassword:this.oldPass
          },
          { emulateJSON: true }
        )
        .then(
          response => {
            if (response.body.status == "200") {
              this.$Message.success("成功");
            }
            else{
                this.$Message.error("原密码不匹配");
            }
          },
          response => {
            alert("服务器维护中");
          }
        );
        }
      }
  },
 
};
</script>
