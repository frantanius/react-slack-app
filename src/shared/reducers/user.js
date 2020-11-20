import { createSelector } from 'reselect'
import { userTypes } from 'shared/constants'

const initalState = {
  payload: null,
  isLoading: false,
  isError: false,
  errorMessage: undefined,
}

const userReducer = (state = initalState, action) => {
  switch (action.type) {
    case userTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case userTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        payload: action.payload,
      }
    case userTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      }
    default:
      return state
  }
}

const selectUser = (state) => state.user
const userCollection = createSelector([selectUser], (user) => user)

export { userReducer, userCollection }
