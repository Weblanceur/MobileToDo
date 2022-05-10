import { CHANGE_SCREEN, State } from '../types'

const handlers: any = {
  [CHANGE_SCREEN]: (state: State, payload: string | null) => payload,
  DEFAULT: (state: State) => state
}

export const screenReducer = (state: State | null, action: any) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action.payload)
}