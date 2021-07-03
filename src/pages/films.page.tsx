/* eslint-disable array-callback-return */
import React from 'react'
import { useQuery } from '@apollo/client'

import { GET_NOVELTY_FILMS_QUERY } from '../components/FilmPageGrip/FilmGrid.component'
import MediaList from '../components/MediaList/MediaList.component'

import '../common/styles/pages/mediaList.scss'

const filteredArrray = (param: any) => {
  let filmsArray = param?.films?.filter((item: any) => {
    return item.categories === 'film'
  })
  return filmsArray
}

const MainFilmPage: React.FC = () => {
  const {loading, error, data } = useQuery(GET_NOVELTY_FILMS_QUERY)

  const filmsArray = filteredArrray(data)

  return(
    <>
      <MediaList filmsArray={filmsArray} />
    </>
  )
}

export default MainFilmPage