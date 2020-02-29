import { Db } from 'zangodb';

export const db = new Db("guet",{
    config: ['key', 'type'],
    plugins: ['id'],
});

export default {
    db,
};
