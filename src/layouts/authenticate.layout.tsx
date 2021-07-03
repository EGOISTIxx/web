import React from 'react'
import Particles from 'react-particles-js'
import { Redirect, Route, Switch } from 'react-router'

import particleConfig from './config/particle.config'
import LoginPage from '../pages/login.page'
import SignUpPage from '../pages/signup.page'

import '../common/styles/layouts/auth.scss'

const AuthLayout: React.FC = () => {
  return (
    <>
      <Particles params={particleConfig} />
      <div className={'main-container'}>
        <div className={'container__title'}>
          <h1>kinoson</h1>
        </div>
        <div className={'auth-container'}>
          <div className={'container'}>
            <Switch>
              <Route path={'/login'} exact component={LoginPage} />
              <Route path={'/signup'} exact component={SignUpPage} />
              <Redirect to={'/login'} />
            </Switch>
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthLayout
