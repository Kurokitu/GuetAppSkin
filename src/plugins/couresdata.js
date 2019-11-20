import { getCoures } from "@/plugins/api/request";

export default {
    install(Vue) {
        Vue.prototype.getcouresdata = function (data) {
            return getCoures(data)
                .then(res => {
                    /* eslint-disable */
                    console.log(res);
                    if (res.data.status == 1) {
                        this.$notify.error({
                            title: "错误",
                            message: res.data.msg
                        });
                    }
                    if (res.data.status == 2) {
                        this.indata = res.data.data;

                        localStorage.setItem('toweek', res.data.data.toweek);

                        this.newarray = new Array();
                        this.cdata = new Array();
                        this.result = new Array();

                        for (let i = 1; i < 21; i++) {
                            for (let ii = 1; ii < 8; ii++) {
                                this.newarray.push(
                                    { "0": "null" },
                                    res.data.data[i][1][ii][0],
                                    res.data.data[i][2][ii][0],
                                    res.data.data[i][3][ii][0],
                                    res.data.data[i][4][ii][0],
                                    res.data.data[i][5][ii][0]
                                )
                            }
                        }

                        for (var i = 1; i < 840; i += 6) {
                            this.cdata.push(this.newarray.slice(i, i + 6));
                        }

                        for (var i = 0; i <= 140; i += 7) {
                            this.result.push(this.cdata.slice(i, i + 7));
                        }


                        console.log(this.result);
                        localStorage.setItem("cdata", JSON.stringify(this.result));
                        window.location.href = '/Coures';
                    }
                });
        }
    }
}