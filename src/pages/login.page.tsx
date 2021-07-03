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
  maxLengthCreator,
  required,
} from '../common/utils/validators/validators.validator'

import '../common/styles/pages/login.scss'

type UsersLoginFormType = {
  email: string
  password: string
}

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

const LoginPage: React.FC = () => {
  return <LoginForm />
}

const LoginForm = () => {
  const history = useHistory()

  const [login, { data }] = useMutation(LOGIN_MUTATION)

  const maxLength = maxLengthCreator(20)

  const textInput: InputParamsType[] = [
    {
      name: 'email',
      validators: [required],
      type: 'email',
      placeholder: 'Email',
    },
  ]

  const passwordInput: InputParamsType[] = [
    {
      name: 'password',
      validators: [required, maxLength],
      type: 'password',
      placeholder: 'Пароль',
    },
  ]

  const submit = async (
    values: UsersLoginFormType,
    {
      setSubmitting,
    }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true)
    const response = await login({
      variables: values,
    })
    localStorage.setItem('token', response.data.login.token)
    setSubmitting(false)
    window.location.reload()
    history.push('/')
  }

  const initialValues = { email: '', password: '' }

  return (
    <div className={'container__form'}>
      <Formik
        initialValues={initialValues}
        onSubmit={submit}>
        {({ handleSubmit }) => (
          <Form
            className={'login-form'}
            onSubmit={handleSubmit}>
            <div>
              <h1>Авторизация</h1>
            </div>

            {TextInputComponentRender(textInput)}

            {PasswordInputComponentRender(passwordInput)}

            <Button>Войти</Button>

            <span className={'toRegistration'}>
              Нет аккаунта?{' '}
              <Link to={'/signup'}>Зарегистрироваться</Link>
            </span>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default LoginPage