import course from './coures_data'

const requests = {
    saveUserInfo(data) {
        console.log(data)
        let Auth = {
            username: data.data.username,
            password: data.data.password,
            cookie: data.cookie,
            cookie_key: data.cookie_key,
            full_cookie: data.cookie_key + " " + data.cookie,
            stutype: data.data.stutype
        }

        let UserInfo = {
            id: data.data.username,
            class: data.data.班级,
            name: data.data.姓名,
            sex: data.data.性别,
            nation: data.data.民族,
            major: data.data.专业,
            stutype: data.data.学生类型,
            dormid: data.data.宿舍号,
            phone: data.data.联系电话
        }

        localStorage.setItem('Auth', JSON.stringify(Auth));
        localStorage.setItem('UserInfo', JSON.stringify(UserInfo));
    },

    saveUserInfoOnly(data) {
        let UserInfo = {
            id: data.data.学号,
            class: data.data.班级,
            name: data.data.姓名,
            sex: data.data.性别,
            nation: data.data.民族,
            major: data.data.专业,
            stutype: data.data.学生类型,
            dormid: data.data.宿舍号,
            phone: data.data.联系电话
        }

        localStorage.setItem('UserInfo', JSON.stringify(UserInfo));
    },

    saveCoures(data) {
        localStorage.setItem('Course', JSON.stringify(data));
        let newcoursedata = course.course_convert(data);
        localStorage.setItem('NewCourse', JSON.stringify(newcoursedata));
        localStorage.setItem('Toweek', data.toweek);
    }
}

export default requests