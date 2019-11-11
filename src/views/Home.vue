<template>
  <div v-loading="loading" class="home">
    <!-- <div class="home-logo">
      <img alt="logo" src="../assets/Guet_logo.svg">
    </div>-->

    <el-carousel trigger="click" height="200px">
      <el-carousel-item v-for="item in roll" :key="item">
        <img width="100%" :src="item.img" alt="img" />
      </el-carousel-item>
    </el-carousel>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <p style="float: left;margin-top: 4px;">{{ ttime }}</p>
        <div>
          <el-badge v-if="this.updatet2 == 'true'" style="folat:right;padding:0;" value="new" class="item">
            <el-button @click="update()" size="small">APP更新</el-button>
          </el-badge>
        
        <!-- <el-button @click="logout" style="float: right;line-hight:24px;" type="small">登出</el-button> -->
        <el-dropdown trigger="click" style="float: right;padding:0;margin-top: 4px;">
          <span class="el-dropdown-link">
            菜单
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="dialogFormVisible = true">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        </div>
      </div>
      <el-alert title="一言" type="success" :description="hitokoto"></el-alert>
      <!-- <el-alert title="有兴趣的可以加入群聊~ 909660554" type="success"></el-alert> -->

      <el-button style="margin-top: 10px;Width:100%;" @click="onop()" type="primary" round>查询课程</el-button>
      <el-button style="margin-top: 10px;Width:100%;" @click="onopkc()" type="primary" round>已选课程</el-button>
      <el-button style="margin-top: 10px;Width:100%;" @click="creadit()" type="primary" round>学分查询</el-button>
      <el-button style="margin-top: 10px;Width:100%;" @click="onabout()" type="primary" round>关于</el-button>
    </el-card>

    <!-- <el-card class="box-card">
      <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=862573883&auto=0&height=66"></iframe>
    </el-card> -->

    <el-card class="box-card">
      <!-- <div slot="header" class="clearfix">
        <span>{{ ttime }}</span>
        <el-button @click="logout" style="float: right; padding: 0 0;line-hight:24px;" type="text">登出</el-button>
      </div>-->
      <div v-for="(value,key) of infolist" :key="key" class="text">{{key}}：{{value}}</div>
    </el-card>

    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="旧密码" :label-width="formLabelWidth">
          <el-input v-model="form.old_passwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input v-model="form.new_passwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="再次输入新密码" :label-width="formLabelWidth">
          <el-input v-model="form.reNew_passwd" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="change_passwd()">更 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  inject: ["update","login","relogin"],
  name: "home",
  /* eslint-disable */
  data() {
    return {
      ttime: "",
      name: "Null",
      id: "Null",
      infolist: "",
      statusinfo: "",
      hitokoto: "",
      roll: [],
      updatet2: "",
      dialogFormVisible: false,
      form: {
        old_passwd: "",
        new_passwd: "",
        reNew_passwd: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px"
    };
  },
  mounted() {
    this.updatet2 = localStorage.getItem("updatet2");

    this.roll = [
      {
        img:
          "https://gelink.kilins.com/imgs/11.jpg"
      },
      {
        img: "https://gelink.kilins.com/imgs/11.jpg"
      },
      {
        img: "https://gelink.kilins.com/imgs/11.jpg"
      }
    ];
    this.hour = new Date().getHours();
    this.gettime();
    /* eslint-disable */
    //console.log(this.infolisti);
    this.getuserinfo();
  },
  methods: {
    onop() {
      window.location.href = "/Optionske";
    },

    onopkc() {
      window.location.href = "/Optionskc";
    },

    onabout() {
      window.location.href = "/About";
    },
    creadit() {
      window.location.href = "/Creadit";
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    gettime() {
      //this.hour= this.Date.getHours();
      /* eslint-disable */

      //console.log(this.hour);
      if (this.hour >= 0) {
        this.ttime = "同学凌晨好！";
      }
      if (this.hour >= 6) {
        this.ttime = "同学早上好！";
      }
      if (this.hour >= 10) {
        this.ttime = "同学上午好！";
      }
      if (this.hour >= 11) {
        this.ttime = "同学中午好！";
      }
      if (this.hour >= 13) {
        this.ttime = "同学下午好！";
      }
      if (this.hour >= 18) {
        this.ttime = "同学傍晚好！";
      }
      if (this.hour >= 19) {
        this.ttime = "同学晚上好！";
      }
      this.$forceUpdate();
    },

    change_passwd() {
      if(!this.form.old_passwd){
        this.$notify.error({
              title: "错误",
              message: "请输入旧密码!"
        });
      }else{
        if(!this.form.new_passwd){
          this.$notify.error({
              title: "错误",
              message: "请输入新密码!"
          });
        }else{
          if(this.form.new_passwd != this.form.reNew_passwd){
            this.$notify.error({
                title: "错误",
                message: "两次输入密码不一致！"
            });
          }else{
            this.axios({
              method: "post",
              url: "https://gelinapi.kilins.com/gbh/edu",
              data: {
                argv: {
                  new_passwd: this.form.new_passwd,
                  old_passwd: this.form.old_passwd,
                  reNew_passwd: this.form.reNew_passwd
                },
                cookie:
                  localStorage.getItem("cookie_key") +
                  " " +
                  localStorage.getItem("cookie"),
                  func: "change_passwd",
                version: "1.1.18"
              },
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }).then(res => {
              if (res.data.status == 2) {
                this.$notify({
                  message: res.data.msg,
                  type: "success"
                });
                this.dialogFormVisible = false;
                this.logout();
              } else {
                this.$notify.error({
                  title: "错误",
                  message: res.data.msg
                });
              }
            });
          }
        }
      }
    },

    getuserinfo() {
      if (!localStorage.getItem("UID")) {
        window.location.href = "/Login";
      } else {
        if (!localStorage.getItem("Password")) {
          window.location.href = "/Login";
        } else {
          //todo
        }
      }
      this.axios({
        methods: "get",
        url: "https://v1.hitokoto.cn/"
      }).then(res => {
        this.hitokoto = res.data.hitokoto;
      });

      this.axios({
        method: "post",
        // url: "https://gelinapi.kilins.com/gbh/login",
        // data: {
        //       argv: { username: localStorage.getItem("UID"), password: localStorage.getItem("Password") },
        //       func: "login",
        //       version: "1.1.18"
        //     },
        //data: {identity: "student", password: localStorage.getItem("Password"), type: "init_login", username: localStorage.getItem("UID"), version: "1.1.18" },
        url: "https://gelinapi.kilins.com/gbh/edu",
        data: {"func":"info","cookie":localStorage.getItem("cookie_key") +" " +localStorage.getItem("cookie"),"argv":{},"version":"1.1.18"},
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        /* eslint-disable */

        console.log(res);
        if (res.data.status == 1) {
          this.$notify.error({
            title: "错误",
            message: "登入超时，登入信息已失效！"
          });
          localStorage.clear();
          setTimeout(() => {
            window.location.href = "/Login";
          }, 3000);
        }
        if (res.data.status == 2) {
          this.$notify({
            message: res.data.msg,
            type: "success"
          });
        }
        if (res.data.status == 4){
          this.$message.error(res.data.msg+'正在重新登入，请稍等。');
          this.relogin();
        }
          this.name = res.data.data.姓名;
          //this.id = res.data.data.学号;
          this.infolist = res.data.data;
          this.$forceUpdate();
          this.loading = false;
          //localStorage.setItem("cookie_key", res.data.cookie_key);
          //localStorage.setItem("cookie", res.data.cookie);
          //localStorage.setItem("bind_status", res.data.bind_status);
          //localStorage.setItem("openid", res.data.openid);
        }
      );
    },

    logout() {
      localStorage.clear();
      window.location.href = "/Login";
    }
  }
};
</script>
<style>
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.el-dialog {
  width: 90%;
}

.item {
  right: 0;
  position: relative;
  top: 0;
}

.transition-box {
  margin-bottom: 10px;
  width: 200px;
  height: 100px;
  border-radius: 4px;
  background-color: #409eff;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}
.home-logo {
  text-align: center;
  width: 100%;
  margin-top: 50px;
}

.home-name {
  width: 100%;
  text-align: center;
  font-size: 24px;
  margin-top: 20px;
}

.home-list-box {
  width: 100%;
  font-size: 18px;
  margin-top: 40px;
}

.home-list-info {
  width: 90%;
  margin: 0 auto;
  text-align: center;
}

.text {
  font-size: 14px;
}

.item {
  padding: 1 0;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 90%;
  margin: 20px auto;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
