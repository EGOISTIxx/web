import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Form, Formik } from 'formik'
import Modal from 'react-modal'

import { ME_QUERY } from '../../pages/profile.page'
import { TextInputComponentRender } from '../../common/utils/render/inputsRender.util'
import Button from '../UI/Button/Button.component'
import { required } from '../../common/utils/validators/validators.validator'
import { InputParamsType } from '../../common/types/inputParams.type'

import { customStyles } from '../../common/styles/component/customModalStyles'

const CREATE_PROFILE_MUTATION = gql`
  mutation createProfile(
    $info: String
    $subscribeType: String
    $avatar: String
  ) {
    createProfile(
      info: $info
      subscribeType: $subscribeType
      avatar: $avatar
    ) {
      id
    }
  }
`

type ProfileValuesType = {
  info: string | undefined
  subscribeType: string | undefined
  avatar: string | undefined
}

const CreateProfile: React.FC = () => {
  const [createProfile] = useMutation(
    CREATE_PROFILE_MUTATION,
    {
      refetchQueries: [{ query: ME_QUERY }],
    }
  )

  const [modalIsOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const textInput: InputParamsType[] = [
    {
      name: 'info',
      validators: [required],
      type: 'text',
      placeholder: 'Данные пользователя',
    },
  ]

  const initialValues: ProfileValuesType = {
    info: '',
    subscribeType: '',
    avatar: '',
  }

  const submit = async (
    values: ProfileValuesType,
    {
      setSubmitting,
    }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true)
    await createProfile({
      variables: values,
    })
    setSubmitting(false)
    setIsOpen(false)
  }

  return (
    <div>
      <Button onClick={openModal}>Создать профиль</Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Modal'
        ariaHideApp={false}
        style={customStyles}>
        <Formik
          initialValues={initialValues}
          onSubmit={submit}>
          {({ handleSubmit }) => (
            <Form
              className={'login-form'}
              onSubmit={handleSubmit}
            >

              {TextInputComponentRender(textInput)}

              <Button>Сохранить данные</Button>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  )
}

export default CreateProfile
