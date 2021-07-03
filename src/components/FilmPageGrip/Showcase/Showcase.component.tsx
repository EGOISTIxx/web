import React from 'react'

import ShowcaseItemRender from './ShowcaseItem/ShowcaseItemRender.component'
import { ShowcaseItemsType } from '../../../common/types/showcase.type'

import Endgame from '../../../common/assets/imgTheBest/avengers-endgame360x640.jpg'
import Legion from '../../../common/assets/imgTheBest/legion360x640.jpg'
import It from '../../../common/assets/imgTheBest/it360x640.jpg'
import Godzilla from '../../../common/assets/imgTheBest/godzilla27a8_360x640.jpg'
import Venom from '../../../common/assets/imgTheBest/venom360x640.jpg'
import GameOfThrones from '../../../common/assets/imgTheBest/game-of-thrones360x640.jpg'
import StrangerThings from '../../../common/assets/imgTheBest/stranger-things360x640.jpg'
import ReadyPlayerOne from '../../../common/assets/imgTheBest/ready-player-one360x640.jpg'

import '../../../common/styles/component/showcase.scss'

const Showcase: React.FC = () => {
  const showcaseItem: ShowcaseItemsType[] = [
    {
      header: 'Популярное',
      id: 1,
      other: [
        {
          id: 1,
          src: Endgame,
          alt: 'Мстители: Финал',
          itemTitle: 'Мстители: Финал',
          to: '/',
        },
        {
          id: 2,
          src: Legion,
          alt: 'Легион',
          itemTitle: 'Легион',
          to: '/',
        },
        {
          id: 3,
          src: It,
          alt: 'Оно',
          itemTitle: 'Оно',
          to: '/',
        }, 
        {
          id: 4,
          src: Godzilla,
          alt: 'Годзилла: Король монстров',
          itemTitle: 'Годзилла: Король монстров',
          to: '/',
        },
        {
          id: 5,
          src: Venom,
          alt: 'Веном',
          itemTitle: 'Веном',
          to: '/',
        },
        {
          id: 6,
          src: GameOfThrones,
          alt: 'Игра престолов',
          itemTitle: 'Игра престолов',
          to: '/',
        },
        {
          id: 7,
          src: StrangerThings,
          alt: 'Очень странные дела',
          itemTitle: 'Очень странные дела',
          to: '/',
        },
        {
          id: 8,
          src: ReadyPlayerOne,
          alt: 'Первому игроку приготовиться',
          itemTitle: 'Первому игроку приготовиться',
          to: '/',
        },
      ],
    },
    {
      header: 'Лучшее за 2020',
      id: 2,
      other: [
        {
          id: 1,
          src: '',
          alt: '',
          itemTitle: '321',
          to: '/',
        },
        {
          id: 2,
          src: '',
          alt: '',
          itemTitle: '222',
          to: '/',
        },
      ],
    },
  ]
  return (
    <div className={'showcase'}>
      <div className={'showcase-item'}>
        {ShowcaseItemRender(showcaseItem)}
      </div>
    </div>
  ) 
}

export default Showcase
