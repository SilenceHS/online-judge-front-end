<style lang='less'>
.CodeMirror {
  font-size: 18px;
}
.divcenter {
  text-align: center;
  font-size: 180%;
  border-bottom: solid 2px #eee;
}
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
      <Cell :xs="25" :sm="25" :md="14" :lg="12" :xl="14">
        <div class="h-panel" ref="panel">
          <div class="h-panel-bar">
            <div class="divcenter">{{datas.name}}<i v-if="accepted" class="h-icon-check" style="color:#5C9A4F;font-size:25px;"></i></div>
            <div >
              
            </div>
            <div style="text-align:center;border-bottom: solid 2px #eee;line-height: 2.5em;">
              <span style="font-size: 16px;color: green;">时间限制</span>
              <span style="font-size: 17px;">:{{datas.timeLimit}}ms&ensp;</span>
              <span style="font-size: 16px;color: green;">内存限制</span>
              <span style="font-size: 17px;">:{{datas.memoryLimit}}KB</span>
            </div>
            <div style="font-size: 180%;line-height: 2.5em;">题目描述</div>
            <div style="font-size: 16px;">{{datas.description}}</div>
            <div style="font-size: 180%;line-height: 2.5em;">输入规则</div>
            <div style="font-size: 16px;">{{datas.input}}</div>
            <div style="font-size: 180%;line-height: 2.5em;">输出规则</div>
            <div style="font-size: 16px;">{{datas.output}}</div>

            <div style="font-size: 180%;line-height: 2.5em;">输入样例</div>
            <div style="font-size: 16px;">{{datas.sampleInput}}</div>
            <div style="font-size: 180%;line-height: 2.5em;">输出样例</div>
            <div style="font-size: 16px;">{{datas.sampleOutput}}</div>
          </div>
          <div></div>
        </div>
      </Cell>
      <Cell :xs="25" :sm="25" :md="10" :lg="12" :xl="10">
        <div class="h-panel">
          <div class="h-panel-bar">
            <textarea
              style="font-size:20px;"
              ref="mycode"
              class="codesql public_text code-mirror"
              v-model="mycode"
              v-show="false"
            ></textarea>
            <p style="margin-top:10px;display: inline-block;">选择编程语言：</p>
            <div v-width="200" style="margin-top:10px;display: inline-block;">
              <Select v-model="select" :datas="param" :deletable="false"></Select>
            </div>

            <button
              class="h-btn h-btn-text-blue h-btn-transparent;"
              style="margin-top:10px;float:right"
            >提交历史</button>
            <Button
              color="blue"
              style="margin-top:10px;float:right;margin-right:10px"
              @click="submit"
              :loading="judging"
            >提交</Button>
          </div>
          <div></div>
        </div>
      </Cell>
    </Row>
  </div>
</template>
<script>
import data1 from "js/datas/data1";
import data2 from "js/datas/data2";
import data3 from "js/datas/data4";

import CodeMirror from "codemirror/lib/codemirror";
import "codemirror/theme/mdn-like.css";
require("codemirror/mode/python/python.js");
require("codemirror/mode/clike/clike.js");
require("codemirror/addon/fold/foldcode.js");
require("codemirror/addon/fold/foldgutter.js");
require("codemirror/addon/fold/brace-fold.js");
require("codemirror/addon/fold/xml-fold.js");
require("codemirror/addon/fold/indent-fold.js");
require("codemirror/addon/fold/markdown-fold.js");
require("codemirror/addon/fold/comment-fold.js");
require("codemirror/addon/edit/matchbrackets");
require("codemirror/addon/edit/closebrackets");
require("codemirror/addon/selection/active-line.js");

