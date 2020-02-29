export * from './psys';
export * from './dycard';

import { PluginSystem, PType_BuiltIn } from './psys';
import { DynamicCardPlugin } from './dycard';

export const Psys = new PluginSystem();

let dycardPlugin = new DynamicCardPlugin();
Psys.addPlugin(dycardPlugin, {
    id: "394f2ca5-459f-4fd4-bf0d-72f0bc688d33",
    type: PType_BuiltIn,
});
