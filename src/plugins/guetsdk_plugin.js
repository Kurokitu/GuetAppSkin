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

/* This is a plugin for Vue.
* It can inject a function $guet into Vue instances automatically.
* ## How to
* - All vue instance will contain $guet field
* - If call this function with no argument, it will return current client.
* - If call this function with one argument, it will set the argument to be the current client, then return it.
* For example:
* ````
* methods: {
*   login(){
*     this.$guet().login(this.username,this.password).then((result) => ...);
*   },
*   switchUser(){
*     queryUserById(this.selectedUserId).then((localUser) => this.$guet(localUser.asClient()));
*   }
* }
* ````
*/
export class GUETPlugin {
    install(Vue){
        Vue.prototype.$guet = function(value) {
            if (value !== undefined || (value !== undefined && value !== null)){
                ClientHolder.value = value;
            }
            return ClientHolder.value;
        };
    }
}
