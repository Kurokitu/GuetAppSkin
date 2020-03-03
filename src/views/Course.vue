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
    <div class="class-table">
      <div class="table-wrapper">
        <div class="tabel-container">
          <table>
            <thead>
              <tr>
                <th>时间</th>
                <th
                  v-for="(weekNum, weekIndex) in classTableData.courses.length"
                  :key="weekIndex"
                >{{'周' + digital2Chinese(weekIndex+1, 'week')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(lesson, lessonIndex) in classTableData.lessons" :key="lessonIndex">
                <td>
                  <p>{{digital2Chinese(lessonIndex+1)}}</p>
                  <p class="period">{{ lesson }}</p>
                </td>

                <td
                  v-for="(course, courseIndex) in classTableData.courses"
                  :key="courseIndex"
                  @click.stop="lookAllInfo(courseIndex,lessonIndex)"
                >
                  <!-- {{ getData(courseIndex,lessonIndex) }} -->
                  <p
                    v-for="(value, index) in classTableData.courses[courseIndex][lessonIndex]"
                    :key="index"
                  >{{value.name}}@{{ value.classNum }}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <v-dialog v-model="infodialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>课程详细信息</v-card-title>

        <v-card-text class="pt-2">{{ fullInfo[0].fullInfo }}</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="infodialog = false">好的</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </with-app-bar>
</template>

<script>
import { UnknownException } from "@/plugins/guetsdk";
import { GetCourseTableCall } from "@/plugins/guetsdk/structures";

export default {
  data() {
    return {
      infodialog: false,
      classTableData: {
        lessons: [
          "08:25 / 09:20",
          "10:25 / 11:20",
          "14:30 / 15:25",
          "16:30 / 17:25",
          "19:30 / 20:25",
          "21:20 / 22:25"
        ],
        courses: [
          ["", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", ""]
        ]
      },
      weekItems: [],
      toweek: 0,
      fullInfo: [{ fullInfo: null }]
    };
  },
  created() {
    // /* mock随机数据*/
    // Mock.mock({
    //     lessons: ['08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00', '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00'],
    //     'courses|7': [['生物', '物理', '化学', '政治', '历史', '英语', '', '语文']]
    // });
  },
  mounted() {
    this.pushWeekItems();
    this.Course();
  },
  methods: {
    pushWeekItems() {
      for (let i = 0; i < 20; i++) {
        this.weekItems.push({
          name: "第" + this.digital2Chinese(i + 1) + "周",
          value: i
        });
      }
    },

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
        "二十"
      ];
      return identifier === "week" && (num === 0 || num === 7)
        ? "日"
        : character[num];
    },

    async Course(val) {
      this.classIsLoading = true;

      await this.$guet()
        .send(new GetCourseTableCall(this.getYear()))
        .then(res => {
          // res.toweek = 6; //Test API
          if (!val) {
            this.toweek = res.toweek - 1;
            this.classTableData.courses = res.courseMartix[res.toweek - 1];
          } else {
            this.classTableData.courses = res.courseMartix[val];
          }
        })
        .then(() => (this.classIsLoading = false))
        .catch(res => {
          if (res instanceof UnknownException) {
            this.$snackbar.error(res.reason);
          }
          this.classIsLoading = false;
        });
    },

    lookAllInfo(x, y) {
      this.fullInfo = this.classTableData.courses[x][y];
      this.infodialog = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.class-table {
  .table-wrapper {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .tabel-container {
    margin: 7px;

    table {
      table-layout: fixed;
      width: 100%;

      thead {
        background-color: #67a1ff;
        th {
          color: #fff;
          line-height: 17px;
          font-weight: normal;
        }
      }
      tbody {
        background-color: #eaf2ff;
        td {
          color: #677998;
          line-height: 12px;
        }
      }
      th,
      td {
        width: 60px;
        padding: 12px 2px;
        font-size: 12px;
        text-align: center;
      }

      tr td:first-child {
        color: #333;
        .period {
          font-size: 8px;
        }
      }
    }
  }
}
</style>