/* eslint-disable eqeqeq */
import React from 'react'
import Plyr from 'plyr-react'

import FilmGrid from './FilmGridWatching.component'
import SerialGrid from './SerialGridWatch.component'

import '../../common/styles/pages/movie.scss'
import 'video.js/src/css/video-js.scss'
import 'plyr-react/dist/plyr.css' 

const deleteLastCommaInString = (str: any) => {
  return str.replace(/, (?=\s*$)/, '') + ' '
}

const WatchGrid: React.FC<any> = ({
  dataOfFilms,
  dataCategory,
}: any): any => {
  const [categoryItem] = dataCategory

  if (categoryItem === 'film') {
    return <>{FilmGrid(dataOfFilms)}</>
  }
  return (
    <>
      {SerialGrid(dataOfFilms)}
    </>
  )
}

export default WatchGrid
