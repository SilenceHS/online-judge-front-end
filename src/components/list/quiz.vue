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
            <div class="divcenter">{{datas.name}}</div>
            <div style="text-align:center;border-bottom: solid 2px #eee;line-height: 2.5em;">
              <span style="font-size: 16px;color: green;">时间限制</span>
              <span style="font-size: 17px;">:{{datas.timelimit}}ms&ensp;</span>
              <span style="font-size: 16px;color: green;">内存限制</span>
              <span style="font-size: 17px;">:{{datas.memorylimit}}KB</span>
            </div>
            <div style="font-size: 180%;line-height: 2.5em;">题目描述</div>
            <div style="font-size: 16px;">{{datas.description}}</div>
            <div style="font-size: 180%;line-height: 2.5em;">输入规则</div>
            <div style="font-size: 16px;">{{datas.input}}</div>
            <div style="font-size: 180%;line-height: 2.5em;">输出规则</div>
            <div style="font-size: 16px;">{{datas.output}}</div>

            <div style="font-size: 180%;line-height: 2.5em;">输入样例</div>
            <div style="font-size: 16px;">{{datas.sampleinput}}</div>
            <div style="font-size: 180%;line-height: 2.5em;">输出样例</div>
            <div style="font-size: 16px;">{{datas.sampleoutput}}</div>
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
            ></textarea>
            <p style="margin-top:10px;display: inline-block;">选择编程语言：</p>
            <div v-width="200" style="margin-top:10px;display: inline-block;">
              <Select v-model="select" :datas="param" :deletable="false" @change="selectFn($event)"></Select>
            </div>

            <button
              class="h-btn h-btn-text-blue h-btn-transparent;"
              style="margin-top:10px;float:right"
            >提交历史</button>
            <Button color="blue" style="margin-top:10px;float:right;margin-right:10px">提交</Button>
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
      show: false,
      border: false,
      stripe: true,
      checkbox: false,
      serial: true,
      loading: false,
      datas: [],
      mycode:
        "#include<iostream>\nusing namespace std;\nint main(){\nint a=0;\nint n;\ncin>>n;\ncout<<n;\nreturn 0;\n}",
      select: "python",
      param: ["python", "text/x-c++src", "C", "C++"],
      codestyle: "python"
      // cmOptions:{
      //   mode:"python",
      //   theme: "mdn-like",
      //   lineNumbers: true,
      //   showCursorWhenSelecting:true,
      //   readOnly:false,
      //   matchBrackets:true,
      //   autoCloseBrackets:true,
      //   smartIndent: true,
      //   styleActiveLine:true,
      // }
    };
  },
  methods: {
    openMore() {
      this.$router.push({ name: "Chart" });
    },
    messageRender(data, index) {
      return 'style="color: #ff0;"';
    },
    selectFn(e) {

    },
    
  },
  updated: function() {
    this.editor.setSize("auto", this.$refs.panel.clientHeight - 80 + "px");
  },
  mounted: function() {
    var self = this;
    this.editor = CodeMirror.fromTextArea(this.$refs.mycode, {
      mode: self.codestyle,
      theme: "mdn-like",
      lineNumbers: true,
      showCursorWhenSelecting: true,
      readOnly: false,
      matchBrackets: true,
      autoCloseBrackets: true,
      smartIndent: true,
      styleActiveLine: true
    });
    this.$Loading("加载中~~");
    var self = this;
    var user = JSON.parse(localStorage.getItem("User"));
    this.$http
      .get(
        "http://127.0.0.1:8000/api/getquiz/" +
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
  //   components:{
  //       codemirror
  //  },
};
</script>
