import React from 'react'

import AuthLayout from '../../layouts/authenticate.layout'
import PreviewLayout from '../../layouts/preview.layout'

const App: React.FC = () => {
  const token = localStorage.getItem('token')

  let layout = <PreviewLayout />

  if (!token) {
    layout = <AuthLayout />
  }

  return layout
}

export default App
