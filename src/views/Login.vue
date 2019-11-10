<template>
  <div class="login">
    <!-- <div class="login-logo">
      <img alt="logo" src="../assets/Guet_logo.svg">
    </div>-->

    <el-card class="box-card">
      <h4>您只需输入您的学号和密码</h4>
      <el-button @click="onabout()" type="text">查看关于</el-button>
    </el-card>

    <el-card class="box-card">
      <div class="login-title">登入</div>

      <div class="login-form-box">
        <div class="login-form-input">
          <el-input type="number" v-model="id" placeholder="学号"></el-input>
          <el-input type="password" v-model="password" placeholder="密码"></el-input>
        </div>

        <div class="login-form-bnt">
          <el-button class="i-el-button" @click="postlogin()" type="primary">登入</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "login",
  data: function() {
    return {
      id: "",
      password: "",
      statusinfo: ""
    };
  },
  mounted() {
    this.getStuts();
  },
  methods: {
    onabout() {
      window.location.href = "/About";
    },
    getStuts() {
      if (!localStorage.getItem("UID")) {
        //todo
      } else {
        if (!localStorage.getItem("Password")) {
          //todo
        } else {
          window.location.href = "/";
        }
      }
    },
    postlogin() {
      if (!this.id) {
        this.$notify.error({
          title: "错误",
          message: "请输入学号！"
        });
      } else {
        if (!this.password) {
          this.$notify.error({
            title: "错误",
            message: "请输入密码！"
          });
        } else {
          localStorage.setItem("UID", this.id);
          localStorage.setItem("Password", this.password);

          this.axios({
            method: "post",
            url: "https://gelinapi.kilins.com/login_check/",
            data: {
              func: "login",
              argv: { username: this.id, password: this.password },
              version: "1.1.16"
            },
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }).then(res => {
            if (res.status == 200) {
              /* eslint-disable */

              console.log(res);
              if (res.data.status == 1) {
                this.$notify.error({
                  title: "错误",
                  message: "学号或密码不正确！"
                });
                localStorage.removeItem("UID");
                localStorage.removeItem("Password");
              }
              if (res.data.status == 2) {
                window.location.href = "/";
              }
            } else {
              this.$notify.error({
                title: "错误",
                message: "无法连接，网络可能有问题"
              });
            }
          });
        }
      }
    }
  }
};
</script>

<style scoped>
.login-logo {
  text-align: center;
  width: 100%;
  margin-top: 50px;
}

.login-title {
  width: 100%;
  text-align: center;
  font-size: 24px;
  margin-top: 20px;
}

.login-form-box {
  width: 100%;
}

.login-form-input {
  width: 80%;
  margin: 20px auto;
  line-height: 80px;
}

.login-form-input input {
  width: 100%;
  height: 40px;
}

.login-form-input .sinfo {
  font-size: 12px;
  color: #f00;
}

.login-form-bnt {
  margin: 0 auto;
  width: 100%;
  text-align: center;
}

.login-form-bnt .i-el-button {
  width: 80%;
}

.box-card h1 {
  line-height: 100px;
  text-align: center;
}
</style>>