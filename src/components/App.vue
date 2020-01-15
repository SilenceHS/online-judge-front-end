<template>
  <div id="app">
    <transition mode="out-in" enter-active-class="animated flipInY" leave-active-class="animated flipOutY">
    <router-view></router-view>
    </transition>
    
  </div>
</template>
<script>

export default {
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
  }
};
</script>
<style scoped>
.animated {animation-duration: 0.5s;}
</style>
