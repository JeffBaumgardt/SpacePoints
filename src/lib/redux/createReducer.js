import createNextState from 'immer'

export function createReducer(initialState, actionsMap) {
  return function(state = initialState, action) {
    return createNextState(state, draft => {
      const caseReducer = actionsMap[action.type]
      return caseReducer ? caseReducer(draft, action) : undefined
    })
  }
}