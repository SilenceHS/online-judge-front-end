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
      <Cell :xs="25" :sm="25" :md="25" :lg="25" :xl="25">
        <div class="h-panel" ref="panel">
          <div class="h-panel-bar">
            <div style="font-size: 180%;line-height: 2.5em;">题名</div>
            <input type="text" v-model="name" placeholder="请输入题名" />
            <div style="font-size: 180%;line-height: 2.5em;">题目描述</div>
            <textarea
              v-model="description"
              style="width:100%"
              rows="10"
              v-autosize
              placeholder="请输入题目描述"
            ></textarea>
            <div style="font-size: 180%;line-height: 2.5em;">输入规则</div>
            <textarea
              rows="10"
              v-model="input"
              style="width:100%"
              v-autosize
              placeholder="请输入输入规则,例如:输入一个整数a,以回车结束"
            ></textarea>
            <div style="font-size: 180%;line-height: 2.5em;">输出规则</div>
            <textarea
              v-model="output"
              style="width:100%"
              v-autosize
              rows="10"
              placeholder="请输入输出规则,例如:输出整数a的平方,以\n换行结束"
            ></textarea>
            <div style="font-size: 180%;line-height: 2.5em;">输入样例</div>
            <textarea
              v-model="sampleinput"
              style="width:100%"
              rows="10"
              v-autosize
              placeholder="请输入输入样例,例如:5"
            ></textarea>
            <div style="font-size: 180%;line-height: 2.5em;">输出样例</div>
            <textarea
              v-model="sampleoutput"
              style="width:100%"
              rows="10"
              v-autosize
              placeholder="请输入输入样例,例如:25"
            ></textarea>
            <div style="font-size: 180%;line-height: 2.5em;">时间限制(ms)</div>
            <input type="text" v-model="timelimit" placeholder="参考值为:1000" />
            <div style="font-size: 180%;line-height: 2.5em;">内存限制(KB)</div>
            <input type="text" v-model="memorylimit" placeholder="参考值为:65535" />
            <div style="font-size: 180%;line-height: 2.5em;">测试用例</div>
            <textarea
              v-model="testcase"
              style="width:100%"
              v-autosize
              rows="15"
              :placeholder="placeholder"
            ></textarea>
            <div style="font-size: 180%;line-height: 2.5em;">可提交语言</div>
            <Checkbox v-model="language" :datas="languageCheck"></Checkbox>
            <div style="font-size: 180%;line-height: 2.5em;">难度</div>
            <Radio v-model="level" :datas="levelCheck"></Radio>
            <div style="font-size: 180%;line-height: 2.5em;">标签(回车继续添加)</div>
            <TagInput v-model="tag" :limit="10" :wordlimit="20"></TagInput>
            <Button color="blue" @click="submit" style="margin-top:10px">提交</Button>
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
      name: "",
      description: "",
      input: "",
      output: "",
      sampleinput: "",
      sampleoutput: "",
      timelimit: "",
      memorylimit: "",
      testcase: "",
      tag: "",
      language: ["Python3"],
      languageCheck: [
        "Python3",
        "Java",
        "C",
        "C++",
        "JavaScript",
        "Shell",
        "Lua"
      ],
      level: "简单",
      levelCheck: ["简单", "普通", "困难"],
      judging: false,
      placeholder:
        "测试用例格式如下,以--InEnd--和--OutEnd--来标识,例如:\n1\n2\n3\n--InEnd--\n6\n--OutEnd--\n2\n3\n4\n--InEnd--\n8\n--OutEnd--"
    };
  },
  methods: {
    setSize() {
      this.editor.setSize("auto", this.$refs.panel.clientHeight - 80 + "px");
    },
    submit() {
      var self = this;
      if (
        this.name != null &&
        this.name != "" &&
        this.description != null &&
        this.description != "" &&
        this.input != null &&
        this.input != "" &&
        this.output != null &&
        this.output != "" &&
        this.sampleinput != null &&
        this.sampleinput != "" &&
        this.sampleoutput != null &&
        this.sampleoutput != "" &&
        this.timelimit != null &&
        this.timelimit != "" &&
        this.memorylimit != null &&
        this.memorylimit != "" &&
        this.testcase != null &&
        this.testcase != ""
      ) {
        this.$http
          .post(
            "http://" + this.Parms.host + this.Parms.port + "/api/modifyquiz/",
            {
              name: this.name,
              type: JSON.parse(localStorage.getItem("User")).type,
              description: this.description,
              input: this.input,
              output: this.output,
              sampleinput: this.sampleinput,
              sampleoutput: this.sampleoutput,
              timelimit: this.timelimit,
              memorylimit: this.memorylimit,
              testcase: this.testcase,
              language: this.language.toString(),
              level: this.level,
              tag: this.tag.toString(),
              courseurl: this.$route.query.courseurl,
              url:this.$route.query.quizurl
            },
            { emulateJSON: true }
          )
          .then(
            response => {
              if (response.body.status == "200") {
                this.$Message["success"](`修改成功!`);
                setTimeout(function() {
                  self.$router.back(-1);
                }, 1000);
              }
            },
            response => {
              alert("服务器维护中");
            }
          );
      } else {
        this.$Message["error"](`请检查是否填写完整`);
      }
    }
  },
  updated: function() {
    //alert("更新")
  },
  mounted: function() {
    var user = JSON.parse(localStorage.getItem("User"));
    var self = this;
    this.$Loading("加载中~~");
    this.$http
      .get(
        "http://" +
          this.Parms.host +
          this.Parms.port +
          "/api/getmodifyquiz/" +
          self.$route.query.courseurl +
          "/" +
          self.$route.query.quizurl +
          "/" +
          user.userName
      )
      .then(
        response => {
          if (response.body.status == "200") {
            var datas=response.body;
            self.name = datas["name"];
            self.description = datas["description"];
            self.input = datas["input"];
            self.output = datas["output"];
            self.sampleinput = datas["sampleinput"];
            self.sampleoutput = datas["sampleoutput"];
            self.timelimit = datas["timelimit"];
            self.memorylimit = datas["memorylimit"];
            self.testcase = datas["testcase"];
            self.tag = datas["tag"].split(",");;
            self.level=datas["level"];
            self.language = datas["language"].split(",");
            this.$Loading.close();
          } else {
            
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
