import React from 'react'
import { Form, Formik } from 'formik'
import { Link, useHistory } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client'

import { InputParamsType } from '../common/types/inputParams.type'
import {
  PasswordInputComponentRender,
  TextInputComponentRender,
} from '../common/utils/render/inputsRender.util'
import Button from '../components/UI/Button/Button.component'
import {
  isEmail,
  maxLengthCreator,
  required,
  onlyNumbers,
} from '../common/utils/validators/validators.validator'

import '../common/styles/pages/login.scss'

type UsersLoginFormType = {
  name: string | null
  email: string | null
  password: string | null
  confirmPassword: string | null
}

const SIGNUP_MUTATION = gql`
  mutation signup(
    $name: String
    $email: String!
    $password: String!
  ) {
    signup(
      name: $name
      email: $email
      password: $password
    ) {
      token
    }
  }
`

const SignUpPage: React.FC = () => {
  return <LoginForm />
}

const LoginForm = () => {
  const history = useHistory()

  const [signup, { data }] = useMutation(SIGNUP_MUTATION)

  const maxLength = maxLengthCreator(20)

  const textInput: InputParamsType[] = [
    {
      name: 'name',
      validators: [required, onlyNumbers],
      type: 'text',
      placeholder: 'Login',
    },
    {
      name: 'email',
      validators: [required, isEmail],
      type: 'email',
      placeholder: 'Email',
    },
  ]

  const passwordInput: InputParamsType[] = [
    {
      name: 'password',
      validators: [required, maxLength, onlyNumbers],
      type: 'password',
      placeholder: 'Пароль',
    },
    {
      name: 'confirmPassword',
      validators: [required, maxLength],
      type: 'password',
      placeholder: 'Повторите пароль',
    },
  ]

  const submit = async (
    values: UsersLoginFormType,
    {
      setSubmitting,
    }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true)
    const response = await signup({
      variables: values,
    })
    localStorage.setItem(
      'token',
      response.data.signup.token
    )
    setSubmitting(false)
    window.location.reload()
    history.push('/')
  }

  const initialValues: UsersLoginFormType = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  const validation = (values: any) => {
    const errors = {
      confirmPassword: '',
    }

    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Не соответствиее паролей'

      return errors
    }
  }

  return (
    <div className={'container__form'}>
      <Formik
        initialValues={initialValues}
        onSubmit={submit}
        validate={validation}>
        {({ handleSubmit }) => (
          <Form
            className={'login-form'}
            onSubmit={handleSubmit}>
            <div>
              <h1>Регистрация</h1>
            </div>

            {TextInputComponentRender(textInput)}

            {PasswordInputComponentRender(passwordInput)}

            <Button>Регистрация</Button>

            <span className={'toRegistration'}>
              Уже зарегистрированы?{' '}
              <Link to={'/auth'}>Войти</Link>
            </span>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default SignUpPage
