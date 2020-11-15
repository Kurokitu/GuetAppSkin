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

        Vue.prototype.getWeekDateBy = function (index) {
            let weeks = [
                { name: "星期日", value: 7 },
                { name: "星期一", value: 1 },
                { name: "星期二", value: 2 },
                { name: "星期三", value: 3 },
                { name: "星期四", value: 4 },
                { name: "星期五", value: 5 },
                { name: "星期六", value: 6 },
            ];

            return weeks[index];
        };

        Vue.prototype.getYear = function () {
            let now = new Date();

            var year = now.getFullYear();

            var Month = now.getMonth() + 1;

            if (Month < 8) {
                return year - 1 + '2';
            } else {
                return year + '1';
            }
        };
    }
};