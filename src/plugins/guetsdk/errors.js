
export class GUETException extends Error {}


export class CookieInvalidException extends GUETException {}


export class UnknownException extends GUETException {
    constructor(reason){
        super();
        this.reason = reason;
    }
}

export class Retry extends GUETException {
    constructor(message, operation, remainTimes, error){
        super(message);
        this.operation = operation;
        this.remainTimes = remainTimes;
        this.error = error;
    }

    async retry(client){
        let result, err;
        if(this.remainTimes > 0){
            try {
                result = await this.operation(client);
            } catch(e) {
                this.copyNew().retry();
                err = e;
            }
        } else {
            if (this.error){
                throw this.error;
            } else if (err){
                throw err;
            }
        }
        return result;
    }

    copyNew(){
        return new Retry(
            this.message,
            this.operation,
            this.remainTimes-1,
            this.error,
        )
    }
}

export default {
    CookieInvalidException,
    UnknownException,
    Retry,
};
