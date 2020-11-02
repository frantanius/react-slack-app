export const VALIDATION_MESSAGES = {
  MAX_LIMIT: (maxCharacters) =>
    `This field has a max limit of ${maxCharacters} characters.`,
  MIN_LIMIT: (minCharacters) =>
    `This field is too short, should be ${minCharacters} characters minimum.`,
  USER_NAME: {
    REQUIRED: 'Please enter a username',
    VALID: 'Please enter a valid username',
  },
  EMAIL: {
    REQUIRED: 'Please enter an email address',
    VALID: 'Please enter a valid email address',
  },
  PASSWORD: {
    REQUIRED: 'Please enter a password',
    VALID: 'Please enter a valid password',
  },
  PASSWORD_CONFIRMATION: {
    REQUIRED: 'Please enter a password confirmation',
    VALID: 'Password confirmation not matches',
  },
}
