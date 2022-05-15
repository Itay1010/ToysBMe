import { toyService } from "../../services/toy.service.js";

export function loadToys() {
  return (dispatch, getState) => {
    return toyService.query(getState().filterModule.filterBy)
      .then(toys => {
        console.log('loading toys')
        const action = {
          type: 'SET_TOYS',
          toys
        }
        dispatch(action)
      })
      .then(res => {
        console.log(res)
        return res
      })
      .catch(err => {
        console.error('Error:', err)
        return err
      })
  }
}

export function saveToy(toy) { // Action Creator
  console.log('saving')
  return dispatch => {
    const actionType = (toy._id) ? 'UPDATE_TOY' : 'ADD_TOY'
    toyService.save(toy)
      .then(savedToy => {
        dispatch({ type: actionType, toy: savedToy })
        return savedToy
      })
      .catch(err => {
        console.error('Error:', err)
        throw err
      })
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