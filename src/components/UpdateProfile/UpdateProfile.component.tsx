import React, { useRef, useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { Form, Formik } from 'formik'
import Modal from 'react-modal'

import { ME_QUERY } from '../../pages/profile.page'
import { TextInputComponentRender } from '../../common/utils/render/inputsRender.util'
import Button from '../UI/Button/Button.component'
import { required } from '../../common/utils/validators/validators.validator'
import { InputParamsType } from '../../common/types/inputParams.type'

import profile from '../../common/assets/svgs/profile.svg'

import { customStyles } from '../../common/styles/component/customModalStyles'
import '../../common/styles/component/editData.scss'

const UPDATE_PROFILE_MUTATION = gql`
  mutation updateProfile(
    $id: Int
    $info: String
    $avatar: String
  ) {
    updateProfile(id: $id, info: $info, avatar: $avatar) {
      id
    }
  }
`

type ProfileValuesType = {
  id: number | undefined
  info: string | undefined
  avatar?: string | undefined
}

const UpdateProfile: React.FC = () => {
  const inputFile = useRef<HTMLInputElement | null>(null)
  const [image, setImage] = useState('')
  const [imageLoading, setImageLoading] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false)

  const { loading, error, data } = useQuery(ME_QUERY)
  const [updateProfile] = useMutation(
    UPDATE_PROFILE_MUTATION,
    {
      refetchQueries: [{ query: ME_QUERY }],
    }
  )

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const uploadImage = async (event: any) => {
    const files = event.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.set('upload_preset', 'egoistixx')
    let url =
      'https://api.cloudinary.com/v1_1/kinoson/image/upload'
    setImageLoading(true) 
    const res = await fetch(url, {
      method: 'POST',
      body: data,
    })
    const file = await res.json()
    setImage(file.secure_url)
    setImageLoading(false)
  }

  const textInput: InputParamsType[] = [
    {
      name: 'info',
      validators: [required],
      type: 'text',
      placeholder: 'Данные пользователя',
    },
  ]

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>

  const initialValues: ProfileValuesType = {
    id: data.me.Profile.id,
    info: data.me.Profile.info,
    avatar: data.me.Profile.avatar,
  }

  const submit = async (
    values: ProfileValuesType,
    {
      setSubmitting,
    }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true)
    await updateProfile({
      variables: { ...values, avatar: image },
    })
    setSubmitting(false)
    setIsOpen(false)
  }

  return (
    <div>
      <Button onClick={openModal} type={'watch'}>
        Редактировать профиль
      </Button>
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
              className={'edit-data'}
              onSubmit={handleSubmit}>
              <input
                type='file'
                name='file'
                placeholder={'upload file'}
                onChange={uploadImage}
                ref={inputFile}
                style={{ display: 'none' }}
              />
              {imageLoading ? (
                <p>Loading...</p>
              ) : (
                <>
                  {image ? (
                    <span
                      onClick={() =>
                        inputFile.current?.click()
                      }>
                      <img
                        src={image}
                        alt='avatar'
                        style={{
                          width: '150px',
                          borderRadius: '50%',
                        }}
                      />
                    </span>
                  ) : (
                    <span
                      onClick={() =>
                        inputFile.current?.click()
                      }>
                      <span>Выбрать картинку</span>
                    </span>
                  )}
                </>
              )}

              {TextInputComponentRender(textInput)}

              <Button>Сохранить изменения</Button>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  )
}

export default UpdateProfile
