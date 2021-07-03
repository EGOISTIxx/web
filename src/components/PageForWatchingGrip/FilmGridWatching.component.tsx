import React from 'react'
import Plyr from 'plyr-react'
import { useQuery } from '@apollo/client'

import CreateComment from '../Comment/CreateComment.component'
import { GET_NOVELTY_FILMS_QUERY } from '../FilmPageGrip/FilmGrid.component'

import IMDb from '../../common/assets/svgs/IMDb.svg'
import Kinopoisk from '../../common/assets/svgs/kinopoisk.svg'
import AllComments from '../ShowAllComments/AllComments.component'

type VideoItemType = {
  type: string | any
  title?: string | any
  sources: any
}

type ArrayType = {
  [key: string]: any
}

const FilmGrid: React.FC<any> = (dataOfFilms: any) => {
  return dataOfFilms.map((item: any) => {
    const newLinkItem: ArrayType[] = []

    item.kino.kino.map((subject: any) => {
      const items = {
        src: subject.link,
        type: 'video/mp4',
        size: subject.quality,
      }

      return newLinkItem.push(items)
    })

    const videoSrc: VideoItemType = {
      type: 'video',
      title: item.Title,
      sources: newLinkItem,
    }

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
                  <Plyr source={videoSrc} />
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
          {/* <div className={'movie__comments'}>
            <CreateComment id={item.id} />
            <AllComments id={item.id} />
          </div> */}
        </div>
      </div>
    )
  })
}

export default FilmGrid
