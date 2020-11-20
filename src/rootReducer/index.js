import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'
import { userReducer as user } from 'shared/reducers/user'

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user,
  })

export default rootReducer
