import {filter} from 'stream-lite/es/operators'

export const ofType = (...types) => stream =>
  stream.pipe(filter(x => types.indexOf(x.type) !== -1))
