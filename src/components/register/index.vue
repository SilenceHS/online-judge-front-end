<style lang="less">
@gradient-color: #3788ee;
@bg-color: #f7f8fa;
@title-color: #3a3a3a;
@text-color: #7e7e7e;
@placeholder-color: #7e7e7e;
.login-vue {
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: @bg-color;
  .login-container {
    width: 320px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .login-content {
      letter-spacing: 2px;
      background: #fff;
      padding: 70px 30px 20px;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
      border-radius: 3px;
      box-sizing: border-box;
      > div {
        margin: 30px 0;
        &.login-input {
          position: relative;
          .placeholder {
            position: absolute;
            color: @placeholder-color;
            top: 6px;
            font-size: 16px;
            transition: all 0.2s;
            left: 0;
            pointer-events: none;
          }
          input {
            font-size: 16px;
            padding: 8px 0;
            height: 40px;
            width: 100%;
            border: none;
            border-radius: 0;
            border-bottom: 1px solid #d3d3d3;
            box-shadow: inset 0 0 0 1000px #fff;
            outline: none;
            box-sizing: border-box;
            transition: 0.3s;
            font-weight: 200;
            &:focus {
              border-bottom-color: @gradient-color;
              box-shadow: inset 0 0 0 1000px #fff;
            }
          }
          input:focus + .placeholder,
          .placeholder.fixed {
            font-size: 13px;
            top: -16px;
          }
          input:-webkit-autofill + .placeholder {
            font-size: 13px;
            top: -16px;
          }
        }
        &.login-title {
          font-size: 30px;
          color: @title-color;
          line-height: 1;
          margin: -16px 0px 40px;
          font-weight: 200;
        }
      }
      > .buttonDiv {
        margin-top: 45px;
        .h-btn {
          padding: 12px 0;
          font-size: 18px;
          opacity: 0.8;
          border-radius: 3px;
          background: @gradient-color;
          border-color: @gradient-color;
          &:hover {
            opacity: 1;
            background: @gradient-color;
            border-color: @gradient-color;
          }
        }
      }
    }
    .copyright {
      letter-spacing: 1px;
      margin-top: 30px;
      color: @text-color;
      a {
        color: @text-color;
      }
    }
    .login {
      letter-spacing: 1px;
      margin-top: 30px;
      color: @text-color;
      font-size: 15px;
      a {
        color: @text-color;
      }
      div {
        display: inline-block;
      }
    }
  }
}
</style>
<style scoped>
.fadeIn {
  animation-duration: 0.2s;
}
.fadeOut {
  animation-duration: 0.2s;
}
</style>
<template>
  <div class="login-vue">
    <div class="login-container">
      <div class="login-content">
        <div class="login-title">快速注册</div>
        <div :class="userNameObj.style">
          <input
            type="text"
            name="username"
            v-model="register.username"
            autocomplete="off"
            @focus="clearError('userNameObj')"
            @blur="checkUserName"
          />
          <span
            class="placeholder"
            :class="{fixed: register.username != '' && register.username != null}"
          >用户名</span>
          <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <span
              style="color:#dc143c;float: right;font-size:12px"
              v-if="userNameObj.errorMsg!=''"
            >{{userNameObj.errorMsg}}</span>
          </transition>
        </div>

        <div :class="emailObj.style">
          <input
            type="text"
            name="username"
            v-model="register.email"
            autocomplete="off"
            @focus="clearError('emailObj')"
            @blur="checkEmail"
          />
          <span
            class="placeholder"
            :class="{fixed: register.email != '' && register.email != null}"
          >邮箱</span>
          <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <span
              style="color:#dc143c;float: right;font-size:12px"
              v-if="emailObj.errorMsg!=''"
            >{{emailObj.errorMsg}}</span>
          </transition>
        </div>

        <div :class="passwordObj.style">
          <input
            type="password"
            name="password"
            v-model="register.password"
            @keyup.enter="submit"
            autocomplete="off"
            @focus="clearError('passwordObj'),clearError('repasswordObj')"
            @blur="checkPsw(),checkRePsw()"
          />
          <span
            class="placeholder"
            :class="{fixed: register.password != '' && register.password != null}"
          >密码</span>
          <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <span
              style="color:#dc143c;float: right;font-size:12px"
              v-if="passwordObj.errorMsg!=''"
            >{{passwordObj.errorMsg}}</span>
          </transition>
        </div>

        <div :class="repasswordObj.style">
          <input
            type="password"
            name="password"
            v-model="register.repassword"
            @keyup.enter="submit"
            autocomplete="off"
            @focus="clearError('repasswordObj')"
            @blur="checkRePsw"
          />
          <span
            class="placeholder"
            :class="{fixed: register.repassword != '' && register.repassword != null}"
          >再次输入密码</span>
          <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <span
              style="color:#dc143c;float: right;font-size:12px"
              v-if="repasswordObj.errorMsg!=''"
            >{{repasswordObj.errorMsg}}</span>
          </transition>
        </div>

        <div class="buttonDiv">
          <Button :loading="loading" block color="primary" size="l" @click="submit">注册</Button>
        </div>
        <div class="login">
          <div style="display:inline-block">已有账号？</div>
          <router-link to="/login">返回登录</router-link>
        </div>
      </div>
      <p class="copyright">
        Copyright © 2020 Silence雪鲤鱼 -
        <a href="https://palipo.cn/">palipo.cn</a>
      </p>
    </div>
  </div>
