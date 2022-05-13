import { combineReducers } from 'redux'

import { filterReducer } from './reducers/filter.reducer.js'
import { toyReducer } from './reducers/toy.reducer.js'


export const rootReducer = combineReducers({
    filterModule: filterReducer,
    toyModule: toyReducer
})
