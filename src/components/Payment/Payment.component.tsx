import React from 'react'

import { paymentCardType } from '../../common/types/paymentCard.type'
import RadioButton from '../UI/RadioButton/RadioButton.component'

const PaymentGrid: React.FC<paymentCardType[]> = (
  items: any
) => {
  return items.map((item: any) => {
    return (
      <>
        <div className={'card'}>
          <RadioButton
            id={item.id} 
            value={item.value}
            key={item.id}>
            <div className={'card-data'}>
              <div className={'card-info'}>
                <div className={'card-period'}>
                  <span>{item.period}</span>
                </div>
                <div className={'card-price'}>
                  <span>{item.price}</span>
                </div>
              </div>
            </div>
          </RadioButton>
        </div>
      </>
    )
  })
}

export default PaymentGrid
