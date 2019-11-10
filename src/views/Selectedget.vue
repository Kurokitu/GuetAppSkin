<template>
  <div>
    <el-card class="box-card">
      <h4>已选课程详细信息</h4>
    </el-card>

    <el-card class="box-card">
      <el-table :data="this.one" style="width: auto">
        <el-table-column prop="name" label="课程名称" width="auto"></el-table-column>
        <el-table-column prop="type" label="课程类型" width="auto"></el-table-column>
        <el-table-column prop="tc" label="教师" width="auto"></el-table-column>
        <el-table-column prop="num" label="学分" width="auto"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  inject: ["relogin"],
  name: "Seled",
  data() {
    return {
      one: []
    };
  },
  mounted() {
    this.autoget();
    this.one = JSON.parse(localStorage.getItem("seleget"));
    this.$forceUpdate();
  },
  methods: {
    autoget() {
      this.axios({
        method: "post",
        url: "https://gelinapi.kilins.com/gbh/edu",
        data: {
          func: "selected",
          cookie:
            localStorage.getItem("cookie_key") +
            " " +
            localStorage.getItem("cookie"),
          argv: { type: "get", term: this.$route.params.t },
          version: "1.1.18"
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
          this.$notify({
            message: res.data.msg,
            type: "success"
          });
          this.indata = res.data.data;
          this.newarray = new Array();
          for (var i = 0; i < this.indata.length; i++) {
            this.newarray.push({
              name: this.indata[i]["1"],
              type: this.indata[i]["2"],
              tc: this.indata[i]["4"],
              num: this.indata[i]["5"]
            });
          }
          //this.one = this.newarray;
          localStorage.setItem("seleget", JSON.stringify(this.newarray));
          this.one = JSON.parse(localStorage.getItem("seleget"));
          this.$forceUpdate();
          //console.log(this.newarray);
          this.$forceUpdate();
        }
        if (res.data.status == 4) {
          this.$notify.error({
            title: "错误",
            message: res.data.msg+'正在重新登入，请稍等。'
          });
          this.relogin;
          // setTimeout(() => {
          //   window.location.href = "/";
          // }, 3000);
        }
      });
    }
  }
};
</script>