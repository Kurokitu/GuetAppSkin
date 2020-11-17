<template>
  <with-app-bar>
    <v-card elevation="0">
      <v-card-text>点击表格内容可查看课程详细信息</v-card-text>

      <v-list-item>
        <v-list-item-content>
          <v-select
            v-model="toweek"
            :items="weekItems"
            item-value="value"
            item-text="name"
            label="当前周次"
            @change="Course(toweek)"
          ></v-select>
        </v-list-item-content>
      </v-list-item>
    </v-card>

    <div id="coursesTable"></div>
  </with-app-bar>
</template>

<script>
import Timetables from "timetables";
import { get_time_by_course } from "@/lib/get_time";

export default {
  data() {
    return {
      get_time_by_course,
      timemode: localStorage.getItem("timemode") ? localStorage.getItem("timemode") : process.env.VUE_APP_DATE_MODE,
      toweek: this.$get.getToweek() - 1,
      weekItems: [],
      Timetables,
      courseList: null,
      // day: new Date().getDay() === 0 ? 7 : new Date().getDay() + 1,
      day: this.getWeekDate().value,
      timeTable: undefined,
    };
  },
  mounted() {
    this.Course(this.toweek);

    this.timeTable = new Timetables({
      el: "#coursesTable",
      timetables: [
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
      ],
      week: ["一", "二", "三", "四", "五", "六", "日"],
      highlightWeek: this.day,
      timetableType: this.get_time_by_course(this.timemode),
      gridOnClick: function (e) {
        alert(
          e.name +
            "  " +
            e.week +
            ", 第" +
            e.index +
            "节课, 课长" +
            e.length +
            "节"
        );
        console.log(e);
      },
    });

    this.timeTable.setOption({
      timetables: this.courseList,
    });

    this.pushWeekItems();
  },
  watch: {
    toweek() {
      this.timeTable.setOption({
        timetables: this.courseList,
      });
    },
  },
  methods: {
    /**
     * 数字转中文
     * @param {Number} num 需要转换的数字
     * @param {String} identifier 标识符
     * @returns {String} 转换后的中文
     */
    digital2Chinese(num, identifier) {
      const character = [
        "零",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
        "十",
        "十一",
        "十二",
        "十三",
        "十四",
        "十五",
        "十六",
        "十七",
        "十八",
        "十九",
        "二十",
      ];
      return identifier === "week" && (num === 0 || num === 7)
        ? "日"
        : character[num];
    },

    pushWeekItems() {
      for (let i = 0; i < 20; i++) {
        this.weekItems.push({
          name: "第" + this.digital2Chinese(i + 1) + "周",
          value: i,
        });
      }
    },

    Course(week) {

      let cdata = this.$get.getNewCourse()[week];

      let result = [
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
      ];

      let n = 1;
      for (let d = 0; d < 7; d++) {
        n = 1;
        for (let c = 0; c < 5; c++) {
          for (let s = 0; s < 2; s++) {
            if (n % 2 !== 0) {
              if (cdata[d][c].length > 0) {
                result[d][n - 1] = cdata[d][c][1];
                result[d][n] = cdata[d][c][1];
              } else {
                result[d][n - 1] = "";
                result[d][n] = "";
              }
            }
            n++;
          }
        }
      }

      this.courseList = result;
    },
  },
};
</script>

<style>
#coursesTable {
  padding: 15px 10px;
}

.Courses-head {
  background-color: #ffffff;
}

.Courses-head > div {
  text-align: center;
  font-size: 14px;
  line-height: 28px;
}

.left-hand-TextDom,
.Courses-head {
  background-color: #ffffff;
}

.Courses-leftHand {
  background-color: #ffffff;
  font-size: 12px;
}

.Courses-leftHand .left-hand-index {
  color: #9c9c9c;
  margin-bottom: 4px !important;
}

.Courses-leftHand .left-hand-name {
  color: #666;
}

.Courses-leftHand p {
  text-align: center;
  font-weight: 900;
}

.Courses-head > div {
  border-left: none !important;
}

.Courses-leftHand > div {
  padding-top: 5px;
  border-bottom: 1px dashed rgb(219, 219, 219);
}

.Courses-leftHand > div:last-child {
  border-bottom: none !important;
}

.left-hand-TextDom,
.Courses-head {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
}

.Courses-content > ul {
  border-bottom: 1px dashed rgb(219, 219, 219);
  box-sizing: border-box;
}

.Courses-content > ul:last-child {
  border-bottom: none !important;
}

.highlight-week {
  color: #02a9f5 !important;
}

.Courses-content li {
  text-align: center;
  color: #666666;
  font-size: 14px;
  line-height: 50px;
}

.Courses-content li span {
  padding: 6px 2px;
  box-sizing: border-box;
  line-height: 18px;
  border-radius: 4px;
  white-space: normal;
  word-break: break-all;
  cursor: pointer;
  z-index: 0 !important;
}

.grid-active {
  z-index: 9999;
}

.grid-active span {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}
</style>