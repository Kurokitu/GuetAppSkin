<template>
  <div id="app">
    <vue-progress-bar></vue-progress-bar>
    <!-- <div class="header">
      <div class="h-title">桂北课表</div>
    </div>-->
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
export default {
  name: "app",
  mounted() {
    //  [App.vue specific] When App.vue is finish loading finish the progress bar
    this.$Progress.finish();

    if (navigator.userAgent.indexOf("GeAPP") != -1) {
      if (navigator.userAgent.indexOf("V1.3") != -1) {
        localStorage.removeItem("updatet2");
      } else {
        if (localStorage.getItem("update_tips") == "1.3") {
          //todo
        } else {
          localStorage.setItem("updatet2", "true");
          this.update();
        }
      }
    } else {
      if(localStorage.getItem('update_tips') == '1.3'){
        //todo
      }else{
        localStorage.setItem('updatet2', 'true');
        this.update();
      }
    }
  },

  created() {
    //  [App.vue specific] When App.vue is first loaded start the progress bar
    this.$Progress.start();
    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      //  does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress;
        // parse meta tags
        this.$Progress.parseMeta(meta);
      }
      //  start the progress bar
      this.$Progress.start();
      //  continue to next page
      next();
    });
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach(() => {
      //  finish the progress bar
      this.$Progress.finish();
    });
  },

  provide() {
    return {
      update: this.update,
      login: this.login,
      relogin: this.relogin
    };
  },

  methods: {
    update() {
      this.$confirm("检查到有新版本,强烈建议更新", "版本更新提示", {
        confirmButtonText: "更新",
        cancelButtonText: "取消",
        type: "warning",
        center: "true"
      })
        .then(() => {
          window.location.href = "https://dl.deep-vocal.com/apk2/GeAPP.apk";
        })
        .catch(() => {
          localStorage.setItem("update_tips", "1.3");
        });
    },

    login() {
      this.axios({
        method: "post",
        url: "https://gelinapi.kilins.com/gbh/login",
        data: {
          func: "login",
          argv: {
            username: localStorage.getItem("UID"),
            password: localStorage.getItem("Password")
          },
          version: "1.1.18"
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
          if(!res.data.status == 2){
            //this.relogin();
            //todo
          }else{
            localStorage.setItem("cookie_key", res.data.cookie_key);
            localStorage.setItem("cookie", res.data.cookie);
            location.reload();
          }
      });
    },

    relogin() {
      this.axios({
        method: "post",
        url: "https://gelinapi.kilins.com/gbh/login",
        data: {
          func: "login",
          argv: {
            username: localStorage.getItem("UID"),
            password: localStorage.getItem("Password")
          },
          version: "1.1.18"
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
          if(!res.data.status == 2){
            //this.relogin();
            //todo
          }else{
            localStorage.setItem("cookie_key", res.data.cookie_key);
            localStorage.setItem("cookie", res.data.cookie);
            location.reload();
          }
      });
    }
  }
};
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
* {
  margin: 0;
  padding: 0;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

#app {
  width: 100%;
  height: 100%;
}

vue-progress-bar {
  z-index: 999999999999;
}

.header {
  width: 100%;
  height: 50px;
  background-color: #3cb0ff;
  position: relative;
  top: 0;
}

.h-title {
  width: 100%;
  text-align: center;
  color: #ffffff;
  font-size: 20px;
  line-height: 50px;
}

.el-message-box {
  width: 90%;
  margin-top: 20%;
}
</style>
