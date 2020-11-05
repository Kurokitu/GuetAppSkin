const requests = {
    course_convert(course) {
        let newdata = []

        for (let i = 1; i < Object.keys(course).length - 1; i++) {
            newdata[i - 1] = []
            for (let d = 1; d <= 7; d++) {
                newdata[i - 1][d - 1] = []
                for (let j = 1; j <= 5; j++) {
                    if (course[i][j][d].length !== 0) {
                        newdata[i - 1][d - 1][j - 1] = course[i][j][d]
                    } else {
                        newdata[i - 1][d - 1][j - 1] = []
                    }
                }
            }
        }

        return newdata
    }
}

export default requests