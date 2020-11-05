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

    <v-ClassTable :classTableData="classTableData" />
  </with-app-bar>
</template>

<script>
// var that;
import ClassTable from "@/components/CourseTable";
export default {
  data() {
    return {
      msg: "",
      classTableData: {
        weeks: ["", "一", "二", "三", "四", "五", "六", "日"],
        courses: [
          {
            id: 1,
            classId: 2,
            lessonsTime: "8:00-9:40",
            lessonsName: "计算机导论",
            lessonsAddress: "二教302",
            lessonsTeacher: "吴老师",
            lessonsRemark: "1-17周",
            lessonsNumber: "一",
            weekday: "星期一",
          },
          {
            id: 19,
            classId: 2,
            lessonsTime: "8:00-9:40",
            lessonsName: "编译原理",
            lessonsAddress: "二教302",
            lessonsTeacher: "吴老师",
            lessonsRemark: "1-5,8-12周",
            lessonsNumber: "一",
            weekday: "星期四",
          },
        ],
      },
    };
  },
  components: {
    "v-ClassTable": ClassTable,
  },
  created() {
  },
  methods: {
    // 查询教师课表
    // async findTeacherLesson(userName) {
    //   that = this;
    //   var params = {
    //     userName: userName,
    //   };
    //   const { msg, status, info } = await reqFindTeacherLesson(params);
    //   that.classTableData.courses = info;
    // },
  },
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