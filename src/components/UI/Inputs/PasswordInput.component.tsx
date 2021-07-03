import React, { useState } from 'react'

import { TextInputFormParamsType } from '../../../common/types/input.type'

import '../../../common/styles/ui/input.scss'
import '../../../common/styles/ui/passwordInput.scss'

import openEye from '../../../common/assets/svgs/openEye.svg'
import closeEye from '../../../common/assets/svgs/closeEye.svg'

const PasswordInput: React.FC<TextInputFormParamsType> = ({
  field,
  meta,
  ...props
}) => {
  const [type, setType] = useState<string>('password')
  const [value, setChangedValue] = useState(closeEye)

  const htmlFor = `${Math.random()}`

  const cls = ['input-box', 'input-password']

  const setStateForPasswordInputHandler = (): void => {
    if (type === 'password') {
      setType('text')
      setChangedValue(openEye)
    } else {
      setType('password')
      setChangedValue(closeEye)
    }
  }

  const hasError = meta.touched && meta.error

  if (hasError) {
    cls.push('error')
  }

  return (
    <div className={'Wrapper'}>
      <div className={cls.join(' ')}>
        <input
          id={htmlFor}
          type={type}
          placeholder={props.placeholder}
          disabled={props.disabled}
          {...field}
        />
        <img
          src={value}
          alt='Eye'
          onClick={setStateForPasswordInputHandler}
        />
      </div>
      {(meta.error || meta.submit) && meta.touched && (
        <div className={'error'}>
          {meta.error || meta.submitError}
        </div>
      )}
    </div>
  )
}

export default PasswordInput
