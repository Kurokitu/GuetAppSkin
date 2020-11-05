import get from './get_data'
import save from './save_data'
import axios from './api'

// 登入超时时的重登方法
const requests = {
    login() {
        axios.newLogin({
            argv: {
                username: get.getAuthData().username,
                password: get.getAuthData().password
            },
            func: "login"
        })
            .then((res) => {
                res.data.data.username = get.getAuthData().username;
                res.data.data.password = get.getAuthData().password;
                res.data.data.stutype = get.getAuthData().stutype;
                save.saveUserInfo(res.data);
                console.log(res);
                location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

export default requests