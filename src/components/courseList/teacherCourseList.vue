<style lang='less'>
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
    <Skeleton active :loading="loading" :rows="5">
      <Row :space="30">
        <Cell :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div class="h-panel">
            <div class="h-panel-bar">
              <div class="h-panel-title">课程管理</div>
              <div class="h-panel-right">
                <span class="gray-color">总课程数</span>
                <i class="h-split"></i>
                <span class="font20 primary-color">{{datas.length}}</span>
                <i class="h-split"></i>
                <span class="gray-color"></span>
              </div>
            </div>
            <Search
              v-model="keyWords"
              position="front"
              trigger-type="input"
              block
              placeholder="搜索课程名字"
              style="display:inline-block; width: 90%;"
            ></Search>
            <Button
              color="blue"
              icon="h-icon-plus"
              style="display:inline-block; width: 9%;"
              v-tooltip
              placement="bottom"
              content="添加课程"
              @click="createCourse"
            ></Button>
            <Modal v-model="modifyOpened">
              <div slot="header">修改课程</div>
              <div>
                <span style="font-size:18px;">课程名称:</span>
                <input type="text" v-model="name" />
                <br />
                <span style="font-size:18px;">课程简介:</span>
                <input type="text" v-model="detail" />
                <br />

                <span style="font-size:18px;">任教老师:</span>
                <input type="text" v-model="teacherName" />
              </div>
              <div slot="footer">
                <Button color="primary" @click="modifyConfirm">确认</Button>
                <Button @click="modifyClose">关闭</Button>
              </div>
            </Modal>

            <Modal v-model="createOpened">
              <div slot="header">添加课程</div>
              <div>
                <span style="font-size:18px;">课程名称:</span>
                <input type="text" v-model="name"/>
                <br />
                <span style="font-size:18px;">课程简介:</span>
                <input type="text" v-model="detail"/>
                <br />

                <span style="font-size:18px;">任教老师:</span>
                <input type="text" v-model="teacherName"/>
              </div>
              <div slot="footer">
                <Button color="primary" @click="createConfirm">确认</Button>
                <Button @click="createClose">关闭</Button>
              </div>
            </Modal>
          </div>
        </Cell>
        <Cell :xs="6" :sm="6" :md="6" :lg="6" :xl="6" v-for="(i,index) in courseList" :key="index">
          <div class="h-panel">
            <div class="h-panel-bar">
              <div class="h-panel-title">{{i.coursename}}</div>
              <div class="h-panel-right">
                <span class="gray-color">选课人数</span>
                <i class="h-split"></i>
                <span class="font20 primary-color">{{i.peoplenum}}</span>
                <i class="h-split"></i>
                <span class="gray-color"></span>

                <span class="gray-color">题目数</span>
                <i class="h-split"></i>
                <span class="font20 primary-color">{{i.quiznum}}</span>
                <i class="h-split"></i>
                <span class="gray-color"></span>
              </div>
            </div>
            <div class="h-panel-bar">
              <Row :space="20">
                <div style="padding:10px">
                  <span style="font-size:18px;font-weight:bold">课程简介:</span>
                  <span style="font-size:18px;">{{i.detail}}</span>
                  <br />
                  <span style="font-size:18px;font-weight:bold">任教老师:</span>
                  <span style="font-size:18px">{{i.teachername}}</span>
                  <br />
                  <span style="font-size:18px;font-weight:bold">课程ID:</span>
                  <span style="font-size:18px">{{i.url}}</span>
                </div>
              </Row>
            </div>
            <Button
              color="blue"
              icon="h-icon-edit"
              style="display:inline-block;margin:10px;margin-right:0px;margin-left:25px"
              v-tooltip
              placement="bottom"
              content="修改课程"
              @click="modifyCourse(i.url)"
            ></Button>
            <Button
              color="blue"
              icon="h-icon-home"
              style="display:inline-block;margin:10px;margin-right:0px;margin-left:0px"
              v-tooltip
              placement="bottom"
              content="题库详情"
              @click="teacherList(i.url)"
            ></Button>
            <Button
              color="blue"
              icon="h-icon-task"
              style="display:inline-block;margin:10px;margin-right:0px;margin-left:0px"
              v-tooltip
              placement="bottom"
              content="复制课程ID"
              v-clipboard:copy="i.url"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
            ></Button>
            <Button
              color="blue"
              icon="h-icon-users"
              style="display:inline-block;margin:10px;margin-left:0px"
              v-tooltip
              placement="bottom"
              content="学生答题情况"
              @click="studentList(i.url)"
            ></Button>
            <div style="display:inline-block;float:right;margin:10px;margin-right:25px;">
            <Poptip content="删除课程会导致学生答题记录,课程题库题等所有信息删除，是否永久删除？" @confirm="deleteCourseConfirm(i.url)">
            <Button
              color="red"
              icon="h-icon-trash"

              v-tooltip
              placement="bottom"
              content="删除该课程"
            ></Button>
            </Poptip>
            </div>
          </div>
        </Cell>
      </Row>
    </Skeleton>
  </div>
