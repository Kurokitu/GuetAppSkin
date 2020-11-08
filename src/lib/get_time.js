export function get_time(season) {
    let winter = [["08:25 - 09:10", "09:20 - 10:05"], ["10:25 - 11:10", "11:20 - 12:05"], ["14:30 - 15:15", "15:25 - 16:10"], ["16:30 - 17:15", "17:25 - 18:10"], ["19:30 - 20:15", "20:25 - 21:10"]]

    let summer = [["08:25 - 09:10", "09:20 - 10:05"], ["10:25 - 11:10", "11:20 - 12:05"], ["15:00 - 15:45", "15:55 - 16:40"], ["17:00 - 17:45", "17:55 - 18:40"], ["19:40 - 20:25", "20:35 - 21:20"]]

    return season === "winter" ? winter : summer
}

export function get_course_num(index) {
    let result = ""
    switch (index) {
        case 0:
            result = "第 1 - 2节";
            break;
        case 1:
            result = "第 3 - 4节";
            break;
        case 2:
            result = "第 5 - 6节";
            break;
        case 3:
            result = "第 7 - 8节";
            break;
        case 4:
            result = "第 9 - 10节";
            break;
    }

    return result
}

export function get_time_by_course(season) {
    let winter = [
        [{ index: "1", name: "8:25" }, 1],
        [{ index: "2", name: "9:20" }, 1],
        [{ index: "3", name: "10:25" }, 1],
        [{ index: "4", name: "11:20" }, 1],
        [{ index: "5", name: "14:30" }, 1],
        [{ index: "6", name: "15:25" }, 1],
        [{ index: "7", name: "16:30" }, 1],
        [{ index: "8", name: "17:25" }, 1],
        [{ index: "9", name: "19:30" }, 1],
        [{ index: "10", name: "20:25" }, 1],
    ];

    let summer = [
        [{ index: "1", name: "8:30" }, 1],
        [{ index: "2", name: "9:30" }, 1],
        [{ index: "3", name: "10:30" }, 1],
        [{ index: "4", name: "11:30" }, 1],
        [{ index: "5", name: "15:00" }, 1],
        [{ index: "6", name: "15:55" }, 1],
        [{ index: "7", name: "17:00" }, 1],
        [{ index: "8", name: "17:55" }, 1],
        [{ index: "9", name: "19:40" }, 1],
        [{ index: "10", name: "20:35" }, 1],
    ];

    return season === "winter" ? winter : summer
}