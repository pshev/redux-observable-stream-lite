import {merge} from 'stream-lite/es/statics'

export const combineEpics = (...epics) => (...args) =>
  merge(...epics.map(epic => epic(...args)))
