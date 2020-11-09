import { string, object, ref } from 'yup'
import { VALIDATION_MESSAGES } from './validationMessages'

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/gi
const stringRegex = /^[^\s|!@\\#\\$%\\^&\\*\\(\\)\\-\\=\\_\\+\\~\\`\\0-9\\:\\;\\"\\'\\,\\.\\/\\<\\>\\?\\{\\}\\[\]]+[A-z0-9]*((\s|-|`)*[_A-z0-9])*$/g
const stringLimit = 50
const passwordMin = 6

const USER_NAME = string()
  .required(VALIDATION_MESSAGES.USER_NAME.REQUIRED)
  .matches(stringRegex, VALIDATION_MESSAGES.USER_NAME.VALID)
  .max(stringLimit, VALIDATION_MESSAGES.MAX_LIMIT(stringLimit))

const EMAIL = string()
  .required(VALIDATION_MESSAGES.EMAIL.REQUIRED)
  .matches(emailRegex, VALIDATION_MESSAGES.EMAIL.VALID)
  .max(stringLimit, VALIDATION_MESSAGES.MAX_LIMIT(stringLimit))

const PASSWORD = string()
  .required(VALIDATION_MESSAGES.PASSWORD.REQUIRED)
  .min(passwordMin, VALIDATION_MESSAGES.MIN_LIMIT(passwordMin))

const PASSWORD_CONFIRMATION = string()
  .required(VALIDATION_MESSAGES.PASSWORD_CONFIRMATION.REQUIRED)
  .oneOf(
    [ref('password'), 'null'],
    VALIDATION_MESSAGES.PASSWORD_CONFIRMATION.VALID,
  )

export const REGISTER_VALIDATION_SCHEMA = object().shape({
  username: USER_NAME,
  email: EMAIL,
  password: PASSWORD,
  passwordConfirmation: PASSWORD_CONFIRMATION,
})

export const LOGIN_VALIDATION_SCHEMA = object().shape({
  email: EMAIL,
  password: PASSWORD,
})
