import { toyService } from "../../services/toy.service.js";

export function loadToys() {
  return dispatch => {
    return toyService.query()
      .then(toys => {
        console.log('loading toys');
        const action = {
          type: 'SET_TOYS',
          toys
        }
        dispatch(action)
      })
      .catch(err => {
        console.error('Error:', err)
      })
  }
}

export function saveToy(toy) { // Action Creator
  return dispatch => {
    const actionType = (toy._id) ? 'UPDATE_TOY' : 'ADD_TOY'
    toyService.save(toy)
      .then(savedToy => {
        dispatch({ type: actionType, toy: savedToy })
      })
      .catch(err => {
        console.error('Error:', err)
      })
  }
}

export function editToy(toy) {
  return dispatch => {
    toyService.save(toy)
      .then(savedToy => {
        console.log('updated Toy:', savedToy);
        const action = {
          type: 'UPDATE_TOY',
          toy: savedToy
        }
        dispatch(action)
      })
  }
}

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