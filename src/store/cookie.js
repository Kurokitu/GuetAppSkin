export default {
    state: {
        cookie: "",
        cookie_key: "",
        full_cookie: ""
    },
    mutations: {
        setCookie(state, data) {
            state.cookie.cookie = data.cookie;
            state.cookie.cookie_key = data.cookie_key;
            state.cookie.full_cookie = data.cookie_key + ' ' + data.cookie;
        }
    },
    actions: {

    },
    modules: {
    }
};