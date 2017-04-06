import 'stream-lite/add/operators/merge'
import Stream from 'stream-lite'

export const combineEpics = (...epics) => (...args) =>
  Stream.merge(...epics.map(epic => epic(...args)))
