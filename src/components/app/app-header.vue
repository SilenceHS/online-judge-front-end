<style lang="less">
.app-header {
  color: rgba(49, 58, 70, 0.8);

  .h-autocomplete {
    line-height: 1.5;
    float: left;
    margin-top: 15px;
    margin-right: 20px;
    width: 120px;
    &-show,&-show:hover, &-show.focusing {
      outline: none;
      box-shadow: none;
      border-color: transparent;
      border-radius: 0;
    }
    &-show.focusing{
      border-bottom: 1px solid #eee;
    }
  }
  &-info &-icon-item {
    cursor: pointer;
    display: inline-block;
    float: left;
    padding: 0 15px;
    height: @layout-header-height;
    line-height: @layout-header-height;
    margin-right: 10px;
    &:hover {
      background: @hover-background-color;
    }
    i {
      font-size: 18px;
    }
    a {
      color: inherit;
    }
    .h-badge {
      margin: 20px 0;
      display: block;
    }
  }
  .h-dropdownmenu {
    float: left;
  }

  &-dropdown{
    float: right;
    margin-left: 10px;
    padding: 0 20px 0 15px;
    .h-icon-down {
      right: 20px;
    }
    cursor: pointer;
    &:hover, &.h-pop-trigger {
      background: @hover-background-color;
    }
    &-dropdown {
      padding: 5px 0;
      .h-dropdownmenu-item {
        padding: 8px 20px;
      }
    }
  }

  &-menus{
    display: inline-block;
    vertical-align: top;
    >div {
      display: inline-block;
      font-size: 15px;
      padding: 0 25px;
      color: @dark-color;
      &:hover{
        color: @primary-color;
      }
      +div {
        margin-left: 5px;
      }
      &.h-tab-selected{
        color: @white-color;
        background-color: @primary-color;
      }
    }
  }
}
</style>

<template>
  <div class="app-header">
    <!-- <div style="width:50px;float:left;"><Button :icon="siderCollapsed ? 'icon-align-right':'icon-align-left'" size="l" noBorder class="font20" @click="siderCollapsed=!siderCollapsed"></Button></div> -->
    <!-- <div style="width:50px;float:left;"><Button :icon="'icon-align-right'" size="l" noBorder class="font20" @click="siderCollapsed=!siderCollapsed"></Button></div> -->
	  
    <div class="float-right app-header-info">
     <!-- <AutoComplete :showDropdownWhenNoResult="false" v-model="searchText" config="globalSearch" placeholder="全局搜索.."></AutoComplete> -->
       
     <!-- <appHeaderMessage></appHeaderMessage> -->
      <div class="app-header-icon-item" v-tooltip content="GitHub" theme="white" @click="goGithub">
        <i class="h-icon-github"></i>
      </div>
      <DropdownMenu className="app-header-dropdown" trigger="hover" offset="0,5" :width="150" placement="bottom-end" :datas="infoMenu" @onclick="trigger">
        <Avatar :src="User.avatar_url" :width="30"><span>{{User.userName}}</span></Avatar>
      </DropdownMenu>
    </div>
    
    <div v-if="User.type==0">
      <appLogo style="float:left;"></appLogo>
      <div class="app-header-info">
      <div class="app-header-icon-item" v-tooltip content="官方题库" theme="white" @click="officialList">
        <i class="icon-book"><b style="font-size:16px;">官方题库</b></i>
        
        
        
      </div>
      <div class="app-header-icon-item" v-tooltip content="课程题库" theme="white" @click="studentCourse">
        <i class="icon-align-left"><b style="font-size:16px;">课程题库</b></i>
      </div>
      <div class="app-header-icon-item" v-tooltip content="个人信息" theme="white" @click="info">
        <i class="icon-cog"><b style="font-size:16px;">个人信息</b></i>
      </div>
      </div>
    </div>

    <div v-if="User.type==1">
      <appLogo style="float:left;"></appLogo>
      <div class="app-header-info">
      <div class="app-header-icon-item" v-tooltip content="官方题库" theme="white" @click="officialList">
        <i class="icon-book"><b style="font-size:16px;">官方题库</b></i>
      </div>
      <div class="app-header-icon-item" v-tooltip content="课程管理" theme="white" @click="courseManage">
        <i class="icon-paper"><b style="font-size:16px;">课程管理</b></i>
      </div>
      <div class="app-header-icon-item" v-tooltip content="个人信息" theme="white" @click="info">
        <i class="icon-cog"><b style="font-size:16px;">个人信息</b></i>
      </div>
      </div>
    </div>

    <div v-if="User.type==2">
      <appLogo style="float:left;"></appLogo>
      <div class="app-header-info">
      <div class="app-header-icon-item" v-tooltip content="官方题库管理" theme="white" @click="officialModify">
        <i class="icon-book"><b style="font-size:16px;">官方题库管理</b></i>
      </div>
      <div class="app-header-icon-item" v-tooltip content="账号管理" theme="white" @click="showSettingModal">
        <i class="icon-align-left"><b style="font-size:16px;">账号管理</b></i>
      </div>
      <div class="app-header-icon-item" v-tooltip content="判题管理" theme="white" @click="showSettingModal">
        <i class="icon-paper"><b style="font-size:16px;">判题管理</b></i>
      </div>
      <div class="app-header-icon-item" v-tooltip content="个人信息" theme="white" @click="info">
        <i class="icon-cog"><b style="font-size:16px;">个人信息</b></i>
      </div>
      </div>
    </div>
    
  </div>
