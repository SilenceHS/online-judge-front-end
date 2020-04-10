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
            <div class="divcenter">{{quizname}}</div>
            <Table :datas="datas">
              <TableItem title="#" >
                <template slot-scope="{data}">
                  <div class="body-text">{{data.id}}</div>
                </template>
              </TableItem>
              <TableItem title="语言">
                <template slot-scope="{data}">
                  <div class="body-text">{{data.language}}</div>
                </template>
              </TableItem>
              <TableItem title="状态" align="center" >
                <template slot-scope="{data}">
                  <div class="body-text">{{data.status}}</div>
                </template>
              </TableItem>
              <TableItem title="日期" align="center" >
                <template slot-scope="{data}">
                  <div class="body-text">{{data.date}}</div>
                </template>
              </TableItem>
              <TableItem title="运行时间" align="center" >
                <template slot-scope="{data}">
                  <div class="body-text">{{data.time}}</div>
                </template>
              </TableItem>
              <TableItem title="运行内存" align="center" >
                <template slot-scope="{data}">
                  <div class="body-text">{{data.memory}}</div>
                </template>
              </TableItem>
              <TableItem title="操作" align="center" >
                <template slot-scope="{data}">
                  <Button
              color="blue"
              @click="getCode(data.id)"
            >显示代码</Button>
                </template>
              </TableItem>
            </Table>
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
          </div>
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
      quizname:"",
      judging: false,
      mycode: "//TODO",
      select: "",
      param: [],
      result: "",
      accepted: false
    };
  },
  methods: {
    setSize() {
      this.editor.setSize("auto", 700+ "px");
    },
    getCode(id){
      for(var i=0;i<this.datas.length;i++)
        if(this.datas[i].id==id)
          this.editor.setValue(this.datas[i].code);
    }
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
        smartIndent: false,
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
          "/api/gethistorylist/" +
          self.$route.query.quiz +
          "/" +
          user.userName
      )
      .then(
        response => {
          if (response.body.status == "200") {
            self.datas=response.body.historyList
            self.quizname=response.body.quizname

            this.$Loading.close();
          } else {

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
