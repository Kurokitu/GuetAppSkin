import errors from './errors';

/* eslint-disable no-this-before-super */
/* eslint-disable constructor-super */
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
            cookie: this.cookie
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
        return this.postprocessor !== undefined ? this.postprocessor : this._defaultPostprocessor;
    }

    _defaultPostprocessor(response){
        return response;
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


class APICallMixture extends APICall{
    isStatus(response, status){
        return this.getStatus(response) == status;
    }

    getStatus(response){
        return response.data.status;
    }
}


class APIResult {}


class LoginCall extends APICallMixture {
    constructor(username, password){
        this.setRequestPath('/gbh/login');
        this.setFunction('login');
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


class UserInfoCall extends APICallMixture {
    constructor(){
        this.setFunction('info');
    }

    postprocessor(response){
        return new Promise((resolve) => {
            resolve(UserInfoResult.fromChineseKeyObject(response.data.data));
        });
    }
}


class UserInfoResult extends APICallMixture {
    constructor({id, name, gender, phoneNumber, grade, discipline, classId, nation, flatId, type}){
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
        this.grade = grade;
        this.discipline = discipline;
        this.classId = classId;
        this.nation = nation;
        this.flatId = flatId;
        this.type = type;
    }

    static fromChineseKeyObject(obj){
        return new UserInfoResult({
            id: obj['学号'],
            name: obj['姓名'],
            gender: obj['性别'],
            phoneNumber: obj['联系电话'],
            grade: obj['年级'],
            discipline: obj['专业'],
            classId: obj['班级'],
            nation: obj['民族'],
            flatId: obj['宿舍号'],
            type: obj['学生类型'],
        });
    }

    toObject(){
        return {
            id: this.id,
            name: this.name,
            gender: this.gender,
            phoneNumber: this.phoneNumber,
            grade: this.grade,
            discipline: this.discipline,
            classId: this.classId,
            nation: this.nation,
            flatId: this.flatId,
            type: this.type,
        };
    }
}


class ChangePasswordCall extends APICallMixture {
    constructor(oldPassword, newPassowrd){
        this.oldPassword = oldPassword;
        this.newPassowrd = newPassowrd;
        this.setFunction('change_passwd');
        this.addArguments(this.makeArguments());
    }

    makeArguments(){
        return {
            "new_passwd": this.newPassowrd,
            "reNew_passwd": this.newPassowrd,
            "old_passwd": this.oldPassword,
        };
    }

    async postprocessor(response){
        if (this.isStatus(response, 2)){
            return new ChangePasswordResult();
        } else {
            throw response.data.msg;
        }
    }
}


class ChangePasswordResult extends APIResult{}


class GetCreditCall extends APICallMixture {
    constructor(){
        this.setFunction('creadit');
    }

    async postprocessor(response){
        if (this.isStatus(response, 2)){
            let creditInstances = [];
            for (let creditsArray of response.data.data){
                creditInstances.push(CourseCredit.fromArray(creditsArray));
            }
            return new GetCreditResult(creditInstances);
        } else if (this.isStatus(response, 1)){
            throw new errors.UnknownException(response);
        } else if (this.isStatus(response, 4)){
            throw new errors.CookieInvalidException();
        }
    }
}


class CourseCredit {
    constructor({typeName, required, all, currentGot}){
        this.typeName = typeName;
        this.required = required;
        this.all = all;
        this.currentGot = currentGot;
    }

    static fromArray(arr){
        return new CourseCredit({
            typeName: arr[0],
            required: arr[1],
            all: arr[2],
            currentGot: arr[3]
        });
    }
}


class GetCreditResult extends APIResult {
    constructor(courseCredits){
        this.courseCredits = courseCredits;
    }
}


export default {
    setCookieCallback,
    APICall,
    APIResult,
    LoginCall,
    LoginResult,
    UserInfoCall,
    UserInfoResult,
    ChangePasswordCall,
    ChangePasswordResult,
    CourseCredit,
    GetCreditCall,
    GetCreditResult,
};
