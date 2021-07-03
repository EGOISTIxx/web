import { gql, useQuery } from '@apollo/client'
import React from 'react'

import CreateProfile from '../components/CreateProfile/CreateProfile.component'
import UpdateProfile from '../components/UpdateProfile/UpdateProfile.component'

import profile from '../common/assets/svgs/profile.svg'

import '../common/styles/pages/profile.scss'

export const ME_QUERY = gql`
  query me {
    me {
      id
      name
      email
      Profile {
        id
        info
        subscribeType
        avatar
      }
    }
  }
`

const ProfilePage: React.FC = () => {
  const { loading, error, data } = useQuery(ME_QUERY)

  if (loading) return <p>loading...</p>
  if (error) return <p>{error.message}</p>

  return (
    <div className={'container-profile'}>
      <div className={'container-info'}>
        <div className={'container-img'}>
          <div className={'img'}>
            {data.me.Profile?.avatar ? (
              <img src={data.me.Profile.avatar} alt='avatar' />
            ) : (
              <img src={profile} alt='' />
            )}
          </div>
        </div>
        <div className={'container-info-more'}>
          <div className={'main-info'}>
            <div className={'container-name-id'}>
              <span className={'name'}>
                {data.me?.name}
              </span>
              &nbsp;
              <span className={'id'}>#{data.me?.id}</span>
            </div>
          </div>
          <div className={'info-description'}>
            <div className={'info-type-subscribe grid'}>
              <span className={'prev-text'}>
                Тип подписки
              </span>
              <span>{data.me.Profile?.subscribeType}</span>
            </div>
            <div className={'info-email grid'}>
              <span className={'prev-text'}>Email</span>
              <span>{data.me?.email}</span>
            </div>
            <div className={'info-data grid'}>
              <span className={'prev-text'}>
                Информация
              </span>
              <span>{data.me.Profile?.info}</span>
            </div>
            <div className={'info-data-button'}>
              {data.me.Profile?.id ? (
                <UpdateProfile />
              ) : (
                <CreateProfile />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={'container-watched-films'}>
        <h1>Какой-то контент</h1>
      </div>
      {/* <h1>{data.me.name}</h1>

      {data.me.Profile?.id ? (
        <UpdateProfile />
      ) : (
        <CreateProfile />
      )}
      <p>{data.me.Profile?.info}</p>
      <p>{data.me.Profile?.subscribeType}</p>
      <p>{data.me.Profile.avatar}</p> */}
    </div>
  )
}

export default ProfilePage
