<template>
  <with-app-bar>
    <v-card class="pa-4 mx-auto" elevation="0">
      <v-skeleton-loader v-if="!myid" height="140" type="list-item-two-line"></v-skeleton-loader>
      <v-card v-else elevation="0" class="pa-0">
        <strong class="display-1 light-blue--text">你好,</strong>
        <v-card-text class="pl-1 d-inline">
          <strong class="headline" style="text-align: right;">{{ myname }}</strong>
        </v-card-text>
        <v-card-text class="pl-2 pt-4">
          <p>ID: {{ myid }}</p>
          <p>班级: {{ myclass }}</p>
          <qrcode
            v-if="myid"
            class="float-right hide-if-too-small"
            style="margin-top: -120px"
            :value="myid"
            :options="{ width: 100, color:{ dark: '#03A9F4' }, margin: 0 }"
          ></qrcode>
        </v-card-text>
      </v-card>

      <v-card class="mx-auto mt-6" max-width="100%" tile>
        <transition name="fade">
          <v-progress-linear indeterminate query v-if="classIsLoading"></v-progress-linear>
        </transition>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>今天的课程 ({{ daytext }})</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <transition name="fade">
          <div v-if="todayState && (todayState.length != 0)">
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

          <v-list-item v-else-if="!classIsLoading">
            <v-list-item-icon>
              <v-icon>fas fa-mug-hot</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="mt-1">今天暂无课程</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </transition>
      </v-card>
    </v-card>
  </with-app-bar>
</template>

<script>
import { UnknownException } from "@/plugins/guetsdk";
import { UserInfoCall, GetCourseTableCall } from "@/plugins/guetsdk/structures";
export default {
  name: "Index",
  data() {
    return {
      myname: null,
      myid: null,
      myclass: null,
      day: null,
      windowSize: {
        x: 0,
        y: 0
      },
      todayState: false,
      today: [],
      classIsLoading: false,
      n: 0
    };
  },
  mounted() {
    this.onResize();
    this.UserInfo();
    this.Course();
    this.day = this.getWeekDate();
  },
  computed: {
    daytext() {
      if (this.day) {
        return this.day.name;
      } else {
        return null;
      }
    }
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
      this.classIsLoading = true;

      await this.$guet()
        .send(new GetCourseTableCall(this.getYear()))
        .then(res => {
         // res.toweek = 6; //Test API
          this.today = res.courseMartix[res.toweek - 1][this.day.value - 1];
          // this.todayState = true;
          this.getTodayState();
        })
        .then(() => (this.classIsLoading = false))
        .catch(res => {
          if (res instanceof UnknownException) {
            this.$snackbar.error(res.reason);
          }
          this.classIsLoading = false;
        });
    },

    getTodayState() {
      this.today.forEach(item => {
        if (item.length === 1) {
          this.n + 1;
          if (this.n < 5) {
            this.todayState = true;
            this.n = 0;
          } else {
            this.todayState = false;
            this.n = 0;
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media screen and (max-width: 320px) {
  .hide-if-too-small {
    visibility: hidden;
  }
}
</style>