</template>
<script>
import data1 from "js/datas/data1";
import data2 from "js/datas/data2";
import data3 from "js/datas/data4";

export default {
  data() {
    return {
      loading: false,
      keyWords: "",
      datas: [],
      modifyOpened: false,
      createOpened: false,
      modifyIndex: 0,
      name: "",
      detail: "",
      teacherName: ""
    };
  },
  methods: {
    modifyClose() {
        
      this.modifyOpened = false;
      this.name="",
      this.detail="",
      this.teacherName=""
    },
    createClose() {
      this.createOpened = false;
      this.name="",
      this.detail="",
      this.teacherName=""
    },
    createConfirm() {
      this.$http
        .post(
          "http://" + this.Parms.host + this.Parms.port + "/api/addcourse/",
          {
            coursename: this.name,
            detail: this.detail,
            teachername: this.teacherName,
            username:JSON.parse(localStorage.getItem("User")).userName
          },
          { emulateJSON: true }
        )
        .then(
          response => {
            if (response.body.status == "200") {
              this.$Message.success("添加成功");
              this.createOpened = false;
              this.datas.push(response.body.newcourse)
            }
          },
          response => {
            alert("服务器维护中");
          }
        );
    },
    modifyConfirm() {
      this.$http
        .post(
          "http://" + this.Parms.host + this.Parms.port + "/api/modifycourse/",
          {
            coursename: this.name,
            detail: this.detail,
            teachername: this.teacherName,
            url:this.datas[this.modifyIndex].url
          },
          { emulateJSON: true }
        )
        .then(
          response => {
            if (response.body.status == "200") {
              this.$Message.success("修改成功");
              this.modifyOpened = false;
              this.datas[this.modifyIndex].coursename = this.name;
              this.datas[this.modifyIndex].detail = this.detail;
              this.datas[this.modifyIndex].teachername = this.teacherName;
            }
          },
          response => {
            alert("服务器维护中");
          }
        );
    },
    modifyCourse(url) {
      for (var i = 0; i < this.datas.length; i++) {
        if (this.datas[i].url == url) this.modifyIndex = i;
      }
      this.name = this.datas[this.modifyIndex].coursename;
      this.detail = this.datas[this.modifyIndex].detail;
      this.teacherName = this.datas[this.modifyIndex].teachername;
      this.modifyOpened = true;
    },
    createCourse(){
      this.createOpened = true;
  },
  deleteCourseConfirm(url){
      for (var i = 0; i < this.datas.length; i++) {
        if (this.datas[i].url == url){
            var index=i
            this.$http
        .post(
          "http://" + this.Parms.host + this.Parms.port + "/api/deletecourse/",
          {
            url:url
          },
          { emulateJSON: true }
        )
        .then(
          response => {
            if (response.body.status == "200") {
              this.$Message.success("删除成功");
              this.datas.splice(index,1)
            }
          },
          response => {
            alert("服务器维护中");
          }
        );
        }  
      }
    },
    onCopy(e){
      this.$Message.success("复制成功");
    },
    // 复制失败
    onError(e){
      this.$Message.error("复制失败，请手动复制");
    },
    teacherList(courseUrl){
      this.$router.push({ path: "/teacherList", query: { courseurl: courseUrl } });
    },
    studentList(courseUrl)
    {
      this.$router.push({ path: "/studentRank", query: { courseurl: courseUrl } });
    }
  },
  
  mounted: function() {
    var self = this;
    var user = JSON.parse(localStorage.getItem("User"));
    this.$http
      .get(
        "http://" +
          this.Parms.host +
          this.Parms.port +
          "/api/getcourselist/" +
          user.userName +
          "/" +
          user.type
      )
      .then(
        response => {
          if (response.body.status == "200") {
            self.datas = response.body.courselist;
            console.log(self.datas);
            setTimeout(function() {
              self.loading = false;
            }, 500);
          } else {
            alert("服务器维护中");
          }
        },
        response => {
          alert("服务器维护中");
        }
      );
  },
  computed: {
    courseList() {
      if (this.keyWords == "") {
        return this.datas;
      } else {
        return this.datas.filter(value => {
          return (
            value.coursename.toString().indexOf(this.keyWords) != -1 ||
            value.detail.indexOf(this.keyWords) != -1 ||
            value.teachername.indexOf(this.keyWords) != -1
          ); //如果包含字符返回true
        });
      }
    }
  }
};
</script>
