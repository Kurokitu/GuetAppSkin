import BCLI from './base';
import { LoginCall } from './structures';

/* A Client to manage state of API
Example:
````
let client = new GUETClient();
await client.login('example','example');
let userInfoResult = await client.send(new UserInfoCall());
// GUETClient can automatically add 'cookie' field in method send() after login
````
*/
export class GUETClient {
    constructor() {
        this.userCookie = null;
    }

    login(username, password) {
        return this.send(new LoginCall(username, password)).then((result) => {
            this.setUserCookie(result.getUserCookie());
            return result;
        });
    }

    get isLogin() {
        return this.userCookie !== null;
    }

    setUserCookie(cookie) {
        this.userCookie = cookie;
    }

    rawSend(requestConfig) {
        return BCLI(requestConfig);
    }

    send(call) {
        window.console.log(call);
        if (this.userCookie != null) {
            call.setUserCookie(this.userCookie);
        }
        this.rawSend(call.makeAxiosRequestConfig()).then((response) => call.getPostprocessor()(response));
    }

    static withLogin(username, password) {
        return new Promise((resolve, reject) => {
            let cli = new GUETClient();
            cli.login(username, password).then(() => resolve(cli), (reason) => reject(reason));
        });
    }
}

export default {
    GUETClient
};