export default {
  data() {
    return {
      datas: [],
      judging: false,
      mycode: "//TODO",
      select: "Python3",
      param: ["Python3", "Java", "C", "C++"],
      result: "",
      accepted: false
    };
  },
  methods: {
    setSize() {
      this.editor.setSize("auto", this.$refs.panel.clientHeight - 80 + "px");
    },
    submit() {
      var self = this;
      var userCode = this.editor.getValue();
      var language = this.select;
      var userName = JSON.parse(localStorage.getItem("User")).userName;
      var quizurl = self.$route.query.quiz;
      this.$http
        .post(
          "http://" + this.Parms.host + this.Parms.port + "/api/postquiz/",
          {
            code: userzCode,
            language: language,
            username: userName,
            quizurl: quizurl
          },
          { emulateJSON: true }
        )
        .then(
          response => {
            if (response.body.status == "200") {
              var judgingMessage = this.$Message.loading(`正在判题中`, 0);
              this.judging = true;
              this.getStatus(response.body.tempId, judgingMessage);
            } else if (response.body.status == "500") {
              alert("服务器连接失败");
              this.judging = false;
            }
          },
          response => {
            this.judging = false;
            alert("服务器维护中");
          }
        );
    },
    getStatus(tempid, judgingmessage) {
      var self = this;
      var interval = null;
      var tryTimes = 5;
      interval = setInterval(function() {
        self.$http
          .post(
            "http://" +
              self.Parms.host +
              self.Parms.port +
              "/api/gettempstatus/",
            {
              tempid: tempid
            },
            { emulateJSON: true }
          )
          .then(
            response => {
              if (response.body.status == "200") {
                self.judging = false;
                judgingmessage.close();
                switch (response.body.result) {
                  case "NON_ZERO_EXIT_CODE":
                    self.$Message["error"](
                      `错误!代码非零退出(Non-zero exit code)`,
                      0
                    );
                    break;
                  case "MEMORY_LIMIT_EXCEEDED":
                    self.$Message["error"](`错误!内存超限(MLE)`, 0);
                    break;
                  case "TIME_LIMIT_EXCEEDED":
                    self.$Message["error"](`错误!运行时间超限(TLE)`, 0);
                    break;
                  case "OUTPUT_LIMIT_EXCEEDED":
                    self.$Message["error"](`错误!输出超限(OLE)`, 0);
                    break;
                  case "PRESENTATION_ERROR":
                    self.$Message["error"](`错误!输出格式不正确(PE)`, 0);
                    break;
                  case "ACCEPTED":
                    self.$Message["success"](`完全正确!(AC!)`, 0);
                    self.accepted = true;
                    break;
                  case "RUNTIME_ERROR":
                    self.$Message["error"](`错误!运行时错误(RE)`, 0);
                    break;
                  case "WRONG_ANSWER":
                    self.$Message["error"](`错误!答案错误(WA)`, 0);
                    break;
                  case "COMPILATION_ERROR":
                    self.$Message["error"](`错误!编译错误(CE)`, 0);
                    break;
                  default:
                    self.$Message["error"](`错误!未知错误`, 0);
                }
                clearInterval(interval);
              } else if (response.body.status == "205") {
                tryTimes -= 1;
                if (tryTimes <= 0) {
                  clearInterval(interval);
                }
              } else {
                clearInterval(interval);
              }
            },
            response => {
              clearInterval(interval);
              self.judging = false;
              alert("服务器维护中");
            }
          );
      }, 2000);
    }
  },
  updated: function() {
    //alert("更新")
  },
  mounted: function() {
    var self = this;

    setTimeout(function() {
      self.editor = CodeMirror.fromTextArea(self.$refs.mycode, {
        mode: "python",
        theme: "mdn-like",
        lineNumbers: true,
        showCursorWhenSelecting: true,
        readOnly: false,
        matchBrackets: true,
        autoCloseBrackets: true,
        smartIndent: true,
        styleActiveLine: true,
        indentUnit: 4
      });
      self.setSize();
    }, 500);

    this.$Loading("加载中~~");
    var self = this;
    var user = JSON.parse(localStorage.getItem("User"));
    this.$http
      .get(
        "http://" +
          this.Parms.host +
          this.Parms.port +
          "/api/getquiz/" +
          self.$route.query.list +
          "/" +
          self.$route.query.quiz +
          "/" +
          user.username
      )
      .then(
        response => {
          if (response.body.status == "200") {
            self.datas = response.body.quiz[0].fields;
            self.accepted = response.body.accepted;
            console.log(self.datas);
            this.$Loading.close();
          } else {
            self.msg = "404";
            this.$Loading.close();
          }
        },
        response => {
          alert("服务器维护中");
          this.$Loading.close();
        }
      );
  }
};
</script>
