const requests = {
    getAuthData() {
        let data = localStorage.getItem('Auth');
        if (!data) {
            return false
        } else {
            return JSON.parse(data)
        }
    },

    getFullCookie() {
        return this.getAuthData().full_cookie
    },

    getUserInfo() {
        let data = localStorage.getItem('UserInfo');
        return JSON.parse(data)
    },

    getNewCourse() {
        let data = localStorage.getItem('NewCourse');
        return JSON.parse(data)
    }
}

export default requests