<template>
  <div>
    <el-card class="box-card">
      <h4>查询已选课程</h4>
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
          :key="item.termCode"
          :label="item.termName"
          :value="item.termCode"
        ></el-option>
      </el-select>

      <el-button @click="postdate()" type="primary">查询</el-button>
      <!-- </div> -->
    </el-card>
  </div>
</template>

<script>
export default {
  inject: ["relogin"],
  name: "option-kc",
  data() {
    return {
      oplist: JSON.parse(localStorage.getItem("oplistkc")),
      value: "",
      opvalue: ""
    };
  },

  mounted() {
    this.getop();
    this.$forceUpdate();
  },

  methods: {
    getop() {
      this.axios({
        method: "post",
        url: "https://gelinapi.kilins.com/gbh/edu",
        data: {
          func: "selected",
          cookie:
            localStorage.getItem("cookie_key") +
            " " +
            localStorage.getItem("cookie"),
          argv: { type: "option" },
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
          //this.oplist = res.data.data;
          localStorage.setItem("oplistkc", JSON.stringify(res.data.data));
          this.oplist = JSON.parse(localStorage.getItem("oplistkc"));
          this.opvalue = JSON.parse(localStorage.getItem("oplistkc"))[1].termCode;
          this.$forceUpdate();
        }
        if (res.data.status == 4) {
          this.$message.error(res.data.msg+'正在重新登入，请稍等。');
          this.relogin();
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
        this.$router.push({
          path: "/iSelectedget/" + this.opvalue
        });
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