
let isRuenYear = (year) => {
    return ((year % 4) == 0) && ((year % 400) != 0);
};

let getDayCountsOfMouth = (year) => {
    return [31,isRuenYear(year)?29:28,31,30,31,30,31,31,30,31,30,31];
};

let getDayCountsOf = (year, mo) => {
    return getDayCountsOfMouth(year)[mo-1];
};

let isCorrectMonth = mo => (mo > 0) && (mo <= 12);

class YearNotSupported extends Error {}

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
                }
                this.month = newMo;
                this.day = newDay;
            }
        }
    }
}
