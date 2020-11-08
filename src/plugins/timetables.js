export default {
    install(Vue) {
        Vue.prototype.Timetables = new Timetables({
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
            highlightWeek: 1,
            timetableType: [
                [{ index: "1", name: "8:25" }, 1],
                [{ index: "2", name: "9:20" }, 1],
                [{ index: "3", name: "10:25" }, 1],
                [{ index: "4", name: "11:20" }, 1],
                [{ index: "5", name: "14:30" }, 1],
                [{ index: "6", name: "15:25" }, 1],
                [{ index: "7", name: "16:30" }, 1],
                [{ index: "8", name: "17:25" }, 1],
                [{ index: "9", name: "19:30" }, 1],
                [{ index: "10", name: "20:25" }, 1],
            ],
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
            styles: {
                // palette: ["#dedcda", "#ff4081"],
            },
        });
    }
};