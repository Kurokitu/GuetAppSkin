

class GUETException extends Error {}


class CookieInvalidException extends GUETException {}


class UnknownException extends GUETException {
    constructor(reason){
        super();
        this.reason = reason;
    }
}

export default {
    CookieInvalidException,
    UnknownException
};
