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
            <div class="h-panel-title">官方题库</div>
            <div class="h-panel-right">
              <span class="gray-color">总题数</span>
              <i class="h-split"></i>
              <span class="font20 primary-color">{{datas.length}}</span>
              <i class="h-split"></i>
              <span class="gray-color"></span>
            </div>
          </div>
          <Search v-model="keyWords" position="front" trigger-type="input" block placeholder="搜索题目id, 题名，难度"></Search>
          <div>
            
            <Table :datas="listData">
              <TableItem title align="right" :width="50">
                <template slot-scope="{data}">
                  <div v-if="data.status=='ACCEPTED'">
                    <i class="h-icon-check" style="color:#5C9A4F;font-size:15px;"></i>
                  </div>
                </template>
              </TableItem>
              <TableItem title="#" :width="100">
                <template slot-scope="{data}">
                  <div class="body-text">{{data.id}}</div>
                </template>
              </TableItem>
              <TableItem title="题名">
                <template slot-scope="{data}">
                  <router-link
                    class="body-text"
                    style="color:#3787C6"
                    :to="{path:'/quiz/?quiz='+data.url+'&list='+listUrl}"
                  >{{data.name}}</router-link>
                </template>
              </TableItem>
              <TableItem title="解题人数" align="center" :width="100">
                <template slot-scope="{data}">
                  <div class="body-text">{{data.solve}}</div>
                </template>
              </TableItem>
              <TableItem title="通过率" align="center" :width="100">
                <template slot-scope="{data}">
                  <div class="body-text">{{data.percent}}</div>
                </template>
              </TableItem>
              <TableItem title="难度" align="center" :width="100">
                <template slot-scope="{data}">
                  <div v-if="data.level=='简单'" class="body-text" style="color:#439C77;">简单</div>
                  <div v-if="data.level=='普通'" class="body-text" style="color:#DE7946;">普通</div>
                  <div v-if="data.level=='困难'" class="body-text" style="color:#DB584E;">困难</div>
                </template>
              </TableItem>
              <TableItem title="标签" align="center" :width="200">
                <template slot-scope="{data}" >
                 <div class="body-text"><span v-for="(tag,i) in (data.tag).split(',')" class="h-tag h-tag-blue" :key="i" v-show="tag!=''">{{tag}}</span></div>
                </template>
              </TableItem>
            </Table>
          </div>
        </div>
      </Cell>
      <Cell :xs="6" :sm="6" :md="6" :lg="6" :xl="6"  v-if="datas.length!=0">
        <div class="h-panel">
          <div class="h-panel-bar">
            <div class="h-panel-title">完成情况</div>
            <div class="h-panel-right">
              <span class="gray-color">当前排名</span>
              <i class="h-split"></i>
              <span class="font20 primary-color">1</span>
              <i class="h-split"></i>
              <span class="gray-color"></span>
            </div>
          </div>
          <div class="h-panel-body">
            <Row :space="20">
              <Cell :width="10" class="text-right">
                <h-circle :percent="solvedNum/datas.length*100" :stroke-width="10" :size="90">
                  <p>
                    <span class="font28">{{solvedNum}}</span>
                    <span class="gray-color">/ {{datas.length}}</span>
                  </p>
                </h-circle>
              </Cell>
              <Cell :width="14">
                <p class="gray-color">目前完成比例</p>
                <p class="dark-color font22">{{solvedNum/datas.length*100}}%</p>
              </Cell>
            </Row>
          </div>
        </div>

        <div class="h-panel">
          <div class="h-panel-body progress-div">
            <p>
              <Progress :percent="99" color="green">
                <span slot="title">AC</span>
                <span slot="text">6个</span>
              </Progress>
            </p>
            <p>
              <Progress :percent="88" color="blue">
                <span slot="title">WA</span>
                <span slot="text">5个</span>
              </Progress>
            </p>
            <p>
              <Progress :percent="55" color="red">
                <span slot="title">CE</span>
                <span slot="text">2个</span>
              </Progress>
            </p>
            <p>
              <Progress :percent="77" color="blue">
                <span slot="title">PE</span>
                <span slot="text">4个</span>
              </Progress>
            </p>
            <p>
              <Progress :percent="66" color="yellow">
                <span slot="title">TLE</span>
                <span slot="text">3个</span>
              </Progress>
            </p>
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
      loading: true,
      listUrl: 0,
      datas: [],
      keyWords: "",
      solvedNum:0
    };
  },
  methods: {
    confirm() {
      this.$Message.success("删除成功");
    },
  },
  mounted: function() {
    var self = this;
    self.listUrl = self.$route.query.list;
    var user = JSON.parse(localStorage.getItem("User"));
    this.$http
      .get(
        "http://"+this.Parms.host+this.Parms.port+"/api/getquizlist/" +
          self.listUrl +
          "/" +
          user.userName
      )
      .then(
        response => {
          if (response.body.status == "200") {
            self.datas = response.body.quizList;
             for(var i in self.datas){
              if(self.datas[i].status=='ACCEPTED')
                self.solvedNum+=1
            }
             setTimeout(function() {
              self.loading=false
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
    listData() {
      if (this.keyWords == "") {
        return this.datas;
      } else {
        return this.datas.filter(value => {
          return (
            (value.id).toString().indexOf(this.keyWords)!=-1 ||
            (value.name).indexOf(this.keyWords)!=-1  ||
            (value.level).indexOf(this.keyWords)!=-1 ||
            ((value.tag).indexOf(this.keyWords)!=-1)
          ); //如果包含字符返回true
        });
      }
    }
  }
};
</script>
