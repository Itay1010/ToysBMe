import { showSuccessMsg, showErrorMsg } from "../../services/event-bus.service.js";
import { toyService } from "../../services/toy.service.js";

export function getActionRemoveToy(toyId) {
  return {
    type: 'REMOVE_TOY',
    toyId
  }
}
export function getActionAddToy(toy) {
  return {
    type: 'ADD_TOY',
    toy
  }
}
export function getActionUpdateToy(toy) {
  return {
    type: 'UPDATE_TOY',
    toy
  }
}

export function loadToys() {
  return async (dispatch, getState) => {
    try {
      const toys = await toyService.query(getState().filterModule.filterBy)
      console.log('loading toys', toys)
      const action = {
        type: 'SET_TOYS',
        toys
      }
      dispatch(action)
    } catch (err) {
      console.error('Error:', err)
      return err
    }


  }
}

export function saveToy(toy) { // Action Creator
  console.log('saveToy - toy', toy)
  if (toy.reviews) delete toy.reviews
  console.log('saveToy - toy', toy)
  return async (dispatch) => {
    const action = (toy._id) ? getActionUpdateToy(toy) : getActionAddToy(toy)
    console.log('saving')
    try {
      const savedToy = await toyService.save(toy)
      // dispatch(action)
      showSuccessMsg(toy._id ? 'Updated toy' : 'Toy added')
      return savedToy
    } catch (err) {
      console.error('Error:', err)
      showErrorMsg('Cannot save toy')
      throw err
    }
  }
}

export function deleteToy(toyId) {
  return async dispatch => {
    dispatch(getActionRemoveToy(toyId))
    try {
      const res = await toyService.remove(toyId)
      return res
    } catch (err) {
      try {
        const toyToRenew = await toyService.getById(toyId)
        dispatch(getActionAddToy(toyToRenew))
      } catch (nestedErr) {
        console.log(nestedErr)
      }

      console.log(err)
      throw err
    }
  }
}