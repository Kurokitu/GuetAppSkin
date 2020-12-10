import vaxios from "axios";

vaxios
    .get(process.env.VUE_APP_CONF_URL + "?t=" + new Date().getTime())
    .then((res) => {
        localStorage.setItem("timemode", res.data.timemode);
        localStorage.setItem("version", res.data.version);
        localStorage.setItem("updateurl", res.data.updateurl);
        localStorage.setItem("updateinfo", res.data.updateinfo);
        localStorage.setItem("notice_switch", res.data.notice_switch);
        localStorage.setItem("notice", res.data.notice);
    })
    .catch((error) => {
        if (!localStorage.getItem("timemode")) {
            localStorage.setItem("timemode", "winter");
        }
        if(!localStorage.getItem("notice_switch")) {
            localStorage.setItem("notice_switch", false)
        }
        console.log(error);
    });