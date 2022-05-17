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
  if (toy.reviews) delete toy.reviews
  return async (dispatch) => {
    const action = (toy._id) ? getActionUpdateToy(toy) : getActionAddToy(toy)
    console.log('saving')
    try {
      const savedToy = await toyService.save(toy)
      dispatch(action)
      showSuccessMsg(toy._id ? 'Updated toy' : 'Toy added')
      return savedToy
    } catch (err) {
      console.error('Error:', err)
      showErrorMsg('Cannot save toy')
      throw err
    }
  }
}

// export function editToy(toy) {
//   return dispatch => {
//     toyService.save(toy)
//       .then(savedToy => {
//         console.log('updated Toy:', savedToy);
//         const action = {
//           type: 'UPDATE_TOY',
//           toy: savedToy
//         }
//         dispatch(action)
//       })
//   }
// }

export function deleteToy(toyId) {
  return dispatch => {
    toyService.remove(toyId)
      .then(() => {
        dispatch({
          type: 'REMOVE_TOY',
          toyId
        })
      })
      .catch(err => console.error(err))
  }
}