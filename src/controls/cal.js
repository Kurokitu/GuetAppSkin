import { zango } from 'zangodb';


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


export class CalEventDescriptorBase {
    constructor(type, time){
        this.type = type;
        this.time = time;
    }

    toJson(){
        return {
            type: this.type,
            time: this.time,
        };
    }
}


export class CalEventRepeator {
    constructor(type, repeatPattern){
        this.type = type;
        if (type == "manual"){
            let { nextTargets } = repeatPattern; 
            this.nextTargets = nextTargets;
            this.once = nextTargets.length == 1;
        } else if (type == "once"){
            this.target = repeatPattern.target;
            this.once = true;
        }
    }

    toJson(){
        return {
            type: this.type,
            once: this.once,
            nextTargets: this.nextTargets,
            target: this.target,
        };
    }

    static manual(targets){
        return new CalEventRepeator("manual",{
            nextTargets: targets
        });
    }

    static once(target){
        return new CalEventRepeator("once", {
            target: target
        });
    }

    queryNextEventOf(date, count){
        count = count != undefined ? count : 1;
        let result = [];
        if (this.type == "once" && this.target >= date){
            result.push(this.target);
        } else if (this.type == "manual"){
            let gotEvents = 0;
            for (let e of this.nextTargets){
                if (e > date){
                    result.push(e);
                    gotEvents++;
                }
                if (gotEvents >= count) break;
            }
        }
        return result;
    }

    queryEventsInRangeOf(startDate, endDate){
        let result = [];
        if (this.type == "once" && (this.target >= startDate && this.target <= endDate)){
            result.push(this.target);
        } else if (this.type == "manual"){
            for (let e of this.nextTargets){
                if (e >= startDate && e <= endDate){
                    result.push(e);
                }
            }
        }
        return result;
    }
}


class CalEventCache {
    constructor(cacheCollection){
        this.caches = cacheCollection;
    }

    cache(event, startDate, endDate){
        let events = event.queryEventsInRangeOf(startDate, endDate);
        return this.caches.insert(events.map((value) => {
            let evObject = event.toJson();
            evObject.date = value.value;
            return evObject;
        }));
    }
}


export class CalEvent {
    constructor(name, descriptor, repeator){
        this.name = name;
        this.descriptor = descriptor;
        this.repeator = repeator;
    }

    queryNextEventOf(date, count){
        return this.repeator.queryNextEventOf(date, count);
    }

    typeOf(descriptorType){
        return this.descriptor.type == descriptorType;
    }

    queryEventsInRangeOf(startDate, endDate){
        return this.repeator.queryEventsInRangeOf(startDate, endDate);
    }

    toJson(){
        return {
            name: this.name,
            descriptor: this.descriptor.toJson(),
            repeator: this.repeator.toJson(),
        };
    }
}


export class Cal {
    constructor({eventCollectionName = 'cal-events', cacheCollectionName = 'cal-event-caches'}){
        this.events = zango.collection(eventCollectionName);
        this.eventCachesCollection = zango.collection(cacheCollectionName);
        this.caches = new CalEventCache(this.eventCachesCollection);
    }
}
