/* eslint-disable prettier/prettier */
import { all, call } from 'redux-saga/effects'
import userSaga from 'shared/sagas/user'

export default function* rootSaga() {
  yield all([
    call(userSaga), 
  ])
}
