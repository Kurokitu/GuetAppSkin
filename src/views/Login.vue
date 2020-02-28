<template>
  <v-card class="pa-4 mx-auto">
    <v-form v-model="valid" :lazy-validation="lazy">
      <v-text-field type="number" v-model="id" :rules="idRules" label="学号" required></v-text-field>

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

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate()">登入</v-btn>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      valid: true,
      lazy: false,
      show1: false,
      id: "",
      idRules: [v => !!v || "必须输入学号"],
      password: "",
      passRules: [v => !!v || "必须输入密码"]
    };
  },
  methods: {
    validate() {
      this.$guet()
        .login(this.id, this.password)
        .then(res => {
          localStorage.setItem("cookie", res.cookie);
          localStorage.setItem("cookieKey", res.cookieKey);
          localStorage.setItem("fullcookie", res.cookieKey + " " + res.cookie);
          this.$snackbar.success("登入成功");
          this.$router.push("/Index");
        })
        .catch(() => {
          this.$snackbar.error("登入失败，请检查");
        });
      // let userInfoResult = await client.send(new UserInfoCall());
    }
  }
};
</script>