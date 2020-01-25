<style lang='less'>
  .page-500-vue {
    .background-image {
      background-image: url(../../images/avatar.png);
    }
  }
</style>
<template>
  <div class="page-500-vue error-page">
    <div class="background-image"></div>
    <p>激活成功~~</p>
    <Button color="primary" size="l" @click="login">返回登录</Button>
  </div>
</template>

<script>
export default {
  methods: {
    login(){
      this.$router.push("/login");
    }
  },
  mounted: function() {
    alert(this.$route.query.key);
  }
};
</script>