import { getLogin } from "@/plugins/api/request";

export default {
    install(Vue) {
        Vue.prototype.allLogin = function () {
            return getLogin()
                .then(res => {
                    /* eslint-disable */
                    console.log(res);
                    if (res.data.status == 1) {
                        this.$notify.error({
                            title: "错误",
                            message: "学号或密码不正确！"
                        });
                        localStorage.removeItem("UID");
                        localStorage.removeItem("Password");
                    }
                    if (res.data.status == 2) {
                        localStorage.setItem("cookie_key", res.data.cookie_key);
                        localStorage.setItem("cookie", res.data.cookie);
                        //window.location.href = "/";
                        window.location.reload();
                    }
                });
        }
    }
}