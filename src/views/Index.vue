<template>
  <with-app-bar>
    <v-card
      v-if="this.windowSize.x < 420"
      class="mx-auto mb-6 pa-4"
      elevation="0"
      v-resize="onResize"
    >
      <v-carousel
        cycle
        :height="this.windowSize.x > 1024 ? 400 : 170"
        hide-delimiter-background
        show-arrows-on-hover
      >
        <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item>
      </v-carousel>
    </v-card>

    <v-card class="pa-4 mx-auto" elevation="0">
      <strong class="display-1">你好,</strong>
      <br />
      <v-card-text class="pl-0">
        <strong class="headline" style="text-align: right;">{{ name }} 同学</strong>
      </v-card-text>

      <v-card class="mx-auto mt-6" max-width="100%" tile>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>今天的课程</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>大学英语</v-list-item-title>
            <v-list-item-subtitle>测试数据</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title>体育</v-list-item-title>
            <v-list-item-subtitle>测试数据</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-card>
  </with-app-bar>
</template>

<script>
import {
  UserInfoCall,
  GetCourseTableCall
} from "@/plugins/guetsdk/structures";
export default {
  name: "Index",
  data() {
    return {
      name: null,
      windowSize: {
        x: 0,
        y: 0
      },
      items: [
        {
          src: process.env.VUE_APP_API_URL + "/gbh/imgs/show_1.jpg"
        },
        {
          src: process.env.VUE_APP_API_URL + "/gbh/imgs/show_2.jpg"
        },
        {
          src: process.env.VUE_APP_API_URL + "/gbh/imgs/show_3.jpg"
        }
      ]
    };
  },
  mounted() {
    this.onResize();
    this.UserInfo();
    this.Course();
  },
  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },
    async UserInfo() {
      let userInfoResult = await this.$guet().send(new UserInfoCall());
      this.name = userInfoResult.name;
    },

    async Course() {
      await this.$guet()
        .send(new GetCourseTableCall(20192))
        .then(res => {
          // let goodData = reshapeBadCourseTablel(res);
          window.console.log(res);
        })
        .catch(res => {
          window.console.log(res);
        });
    }
  }
};
</script>