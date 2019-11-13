import { Service } from "@/plugins/api/Service";

/* eslint-disable no-undef */
// export function getConfigsByProductId(productId) {
//     return Service({
//       url: '/manager/getConfigsByProductId',
//       params: { productId: productId }
//     })
//   }


export function getLogin() {
    return Service({
        url: '/gbh/login',
        method: 'post',
        data: {
            func: "login",
            argv: {
                username: localStorage.getItem("UID"),
                password: localStorage.getItem("Password")
            },
            version: "1.1.18"
        }
    })
}

export function getUserInfo() {
    return Service({
        url: '/gbh/edu',
        method: 'post',
        data: { "func": "info", "cookie": localStorage.getItem("cookie_key") + " " + localStorage.getItem("cookie"), "argv": {}, "version": "1.1.18" },
    })
}

export function changePasswd(data) {
    return Service({
        url: '/gbh/edu',
        method: 'post',
        data: {
            argv: data,
            cookie:
                localStorage.getItem("cookie_key") +
                " " +
                localStorage.getItem("cookie"),
            func: "change_passwd",
            version: "1.1.18"
        }
    })
}

export function getCreadit() {
    return Service({
        url: '/gbh/edu',
        method: 'post',
        data: {
            func: "creadit",
            argv: {},
            cookie:
                localStorage.getItem("cookie_key") +
                " " +
                localStorage.getItem("cookie"),
            version: "1.1.18"
        }
    })
}

export function getOptOne() {
    return Service({
        url: '/gbh/edu',
        method: 'post',
        data: {
            func: "selected",
            cookie:
              localStorage.getItem("cookie_key") +
              " " +
              localStorage.getItem("cookie"),
            argv: { type: "option" },
            version: "1.1.18"
          },
    })
}

export function getOptTwo() {
    return Service({
        url: '/gbh/edu',
        method: 'post',
        data: {
            func: "course_table",
            cookie:
              localStorage.getItem("cookie_key") +
              " " +
              localStorage.getItem("cookie"),
            argv: { type: "option" },
            version: "1.1.18"
          },
    })
}

export function getSeled(data) {
    return Service({
        url: '/gbh/edu',
        method: 'post',
        data: {
            func: "selected",
            cookie:
              localStorage.getItem("cookie_key") +
              " " +
              localStorage.getItem("cookie"),
            argv: { type: "get", term: data },
            version: "1.1.18"
          },
    })
}

export function getCoures(data) {
    return Service({
        url: '/gbh/edu',
        method: 'post',
        data: {
            func: "course_table",
            cookie:
              localStorage.getItem("cookie_key") +
              " " +
              localStorage.getItem("cookie"),
            argv: { type: "get_new_table", term: data },
            version: "1.1.18"
          },
    })
}