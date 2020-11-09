import React from 'react'
import cx from 'classnames'
import firebase from 'shared/firebase'
import { Link } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LOGIN_VALIDATION_SCHEMA } from 'shared/utils/validationSchema'
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

const Login = () => {
  const { handleSubmit, setError, errors, control } = useForm({
    resolver: yupResolver(LOGIN_VALIDATION_SCHEMA),
  })

  const onSubmit = ({ email, password }) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log('user', user)
      })
      .catch(({ code, message }) => {
        const content = {
          ['auth/user-not-found']: {
            name: 'email',
            message,
          },
          ['auth/wrong-password']: {
            name: 'password',
            message,
          },
        }[code]

        setError(content.name, {
          type: 'manual',
          message: content.message,
        })
      })
  }

  const { email, password } = errors

  return (
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" icon color="violet" textAlign="center">
          <Icon name="code branch" color="violet" />
          Login to DevChat
        </Header>
        <Form size="large" onSubmit={handleSubmit(onSubmit)}>
          <Segment stacked>
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
            <Button color="violet" size="large" type="submit" fluid>
              Submit
            </Button>
          </Segment>
        </Form>
        <Message>
          Dont have an account ? <Link to="/register">Register</Link>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export default Login
