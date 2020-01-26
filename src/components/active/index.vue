<style lang='less'>
  .page-500-vue {
    .background-image {
      background-image: url(../../images/avatar.png);
    }
  }
</style>
<template>
<div>
  <div v-if="loading" class="page-500-vue error-page">
    <div class="background-image"></div>
    <p>{{msg}}</p>
     <Button color="primary" size="l" @click="login">返回登录</Button>
  </div>
   <HFooter>
        <appFooter></appFooter>
    </HFooter>
 
</div>
</template>

<script>
import appFooter from 'components/app/app-footer';
export default {
  data(){
    return {
      loading:true,
      msg:''
    }
  },
  methods: {
    login(){
     this.$router.push("/login");
      this.loading=!this.loading
    }
  },
  mounted: function() {
    this.$Loading('加载中~~');
    var self=this
    this.$http
        .get("http://127.0.0.1:8000/api/active/"+self.$route.query.key)
        .then(
          response => {
            if (response.body.status == "200") {
             self.msg="激活成功~~"
            } else {
             self.msg="激活失败~~\n重复激活或激活链接已失效"
            }
          },
          response => {
            alert("服务器维护中");
          }
        );
    this.$Loading.close();
  },
   components: {
    appFooter
  }
  
};
</script>