/* eslint-disable no-useless-escape */
export const required = (value: string) => {
  if (value) {
    return undefined
  }

  return 'Произошла ошибка. Поле должно быть заполнено'
}

const validateStringForNumbers = (str: any) => {
  const numbers = /[\D]+/g
  return numbers.test(str)
}

export const onlyNumbers = (value: string) => {
  if (validateStringForNumbers(value)) {
    return undefined
  }

  return 'Логин не может состоять только из цифр'
}

const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

export const isEmail = (value: string) => {
  if (validateEmail(value)) {
    return undefined
  }

  return 'Поле должно соответствовать типу Email'
}

export const maxLengthCreator =
  (maxLength: any) => (value: any) => {
    if (value && value.length > maxLength) {
      return `Поле не должно превышать длину ${maxLength} символов`
    }

    return undefined
  }

export const composeValidators =
  (...validators: string[]) =>
  (value: any) => {
    return validators.reduce(
      (error: any, validator: any) =>
        error || validator(value),
      undefined
    )
  }
