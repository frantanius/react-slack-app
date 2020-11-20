import firebase from 'shared/firebase'
import { takeLatest, call, put, all } from 'redux-saga/effects'
import { loginSuccess, loginFailure } from 'shared/actions/user'
import { userTypes } from 'shared/constants'

function* fetchUserLogin({ email, password }) {
  try {
    const { user } = yield firebase
      .auth()
      .signInWithEmailAndPassword(email, password)

    yield put(loginSuccess(user))
  } catch (error) {
    yield put(loginFailure(error))
  }
}

function* getSelectedUser() {
  yield takeLatest(userTypes.LOGIN_REQUEST, fetchUserLogin)
}

export default function* root() {
  yield all([call(getSelectedUser)])
}
