<template>
  <v-row>
    <v-col>
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
          ></v-text-field>

          <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate()">登入</v-btn>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
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
      window.console.log(this.$guet);
      let loginState = this.$guet().login(this.id, this.password);
      window.console.log(loginState);
      // let userInfoResult = await client.send(new UserInfoCall());
    }
  }
};
</script>