
export let isRuenYear = (year) => {
    return ((year % 4) == 0) && ((year % 400) != 0);
};

export let getDayCountsOfMouth = (year) => {
    return [31,isRuenYear(year)?29:28,31,30,31,30,31,31,30,31,30,31];
};

export let getDayCountsOf = (year, mo) => {
    return getDayCountsOfMouth(year)[mo-1];
};

export let isCorrectMonth = mo => (mo > 0) && (mo <= 12);


export class DayRange {
    constructor(start, end){
        this.start = start;
        this.end = end;
    }
}


export class DayDuration {
    constructor(durationDays){
        this.durationDays = durationDays;
    }
}
