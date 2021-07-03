import React from 'react'
import { SwiperSlide } from 'swiper/react'
import { NavLink } from 'react-router-dom'

import '../../../common/styles/component/slider.scss'
import { FilmItemType } from '../../../common/types/filmItems.type'
import Button from '../../UI/Button/Button.component'

const SliderGridComponent: React.FC<FilmItemType[]> = (
  params: any
) => {
  return params.map((item: any, index: number) => {
    return (
      <SwiperSlide key={item.id}>
        <div className={'container__slider'} key={index}>
          <img
            src={item.img}
            alt={item.title}
            className={'container__slider-item'}
          />
          <div className={'container__title-description'}>
            <div>
              <span className={'slider__title'}>
                {item.title}
              </span>
            </div>
            <div>
              <span className={'slider__description'}>
                {item.description}
              </span>
            </div>
            <div className={'nav-cont'}>
              <div>
                <span
                  className={'swiper-button-prev'}></span>
                <NavLink
                  to={`/${item.categories}/${item.itemTitle}_${item.id}`}
                  key={item.id}>
                  <Button type={'watch'}>Смотреть</Button>
                </NavLink>
                <span
                  className={'swiper-button-next'}></span>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    )
  })
}

export default SliderGridComponent
