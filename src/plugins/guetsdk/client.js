import BCLI from './base';
import { LoginCall } from './structures';
import * as log from 'loglevel';
import { CookieInvalidException } from './errors';

const logger = log.getLogger("guetsdk/client.js");

class CallbackChain {
    constructor(){
        this.chain = [];
    }

    push(f){
        this.chain.push(f);
    }

    apply(arg){
        logger.info(`CallbackChain: apply}`);
        for (let f of this.chain){
            f.call(null, arg);
        }
    }

    applyAsync(arg){
        logger.info(`CallbackChain: apply in async`);
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

    login(username, password, identity) {
        return this.send(new LoginCall(username, password, identity)).then((result) => {
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

    async send(call, retryTimes) {
        if (!retryTimes) retryTimes = 10;
        if (await this.askLogin()) {
            call.setCookie(this.userCookie);
        }
        return this.rawSend(call.makeAxiosRequestConfig())
                      .then((response) => call.callPostprocessor(response))
                      .catch(e => {
                          if (retryTimes <= 1) return Promise.reject(e);
                          logger.warn("send(): catch error from postprocessor", e);
                          if (e.isRetry){
                              logger.warn("send():retring");
                              return this.onCookieInvalidCallback.applyAsync(this).then(() => e.retry());
                          } else if (e instanceof CookieInvalidException){
                            logger.warn("send():cookie invalid, retring");
                            return this.onCookieInvalidCallback.applyAsync(this).then(() => this.send(call, retryTimes-1));
                          } else {
                              return Promise.reject(e);
                          }
                      });
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
