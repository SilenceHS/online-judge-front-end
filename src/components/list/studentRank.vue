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
        <Cell :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
          <div class="h-panel">
            <div class="h-panel-bar">
              <div class="h-panel-title">{{courseName}}</div>
              
              <div class="h-panel-right">
                <span class="gray-color">总题数</span>
                <i class="h-split"></i>
                <span class="font20 primary-color">{{allNum}}</span>
                <i class="h-split"></i>
                <Button color="blue" @click="getExcel" style="margin-top:10px;">导出excel详细信息</Button>
                <span class="gray-color"></span>
              </div>
            </div>
            <div>
              <Table :datas="listData">
                <TableItem title="姓名" align="center" :width="100">
                  <template slot-scope="{data}">{{data.studentName}}</template>
                </TableItem>

                <TableItem title="完成情况" align="center" :width="100">
                  <template slot-scope="{data}">
                    <div class="progress-div">
                      <Progress :percent="data.solved/allNum*100" color="blue"></Progress>
                    </div>
                  </template>
                </TableItem>

                <TableItem title="解题个数" align="center" :width="100">
                  <template slot-scope="{data}">
                    <div class="body-text">{{data.solved}}</div>
                  </template>
                </TableItem>
              </Table>
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
      showType: 0,
      loading: true,
      listData: [],
      courseName: "",
      allNum: 0
    };
  },
  methods: {
    getExcel(){
      let a = document.createElement('a')
    a.href ="http://" +
          this.Parms.host +
          this.Parms.port +
          "/api/getExcel/" +
          this.$route.query.courseurl
    a.click();
    }
  },
  mounted: function() {
    this.listUrl = this.$route.query.courseurl;
    var user = JSON.parse(localStorage.getItem("User"));
    var self = this;
    this.$http
      .get(
        "http://" +
          this.Parms.host +
          this.Parms.port +
          "/api/showrank/" +
          self.listUrl +
          "/" +
          user.userName
      )
      .then(
        response => {
          if (response.body.status == "200") {
            self.showType = response.body.showtype;
            self.listData = response.body.studentranklist;
            self.courseName = response.body.coursename;
            self.allNum = response.body.allnum;
            setTimeout(function() {
              self.loading = false;
            }, 500);
          } else {
            alert("服务器维护中");
            self.$router.back(-1);
          }
        },
        response => {
          alert("服务器维护中");
        }
      );
  }
};
</script>
