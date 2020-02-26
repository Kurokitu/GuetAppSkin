import { GUETClient } from "@/plugins/guetsdk";


export class GUETPlugin {
    install(Vue){
        Vue.prototype.$guet = new GUETClient();
    }
}
