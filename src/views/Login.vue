<template>
  <div class="login">
    <!-- <div class="login-logo">
      <img alt="logo" src="../assets/Guet_logo.svg">
    </div>-->

    <el-card class="box-card">
      <h4>授权您的学号登入桂北课表（桂北汇）</h4>
      <el-button @click="onabout()" type="text">查看关于</el-button>
    </el-card>

    <el-card class="box-card">
      <div class="login-title">登入</div>

      <div class="login-form-box">
        <div class="login-form-input">
          <el-input type="number" v-model="id" placeholder="学号" @keyup.enter.native="postlogin()"></el-input>
          <el-input type="password" v-model="password" placeholder="密码" @keyup.enter.native="postlogin()"></el-input>
        </div>

        <div class="login-form-bnt">
          <el-button class="i-el-button" @click="postlogin()" type="primary">登入</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
//import {allLogin} from '@/plugins/loginsdk'
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
          this.allLogin();
        }
      }
    }
  }
};
</script>