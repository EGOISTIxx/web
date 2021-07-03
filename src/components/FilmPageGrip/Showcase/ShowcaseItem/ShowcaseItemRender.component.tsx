import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination } from 'swiper/core'
import { Link } from 'react-router-dom'

import { ShowcaseItemsType } from '../../../../common/types/showcase.type'

SwiperCore.use([Pagination])

const ShowcaseItemRender: React.FC<ShowcaseItemsType[]> = (
  items: any
) => {
  return items.map((item: any) => {
    return (
      <div className={'showcase__video-line'} key={item.id}>
        <div className={'showcase__video-line-header'}>
          {item.header}
        </div>
        <Swiper
          slidesPerView={6}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          slidesPerGroup={1}
          breakpoints={{
            '1080': {
              spaceBetween: 10,
            },
          }}
          className={'mySwiper'}>
          {item.other.map((itm: any) => {
            return (
              <div
                className={
                  'showcase__video-line-slider-item'
                }
                key={itm.id}>
                <SwiperSlide key={itm.id}>
                  <Link to={itm.to}>
                    <div className={'showcase__video-item'}>
                      <div className={'showcase__image'}>
                        <img src={itm.src} alt={itm.alt} />
                      </div>
                      <div className={'sliderItem-title'}>
                        <span>{itm.itemTitle}</span>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              </div>
            )
          })}
        </Swiper>
      </div>
    )
  })
}

export default ShowcaseItemRender
