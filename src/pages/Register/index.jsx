import React from 'react'
import firebase from 'shared/firebase'
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
import { Link } from 'react-router-dom'

const Register = () => {
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(REGISTER_VALIDATION_SCHEMA),
  })

  const onSubmit = ({ email, password }) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log('user', user)
      })
      .catch((error) => console.log('error', error))
  }

  const { username, email, password, passwordConfirmation } = errors

  return (
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" iconcolor="orange" textAlign="center">
          <Icon name="puzzle piece" color="orange" />
          Register for DevChat
        </Header>
        <Form size="large" onSubmit={handleSubmit(onSubmit)}>
          <Segment stacked>
            <Controller
              fluid
              as={Form.Input}
              defaultValue=""
              control={control}
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="Username"
              type="text"
              className={username && 'error'}
            />
            <span>{username && username.message}</span>
            <Controller
              as={Form.Input}
              fluid
              control={control}
              defaultValue=""
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email"
              type="email"
              className={email && 'error'}
            />
            <span>{email && email.message}</span>
            <Controller
              as={Form.Input}
              fluid
              control={control}
              defaultValue=""
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              className={password && 'error'}
            />
            <span>{password && password.message}</span>
            <Controller
              as={Form.Input}
              fluid
              control={control}
              defaultValue=""
              name="passwordConfirmation"
              icon="repeat"
              iconPosition="left"
              placeholder="Password confirmation"
              type="password"
              className={passwordConfirmation && 'error'}
            />
            <span>{passwordConfirmation && passwordConfirmation.message}</span>
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
