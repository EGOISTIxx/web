import { gql, useQuery } from '@apollo/client'
import React from 'react'

import '../../common/styles/component/showComments.scss'

export const COMMENT_QUERY = gql`
  query film($id: Int) {
    film(id: $id) {
      id
      comments {
        id
        content
        createdAt
        User {
          id
          name
          Profile {
            id
            avatar
          }
        }
      }
    }
  }
`

type ParamType = {
  id: string
}

type CommentType = {
  id: number | null
  content: string | null
  createdAt: Date | null
  User: {
    id: number | null
    name: string | null
    Profile: {
      id: number | null
      avatar: string | undefined
    }
  }
}

const AllComments: React.FC<any> = ({ id }: ParamType) => {
  const { loading, error, data } = useQuery(COMMENT_QUERY, {
    variables: { id: parseInt(id)}
  })

  console.log(data)

  return (
    <div className={'showComments'}>
      {data?.film?.comments?.map(
        (comment: CommentType) => {
          return (
            <>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '40px 1fr 8fr',
                  marginTop: '30px',
                }}>
                <img
                  src={comment.User.Profile.avatar}
                  style={{
                    width: '40px',
                    borderRadius: '50%',
                  }}
                  alt='avatar'
                />
                <div className={'comment-userName'}>
                  <h4>{comment.User.name}</h4>
                </div>
              </div>
              <hr />
              <p>{comment.content}</p>
            </>
          )
        }
      )}
    </div>
  )
}

export default AllComments
