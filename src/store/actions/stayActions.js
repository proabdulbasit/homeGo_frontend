import { stayService } from '../../services/stay-service'

export function loadStays(trip = { guests: { adults: 1, kids: 0 }, loc: { address: '' }, time: { checkIn: '', checkOut: '' } }) {
  return async dispatch => {
    try {
      const stays = await stayService.query(trip)
      dispatch({ type: 'SET_STAYS', stays })
    } catch (err) {
      console.log('StayActions: err in loadStays', err)
    }
  }
}

export function addStay(stay) {
  return async dispatch => {
    try {
      const addedStay = await stayService.add(stay)
      dispatch({ type: 'ADD_STAY', stay: addedStay })
    } catch (err) {
      console.log('StayActions: err in addStay', err)
    }
  }
}

export function updateStay(stay) {
  return async dispatch => {
    try {
      const updatedStay = await stayService.update(stay)
      dispatch({ type: 'UPDATE_STAY', stay: updatedStay })
    } catch (err) {
      console.log('StayActions: err in update Stay', err)
    }
  }
}

export function removeStay(stayId) {
  return async dispatch => {
    try {
      await stayService.remove(stayId)
      dispatch({ type: 'REMOVE_STAY', stayId })
    } catch (err) {
      console.log('StayActions: err in removeStay', err)
    }
  }
}

export function loadHostStays(hostId) {
  return async dispatch => {
    try {
      const stays = await stayService.getHostStays(hostId)
      dispatch({ type: 'SET_HOST_STAYS', stays })
    } catch (err) {
      console.log('StayActions: err in loadHostStays', err)
    }
  }
}
export function loadWishlist(user) {
  return async dispatch => {
    try {
      const stays = await stayService.getUserWishlist(user)
      dispatch({ type: 'SET_WISH_STAYS', stays })
    } catch (err) {
      console.log('StayActions: err in loadWishlist', err)
    }
  }
}