export interface InitialState {
  isMale: null | boolean;
  weight: null | number;
  ml: null | number;
  abv: null | number;
  time: null | number;
}

export const initialState: InitialState = {
  isMale: null,
  weight: null,
  ml: null,
  abv: null,
  time: null,
}

export function stateReducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case 'UPDATE-IS-MALE':
      return { ...state, isMale: action.payload }
    case 'UPDATE-WEIGHT':
      if (action.payload === "") {
        return { ...state, weight: null }
      } else {
        return { ...state, weight: Number(action.payload) }
      }
    case 'UPDATE-ML':
      if (action.payload === "") {
        return { ...state, ml: null }
      } else {
        return { ...state, ml: Number(action.payload) }
      }
    case 'UPDATE-ABV':
      if (action.payload === "") {
        return { ...state, abv: null }
      } else {
        return { ...state, abv: Number(action.payload) }
      }
    case 'UPDATE-TIME':
      if (action.payload === "") {
        return { ...state, time: null }
      } else {
        return { ...state, time: Number(action.payload) }
      }
    case 'USE-LOCAL-STATE':
      return JSON.parse(action.payload) // as typeof initialState
    default:
      return state
      throw new Error("bad action type")
  }
}

export type ACTIONTYPE = | { type: 'UPDATE-IS-MALE', payload: boolean }
  | { type: 'UPDATE-WEIGHT', payload: string }
  | { type: 'UPDATE-ML', payload: string }
  | { type: 'UPDATE-ABV', payload: string }
  | { type: 'UPDATE-TIME', payload: string }
  | { type: 'USE-LOCAL-STATE', payload: string }

