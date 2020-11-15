<template>
  <with-app-bar hide-drawer hide-menu>
    <v-card class="pa-4 mx-auto">
      <v-form v-model="valid" :lazy-validation="lazy">
        <v-text-field
          type="number"
          v-model="id"
          :rules="idRules"
          label="学号"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passRules"
          label="密码"
          required
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          @click:append="show1 = !show1"
          @keydown.enter="validate()"
        ></v-text-field>

        <v-select
          v-model="select"
          :items="items"
          item-text="name"
          item-value="identity"
          label="角色"
          persistent-hint
          return-object
          single-line
        ></v-select>

        <v-btn
          :disabled="!valid"
          color="blue white--text"
          class="mr-4"
          @click="validate()"
          >登入</v-btn
        >
      </v-form>
    </v-card>
  </with-app-bar>
</template>

<script>
import axios from "@/lib/api";
import vaxios from "axios";

export default {
  name: "login",
  data() {
    return {
      valid: true,
      lazy: false,
      show1: false,
      id: "",
      idRules: [(v) => !!v || "必须输入学号"],
      password: "",
      passRules: [(v) => !!v || "必须输入密码"],
      select: { name: "学生", identity: "student" },
      items: [
        { name: "学生", identity: "student" },
        // { name: '教师', identity: 'teacher' }
      ],
      version: localStorage.getItem("version"),
      updateurl: localStorage.getItem("updateurl"),
      updateinfo: localStorage.getItem("updateinfo"),
    };
  },

  mounted() {
    this.checkconf();
    if (this.$get.getAuthData.cookie) {
      this.$router.psuh("/Index");
    }
  },

  methods: {
    gotoupdate() {
      this.$plusExtends(() => {
        window.plus.runtime.openURL(this.updateurl);
      });
    },

    update_confirm() {
      this.$dialog({
        title: "V" + this.version,
        content: this.updateinfo,
        rawHtml: true,
        buttons: [
          {
            text: "更新",
            onClick: () => {
              this.gotoupdate();
            },
          },
          {
            text: "取消",
            onClick: () => {
              console.log("Click another button");
            },
          },
        ],
      });
    },

    checkconf() {
      vaxios
        .get(process.env.VUE_APP_CONF_URL + "?t=" + new Date().getTime())
        .then(function (res) {
          localStorage.setItem("timemode", res.data.timemode);
          localStorage.setItem("version", res.data.version);
          localStorage.setItem("updateurl", res.data.updateurl);
          localStorage.setItem("updateinfo", res.data.updateinfo);
        })
        .catch(function (error) {
          if (!localStorage.getItem("timemode")) {
            localStorage.setItem("timemode", "winter");
          }
          console.log(error);
        });

      if (this.version > parseFloat(process.env.VUE_APP_VERSION)) {
        this.update_confirm();
      }
    },
    validate() {
      axios
        .bindLogin({
          username: this.id,
          password: this.password,
          identity: this.select.identity,
          type: "init_login",
        })
        .then((res) => {
          console.log(res);
          if (res.data.status === 2) {
            res.data.data.stutype = this.select.identity;
            this.$save.saveUserInfo(res.data);
            this.$router.push("/Index");
          } else {
            this.$toast(res.data.msg, "error");
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          this.$toast(err, "error");
        });
    },
  },
};
</script>