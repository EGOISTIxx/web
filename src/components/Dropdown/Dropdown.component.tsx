import { useQuery } from '@apollo/client'
import React, {
  AriaAttributes,
  DOMAttributes,
  useEffect,
  useContext,
} from 'react'
import { Link } from 'react-router-dom'

import { Context } from '../../common/context/context'
import { ME_QUERY } from '../../pages/profile.page'

import '../../common/styles/component/dropdown.scss'

declare module 'react' {
  interface HTMLAttributes<T>
    extends AriaAttributes,
      DOMAttributes<T> {
    isOpen?: any
  }
}

type ItemDropdown = {
  id: number | null
  item: string | null
  link?: string | null
  logout?: () => void
}

type Props = {
  [key: string]: any
}

const renderItemDropdown = (
  items: ItemDropdown[],
  fnc: any
) => {
  return items.map((item: any) => {
    return (
      <Link to={item.link} onClick={item.logout}>
        <li
          key={item.id}
          className={'dropdown-item'}
          onClick={fnc}>
          {item.item}
        </li>
      </Link>
    )
  })
}

const DropdownMenu: React.FC<Props> = (props: Props) => {
  const {data} = useQuery(ME_QUERY)
  const { setMenuProfile } = useContext(Context)

  const clickHandler = () => {
    props.onClose()
  }

  const removeTokenHandler = async () => {
    localStorage.removeItem('token')
    window.location.reload()
  }

  const DropdownItems: ItemDropdown[] = [
    {
      id: 1,
      item: data?.me?.name,
      link: '/profile',
    },
    {
      id: 2,
      item: 'Подписка',
      link: '/payment',
    },
    {
      id: 3,
      item: 'Выход',
      logout: removeTokenHandler,
    }, 
  ]

  const cls = ['dropdown']

  if (!props.isOpen) {
    cls.push('close')
  }

  const handleClick = () => {
    if (props.isOpen) {
      setMenuProfile(false)
    }
  }

  useEffect(() => {
    if (props.isOpen) {
      document.addEventListener('click', handleClick)
    }

    return () => {
      if (props.isOpen) {
        document.removeEventListener('click', handleClick)
      }
    }
  }, [props.isOpen])

  return (
    <div className={cls.join(' ')}>
      <ul className={'dropdown-list'}>
        {renderItemDropdown(DropdownItems, clickHandler)}
      </ul>
    </div>
  )
}

export default DropdownMenu
