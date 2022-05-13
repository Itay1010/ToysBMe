
export function setFilter({ checked, value, field }) {
    return (dispatch, getState) => {
        const filterBy = getState().filterModule.filterBy
        if (checked !== undefined && field !== 'txt') {
            value = checked ? [...filterBy.label, value] : filterBy.label.filter(label => label !== value)
        }
        const newFilter = { ...filterBy, [field]: value }
        const action = {
            type: 'UPDATE_FILTER',
            filterBy: newFilter
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