import React from 'react'

import { TextInputFormParamsType } from '../../../common/types/input.type'

import '../../../common/styles/ui/input.scss'

const TextInput: React.FC<TextInputFormParamsType> = ({
  field,
  meta,
  ...props
}) => {
  const inputType = props.type || 'text'
  const htmlFor = `${Math.random()}`
  const cls = ['input-box']

  const hasError = meta.touched && meta.error

  if (hasError) {
    cls.push('error')
  }

  return (
    <div className={'Wrapper'}>
      <div className={cls.join(' ')}>
        <input
          id={htmlFor}
          type={inputType}
          placeholder={props.placeholder}
          disabled={props.disabled}
          {...field}
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

export default TextInput
