import React, { useRef, useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { Form, Formik, Field } from 'formik'

import { ME_QUERY } from '../../pages/profile.page'
import { TextInputComponentRender } from '../../common/utils/render/inputsRender.util'
import Button from '../UI/Button/Button.component'

import '../../common/styles/component/createComment.scss'

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($content: String!, $id: Int!) {
    createComment(content: $content, id: $id) {
      id
    }
  }
`

type CommentProps = {
  content: string | undefined
}

type Props = {
  id: number | undefined
}

const CreateComment: React.FC<any> = ({ id }: Props) => {
  const { loading, error, data } = useQuery(ME_QUERY)

  const [createComment] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      refetchQueries: [{ query: ME_QUERY }],
    }
  )

  // const openModal = () => {
  //   setIsOpen(true)
  // }

  // const closeModal = () => {
  //   setIsOpen(false)
  // }

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>

  const initialValues: CommentProps = {
    content: '',
  }

  const submit = async (
    values: CommentProps,
    {
      setSubmitting,
    }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true)
    await createComment({
      variables: { ...values, id },
    })
    setSubmitting(false)
    values.content = ''
  }

  return (
    <div className={'comments'}>
      <Formik
        initialValues={initialValues}
        onSubmit={submit}>
        {({ handleSubmit }) => (
          <Form
            className={'edit-data'}
            onSubmit={handleSubmit}>
            <h1>Оставить комментарий</h1>
            <img
              src={data?.me?.Profile?.avatar}
              style={{ width: '40px', borderRadius: '50%' }}
              alt='avatar'
            />
            <div>
              <Field
                name='content'
                type='text'
                as='textarea'
              />
              <Button>Отправить</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CreateComment
