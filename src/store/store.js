import Vuex from 'vuex';

export default new Vuex.Store({
    HomeTestData: {
        name: "测试",
        cdata: [
            {
                title: "大学英语I",
                onetime: "第一节:8:25 - 9:10",
                twotime: "第二节:9:20 - 10:05",
                info: ""
            },
            {
                title: "体育I",
                onetime: "第一节:10:25 - 11:10",
                twotime: "第二节:11:20 - 12:05",
                info: ""
            },
            {
                title: "思修I",
                onetime: "第一节:16:30 - 17:15",
                twotime: "第二节:17:25 - 18:10",
                info: ""
            }
        ]
    }
});
