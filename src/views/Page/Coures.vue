<template>
  <div>
    <el-card class="box-card">
      <h4>空白数据等于无课</h4>
      <p color="#f00">10月28日起开始启用冬季时间，请注意！</p>
    </el-card>

    <el-card class="box-card">
      <el-col :span="12">
        <el-select
          style="float: left;"
          v-model="toweek"
          placeholder="请选择周数"
          @change="getcdata"
        >
          <el-option
            v-for="itemw in this.weekoptions"
            :key="itemw.week"
            :label="itemw.wlabel"
            :value="itemw.week"
          ></el-option>
        </el-select>
      </el-col>

      <el-col :span="12">
        <el-select
          style="float: left;"
          v-model="today"
          placeholder="请选择星期"
          @change="getcdata"
        >
          <el-option
            v-for="itemd in this.dayoptions"
            :key="itemd.day"
            :label="itemd.dlabel"
            :value="itemd.day"
          ></el-option>
        </el-select>
      </el-col>

      <el-table :data="this.one" style="width: 100%">
        <el-table-column prop="name" label="课时" width="auto"></el-table-column>
        <el-table-column prop="time" label="时间" width="auto"></el-table-column>
        <el-table-column prop="info" label="信息" width="auto"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
//import { getCoures } from "@/plugins/api/request";
export default {
  name: "Coures",
  data() {
    return {
      one: [],
      weekoptions: [
        {
          week: "1",
          wlabel: "第一周"
        },
        {
          week: "2",
          wlabel: "第二周"
        },
        {
          week: "3",
          wlabel: "第三周"
        },
        {
          week: "4",
          wlabel: "第四周"
        },
        {
          week: "5",
          wlabel: "第五周"
        },
        {
          week: "6",
          wlabel: "第六周"
        },
        {
          week: "7",
          wlabel: "第七周"
        },
        {
          week: "8",
          wlabel: "第八周"
        },
        {
          week: "9",
          wlabel: "第九周"
        },
        {
          week: "10",
          wlabel: "第十周"
        },
        {
          week: "11",
          wlabel: "第十一周"
        },
        {
          week: "12",
          wlabel: "第十二周"
        },
        {
          week: "13",
          wlabel: "第十三周"
        },
        {
          week: "14",
          wlabel: "第十四周"
        },
        {
          week: "15",
          wlabel: "第十五周"
        },
        {
          week: "16",
          wlabel: "第十六周"
        },
        {
          week: "17",
          wlabel: "第十七周"
        },
        {
          week: "18",
          wlabel: "第十八周"
        },
        {
          week: "19",
          wlabel: "第十九周"
        },
        {
          week: "20",
          wlabel: "第二十周"
        }
      ],
      dayoptions: [
        {
          day: "0",
          dlabel: "星期一"
        },
        {
          day: "1",
          dlabel: "星期二"
        },
        {
          day: "2",
          dlabel: "星期三"
        },
        {
          day: "3",
          dlabel: "星期四"
        },
        {
          day: "4",
          dlabel: "星期五"
        },
        {
          day: "5",
          dlabel: "星期六"
        },
        {
          day: "6",
          dlabel: "星期日"
        }
      ],
      toweek: "",
      today: "",
      daysele: "",
      weeksele: ""
    };
  },
  mounted() {
    this.getcdata();
    //console.log(this.daysele);

    // //获取当前周
    // if (!localStorage.getItem("toweek")&&!localStorage.getItem("today")) {
    //   window.location.href="/";
    // }else{
    //   // this.toweek = localStorage.getItem("toweek");
    //   // this.today = localStorage.getItem("today")-1;
    //   this.$forceUpdate()
    // }
  },
  methods: {
    getcdata() {
      console.log(localStorage.getItem("toweek"));
      this.toweek = localStorage.getItem("toweek");
      this.today = localStorage.getItem("today");
      this.cdatause = JSON.parse(localStorage.getItem("cdata"));
      this.one = [
        {
          name: "1 - 2节",
          time: "8:25至9:10 - 9:20至10:05",
          info: this.cdatause[this.toweek][this.today]["0"]
        },
        {
          name: "3 - 4节",
          time: "10:25至11:10 11:20至12:05",
          info: this.cdatause[this.toweek][this.today]["1"]
        },
        {
          name: "5 - 6节",
          time: "14:30至15:15 15:25至16:10",
          info: this.cdatause[this.toweek][this.today]["2"]
        },
        {
          name: "7 - 8节",
          time: "16:30至17:15 17:25至18:10",
          info: this.cdatause[this.toweek][this.today]["3"]
        },
        {
          name: "9 - 10节",
          time: "19:30至20:15 20:25至21:10",
          info: this.cdatause[this.toweek][this.today]["4"]
        }
      ];
      this.$forceUpdate();
    }
  }
};
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 90%;
}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>