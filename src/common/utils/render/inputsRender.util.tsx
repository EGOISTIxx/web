import React from 'react'
import { Field } from 'formik'

import { InputParamsType } from '../../types/inputParams.type'
import { TextInputFormParamsType } from '../../types/input.type'
import TextInput from '../../../components/UI/Inputs/TextInput.component'
import PasswordInput from '../../../components/UI/Inputs/PasswordInput.component'
import { composeValidators } from '../validators/validators.validator'

export const TextInputComponentRender: React.FC<
  InputParamsType[]
> = (params: any) => {
  return params.map((param: any, index: number) => {
    return (
      <Field
        key={index}
        name={param.name}
        validate={composeValidators(...param.validators)}>
        {({ field, meta }: TextInputFormParamsType) => (
          <div className={'wrapper'}>
            <TextInput
              type={param.type}
              placeholder={param.placeholder}
              meta={meta}
              field={field}
              label={param.label}
            />
          </div>
        )}
      </Field>
    )
  })
}

export const PasswordInputComponentRender: React.FC<
  InputParamsType[]
> = (params: any) => {
  return params.map((param: any, index: number) => {
    return (
      <Field
        key={index}
        name={param.name}
        validate={composeValidators(...param.validators)}>
        {({ field, meta }: TextInputFormParamsType) => (
          <div className={'wrapper'}>
            <PasswordInput
              type={param.type}
              placeholder={param.placeholder}
              meta={meta}
              field={field}
              label={param.label}
            />
          </div>
        )}
      </Field>
    )
  })
}
