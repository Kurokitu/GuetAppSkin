<template>
<with-app-bar>
  <v-card class="pa-4 mx-auto" elevation="0">
    <strong class="display-1">你好,</strong>
    <br />
    <v-card-text class="pl-0">
      <strong class="headline" style="text-align: right;">{{ name }}</strong>
    </v-card-text>

    <v-card class="mx-auto mt-6" max-width="100%" tile>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>今天的课程</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Two-line item</v-list-item-title>
          <v-list-item-subtitle>Secondary text</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title>Three-line item</v-list-item-title>
          <v-list-item-subtitle>Secondary line text Lorem ipsum dolor sit amet,</v-list-item-subtitle>
          <v-list-item-subtitle>consectetur adipiscing elit.</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-card>
</with-app-bar>
</template>

<script>
import { UserInfoCall } from "@/plugins/guetsdk/structures";
export default {
  name: "Index",
  data() {
    return {
      name: null
    };
  },
  mounted() {},
  methods: {
    async UserInfo() {
      let userInfoResult = await this.$guet().client.send(new UserInfoCall());

      this.name = userInfoResult.name;
    }
  }
};
</script>>