import { gql, useQuery } from '@apollo/client'
import React from 'react'

import WatchGrid from '../components/PageForWatchingGrip/PageWatchingGrig.component'

const GET_NOVELTY_FILMS_QUERY = gql`
  query films {
    films {
      id
      img
      title
      description
      categories
      itemTitle
      ratingKinopoisk
      ratingIMDb
      trailer
      more
      releaseYear
      country
      directors
      geners
      cast
      kino
      miniImg
      added
    }
  }
`

const deleteAllExceptNumbers = (str: any) => {
  return str.split('_')[1]
}

const ItemForWatching: React.FC = ({ match }: any) => {
  const mainID = deleteAllExceptNumbers(match.url)

  const { data } = useQuery(GET_NOVELTY_FILMS_QUERY)

  const filmItem = data?.films?.filter((item: any) => {
    if (Number(item.id) === Number(mainID)) {
      return true
    }
  })

  let dataCategoriesOfArray

  if (filmItem) {
    dataCategoriesOfArray = filmItem.map(
      (item: any) => {
        return item.categories
      }
    )
  }

  return (
    <>
      {filmItem ? (
        <WatchGrid
          dataOfFilms={filmItem}
          dataCategory={dataCategoriesOfArray}
        />
      ) : (
        'Page not found 404'
      )}
    </>
  )
}

export default ItemForWatching
