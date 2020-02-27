export default {
    state: {
        cookie: "",
        cookie_key: "",
        fullcookie: ""
    },
    mutations: {
        setCookie(state, data) {
            state.cookie.cookie = data.cookie;
            state.cookie.cookie_key = data.cookie_key;
            state.cookie.fullcookie = data.cookie_key + ' ' + data.cookie;
        }
    },
    actions: {

    },
    modules: {
    }
};