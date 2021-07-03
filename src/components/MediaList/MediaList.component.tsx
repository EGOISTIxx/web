/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'

import Kinopoisk from '../../common/assets/svgs/kinopoisk.svg'
import IMDb from '../../common/assets/svgs/IMDb.svg'

const useStyles = makeStyles({
  root: {
    width: '90%',
    height: '150px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
})

const valueText = (value: number) => {
  return `${value}`
}

const marks = [
  {
    value: 1980,
    label: '1980',
  },
  {
    value: 1991,
    label: '1991',
  },
  {
    value: 2001,
    label: '2001',
  },
  {
    value: 2011,
    label: '2011',
  },
  {
    value: 2021,
    label: '2021',
  },
]

const MediaList: React.FC<any> = ({filmsArray}: any) => {
  const nonFiltered = filmsArray
  const classes = useStyles()

  const [medias, setMedia] = useState({
    filmsArray: [],
    geners: '',
    country: '',
    period: '',
  })
  const [pageNumber, setpageNumber] = useState(0)
  const [years, setYears] = useState([1980, 2021])
  const [raitingKinopoisk, setRaitingKinopoisk] = useState([
    0, 10,
  ])
  const [raitingIMDb, setRaitingIMDb] = useState([0, 10])

  useEffect(() => {
    setMedia({
      filmsArray: nonFiltered,
      geners: 'Любой',
      country: 'Любая',
      period: 'Всё время',
    })
  }, [nonFiltered])

  const filterArray: any[] = [
    {
      title: 'Жанр',
      name: 'geners',
      value: medias?.geners,
      item: [
        'Любой',
        'Комедия',
        'Боевик',
        'Аниме',
        'Мультфильм',
        'Фантастика',
        'Фэнтези',
        'Драма',
        'Мелодрама',
        'Ужасы',
        'Детектив',
        'Триллер',
        'Приключения, ',
        'Исторический',
      ],
    },
    {
      title: 'Страна',
      name: 'country',
      value: medias?.country,
      item: [
        'Любая',
        'США',
        'Великобритания',
        'Россия',
        'Китай',
        'Япония',
        'Франция',
        'Канада',
        'Германия',
        'Испания',
      ],
    },
  ]

  const mediaPerPage = 18
  const pagesVisited = pageNumber * mediaPerPage

  let displayMedia

  const handleChange = ({
    target: { name, value },
  }: any) => {
    setMedia((prev) => ({ ...prev, [name]: value }))
  }

  const handleChangeForYears = (
    event: any,
    newValue: number | number[]
  ) => {
    setYears(newValue as number[])
  }

  const handleChangeForKinopoisk = (
    event: any,
    newValue: number | number[]
  ) => {
    setRaitingKinopoisk(newValue as number[])
  }

  const handleChangeForIMDb = (
    event: any,
    newValue: number | number[]
  ) => {
    setRaitingIMDb(newValue as number[])
  }

  let media = medias?.filmsArray

  if (medias?.geners && medias?.geners !== 'Любой') {
    media = media.filter((item: any) => {
      let changedStr = item.geners.geners.map(
        (subj: any) => {
          return subj.title.split(',')[0]
        }
      )
      if (changedStr.includes(medias?.geners)) {
        return true
      }
    })
  }

  if (medias?.country && medias?.country !== 'Любая') {
    media = media.filter((item: any) => {
      let changedStr = item.country.country.map(
        (subj: any) => {
          return subj.title.split(',')[0]
        }
      )
      if (changedStr.includes(medias?.country)) {
        return true
      }
    })
  }

  if (years && years.length > 0) {
    media = media?.filter((item: any) => {
      if (
        Number(item.releaseYear) >= Number(years[0]) &&
        Number(item.releaseYear) <= Number(years[1])
      ) {
        return true
      }
    })
  }

  if (raitingKinopoisk && raitingKinopoisk.length > 0) {
    media = media?.filter((item: any) => {
      if (
        Number(item.ratingKinopoisk) >=
          Number(raitingKinopoisk[0]) &&
        Number(item.ratingKinopoisk) <=
          Number(raitingKinopoisk[1])
      ) {
        return true
      }
    })
  }

  if (raitingIMDb && raitingIMDb.length > 0) {
    media = media?.filter((item: any) => {
      if (
        Number(item.ratingIMDb) >= Number(raitingIMDb[0]) &&
        Number(item.ratingIMDb) <= Number(raitingIMDb[1])
      ) {
        return true
      }
    })
  }

  if (media && media.length > 0) {
    displayMedia = media
      ?.slice(pagesVisited, pagesVisited + mediaPerPage)
      ?.map((mediaItem: any, i: number) => {
        return (
          <div key={i}>
            <NavLink
              to={`/${mediaItem.categories}/${mediaItem.itemTitle}_${mediaItem.id}`}
              key={i + 1}>
              <div className={'media-item'} key={i}>
                <div className={'media-img'}>
                  <img
                    src={mediaItem.miniImg}
                    alt={mediaItem.title}
                  />
                  <div className={'raiting'}>
                    <div>
                      <img src={IMDb} alt='IMDb' />
                      <span>{mediaItem.ratingIMDb}</span>
                    </div>
                    <div className={'rat-kinopoisk'}>
                      <img
                        src={Kinopoisk}
                        alt='Kinopoisk'
                      />
                      <span>
                        {mediaItem.ratingKinopoisk}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={'media-title'}>
                  <span className={'media-text'}>
                    {mediaItem.title}
                  </span>
                </div>
              </div>
            </NavLink>
          </div>
        )
      })
  }

  let pageCount = 0

  if (media && media.length > 0) {
    pageCount = Math.ceil(media.length / mediaPerPage)
  }

  const changePage = ({ selected }: any) => {
    setpageNumber(selected)
  }

  return (
    <div className={'media__wrapper'}>
      <div className={'filter'}>
        <div className={'option-select'}>
          {filterArray.map((item: any) => {
            return (
              <div className={'select-items'}>
                <h1>{item.title}</h1>
                <div className={'select'}>
                  <select
                    name={item.name}
                    id={item.name}
                    value={item.value}
                    onChange={handleChange}>
                    {item.item.map(
                      (subj: any, i: number) => {
                        return (
                          <option key={i}>{subj}</option>
                        )
                      }
                    )}
                  </select>
                </div>
              </div>
            )
          })}
        </div>
        <div className={classes.root}>
          <Typography
            id={'range-slider'}
            style={{ fontSize: '35px' }}
            gutterBottom>
            Год выхода
          </Typography>
          <Slider
            step={1}
            marks={marks}
            value={years}
            onChange={handleChangeForYears}
            valueLabelDisplay='on'
            aria-labelledby='range-slider'
            getAriaValueText={valueText}
            min={1980}
            max={2021}
          />
        </div>
        <div className={'some-raiting'}>
          <div className={classes.root}>
            <Typography
              id={'range-slider'}
              style={{ fontSize: '35px' }}
              gutterBottom>
              Рейтинг IMDb
            </Typography>
            <Slider
              step={1}
              marks
              value={raitingIMDb}
              onChange={handleChangeForIMDb}
              valueLabelDisplay='on'
              aria-labelledby='range-slider'
              getAriaValueText={valueText}
              min={0}
              max={10}
            />
          </div>
          <div className={classes.root}>
            <Typography
              id={'range-slider'}
              style={{ fontSize: '35px' }}
              gutterBottom>
              Рейтинг Kinopoisk
            </Typography>
            <Slider
              step={1}
              marks
              value={raitingKinopoisk}
              onChange={handleChangeForKinopoisk}
              valueLabelDisplay='on'
              aria-labelledby='range-slider'
              getAriaValueText={valueText}
              min={0}
              max={10}
            />
          </div>
        </div>
      </div>
      <div className={'media-list'}>{displayMedia}</div>
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={'paginationBttns'}
        previousLinkClassName={'previousBttn'}
        nextLinkClassName={'nextBttn'}
        disabledClassName={'paginationDisabled'}
        activeClassName={'paginationActive'}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
      />
    </div>
  )
}

export default MediaList
