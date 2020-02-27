import errors from './errors';

const DEFVERSION = "1.1.26";

let COOKIE_CALLBACK = null;

const DEFAULT_REQUEST_PATH = '/gbh/edu';

export let setCookieCallback = function (callback) {
    COOKIE_CALLBACK = callback;
};

export class UserCookie {
    constructor(cookieKey, cookie) {
        this.cookieKey = cookieKey;
        this.cookie = cookie;
    }

    getFullCookie() {
        return `${this.cookieKey} ${this.cookie}`;
    }

    toObject() {
        return {
            cookieKey: this.cookieKey,
            cookie: this.cookie
        };
    }

    static fromObject({ cookieKey, cookie }) {
        return new UserCookie(cookieKey, cookie);
    }

    static fromResponseDataObject({ cookie_key, cookie }) {
        return new UserCookie(cookie_key, cookie);
    }
}

export class APICall {
    setFunction(target) {
        this.function = target;
    }

    getFunction() {
        return this.function;
    }

    setCookie(userCookie) {
        this.userCookie = userCookie;
    }

    getCookie() {
        if (this.userCookie !== undefined) {
            return this.userCookie.getFullCookie();
        } else if (COOKIE_CALLBACK !== null) {
            return COOKIE_CALLBACK();
        } else return null;
    }

    setRequestPath(requestPath) {
        this.requestPath = requestPath;
    }

    getRequestPath() {
        if (this.requestPath !== undefined) return this.requestPath;
        return DEFAULT_REQUEST_PATH;
    }

    setArguments(argv) {
        this.arguments = argv;
    }

    addArguments(newArgv) {
        this.setArguments(this.getArguments());
        for (let key of Object.keys(newArgv)) {
            this.arguments[key] = newArgv[key];
        }
    }

    getArguments() {
        return this.arguments !== undefined ? this.arguments : {};
    }

    setRequestMethod(method) {
        this.requestMethod = method;
    }

    getRequestMethod() {
        return this.requestMethod !== undefined ? this.requestMethod : 'post';
    }

    setPostprocessor(pp) {
        this.postprocessor = pp;
    }

    getPostprocessor() {
        return this.postprocessor !== undefined ? this.postprocessor : this._defaultPostprocessor;
    }

    callPostprocessor(response){
      return this.getPostprocessor().call(this,response);
    }

    _defaultPostprocessor(response) {
        return response;
    }

