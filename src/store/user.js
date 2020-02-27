export default {
    state: {
        id: "",
        password: ""
    },
    mutations: {
        setAccount(state, data) {
            state.user.id = data.id;
            state.user.password = data.password;
        },
    },
    actions: {

    },
    modules: {
    }
};