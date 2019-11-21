const DEFVERSION = "1.1.18";

let COOKIE_CALLBACK = null;

const DEFAULT_REQUEST_PATH = '/gbh/edu';

let setCookieCallback = function(callback){
    COOKIE_CALLBACK = callback;
};

class UserCookie {
    constructor(cookieKey, cookie){
        this.cookieKey = cookieKey;
        this.cookie = cookie;
    }

    getFullCookie(){
        return `${this.cookieKey} ${this.cookie}`;
    }

    toObject(){
        return {
            cookieKey: this.cookieKey,
            cookie: cookie
        };
    }

    static fromObject({cookieKey, cookie}){
        return new UserCookie(cookieKey, cookie);
    }

    static fromResponseDataObject({cookie_key, cookie}){
        return new UserCookie(cookie_key, cookie);
    }
}

class APICall {
    setFunction(target){
        this.function = target;
    }

    getFunction(){
        return this.function;
    }

    setCookie(userCookie){
        this.userCookie = userCookie;
    }

    getCookie(){
        if (this.userCookie !== undefined){
            return this.userCookie.getFullCookie();
        } else if (COOKIE_CALLBACK !== null){
            return COOKIE_CALLBACK();
        } else return null;
    }

    setRequestPath(requestPath){
        this.requestPath = requestPath;
    }

    getRequestPath(){
        if (this.requestPath !== undefined) return this.requestPath;
        return DEFAULT_REQUEST_PATH;
    }

    setArguments(argv){
        this.arguments = argv;
    }

    addArguments(newArgv){
        this.setArguments(this.getArguments());
        for (let key of newArgv.keys()){
            this.arguments[key] = newArgv[key];
        }
    }

    getArguments(){
        return this.arguments !== undefined ? this.arguments : {};
    }

    setRequestMethod(method){
        this.requestMethod = method;
    }

    getRequestMethod(){
        return this.requestMethod !== undefined ? this.requestMethod : 'post';
    }

    setPostprocessor(pp){
        this.postprocessor = pp;
    }

    getPostprocessor(){
        return this.postprocessor !== undefined ? this.postprocessor : null;
    }

    makeAxiosRequest(){
        return {
            url: this.getRequestPath(),
            method: this.getRequestMethod(),
            data: {
                func: this.getFunction(),
                argv: this.getArguments(),
                cookie: this.getCookie(),
                version: DEFVERSION
            }
        };
    }
}


class APITool {
    isStatus(response, status){
        return this.getStatus() == status;
    }

    getStatus(response){
        return response.data.status;
    }
}


class APIResult {}


class LoginCall extends APICall, APITool {
    constructor(username, password){
        this.setRequestPath('/gbh/login');
        this.addArguments({
            'username': username,
            'password': password
        });
        this.setPostprocessor(this.postprocessor);
    }

    postprocessor(response){
        return new Promise((resolve, reject) => {
            if (this.isStatus(response, 2)){
                resolve(
                    new LoginResult(
                        response.data.cookie_key,
                        response.data.cookie
                    )
                );
            } else if (this.isStatus(response, 1)){
                reject(this);
            }
        });
    }
}


class LoginResult extends APIResult {
    constructor(cookieKey, cookie){
        this.cookieKey = cookieKey;
        this.cookie = cookie;
    }

    getUserCookie(){
        return UserCookie.fromObject(this);
    }
}


class UserInfoCall extends APICall, APITool {
    constructor(userCookie){}
}


export {
    setCookieCallback,
    APICall,
    APIResult,
    LoginCall,
    LoginResult
};