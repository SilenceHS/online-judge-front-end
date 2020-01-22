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
    .regiser {
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
        <div class="login-title">在线判题系统</div>
        <div :class="userNameObj.style">
          <input
            type="text"
            name="username"
            v-model="login.username"
            autocomplete="off"
            maxlength="20"
            @focus="clearError('userNameObj')"
            @blur="checkNullName"
          />
          <span
            class="placeholder"
            :class="{fixed: login.username != '' && login.username != null}"
          >用户名或邮箱</span>
          <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <span
              style="color:#dc143c;float: right;font-size:12px"
              v-if="userNameObj.errorMsg!=''"
            >{{userNameObj.errorMsg}}</span>
          </transition>
        </div>
        <div :class="passwordObj.style">
          <input
            type="password"
            name="password"
            v-model="login.password"
            @keyup.enter="submit"
            autocomplete="off"
            maxlength="20"
            @focus="clearError('passwordObj')"
            @blur="checkNullPsw()"
          />
          <span
            class="placeholder"
            :class="{fixed: login.password != '' && login.password != null}"
          >密码</span>
          <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <span
              style="color:#dc143c;float: right;font-size:12px"
              v-if="passwordObj.errorMsg!=''"
            >{{passwordObj.errorMsg}}</span>
          </transition>
        </div>
        <div class="buttonDiv">
          <Button :loading="loading" block color="primary" size="l" @click="submit">登录</Button>
        </div>
        <div class="regiser">
          <div>没有账号？</div>
          <router-link to="/register">点此注册</router-link>
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
import Login from "model/login/Login";
import md5 from "js-md5";
export default {
  data() {
    return {
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
      login: Login.parse({}),
      loading: false
    };
  },
  mounted() {},
  methods: {
    submit() {
      let a = this.checkNullName();
      let b = this.checkNullPsw();
      if (a == false || b == false) return;
      var self = this;
      this.$http
        .get("http://127.0.0.1:8000/api/login/", {
          params: {
            username: self.login.username,
            password: md5(self.login.password)
          }
        })
        .then(
          response => {
            if (response.body.status == "200") {
              this.$Message["success"](`登录成功！`);
              setTimeout(() => {
                this.$router.push("/");
              }, 500);
            } else {
              this.passwordObj.style.shake = false;
              this.passwordObj.errorMsg = "用户名或密码错误";
              this.passwordObj.style.shake = true;
            }
          },
          response => {
            alert("服务器维护中");
          }
        );
    },
    clearError(obj) {
      eval("this." + obj + ".style.shake=false");
      eval("this." + obj + '.errorMsg=""');
    },
    checkNullName() {
      if (this.login.username == null || this.login.username == "") {
        this.userNameObj.errorMsg = "用户名不能为空";
        this.userNameObj.style.shake = true;
        return false;
      }
      this.userNameObj.style.shake = false;
      return true;
    },
    checkNullPsw() {
      if (this.login.password == null || this.login.password == "") {
        this.passwordObj.errorMsg = "密码不能为空";
        this.passwordObj.style.shake = true;
        return false;
      }
      this.passwordObj.style.shake = false;
      return true;
    }
  }
};
</script>
