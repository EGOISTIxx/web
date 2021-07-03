import React from 'react'

import classes from '../../../common/styles/ui/button.module.scss'

type Props = {
  [key: string]: any
}

const Button: React.FC<Props> = (props: any) => {
  const cls = [classes.Button, classes[props.type]]
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      type={'submit'}
      className={cls.join(' ')}>
      {props.children} 
    </button>
  )
}

export default Button