</template>
<script>
import { mapState } from 'vuex';
import appLogo from './app-logo';
// import appHeaderMessage from './modules/app-header-message';

export default {
  components: {
    // appHeaderMessage
  },
  data() {
    return {
      usertype:'',
      User:null,
      siderCollapsed:false,
      searchText: '',
      infoMenu: [
        { key: 'info', title: '个人信息', icon: 'h-icon-user' },
        { key: 'logout', title: '退出登录', icon: 'h-icon-outbox' }
      ]
    };
  },
   computed: {
    // ...mapState(['User']),
  //   siderCollapsed: {
  //     get() {
  //       return this.$store.state.siderCollapsed;
  //     },
  //     set(value) {
  //       this.$store.commit('updateSiderCollapse', value);
  //     }
  //   }
   },
  // mounted() {
    
    
  //   //this.listenResize();
  // },
  beforeMount(){
    this.User=JSON.parse(localStorage.getItem('User'));
    if (this.User==null)
      this.$router.replace("/login");
  },
  methods: {
  //   listenResize() {
  //     let windowWidth = window.innerWidth;
  //     const resizeEvent = window.addEventListener('resize', () => {
  //       if (windowWidth == window.innerWidth) {
  //         return;
  //       }
  //       if (this.siderCollapsed && window.innerWidth > 900) {
  //         this.siderCollapsed = false;
  //       } else if (!this.siderCollapsed && window.innerWidth < 900) {
  //         this.siderCollapsed = true;
  //       }
  //       windowWidth = window.innerWidth;
  //     });
  //     this.$once('hook:beforeDestroy', () => {
  //       window.removeEventListener('resize', resizeEvent);
  //     });
  //     window.dispatchEvent(new Event('resize'));
  //   },
    goGithub() {
      window.open('https://github.com/heyui/heyui-admin');
    },
    goBook() {
      window.open('https://heyui.github.io/heyui-admin-docs');
    },
    trigger(data) {
       if (data == 'logout') {
      //   Utils.removeLocal('token');
      //   this.$router.replace({ name: 'Login' });
        localStorage.clear();
        this.$router.replace("/login");
       } 
       if (data == 'info')  {
   this.$router.push("/info")
         }
    },
    showSettingModal() {
      // this.$emit('openSetting');
    },
    officialList() {
      this.$router.push("/list/?list=loDjDEx")
    },
    officialModify(){
      this.$router.push("/officialModify")
    },
    courseManage(){
      this.$router.push("/courseManage")
    },
    studentCourse(){
      this.$router.push("/studentCourse")
    },
    info(){
 this.$router.push("/info")
    }

  },
  components: {
    appLogo
  }
};
</script>
