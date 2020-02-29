import { db } from '@/db';
import { v4 as uuidv4 } from 'uuid';

export const PStatus_RUN = 0;
export const PStatus_PREPAREING = 1;
export const PStatus_DIED = 2;
export const PStatus_UPDATING = 3;

export const PType_BuiltIn = 0;
export const PType_External = 1;

const pluginc = db.collection("plugins");

export class ServiceHadExistsError extends Error {
    constructor(serviceName, requestedEntry){
        super(`Plugin ${requestedEntry.pluginId} requested to add service ${name}, but it had exists`);
        this.serviceName = serviceName;
        this.requestedEntry = requestedEntry;
    }
}

export class Service {}

export class PluginSystem {
    constructor(){
        this.plugins = [];
        this.services = new Map(); // String: [Entry, Service(Any)]
        this.rootId = uuidv4();
    }

    async addPlugin(plugin, entryConfig){
        let entry = new PluginEntry({
            ...entryConfig,
            system: this,
        });
        this.plugins.push(entry);
        let oldPluginInfoDoc = await pluginc.findOne({
            id: entryConfig.id
        });
        let updateInfoFlag = false;
        if (!oldPluginInfoDoc){
            await plugin.hookInstall(entry);
        } else if(oldPluginInfoDoc.version < plugin.version){
            await plugin.hookUpdate(
                entry,
                oldPluginInfoDoc.version,
                plugin.version
            );
        }
        if (updateInfoFlag){
            entry.status = PStatus_UPDATING;
            let changeSet = {
                id: plugin.id,
                name: plugin.name,
                version: plugin.version,
            };
            if (!oldPluginInfoDoc){
                await pluginc.insert(changeSet);
            } else {
                await pluginc.update({ id: plugin.id }, changeSet);
            }
        }
        entry.status = PStatus_PREPAREING;
        await plugin.body(entry).then(() => entry.status = PStatus_RUN);
    }

    addService(entry, name, service){
        if(!this.services.has(name)){
            this.services.set(name, [entry,service]);
        } else throw new ServiceHadExistsError(name,entry);
    }

    findService(entry, name){
        return this.services.get(name)(entry);
    }

    get rootEntry() {
        return new PluginEntry({
            pluginId: this.rootId,
            type: PType_BuiltIn,
            system: this
        });
    }
}

export class PluginEntry {
    constructor({
        pluginId,
        type,
        system,
    }){
        this.pluginId = pluginId;
        this.type = type;
        this.status = PStatus_PREPAREING;
        this.system = system;
    }

    addService(name, service){
        this.system.addService(this, name, service);
    }

    service(name){
        return this.system.findService(this,name);
    }
}

export class Plugin {
    /// @param entry: PluginEntry
    /// @return Promise
    /* eslint-disable-next-line */
    async body(entry){}

    ///
    pluginMainfest({
        name,
        packageName
    }){
        this.name = name;
        this.packageName = packageName;
    }

    async hookInstall(entry){}
    async hookUpdate(entry,oldVersion,newVersion){}
}
