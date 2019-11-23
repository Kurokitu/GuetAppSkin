

export class GUETException extends Error {}


export class CookieInvalidException extends GUETException {}


export class UnknownException extends GUETException {
    constructor(reason){
        super();
        this.reason = reason;
    }
}

export default {
    CookieInvalidException,
    UnknownException
};
