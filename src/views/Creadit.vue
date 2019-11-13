<template>
  <div>
    <el-card class="box-card">
      <h4>学分详情</h4>
    </el-card>

    <el-card class="box-card">
      <el-table :data="this.one" style="width: auto">
        <el-table-column prop="type" label="课程类型" width="auto"></el-table-column>
        <el-table-column prop="requ" label="要求学分" width="auto"></el-table-column>
        <el-table-column prop="all" label="总修学分" width="auto"></el-table-column>
        <el-table-column prop="get" label="取得学分" width="auto"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getCreadit } from '@/plugins/api/request';
export default {
  name: "Creadit",
  data() {
    return {
      one: []
    };
  },
  mounted() {
    this.autoget();
    this.one = JSON.parse(localStorage.getItem("Creadit"));
    this.$forceUpdate();
  },
  methods: {
    autoget() {
      getCreadit()
        .then(res => {
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
          console.log(res);
          this.indata = res.data.data;
          this.newarray = new Array();
          for (var i = 0; i < this.indata.length; i++) {
            this.newarray.push({
              type: this.indata[i]["0"],
              requ: this.indata[i]["1"],
              all: this.indata[i]["2"],
              get: this.indata[i]["3"]
            });
          }
          //this.one = this.newarray;
          localStorage.setItem("Creadit", JSON.stringify(this.newarray));
          this.one = JSON.parse(localStorage.getItem("Creadit"));
          this.$forceUpdate();
          //console.log(this.newarray);
          this.$forceUpdate();
        }
        if (res.data.status == 4) {
          this.$notify.error({
            title: "错误",
            message: res.data.msg+'正在重新登入，请稍等。'
          });
          this.allLogin();
          // setTimeout(() => {
          //   window.location.href = "/";
          // }, 3000);
        }
      });
    }
  }
};
</script>