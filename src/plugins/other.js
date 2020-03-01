export default {
    install(Vue) {
        Vue.prototype.getWeekDate = function () {
            var now = new Date();
            var day = now.getDay();
            let weeks = [
                { name: "星期日", value: 7 },
                { name: "星期一", value: 1 },
                { name: "星期二", value: 2 },
                { name: "星期三", value: 3 },
                { name: "星期四", value: 4 },
                { name: "星期五", value: 5 },
                { name: "星期六", value: 6 },
            ];
            var week = weeks[day];
            return week;
        };
    }
};