import React from 'react'

import { paymentCardType } from '../common/types/paymentCard.type'
import PaymentGrid from '../components/Payment/Payment.component'

import '../common/styles/component/payment.scss'

const PaymentPage: React.FC = () => {
  const paymentCardItems: paymentCardType[] = [
    {
      id: 1,
      period: '1 месяц',
      price: '100 рублей',
      value: 'firstItem',
    },
    {
      id: 2,
      period: '6 месяцев',
      price: '500 рублей',
      value: 'secondItem',
    },
    {
      id: 3,
      period: '1 год',
      price: '1000 рублей',
      value: 'thirdItem',
    },
  ]

  return (
    <div className={'payment'}>
      <h1>Выберите подписку</h1>
      <div className={'wrapper'}>
        {PaymentGrid(paymentCardItems)}
      </div>
      <h1>Выберите систему оплаты</h1>
      <div className={'wrapper'}>
        <h1 style={{textTransform: 'uppercase'}}>Тут система оплаты когда она появится</h1>
      </div>
    </div>
  )
}

export default PaymentPage
