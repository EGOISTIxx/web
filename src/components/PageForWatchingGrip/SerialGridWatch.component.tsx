/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import Plyr from 'plyr-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination } from 'swiper/core'

import IMDb from '../../common/assets/svgs/IMDb.svg'
import Kinopoisk from '../../common/assets/svgs/kinopoisk.svg'

type VideoItemType = {
  type: string | any
  title?: string | any
  sources: any
}

type ArrayType = {
  [key: string]: any
}

SwiperCore.use([Pagination])

const SerialGrid: React.FC<any> = (dateOfSerials: any) => {
  const arrayItems: { poster: any; src: any }[] = []

  dateOfSerials.map((item: any) => {
    return item.kino.data.map((subject: any) => {
      return subject.links.map((subj: any) => {
        const items = {
          poster: subj.poster,
          src: subj.link
        }

        return arrayItems.push(items)
      })
    })
  })
  
  const [firstItem, ...other] = arrayItems

  const [seriesLink, setLink] = useState<any>({
    type: 'video',
    poster: firstItem.poster,
    sources: [
      {
        src: firstItem.src,
        type: 'video/mp4',
        size: 720,
      },
    ],
  })
  
  

  const changeVideoLinkHandler = (event: any) => {
    setLink({
      type: 'video',
      poster: event.currentTarget.dataset.poster,
      sources: [
        {
          src: event.currentTarget.dataset.video,
          type: 'video/mp4',
          size: 720,
        },
      ],
    })
  }

  console.log(seriesLink)

  return dateOfSerials.map(function (item: any) {
    const trailerSrc: VideoItemType = {
      type: 'video',
      sources: [
        {
          src: item.trailer,
          type: 'video/mp4',
          size: 720,
        },
      ],
    }

    return (
      <div className={'movie'} key={item.id}>
        <div className={'movie__bg'}>
          <img src={item.img} alt={item.title} />
        </div>
        <div className={'movie__content'}>
          <div className={'movie__title'}>
            <h1>{item.title}</h1>
          </div>
          <div className={'movie__raiting'}>
            <div className={'rating-kinopoisk'}>
              <span className={'svg_kino'}>
                <img src={Kinopoisk} alt='' />
              </span>
              <span className={'rating'}>
                {item.ratingKinopoisk}
              </span>
            </div>
            <div className={'rating-imdb'}>
              <span className={'svg_kino'}>
                <img src={IMDb} alt='' />
              </span>
              <span className={'rating'}>
                {item.ratingIMDb}
              </span>
            </div>
          </div>
          <div className={'movie__desc'}>
            <div className={'desc-watch'}>
              <div className={'watch-movie'}>
                <span className={'title-info'}>
                  Смотреть
                </span>
                <div className={'player'}>
                  <div>
                    <Plyr source={seriesLink} />
                  </div>
                </div>
                <div className={'playlist__wrapper'}>
                  {item.kino.data.map((item: any) => {
                    return (
                      <div
                        className={
                          'playlist-container preview-player-dimensions vjs-fluid'
                        }>
                        <h1>{item.title}</h1>
                        <Swiper
                          slidesPerView={4}
                          spaceBetween={30}
                          slidesPerGroup={4}
                          pagination={{
                            clickable: true,
                          }}
                          className={'mySwiper'}>
                          <ol className={'vjs-playlist'}>
                            {item.links.map(
                              (subj: any, i: number) => {
                                return (
                                  <SwiperSlide>
                                    <a
                                      id={`elem${i + 1}`}
                                      data-video={subj.link}
                                      data-poster={
                                        subj.poster
                                      }
                                      onClick={
                                        changeVideoLinkHandler
                                      }>
                                      <li
                                        className={
                                          'vjs-playlist-item'
                                        }>
                                        <div>
                                          <div>
                                            <img
                                              src={
                                                subj.poster
                                              }
                                              alt={
                                                subj.name
                                              }
                                            />
                                          </div>
                                          <span>
                                            {subj.name}
                                          </span>
                                        </div>
                                      </li>
                                    </a>
                                  </SwiperSlide>
                                )
                              }
                            )}
                          </ol>
                        </Swiper>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className={'watch-movie'}>
                <span className={'title-info'}>
                  Трейлер
                </span>
                <div className={'player'}>
                  <Plyr source={trailerSrc} />
                </div>
              </div>
            </div>
            <div className={'desc-data'}>
              <div className={'desc-data-header'}>
                <span>Сюжет</span>
              </div>
              <div className={'desc__data-more'}>
                {item.more}
              </div>
              <div className={'desc__information'}>
                <div className={'info-title'}>
                  <span>Информация</span>
                </div>
                <div className={'info-template'}>
                  <div className={'info-item'}>
                    <span>Год выпуска: </span>
                    <span>{item.releaseYear}</span>
                  </div>
                  <div className={'info-item'}>
                    <span>Страна: </span>
                    <span>
                      {item.country.country.map(
                        (item: any) => {
                          return (
                            <span>{`${item.title}`}</span>
                          )
                        }
                      )}
                    </span>
                  </div>
                  <div className={'info-item'}>
                    <span>Режиссёр: </span>
                    <span>
                      {item.directors.directors.map(
                        (item: any) => {
                          return (
                            <span>{`${item.name}`}</span>
                          )
                        }
                      )}
                    </span>
                  </div>
                  <div className={'info-item'}>
                    <span>Жанр: </span>
                    <span>
                      {item.geners.geners.map(
                        (item: any) => {
                          return (
                            <span>{`${item.title}`}</span>
                          )
                        }
                      )}
                    </span>
                  </div>
                  <div className={'info-item'}>
                    <span>В ролях: </span>
                    <span>
                      {item.cast.cast.map((item: any) => {
                        return <span>{`${item.name}`}</span>
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  })
}

export default SerialGrid