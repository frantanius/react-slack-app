import React from 'react'
import { Controller } from 'react-hook-form'
import { useForm } from 'react-hook-form'
// import PropTypes from 'prop-types'
import cx from 'classnames'
import { Input } from 'semantic-ui-react'
import styles from './styles.module.scss'

const Inputs = ({
  className,
  placeholder,
  icon,
  type,
  error,
  ...otherProps
}) => {
  const { control } = useForm()
  return (
    <>
      <Controller
        as={Input}
        defaultValue=""
        // fluid
        className={cx({ [styles.error]: className }, styles.customInput)}
        // name={name}
        name="email"
        type={type}
        placeholder={placeholder}
        icon={icon}
        control={control}
        // iconPosition="left"
        {...otherProps}
      />
      {error && <span className={styles.errorMessage}>{error?.message}</span>}
    </>
  )
}

export default Inputs

// Inputs.propTypes = {
//   className: PropTypes.string,
//   // name: PropTypes.string.isRequired,
//   placeholder: PropTypes.string,
//   icon: PropTypes.string.isRequired,
//   type: PropTypes.string.isRequired,
//   error: PropTypes.object,
//   otherProps: PropTypes.node,
// }
