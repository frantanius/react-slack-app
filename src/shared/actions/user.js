import { userTypes } from 'shared/constants'

const loginRequest = (email, password) => ({
  type: userTypes.LOGIN_REQUEST,
  email,
  password,
})

const loginSuccess = (payload) => ({
  type: userTypes.LOGIN_SUCCESS,
  payload,
})

const loginFailure = (errorMessage) => ({
  type: userTypes.LOGIN_FAILURE,
  payload: errorMessage,
})

export { loginRequest, loginSuccess, loginFailure }
