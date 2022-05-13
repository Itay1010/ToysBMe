import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import monitorReducersEnhancer from './enhancers/monitor-reducers'
import {logger} from './middleware/logger'
import {rootReducer} from './root.reducer'
// import {initialState} from './store/initial-state'


export default function configureStore(preloadedState) {
    const middlewares = [logger, thunkMiddleware]
    const middlewareEnhancer = applyMiddleware(...middlewares)

    const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
    // const composedEnhancers = compose(...enhancers)
    const composedEnhancers = composeWithDevTools(...enhancers)

    const store = createStore(rootReducer, preloadedState, composedEnhancers)

    return store
}