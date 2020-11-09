import React from 'react'
import cx from 'classnames'
import firebase from 'shared/firebase'
import md5 from 'md5'
import { Link } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { REGISTER_VALIDATION_SCHEMA } from 'shared/utils/validationSchema'
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from 'semantic-ui-react'
import styles from './styles.module.scss'

const Register = () => {
  const { handleSubmit, errors, control } = useForm({
    resolver: yupResolver(REGISTER_VALIDATION_SCHEMA),
  })

  const onSubmit = ({ username, email, password }) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((newUser) => {
        newUser.user
          .updateProfile({
            displayName: username,
            photoURL: `http://gravatar.com/avatar/${md5(email)}?d=identicon`,
          })
          .then(() => {
            // storing to the database
            firebase.database().ref('users').child(newUser.user.uid).set({
              name: newUser.user.displayName,
              avatar: newUser.user.photoURL,
            })
          })
          .catch((error) => console.log('error update profile', error))
      })
      .catch((error) => console.log('error', error))
  }

  const { username, email, password, passwordConfirmation } = errors

  return (
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" iconcolor="orange" textAlign="center">
          <Icon name="puzzle piece" color="orange" />
          Register for DevChat
        </Header>
        <Form size="large" onSubmit={handleSubmit(onSubmit)}>
          <Segment stacked>
            <Controller
              as={Form.Input}
              control={control}
              className={cx({ error: username })}
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="Username"
              type="text"
              defaultValue=""
            />
            {username && (
              <span className={styles.errorMessage}>{username?.message}</span>
            )}
            <Controller
              as={Form.Input}
              control={control}
              className={cx({ error: email })}
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email"
              type="email"
              defaultValue=""
            />
            {email && (
              <span className={styles.errorMessage}>{email?.message}</span>
            )}
            <Controller
              as={Form.Input}
              control={control}
              className={cx({ error: password })}
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              defaultValue=""
            />
            {password && (
              <span className={styles.errorMessage}>{password?.message}</span>
            )}
            <Controller
              as={Form.Input}
              control={control}
              className={cx({ error: passwordConfirmation })}
              name="passwordConfirmation"
              icon="repeat"
              iconPosition="left"
              placeholder="Password Confirmation"
              type="password"
              defaultValue=""
            />
            {passwordConfirmation && (
              <span className={styles.errorMessage}>
                {passwordConfirmation?.message}
              </span>
            )}
            <Button color="orange" size="large" type="submit" fluid>
              Submit
            </Button>
          </Segment>
        </Form>
        <Message>
          Already a user ? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export default Register
