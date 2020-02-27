import BCLI from './base';
import { LoginCall } from './structures';


class CallbackChain {
    constructor(){
        this.chain = [];
    }

    push(f){
        this.chain.push(f);
    }

    apply(arg){
        for (let f of this.chain){
            f.call(null, arg);
        }
    }
}


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
        this.onCookieNotFoundCallback = new CallbackChain();
    }

    login(username, password) {
        return this.send(new LoginCall(username, password)).then((result) => {
            this.setUserCookie(result.getUserCookie());
            return result;
        });
    }

    get isLogin() {
        if (this.userCookie === null){
            this.onCookieNotFoundCallback.apply(this);
        }
        return this.userCookie !== null;
    }

    setUserCookie(cookie) {
        this.userCookie = cookie;
    }

    rawSend(requestConfig) {
        return BCLI(requestConfig);
    }

    send(call) {
        if (this.isLogin) {
            call.setCookie(this.userCookie);
        }
        return this.rawSend(call.makeAxiosRequestConfig()).then((response) => call.callPostprocessor(response));
    }

    static withLogin(username, password) {
        return new Promise((resolve, reject) => {
            let cli = new GUETClient();
            cli.login(username, password).then(() => resolve(cli), (reason) => reject(reason));
        });
    }

    on(event,callback){
        if (event == "cookie_not_found"){
            this.onCookieNotFoundCallback.push(callback);
        }
    }
}

export default {
    GUETClient
};