</template>
<script>
import Register from "model/register/Register";

export default {
  data() {
    return {
      emailObj: {
        style: {
          "login-name": true,
          "login-input": true,
          animated: true,
          shake: false
        },
        errorMsg: ""
      },
      userNameObj: {
        style: {
          "login-name": true,
          "login-input": true,
          animated: true,
          shake: false
        },
        errorMsg: ""
      },
      passwordObj: {
        style: {
          "login-name": true,
          "login-input": true,
          animated: true,
          shake: false
        },
        errorMsg: ""
      },
      repasswordObj: {
        style: {
          "login-name": true,
          "login-input": true,
          animated: true,
          shake: false
        },
        errorMsg: ""
      },
      register: Register.parse({}),
      loading: false
    };
  },
  mounted() {},
  methods: {
    submit() {
      var a = this.checkEmail();
      var b = this.checkUserName();
      var c = this.checkPsw();
      var d = this.checkRePsw();
      if (a && b && c && d) {
      }
    },
    checkEmail() {
      var mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
      if (mailReg.test(this.register.email)) {
        this.emailObj.errorMsg = "";
        this.emailObj.style.shake = false;
        return true;
      } else {
        this.emailObj.style.shake = true;
        if (this.register.email == null || this.register.email == "")
          this.emailObj.errorMsg = "邮箱不能为空";
        else this.emailObj.errorMsg = "邮箱格式不正确";
      }
    },
    checkUserName() {
      if (this.register.username && this.register.username != "5724924") {
        this.userNameObj.errorMsg = "";
        this.userNameObj.style.shake = false;
        return true;
      } else {
        this.userNameObj.style.shake = true;
        if (this.register.username == null || this.register.username == "")
          this.userNameObj.errorMsg = "用户名不能为空";
        if (this.register.username == "5724924")
          this.userNameObj.errorMsg = "用户名已存在";
      }
    },
    checkPsw() {
      var pwdReg = /^(?=.*?[a-zA-Z0-9]).{6,16}$/;
      if (pwdReg.test(this.register.password)) {
        this.passwordObj.errorMsg = "";
        this.passwordObj.style.shake = false;
        return true;
      } else {
        this.passwordObj.style.shake = true;
        if (this.register.password == null || this.register.password == "")
          this.passwordObj.errorMsg = "密码不能为空";
        else this.passwordObj.errorMsg = "密码需要6-16位数字或字母";
      }
    },
    checkRePsw() {
      if (this.register.repassword != this.register.password) {
        this.repasswordObj.errorMsg = "两次密码不一致";
        this.repasswordObj.style.shake = true;
      } else {
        this.repasswordObj.style.shake = false;
        this.repasswordObj.errorMsg = "";
        return true;
      }
    },
    clearError(obj) {
      eval("this." + obj + ".style.shake=false");
      eval("this." + obj + '.errorMsg=""');
    }
  }
};
</script>
