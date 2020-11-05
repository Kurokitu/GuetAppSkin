<template>
  <with-app-bar>
    <v-card class="pa-4 mx-auto" elevation="0">
      <v-skeleton-loader
        v-if="!myid"
        height="140"
        type="list-item-two-line"
      ></v-skeleton-loader>
      <v-card v-else elevation="0" class="pa-0">
        <strong class="display-1 light-blue--text">{{ myname }},</strong>
        <v-card-text class="pl-1 d-inline">
          <strong class="headline" style="text-align: right"> 你好！：)</strong>
        </v-card-text>
        <v-card-text class="pl-2 pt-4">
          <p>ID: {{ myid }}</p>
          <p>班级: {{ myclass }}</p>
          <qrcode
            v-if="myid"
            class="float-right hide-if-too-small"
            style="margin-top: -120px"
            :value="myid"
            :options="{ width: 100, color: { dark: '#03A9F4' }, margin: 0 }"
          ></qrcode>
        </v-card-text>
      </v-card>

      <v-card class="mx-auto mt-6" max-width="100%" tile>
        <transition name="fade">
          <v-progress-linear
            indeterminate
            query
            v-if="classIsLoading"
          ></v-progress-linear>
        </transition>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title style="line-height: 30px;">
              今天的课程 ({{ daytext }})
              <v-btn style="float:right;" icon color="blue" @click="Course()">
                <v-icon>mdi-cached</v-icon>
              </v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <transition name="fade">
          <div v-if="todayState && todayState.length != 0">
            <div v-for="(item, index) in today" :key="index">
              <v-list-item v-for="(cItem, i) in item" :key="i">
                <v-list-item-content>
                  <v-list-item-title v-if="index === 0"
                    >1 - 2 节</v-list-item-title
                  >
                  <v-list-item-title v-if="index === 1"
                    >3 - 4 节</v-list-item-title
                  >
                  <v-list-item-title v-if="index === 2"
                    >5 - 6 节</v-list-item-title
                  >
                  <v-list-item-title v-if="index === 3"
                    >7 - 8 节</v-list-item-title
                  >
                  <v-list-item-title v-if="index === 4"
                    >9 - 10 节</v-list-item-title
                  >
                  <v-list-item-subtitle v-if="cItem[1]">{{
                    cItem[1]
                  }}</v-list-item-subtitle>
                  <v-list-item-subtitle v-else>{{
                    cItem[0]
                  }}</v-list-item-subtitle>
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
import axios from "@/lib/api";
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
        y: 0,
      },
      todayState: false,
      today: [],
      classIsLoading: false,
      n: 0,
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
    },
  },
  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },
    async UserInfo() {
      this.myname = this.$get.getUserInfo().name;
      this.myid = this.$get.getUserInfo().id;
      this.myclass = this.$get.getUserInfo().class;
    },

    async Course() {
      this.classIsLoading = true;

      await axios
        .eduport({
          cookie: this.$get.getFullCookie(),
          func: "course_table",
          argv: {
            type: "get_new_table",
            term: this.getYear(),
          },
        })
        .then((res) => {
          this.$save.saveCoures(res.data.data);
          this.today = this.$get.getNewCourse()[res.data.data.toweek - 1][
            this.day.value - 1
          ];
          this.getTodayState();

          if (this.today) {
            this.classIsLoading = false;
          }
        })
        .catch((err) => {
          console.log(err);
          this.classIsLoading = false;
          this.$toast('发生了一些错误。请重试。', 'error');
        });
    },

    getTodayState() {
      this.today.forEach((item) => {
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
    },
  },
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