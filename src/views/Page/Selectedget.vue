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
import { getSeled } from '@/plugins/api/request';
export default {
  name: "Seled",
  data() {
    return {
      one: []
    };
  },
  mounted() {
    this.autoget();
    this.one = JSON.parse(localStorage.getItem("seleget"));
    
  },
  methods: {
    autoget() {
      getSeled(this.$route.params.t)
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
          localStorage.setItem("seleget", JSON.stringify(this.newarray));
          this.one = JSON.parse(localStorage.getItem("seleget"));
        }
        if (res.data.status == 4) {
          this.$notify.error({
            title: "错误",
            message: res.data.msg+'正在重新登入，请稍等。'
          });
          this.allLogin();
        }
      });
    }
  }
};
</script>