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
          <strong class="headline" style="text-align: right; margin-top: 20px"
            ><br />你好！：)</strong
          >
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

      <v-alert
        v-if="notice_switch !== 'false'"
        icon="mdi-wrench"
        text
        dismissible
        type="info"
      >
        {{ notice }}
      </v-alert>

      <v-alert prominent type="info" v-if="nowversion < version && process.env.VUE_APP_TYPE === 'App'">
        <v-row align="center">
          <v-col class="grow"> 有新版本 V{{ version }}</v-col>
          <v-col class="shrink">
            <v-btn @click="update_confirm()">更新</v-btn>
          </v-col>
        </v-row>
      </v-alert>
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
            <v-list-item-title style="line-height: 30px">
              今天的课程 (第{{ toweek + 1 }}周 {{ daytext }})
              <v-btn style="float: right" icon color="blue" @click="Course()">
                <v-icon>mdi-cached</v-icon>
              </v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="mx-4"></v-divider>
        <transition name="fade">
          <div v-if="todayState && todayState.length != 0">
            <div v-for="(item, index) in today" :key="index">
              <v-list-item v-if="item.length > 1">
                <v-list-item-content>
                  <v-list-item-title>
                    {{ get_course_num(index) }}
                  </v-list-item-title>
                  <v-list-item-subtitle v-if="item[1]">{{
                    item[1]
                  }}</v-list-item-subtitle>
                  <v-list-item-subtitle v-else>{{
                    item[0]
                  }}</v-list-item-subtitle>
                  <v-list-item-subtitle>
                    第一小节
                    {{ get_time(timemode)[index][0] }}
                    <br />
                    第二小节
                    {{ get_time(timemode)[index][1] }}
                  </v-list-item-subtitle>
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
        <v-divider class="mx-4"></v-divider>
        <v-list-item v-if="!classIsLoading">
          <v-btn color="primary" @click="preDay()">前一天</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="$router.push('/Course')"
            >查看完整课表</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="nextDay()">后一天</v-btn>
        </v-list-item>
      </v-card>
    </v-card>
  </with-app-bar>
</template>

<script>
import axios from "@/lib/api";
import { get_time, get_course_num } from "@/lib/get_time";

export default {
  name: "Index",
  data() {
    return {
      nowversion: parseFloat(process.env.VUE_APP_VERSION),
      get_time,
      get_course_num,
      toweek: 0,
      timemode: localStorage.getItem("timemode")
        ? localStorage.getItem("timemode")
        : process.env.VUE_APP_DATE_MODE,
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
      version: localStorage.getItem("version"),
      updateurl: localStorage.getItem("updateurl"),
      updateinfo: localStorage.getItem("updateinfo"),
      notice_switch: localStorage.getItem("notice_switch"),
      notice: localStorage.getItem("notice"),
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
    nextDay() {
      if (this.toweek < 20 && this.day.value >= 7) {
        this.toweek = this.toweek + 1;
        this.day = this.getWeekDateBy(1);
      } else if (this.day.value === 6) {
        this.day = this.getWeekDateBy(0);
      } else if (this.day.value <= 6) {
        this.day = this.getWeekDateBy(this.day.value + 1);
      }
      this.today = this.$get.getNewCourse()[this.toweek][this.day.value - 1];
      this.getTodayState();
    },
    preDay() {
      if (this.toweek > 0 && this.day.value === 1) {
        this.toweek = this.toweek - 1;
        this.day = this.getWeekDateBy(0);
      } else if (this.day.value > 0) {
        this.day = this.getWeekDateBy(this.day.value - 1);
      }
      this.today = this.$get.getNewCourse()[this.toweek][this.day.value - 1];
      this.getTodayState();
    },
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
          this.today = this.$get.getNewCourse()[this.$get.getToweek() - 1][
            this.day.value - 1
          ];

          if (this.today) {
            this.classIsLoading = false;
          }
        })
        .catch((err) => {
          console.log(err);
          this.classIsLoading = false;
          if (this.$get.getNewCourse() !== null) {
            this.today = this.$get.getNewCourse()[this.$get.getToweek() - 1][
              this.day.value - 1
            ];
            this.$toast("拉取数据失败了，目前展示本地缓存数据。", "error");
          } else {
            this.$toast("发生了一些错误。请重试。错误信息：" + err, "error");
          }
        });
      this.toweek = this.$get.getToweek() - 1;
      this.getTodayState();
    },

    getTodayState() {
      for (let i = 0; i < this.today.length; i++) {
        if (this.today[i].length > 0) {
          this.todayState = true;
          break;
        } else {
          this.todayState = false;
        }
      }
      // this.today.forEach((item) => {
      //   if (item.length > 0) {
      //     //this.n + 1;
      //     this.todayState = true;
      //   } else {
      //     this.todayState = false;
      //   }
      // });
      // // this.n = 0;
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