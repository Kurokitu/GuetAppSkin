import { Db } from 'zangodb';

export const db = new Db("guet",{
    config: ['key', 'type']
});

export default {
    db,
};
