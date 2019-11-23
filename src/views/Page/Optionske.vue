<template>
  <div>
    <el-card class="box-card">
      <h4>查询课程</h4>
      <el-alert
        style="margin-top: 20px;"
        title="如果您打开下拉列表显示无数据请再次刷新尝试"
        type="warning"
        effect="dark"
      ></el-alert>
    </el-card>

    <el-card class="box-card">
      <!-- <div class="opbox"> -->
      <el-select v-model="opvalue" placeholder="请选择要查询的学期">
        <el-option
          v-for="item in oplist"
          :key="item.value"
          :label="item.title"
          :value="item.value"
        ></el-option>
      </el-select>

      <el-button @click="postdate()" type="primary">查询</el-button>
      <!-- </div> -->
    </el-card>
  </div>
</template>

<script>
import { getOptTwo } from '@/plugins/api/request';
export default {
  name: "option-ke",
  data() {
    return {
      oplist: JSON.parse(localStorage.getItem("oplistke")),
      value: "",
      opvalue: ""
    };
  },

  mounted() {
    this.getop();
    
  },

  methods: {
    getop() {
      getOptTwo()
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
          //this.oplist = res.data.data;
          localStorage.setItem("oplistke", JSON.stringify(res.data.data));
          this.oplist = JSON.parse(localStorage.getItem("oplistke"));
          this.opvalue = JSON.parse(localStorage.getItem("oplistke"))[1].value;
        }
        if (res.data.status == 4) {
          this.$message.error(res.data.msg+'正在重新登入，请稍等。');
          this.allLogin();
          // setTimeout(() => {
          //   window.location.href = "/";
          // }, 3000);
        }
      });
    },

    postdate() {
      if (!this.opvalue) {
        this.$notify.error({
          title: "错误",
          message: "请选择要查询的数据！"
        });
      } else {
        this.getcouresdata(this.opvalue);
        // this.$router.push({
        //   path: "/Coures/"
        // });
      }
    }
  }
};
</script>

<style scoped>
.opbox {
  text-align: center;
  width: 100%;
  margin-top: 50px;
}

.tips {
  text-align: center;
  margin: 40px auto;
}
</style>