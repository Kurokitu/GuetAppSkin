import BCLI from './base';
import { LoginCall } from './structures';
import { Retry, CookieInvalidException } from './errors';


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

    applyAsync(arg){
        let promises = [];
        for (let f of this.chain){
            let p = f.call(null, arg);
            if(p) promises.push(p);
        }
        return Promise.all(promises);
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
        this.onCookieSetCallback = new CallbackChain();
        this.onCookieInvalidCallback = new CallbackChain();
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

    async askLogin(){
        if (!this.isLogin){
            await this.triggerCookieNotFoundAsync();
        }
        return this.isLogin;
    }

    async triggerCookieNotFoundAsync(){
        await this.onCookieNotFoundCallback.applyAsync(this);
    }

    async triggerCookieSetAsync(){
        await this.onCookieSetCallback.applyAsync(this);
    }

    async setUserCookie(cookie) {
        this.userCookie = cookie;
        await this.triggerCookieSetAsync();
    }

    rawSend(requestConfig) {
        return BCLI(requestConfig);
    }

    async send(call) {
        if (await this.askLogin()) {
            call.setCookie(this.userCookie);
        }
        return await (this.rawSend(call.makeAxiosRequestConfig())
                      .then((response) => call.callPostprocessor(response))
                      .catch(e => {
                          if ((e instanceof Retry ) && (e.error instanceof CookieInvalidException)){
                              this.onCookieInvalidCallback.applyAsync(this).then(() => e.retry());
                          }
                      }));
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
        } else if (event == "cookie_set"){
            this.onCookieSetCallback.push(callback);
        } else if (event == "cookie_invalid"){
            this.onCookieInvalidCallback.push(callback);
        }
    }
}

export default {
    GUETClient
};
