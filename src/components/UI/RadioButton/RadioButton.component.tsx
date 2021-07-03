import React from 'react'

import '../../../common/styles/ui/radio.scss'

type PropsType = {
  [key: string]: any
}

const RadioButton: React.FC<PropsType> = (props: any) => {
  return (
    <>
      <input type='radio' name='payment-item' id={props.id} value={props.value} checked/>
      <label htmlFor={props.id}>{props.children}</label>
    </>
  )
}

export default RadioButton