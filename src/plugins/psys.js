import { Psys, CARDMANAGER_SERVICE } from '@/psys';

export class VuePsysPlugin {
    install(Vue){
        Vue.prototype.$psys = Psys;
    }
}

export class VueDynamicCardPlugin {
    install(Vue){
        Vue.prototype.$cardManager = function(){
            return Psys.findService(
                Psys.rootEntry,
                CARDMANAGER_SERVICE,
            );
        }
    }
}
