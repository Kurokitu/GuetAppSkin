<template>
  <with-app-bar>
    <v-card class="pa-4 mx-auto" elevation="0">
      <v-skeleton-loader v-if="myid == 'null'" height="140" type="list-item-two-line"></v-skeleton-loader>
      <v-card v-else elevation="0" class="pa-0">
        <strong class="display-1 light-blue--text">你好,</strong>
        <v-card-text class="pl-1 d-inline">
          <strong class="headline" style="text-align: right;">{{ myname }} 同学</strong>
        </v-card-text>
        <v-card-text class="pl-2 pt-4">
          <p>ID: {{ myid }}</p>
          <p>班级: {{ myclass }}</p>
          <qrcode
            v-if="myid != 'null'"
            class="float-right"
            style="margin-top: -110px"
            :value="myid"
            :options="{ width: 100, color:{ dark: '#03A9F4' } }"
          ></qrcode>
        </v-card-text>
      </v-card>

      <v-card class="mx-auto mt-6" max-width="100%" tile>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>今天的课程 ({{ daytext }})</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <div v-if="todayState">
          <div v-for="(item, index) in today" :key="index">
            <v-list-item v-for="(cItem, i) in item" :key="i">
              <v-list-item-content>
                <v-list-item-title>{{ cItem.name }}</v-list-item-title>
                <v-list-item-subtitle>教师名称: {{ cItem.teacherName }}</v-list-item-subtitle>
                <v-list-item-subtitle v-if="cItem.classNum">授课地点在 {{ cItem.classNum }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </div>
        </div>

        <v-list-item v-else>
          <v-list-item-icon>
            <v-icon>fas fa-mug-hot</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="mt-1">今天暂无课程</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-card>
  </with-app-bar>
</template>

<script>
import { UserInfoCall, GetCourseTableCall } from "@/plugins/guetsdk/structures";
export default {
  name: "Index",
  data() {
    return {
      myname: "null",
      myid: "null",
      myclass: "null",
      daytext: "null",
      windowSize: {
        x: 0,
        y: 0
      },
      todayState: false,
      today: []
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
      this.myname = userInfoResult.name;
      this.myid = userInfoResult.id;
      this.myclass = userInfoResult.classId;
    },

    async Course() {
      await this.$guet()
        .send(new GetCourseTableCall(this.getYear()))
        .then(res => {
          res.toweek = 6; //Test API

          let day = this.getWeekDate();
          this.daytext = day.name;
          this.today = res.courseMartix[res.toweek][day.value - 1];
          if (this.today.length != 0) {
            this.todayState = true;
          }
        })
        .catch(res => {
          window.console.log(res);
        });
    }
  }
};
</script>