    makeAxiosRequestConfig() {
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


class APICallMixture extends APICall {
    isStatus(response, status) {
        return this.getStatus(response) === status;
    }

    getStatus(response) {
        return response.data.status;
    }

    isOk(response) {
        return (response.status === 200) && this.isStatus(response, 2);
    }

    handleCommonError(response) {
        if (this.isStatus(response, 4)) {
            throw new errors.CookieInvalidException();
        } else if (this.isStatus(response, 1)) {
            throw new errors.UnknownException(response.data.msg);
        }
    }
}


export class APIResult { }


export class LoginCall extends APICallMixture {
    constructor(username, password) {
        super();
        this.setRequestPath('/gbh/login');
        this.setFunction('login');
        this.addArguments({
            'username': username,
            'password': password
        });
        this.setPostprocessor(this.postprocessor);
    }

    postprocessor(response) {
        return new Promise((resolve) => {
          if (this.isOk(response)) {
                resolve(
                    new LoginResult(
                        response.data.cookie_key,
                        response.data.cookie
                    )
                );
          } else this.handleCommonError(response);
        });
    }
}


export class LoginResult extends APIResult {
    constructor(cookieKey, cookie) {
        super();
        this.cookieKey = cookieKey;
        this.cookie = cookie;
    }

    getUserCookie() {
        return UserCookie.fromObject(this);
    }
}


export class UserInfoCall extends APICallMixture {
    constructor() {
        super();
        this.setFunction('info');
    }

    postprocessor(response) {
        return new Promise((resolve) => {
            resolve(UserInfoResult.fromChineseKeyObject(response.data.data));
        });
    }
}


export class UserInfoResult extends APICallMixture {
    constructor({ id, name, gender, phoneNumber, grade, discipline, classId, nation, flatId, type }) {
        super();
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

    static fromChineseKeyObject(obj) {
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

    toObject() {
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


export class ChangePasswordCall extends APICallMixture {
    constructor(oldPassword, newPassowrd) {
        super();
        this.oldPassword = oldPassword;
        this.newPassowrd = newPassowrd;
        this.setFunction('change_passwd');
        this.addArguments(this.makeArguments());
    }

    makeArguments() {
        return {
            "new_passwd": this.newPassowrd,
            "reNew_passwd": this.newPassowrd,
            "old_passwd": this.oldPassword,
        };
    }

    async postprocessor(response) {
        if (this.isOk(response)) {
            return new ChangePasswordResult();
        } else {
            throw new errors.UnknownException(response.data.msg);
        }
    }
}


export class ChangePasswordResult extends APIResult { }


export class GetCreditCall extends APICallMixture {
    constructor() {
        super();
        this.setFunction('creadit');
    }

    async postprocessor(response) {
        if (this.isOk(response)) {
            let creditInstances = [];
            for (let creditsArray of response.data.data) {
                creditInstances.push(CourseCredit.fromArray(creditsArray));
            }
            return new GetCreditResult(creditInstances);
        } else this.handleCommonError(response);
    }
}


export class CourseCredit {
    constructor({ typeName, required, max, currentGot }) {
        this.typeName = typeName;
        this.required = required;
        this.max = max;
        this.currentGot = currentGot;
    }

    static fromArray(arr) {
        return new CourseCredit({
            typeName: arr[0],
            required: arr[1],
            all: arr[2],
            currentGot: arr[3]
        });
    }
}


export class GetCreditResult extends APIResult {
    constructor(courseCredits) {
        super();
        this.courseCredits = courseCredits;
    }
}


export class GetTermsCall extends APICallMixture {
    constructor() {
        super();
        this.setFunction('selected');
        this.addArguments({
            type: 'option'
        });
    }

    async postprocessor(response) {
        if (this.isOk(response)) {
            let termInstances = [];
            for (let termObj of response.data.data) {
                termInstances.push(Term.fromDataObject(termObj));
            }
            return new GetTermsResult(termInstances);
        } else {
            this.handleCommonError(response);
        }
    }
}


export class GetTermsResult extends APIResult {
    constructor(terms) {
        super();
        this.terms = terms;
    }
}


export class Term {
    constructor({ code, name }) {
        this.code = code;
        this.name = name;
    }

    static fromDataObject({ termCode, termName }) {
        return new Term({
            code: termCode,
            name: termName
        });
    }
}


export class GetSelectedClassCall extends APICallMixture {
    constructor(termCode) {
        super();
        this.setFunction('selected');
        this.addArguments({
            type: 'get',
            term: termCode
        });
    }

    async postprocessor(response) {
        if (this.isOk(response)) {
            let selClassIns = [];
            for (let selClassArray of response.data.data) {
                selClassIns.push(SelectedClass.fromDataArray(selClassArray));
                return new GetSelectedClassResult(selClassIns);
            }
        } else this.handleCommonError(response);
    }
}


export class GetSelectedClassResult extends APIResult {
    constructor(selectedClass) {
        super();
        this.selectedClass = selectedClass;
    }
}


export class SelectedClass {
    constructor({ id, name, type, teacherName, credit, finished }) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.teacherName = teacherName;
        this.credit = credit;
        this.finished = finished;
    }

    static fromDataArray(arr) {
        return new SelectedClass({
            id: arr[0],
            name: arr[1],
            type: arr[2],
            teacherName: arr[4],
            credit: Number.parseFloat(arr[5]),
            finished: arr[6] === "未结算" ? false : true
        });
    }
}


let object2array = (obj, startWith, endWith) => {
    let newArray = [];
    let pointer = -1;
    for (let i = startWith; i <= endWith; i++) {
        pointer++;
        newArray[pointer] = obj[i.toString()];
    }
    return newArray;
};

/* As you can see, I use 4 loops in this function.
* But my goal is not to write a 'well' data transformer,
* which is to deal in clean way with bad format, written by someone with nothing in his brain,
* to make smart others can read.
* -- Rubcion
*/
/* reshapeBadCourseTable(t)
* `t` is a object that seems like:
* {1:{1:[], 2:[], ..., 7:[]}, 2:{...}, 3:{...}, ..., 5:{...}}
* Return a martix (by array) that uses 1-7 (mapped to 0-6) as the first dimension,
* uses 1-5 (mapped to 0-4) as the second demension.
*/
export let reshapeBadCourseTable = (t) => {
    let reshaped = [[], [], [], [], [], [], []];
    let courses = object2array(t, 1, 5).map((el) => object2array(el, 1, 7));
    courses.forEach((byDay, courseIndex) => {
        byDay.forEach((classInfo, day) => {
            reshaped[day][courseIndex] = classInfo;
        });
    });
    return courses;
};


export class GetCourseTableCall extends APICallMixture {
    constructor(termCode) {
        super();
        this.termCode = termCode;
        this.setFunction('course_table');
        this.addArguments({
            type: 'get_new_table',
            term: termCode
        });
    }

    async postprocessor(response) {
        if (this.isOk(response)) {
            let martixByWeek = [];
            let data = response.data.data;
            for (let weekString of data.keys()) {
                let week = Number.parseInt(weekString);
                if (!isNaN(week)) {
                    martixByWeek[week - 1] = reshapeBadCourseTable(data[week]);
                }
            }
            martixByWeek.map((courseTable) => {
                return courseTable.map((courseInDay) => {
                    return courseInDay.map((courseDataArray) => Course.fromDataArray(courseDataArray));
                });
            });
            return new GetCourseTableResult(data.toweek, martixByWeek);
        } else this.handleCommonError(response);
    }
}


export class GetCourseTableResult extends APIResult {
    constructor(toweek, courseMartix) {
        super();
        this.toweek = toweek;
        this.courseMartix = courseMartix;
    }
}


export class Course {
    constructor({ name, teacherName }) {
        this.name = name;
        this.teacherName = teacherName;
    }

    static fromDataArray(arr) {
        let dataString = arr[1];
        let [name, , teacherName] = dataString.split('@');
        return new Course({
            name: name,
            teacherName: teacherName
        });
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
    GetTermsCall,
    GetTermsResult,
    Term,
    GetSelectedClassCall,
    GetSelectedClassResult,
    SelectedClass,
    GetCourseTableCall,
    GetCourseTableResult,
    Course,
};
