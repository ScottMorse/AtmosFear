import { createStore, compose } from 'redux'

import rootReducer from './reducers/index'

import { defaultShuttleRects } from './utils/utils'

const defaultState = {
    shuttle: {
        position: 0,
        rects: defaultShuttleRects
    },
    threats: []
}

export default createStore(rootReducer, defaultState)