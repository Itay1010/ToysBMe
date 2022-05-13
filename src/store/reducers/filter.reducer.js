
export function filterReducer(state = {
    filterBy: {
        txt: '',
        inStock: null,
        label: []
    }
}, action = {}) {
    switch (action.type) {
        case 'SET_FILTER':
            return { ...state, filterBy: action.filterBy }
        case 'SET_PAGE':
            const { pageIdx } = action
            return { ...state, filterBy: { ...state.filterBy, pageIdx } }
        default:
            return state
    }
}