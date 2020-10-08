<template>
<with-app-bar hide-drawer hide-menu>
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

      <v-btn :disabled="!valid" color="blue white--text" class="mr-4" @click="validate()">登入</v-btn>
    </v-form>
  </v-card>
</with-app-bar>
</template>

<script>
import { saveUserRawData } from '@/usersaving';

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
      passRules: [v => !!v || "必须输入密码"],
      select: { name: '学生', identity: 'student' },
      items: [
        { name: '学生', identity: 'student' },
        // { name: '教师', identity: 'teacher' }
      ]
    };
  },
  methods: {
    validate() {
      this.$guet()
        .login(this.id, this.password, this.select.identity)
        .then(() => {
          return saveUserRawData({
            username: this.id,
            password: this.password,
            identity: this.select.identity
          });
        })
        .then(() => {
          this.$router.push("/Index");
        })
        .catch(() => {
          this.$snackbar.error("登入失败，请检查");
        });
      // let userInfoResult = await client.send(new UserInfoCall());
    }
  },
  mounted() {
    this.$guet()
      .askLogin()
      .then(v => {
        if (v) {
          this.$router.push({
            name: "Index"
          });
        }
      });
  }
};
</script>