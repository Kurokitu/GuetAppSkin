<template>
  <div>
    <el-card class="box-card">
      <h4>空白数据等于无课</h4>
      <p color="#f00">10月28日起开始启用冬季时间，请注意！</p>
    </el-card>

    <el-card class="box-card">
      <el-col :span="12">
        <el-select
          style="float: left;"
          v-model="weeksele"
          placeholder="请选择周数"
          @change="getweeksele()"
        >
          <el-option
            v-for="itemw in this.weekoptions"
            :key="itemw.week"
            :label="itemw.wlabel"
            :value="itemw.week"
          ></el-option>
        </el-select>
      </el-col>

      <el-col :span="12">
        <el-select
          style="float: left;"
          v-model="daysele"
          placeholder="请选择星期"
          @change="getweeksele()"
        >
          <el-option
            v-for="itemd in this.dayoptions"
            :key="itemd.day"
            :label="itemd.dlabel"
            :value="itemd.day"
          ></el-option>
        </el-select>
      </el-col>

      <el-table :data="this.one" :row-class-name="tableRowClassName" style="width: 100%">
        <el-table-column prop="name" label="课时" width="auto"></el-table-column>
        <el-table-column prop="time" label="时间" width="auto"></el-table-column>
        <el-table-column prop="info" label="信息" width="auto"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  inject: ["relogin"],
  name: "Coures",
  data() {
    return {
      one: [],
      weekoptions: [],
      week: ""
    };
  },
  mounted() {
    this.autoget();
    //this.getdata();
    this.weekoptions = [
      {
        week: "1",
        wlabel: "第一周"
      },
      {
        week: "2",
        wlabel: "第二周"
      },
      {
        week: "3",
        wlabel: "第三周"
      },
      {
        week: "4",
        wlabel: "第四周"
      },
      {
        week: "5",
        wlabel: "第五周"
      },
      {
        week: "6",
        wlabel: "第六周"
      },
      {
        week: "7",
        wlabel: "第七周"
      },
      {
        week: "8",
        wlabel: "第八周"
      },
      {
        week: "9",
        wlabel: "第九周"
      },
      {
        week: "10",
        wlabel: "第十周"
      },
      {
        week: "11",
        wlabel: "第十一周"
      },
      {
        week: "12",
        wlabel: "第十二周"
      },
      {
        week: "13",
        wlabel: "第十三周"
      },
      {
        week: "14",
        wlabel: "第十四周"
      },
      {
        week: "15",
        wlabel: "第十五周"
      },
      {
        week: "16",
        wlabel: "第十六周"
      },
      {
        week: "17",
        wlabel: "第十七周"
      },
      {
        week: "18",
        wlabel: "第十八周"
      },
      {
        week: "19",
        wlabel: "第十九周"
      },
      {
        week: "20",
        wlabel: "第二十周"
      }
    ];
    this.dayoptions = [
      {
        day: "1",
        dlabel: "星期一"
      },
      {
        day: "2",
        dlabel: "星期二"
      },
      {
        day: "3",
        dlabel: "星期三"
      },
      {
        day: "4",
        dlabel: "星期四"
      },
      {
        day: "5",
        dlabel: "星期五"
      },
      {
        day: "6",
        dlabel: "星期六"
      },
      {
        day: "7",
        dlabel: "星期日"
      }
    ];

    //获取当前星期几
    this.darr = new Array("7", "1", "2", "3", "4", "5", "6");
    this.couday = new Date().getDay();
    this.daysele = this.darr[this.couday];

    //获取当前周
    if (!localStorage.getItem("toweek")) {
      this.weeksele = localStorage.getItem("toweek");
      this.$forceUpdate();
    }
  },
  methods: {
    tableRowClassName({ rowIndex }) {
      if (rowIndex === 0) {
        return "warning-row";
      } else if (rowIndex === 1) {
        return "success-row";
      }else if (rowIndex === 2) {
        return "warning-row";
      }else if (rowIndex === 3) {
        return "success-row";
      }else if (rowIndex === 4) {
        return "warning-row";
      }else if (rowIndex === 5) {
        return "warning-row";
      }
      return "";
    },

    autoget() {
      this.axios({
        method: "post",
        url: "https://gelinapi.kilins.com/info_check/",
        data: {
          func: "course_table",
          cookie:
            localStorage.getItem("cookie_key") +
            " " +
            localStorage.getItem("cookie"),
          argv: { type: "get_new_table", term: this.$route.params.t },
          version: "1.1.16"
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        /* eslint-disable */

        console.log(res);
        if (res.data.status == 1) {
          this.$notify.error({
            title: "错误",
            message: "拉取列表失败"
          });
          setTimeout(() => {
            window.location.href = "/";
          }, 3000);
        }
        if (res.data.status == 2) {
          this.weeksele = "" + res.data.data.toweek;
          localStorage.setItem("toweek", "" + res.data.data.toweek);
          /* eslint-disable */
          //console.log(this.inday);
          this.$forceUpdate();

          if (!this.weeksele) {
            this.$notify.error({
              title: "错误",
              message: "请选择周数！"
            });
            this.$forceUpdate();
          } else {
            if (!this.daysele) {
              this.$notify.error({
                title: "错误",
                message: "请选择星期！"
              });
              this.$forceUpdate();
            } else {
              this.getdata();
            }
          }
        }
        if (res.data.status == 4) {
          this.$notify.error({
            title: "错误",
            message: res.data.msg+'正在重新登入，请稍等。'
          });
          this.relogin();
          //this.autoget();
          // setTimeout(() => {
          //   window.location.href = "/";
          // }, 3000);
        }
      });
    },

    getweeksele() {
      if (!this.weeksele) {
        this.$notify.error({
          title: "错误",
          message: "请选择周数！"
        });
        this.$forceUpdate();
      } else {
        if (!this.daysele) {
          this.$notify.error({
            title: "错误",
            message: "请选择星期！"
          });
          this.$forceUpdate();
        } else {
          this.getdata();
        }
      }
    },

    getdata() {
      this.axios({
        method: "post",
        url: "https://gelinapi.kilins.com/info_check/",
        data: {
          func: "course_table",
          cookie:
            localStorage.getItem("cookie_key") +
            " " +
            localStorage.getItem("cookie"),
          argv: { type: "get_new_table", term: this.$route.params.t },
          version: "1.1.16"
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        /* eslint-disable */

        console.log(res);
        if (res.data.status == 1) {
          this.$notify.error({
            title: "错误",
            message: "拉取列表失败"
          });
          setTimeout(() => {
            window.location.href = "/";
          }, 3000);
        }
        if (res.data.status == 2) {
          //this.week = res.data.data.toweek;
          this.week = this.weeksele;
          this.day = this.daysele;
          this.$notify({
            message: res.data.msg,
            type: "success"
          });
          /* eslint-disable */

          //console.log(res.data.data[16]['1']['4']['0']);
          this.one = [
            {
              name: "1 - 2节",
              time: "8:25至10:05",
              info: res.data.data[this.week]["1"][this.day]["0"]
            },
            {
              name: "3 - 4节",
              time: "10:25至12:05",
              info: res.data.data[this.week]["2"][this.day]["0"]
            },
            {
              name: "5 - 6节",
              time: "14:30至16:10",
              info: res.data.data[this.week]["3"][this.day]["0"]
            },
            {
              name: "7 - 8节",
              time: "16:30至18:10",
              info: res.data.data[this.week]["4"][this.day]["0"]
            },
            {
              name: "9 - 10节",
              time: "19:30至21:10",
              info: res.data.data[this.week]["5"][this.day]["0"]
            }
          ];
          /* eslint-disable */

          console.log(this.one);
          this.$forceUpdate();
        }
        if (res.data.status == 4) {
          this.$message.error(res.data.msg+'正在重新登入，请稍等。');
          this.relogin();
          //this.autoget();
          // setTimeout(() => {
          //   window.location.href = "/";
          // }, 3000);
        }
      });
    }
  }
};
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 90%;
}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
</style>