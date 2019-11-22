import client from './client';
import structs from './structures';
import errors from './errors';

export default {
    ...client,
    ...structs,
    ...errors,
}
