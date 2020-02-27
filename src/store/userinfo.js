export default {
    state: {
        calssid: "",
        sex: "",
        name: "",
        id: "",
        major: ""
    },
    mutations: {
        setUserInfo(state, data) {
            state.calssid = data.班级;
            state.sex = data.性别;
            state.name = data.姓名;
            state.id = data.学号;
            state.major = data.专业;
        }
    },
    actions: {

    },
    modules: {
    }
};