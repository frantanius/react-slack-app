import { createStore, applyMiddleware, compose } from 'redux'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import rootSaga from 'rootSaga'
import rootReducer from 'rootReducer'

const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

export default () => {
  const store = createStore(
    rootReducer(history),
    compose(applyMiddleware(routerMiddleware(history), ...middlewares)),
  )

  sagaMiddleware.run(rootSaga)

  return { history, store }
}
