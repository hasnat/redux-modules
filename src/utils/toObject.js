import { map, zipObject } from 'lodash';

export default function toObject(collection, keyIteratee, valueIteratee) {
  const keys = map(collection, keyIteratee);
  const values = map(collection, valueIteratee);
  return zipObject(keys, values);
}
