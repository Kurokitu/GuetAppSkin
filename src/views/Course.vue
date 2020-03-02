<template>
  <with-app-bar>
    <div id="coursesTable">
      <div
        id="courseWrapper"
        style="position: relative; padding-left: 40px; border: 1px solid rgb(219, 219, 219);"
      >
        <div class="Courses-head" style="overflow: hidden;">
          <div
            v-for="(item, index) in dayItem"
            :key="index"
            :class="'Courses-head-' + (index + 1)"
            style="float: left; box-sizing: border-box; white-space: nowrap; width: 14.2857%;"
          >{{ item }}</div>
        </div>
        <div class="Courses-content">
          <template v-for="index in 6">
            <ul
              :key="index"
              :class="'stage_' + (index + 1)"
              style="list-style: none; padding: 0px; margin: 0px; min-height: 50px;"
            >
              <div v-for="(v, i) in toweekdata" :key="i">
                <li
                  style="float: left; width: 14.2857%; height: 50px; box-sizing: border-box; position: relative;"
                >
                  <div v-for="(vv, ii) in v[index-1]" :key="ii">
                    <span
                      @click.stop="info(index-1, i)"
                      v-if="vv"
                      class="course-hasContent"
                      :style="'position: absolute; z-index: 9; width: 100%; height: 100px; left: 0px; top: 0px; background-color: ' + rollColor() + '; color: rgb(255, 255, 255);'"
                    >{{ vv.name }}</span>
                  </div>
                </li>
              </div>
            </ul>
            <ul
              :key="index + '-only'"
              style="list-style: none; padding: 0px; margin: 0px; min-height: 50px;"
            ></ul>
          </template>
        </div>
        <div class="Courses-leftHand" style="position: absolute; left: 0px; top: 0px; width: 40px;">
          <div class="left-hand-TextDom" style="height: 29px; box-sizing: border-box;"></div>

          <div
            v-for="(item, index) in timeItem"
            :key="index"
            :class="'left-hand-' + (index + 1)"
            style="width: 100%; height: 50px; box-sizing: border-box;"
          >
            <p class="left-hand-index" style="margin: 0px;">{{ index + 1 }}</p>
            <p class="left-hand-name" style="margin: 0px;">{{ item }}</p>
          </div>
        </div>
      </div>
    </div>

    <v-dialog v-model="infodialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>课程信息</v-card-title>

        <v-card-text>{{ dialogdata }}</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="infodialog = false">关闭</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </with-app-bar>
</template>

<script>
import { UnknownException } from "@/plugins/guetsdk";
import { GetCourseTableCall } from "@/plugins/guetsdk/structures";

export default {
  name: "course",
  data() {
    return {
      infodialog: false,
      dialogdata: "",
      dayItem: ["一", "二", "三", "四", "五", "六", "日"],
      timeItem: [
        "08:25",
        "09:20",
        "10:25",
        "11:20",
        "14:30",
        "15:25",
        "16:30",
        "17:25",
        "19:30",
        "20:25",
        "21:30",
        "22:25"
      ],
      dataColor: [
        "#f05261",
        "#48a8e4",
        "#ffd061",
        "#52db9a",
        "#70d3e6",
        "#52db9a",
        "#3f51b5",
        "#f3d147",
        "#4adbc3",
        "#673ab7",
        "#f3db49",
        "#76bfcd",
        "#b495e1",
        "#ff9800",
        "#8bc34a"
      ],
      toweekdata: []
    };
  },
  mounted() {
    this.Course();
  },
  methods: {
    rollColor() {
      let value = this.dataColor[
        Math.floor(Math.random() * this.dataColor.length)
      ];
      return value;
    },
    async Course() {
      this.classIsLoading = true;

      await this.$guet()
        .send(new GetCourseTableCall(this.getYear()))
        .then(res => {
          res.toweek = 1; //Test API
          this.toweekdata = res.courseMartix[res.toweek - 1];
          if (this.today.length != 0) {
            this.todayState = true;
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
    info(x, y) {
      let infodata = this.toweekdata[y][x];
      this.dialogdata = infodata[0]["fullInfo"];
      this.infodialog = true;
    }
  }
};
</script>

<style>
#coursesTable {
  padding: 15px 10px;
}

.Courses-head {
  background-color: #03a9f4;
  color: #ffffff;
}

.Courses-head > div {
  text-align: center;
  font-size: 14px;
  line-height: 28px;
}

.left-hand-TextDom,
.Courses-head {
  background-color: #03a9f4;
}

.Courses-leftHand {
  background-color: #03a9f4;
  font-size: 12px;
}

.Courses-leftHand .left-hand-index {
  color: #ffffff;
  margin-bottom: 4px !important;
}

.Courses-leftHand .left-hand-name {
  color: #ffffff;
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
  border-bottom: 1px solid rgba(255, 255, 255, 1) !important;
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
}

.grid-active {
  z-index: 9999;
}

.grid-active span {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}
</style>