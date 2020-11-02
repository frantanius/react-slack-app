import React from 'react'
import firebase from 'shared/firebase'
import { useForm, Controller } from 'react-hook-form'
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
  const { control, handleSubmit } = useForm()

  const onSubmit = (data) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((user) => {
        console.log('user', user)
      })
      .catch((error) => console.log('error', error))
  }

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
              as={Form.Input}
              defaultValue=""
              fluid
              control={control}
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="Username"
              type="text"
            />
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
            />
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
            />
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
            />
            <Button color="orange" size="large" type="submit" fluid>
              Submit
            </Button>
          </Segment>
        </Form>
        <Message>
          Already a user? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export default Register
