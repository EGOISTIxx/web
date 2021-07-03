import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { GET_NOVELTY_FILMS_QUERY } from '../FilmPageGrip/FilmGrid.component'

import '../../common/styles/component/search.scss'

import IMDb from '../../common/assets/svgs/IMDb.svg'
import Kinopoisk from '../../common/assets/svgs/kinopoisk.svg'

declare module 'react' {
  interface HTMLAttributes<T>
    extends AriaAttributes,
      DOMAttributes<T> {
    isOpen?: any
  }
}

type Props = {
  [key: string]: any
}

const Search: React.FC<Props> = (props: Props) => {
  const { data } = useQuery(GET_NOVELTY_FILMS_QUERY)

  const [medias, setMedia] = useState([])

  useEffect(() => {
    setMedia(data?.films)
  }, [data.films])

  const [value, setValue] = useState('')

  const filteredMedia = medias?.filter((media: any) => {
    return media.title
      .toLowerCase()
      .includes(value.toLowerCase())
  })

  return (
    <div className={'search'}>
      <h1>Поиск</h1>
      <div className={'search__wrapper'}>
        <input
          type={'input__search'}
          placeholder='Фильм или сериал'
          onChange={(event: any) => {
            setValue(event.target.value)
          }}
        />
      </div>
      <div className={'media-list'}>
        {value === ''
          ? ''
          : filteredMedia.map((media: any, i: number) => {
              return (
                <div>
                  <NavLink
                    to={`/${media.categories}/${media.itemTitle}_${media.id}`}
                    key={i + 1}>
                    <div className={'media-item'}>
                      <div className={'media-img'}>
                        <img
                          src={media.miniImg}
                          alt={media.title}
                        />
                        <div className={'raiting'}>
                          <div>
                            <img src={IMDb} alt='IMDb' />
                            <span>{media.ratingIMDb}</span>
                          </div>
                          <div className={'rat-kinopoisk'}>
                            <img
                              src={Kinopoisk}
                              alt='Kinopoisk'
                            />
                            <span>
                              {media.ratingKinopoisk}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={'media-title'}>
                        <span className={'media-text'}>
                          {media.title}
                        </span>
                      </div>
                    </div>
                  </NavLink>
                </div>
              )
            })}
      </div>
    </div>
  )
}

export default Search
