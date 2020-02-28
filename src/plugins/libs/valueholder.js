
export class ValueHolder {
    constructor(initalValue){
        this._value = initalValue;
    }

    get value(){
        return this._value;
    }

    set value(v){
        this._value = v;
    }
}

export default {
    ValueHolder,
};
