// import { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
// import { useHistory } from 'react-router-dom'
// import firebase from 'shared/firebase'
import Login from 'pages/Login'
import Register from 'pages/Register'

const Routes = () => {
  // const history = useHistory()

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       history.push('/')
  //     } else {
  //       history.push('/login')
  //     }
  //   })
  // }, [history])

  return (
    <Switch>
      <Route exact path="/" component={() => <div> Home</div>} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  )
}

export default Routes
