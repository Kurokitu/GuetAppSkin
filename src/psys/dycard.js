import { Plugin, Service } from './psys';

export const CARDMANAGER_SERVICE = "guet.psys.card_manager_service";

export class Card {
    constructor({name, component}){
        this.name = name;
        this.component = component;
        this.description = null;
    }
}

export class CardManager extends Service {
    constructor(){
        super();
        this.cards = [];
    }

    push(card){
        this.card.push(card);
    }
}

export class DynamicCardPlugin extends Plugin {
    constructor(){
        super();
        this.pluginMainfest({
            name: "DynamicCardPlugin",
            packageName: "guet.psys.dynamic_card_plugin",
            version: 1,
        });
        this.cardManager = new CardManager();
    }

    /* eslint-disable-next-line */
    async body(entry){
        this.addService(CARDMANAGER_SERVICE,() => this.cardManager);
    }
}
