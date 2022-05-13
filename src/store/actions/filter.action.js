
export function setFilter(data) {
    return dispatch => {
        const action = {
            type: 'UPDATE_FILTER',
            data
        }
        dispatch(action)
    }
}

export function changePage(pageIdx) {
    return dispatch => {
        dispatch(({
            type: 'SET_PAGE',
            pageIdx
        }))
    }
}