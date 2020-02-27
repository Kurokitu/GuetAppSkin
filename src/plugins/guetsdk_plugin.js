import { GUETClient } from "@/plugins/guetsdk";


class ValueHolder {
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


export const ClientHolder = new ValueHolder(new GUETClient());


export class GUETPlugin {
    install(Vue){
        Vue.prototype.$guet = (value) => {
            if (value !== undefined || value !== null){
                ClientHolder.value = value;
            }
            return ClientHolder.value;
        };
    }
}
