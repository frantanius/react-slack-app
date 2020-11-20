import firebase from 'shared/firebase'
import md5 from 'md5'
import { takeLatest, call, put, all } from 'redux-saga/effects'
import {
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
} from 'shared/actions/user'
import { userTypes } from 'shared/constants'

function* fetchLogin({ email, password }) {
  try {
    const { user } = yield firebase
      .auth()
      .signInWithEmailAndPassword(email, password)

    yield put(loginSuccess(user))
  } catch (error) {
    yield put(loginFailure(error))
  }
}

function* fetchRegister({ username, email, password }) {
  try {
    //register user
    const { user } = yield firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)

    //then update profile
    user.updateProfile({
      displayName: username,
      photoURL: `http://gravatar.com/avatar/${md5(email)}?d=identicon`,
    })

    // then storing to the database
    yield firebase.database().ref('users').child(user.uid).set({
      name: user.displayName,
      avatar: user.photoURL,
    })

    yield put(registerSuccess(user))
  } catch (error) {
    yield put(registerFailure(error))
  }
}

function* getUserLogin() {
  yield takeLatest(userTypes.LOGIN_REQUEST, fetchLogin)
}

function* getUserRegister() {
  yield takeLatest(userTypes.REGISTER_REQUEST, fetchRegister)
}

export default function* root() {
  yield all([call(getUserLogin), call(getUserRegister)])
}
