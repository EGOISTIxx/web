import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Swiper } from 'swiper/react'
import SwiperCore, {
  Autoplay,
  Pagination,
  Navigation,
} from 'swiper/core'

import SliderGridComponent from './SliderGrid/SliderGrid.component'
import { FilmItemType } from '../../common/types/filmItems.type'
import Showcase from './Showcase/Showcase.component'

import '../../common/styles/layouts/preview.scss'

export const GET_NOVELTY_FILMS_QUERY = gql`
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

SwiperCore.use([Pagination, Navigation, Autoplay])

const FilmGrid: React.FC = () => {
  const { loading, error, data } = useQuery(
    GET_NOVELTY_FILMS_QUERY
  )

  if (loading) return <p>loading...</p>
  if (error) return <p>{error.message}</p>

  const noveltyFilms = data.films.filter((item: any) => { 
    const today = parseInt(
      (new Date(Date.now()).getTime() / 1000).toFixed(0)
    )

    const dateAdded = parseInt(
      (new Date(item.added).getTime() / 1000).toFixed(0)
    )

    const newDate = today - dateAdded

    const formatedToDays = (newDate / (60 * 60 * 24)).toFixed(1)
    

    if (+formatedToDays <= 10) {
      return true
    }
    return false
  })

  return (
    <>
      <Swiper
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        loop={true}
        pagination={{
          type: 'progressbar',
          clickable: false,
        }}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        className={'mySwiper'}
        centeredSlides={true}
        simulateTouch={false}>
        {SliderGridComponent(noveltyFilms)}
      </Swiper>
      <Showcase />
    </>
  )
}

export default FilmGrid
