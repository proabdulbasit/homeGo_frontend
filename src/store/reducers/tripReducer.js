let localInitialState = { guests: { adults: 1, kids: 0, baby: 0 }, loc: { address: '' }, time: { checkIn: '', checkOut: '' } }
if (localStorage.trip) localInitialState = JSON.parse(localStorage.trip)

const initialState = {
  trip: localInitialState
}

export function tripReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_TRIP':
      return { trip: action.trip }
    case 'ADD_TRIP':
      return { ...state, stays: [...state.stays, action.stay] }
    case 'REMOVE_TRIP':
      return { trip: null }
    default:
      return state
  }
}
