
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

export class YearNotSupported extends Error {}

export class Day {
    constructor(year, month, day){
        this.year = year;
        this.month = month;
        this.day = day;
    }

    isDataRight(){
        if (this.year <= 1753){
            throw new YearNotSupported(`Could not support year which less than 1753, now ${this.year}`);
        }
        if (isCorrectMonth(this.month)){
            if (this.day > 0 && this.day <= getDayCountsOf(this.year, this.month)){
                return true;
            }
        }
        return false;
    }

    handleData(){
        if (isCorrectMonth(this.month)){
            if (this.day < 0){
                let newMo = this.month - 1;
                let newDay;
                if (isCorrectMonth(newMo)){
                    newDay = getDayCountsOf(this.year, this.mo) + this.day;
                } else {
                    let newYear = this.year - 1;
                    newMo = 12;
                    this.year = newYear;
                    newDay = getDayCountsOf(newYear, newMo) + this.day;
                }
                this.month = newMo;
                this.day = newDay;
            } else if (this.day > getDayCountsOf(this.year, this.mo)){
                let newMo = this.month + 1;
                let newDay;
                if (isCorrectMonth(newMo)){
                    newDay = getDayCountsOf(this.year, newMo) - this.day;
                } else {
                    let newYear = this.year + 1;
                    newMo = 1;
                    this.year = newYear;
                    newDay = getDayCountsOf(newYear, newMo) - this.day;
                }
                this.month = newMo;
                this.day = newDay;
            }
        } else {
            if (this.month <= 0){
                let newYear = this.year - 1;
                let newMonth = 12 + this.month;
                this.year = newYear;
                this.month = newMonth;
            } else if (this.month > 12){
                let newYear = this.year + 1;
                let newMonth = this.month - 12;
                this.year = newYear;
                this.month = newMonth;
            }
        }
        if (!this.isDataRight()){
            this.handleData();
        }
    }

    clone(){
        return new Day(
            this.year,
            this.month,
            this.day
        );
    }

    plus(duration){
        let ins = this.clone();
        ins.day += duration.durationDays;
        if(!ins.isDataRight()) ins.handleData();
        return ins;
    }

    subs(duration){
        let ins = this.clone();
        ins.day -= duration.durationDays;
        if(!ins.isDataRight()) ins.handleData();
        return ins;
    }
}


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
