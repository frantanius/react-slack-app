import { userTypes } from 'shared/constants'

// Login
export const loginRequest = (email, password) => ({
  type: userTypes.LOGIN_REQUEST,
  email,
  password,
})

export const loginSuccess = (payload) => ({
  type: userTypes.LOGIN_SUCCESS,
  payload,
})

export const loginFailure = (errorMessage) => ({
  type: userTypes.LOGIN_FAILURE,
  payload: errorMessage,
})

// Register
export const registerRequest = (username, email, password) => ({
  type: userTypes.REGISTER_REQUEST,
  username,
  email,
  password,
})

export const registerSuccess = (payload) => ({
  type: userTypes.REGISTER_SUCCESS,
  payload,
})

export const registerFailure = (errorMessage) => ({
  type: userTypes.REGISTER_FAILURE,
  payload: errorMessage,
})
