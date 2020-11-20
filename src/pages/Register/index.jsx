import { useEffect, useCallback } from 'react'
import cx from 'classnames'
import { registerRequest } from 'shared/actions/user'
import { userCollection } from 'shared/reducers/user'
import { useSelector, useDispatch } from 'react-redux'
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
  const dispatch = useDispatch()
  const { errorMessage, isLoading } = useSelector(userCollection)

  const { handleSubmit, setError, errors, control } = useForm({
    resolver: yupResolver(REGISTER_VALIDATION_SCHEMA),
  })

  const onSubmit = ({ username, email, password }) => {
    dispatch(registerRequest(username, email, password))
  }

  const checkIsError = useCallback(() => {
    if (!errorMessage) return
    const { code, message } = errorMessage

    const content = {
      ['auth/email-already-in-use']: {
        name: 'email',
        message,
      },
    }[code]

    setError(content.name, {
      type: 'manual',
      message: content.message,
    })
  }, [errorMessage, setError])

  useEffect(() => {
    checkIsError()
  }, [checkIsError])

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
            <Button
              className={cx({ loading: isLoading })}
              color="orange"
              size="large"
              type="submit"
              fluid
            >
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
