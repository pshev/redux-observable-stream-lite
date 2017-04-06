import 'stream-lite/add/operators/filter'
import 'stream-lite/add/operators/switchMap'
import Stream from 'stream-lite'

export function createEpicMiddleware(epic, options = {}) {
  const epic$ = Stream.create()
  const action$ = Stream.create()

  action$.ofType = type => action$.filter(action => action.type === type)

  let store
  const epicMiddleware = _store => {
    store = _store
    return next => {
      epic$
        .switchMap(epic => epic(action$, store, options.dependencies))
        .subscribe(store.dispatch)

      epic$.next(epic)

      return action => {
        const result = next(action)
        action$.next(action)
        return result
      }
    }
  }

  epicMiddleware.replaceEpic = epic => {
    // gives the previous root Epic a last chance to do some clean up
    store.dispatch({type: 'EPIC_END'})
    // switches to the new root Epic, synchronously terminating the previous one
    epic$.next(epic)
  }

  return epicMiddleware
}
