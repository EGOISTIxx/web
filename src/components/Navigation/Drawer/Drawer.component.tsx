import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles'

import profile from '../../../common/assets/svgs/profile.svg'
import { Context } from '../../../common/context/context'
import DropdownMenu from '../../Dropdown/Dropdown.component'

import '../../../common/styles/layouts/preview.scss'

import search from '../../../common/assets/svgs/loupe.svg'

type PropsType = {
  [key: string]: any
}

type MenuItemType = {
  title: string | null
  to: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
)

const NavigationRenderHandler = (
  menuItem: MenuItemType[]
) => {
  return menuItem.map((item, index) => {
    return (
      <li key={index}>
        <NavLink to={item.to} activeClassName={'active'}>
          {item.title}
        </NavLink>
      </li>
    )
  })
}

const Drawer: React.FC<PropsType> = () => {
  const {
    menuProfile,
    setMenuProfile,
  } = useContext(Context)

  const dropdownMenuCloseHandler = () => {
    setMenuProfile(false)
  }

  const toggleDropdownMenuHandler = () => {
    setMenuProfile(!menuProfile)
  }

  const Menu: MenuItemType[] = [
    {
      title: 'Онлайн трансляция',
      to: '/onlineTV',
    },
    {
      title: 'Фильмы',
      to: '/films',
    },
    {
      title: 'Сериалы',
      to: '/serials',
    },
  ]

  return (
    <div className={'header'}>
      <nav className={'header__navigation'}>
        <Link className={'header__title'} to={'/'}>
          kinoson
        </Link>
        <ul className={'header__links-item'}>
          {NavigationRenderHandler(Menu)}
          <li>
            <NavLink
              to={'/search'}
            >
              <img
                src={search}
                alt='Search'
                style={{ width: '30px', height: '30px' }}
              />
            </NavLink>
          </li>
        </ul>
        <div
          className={'header__user-profile'}
          onClick={toggleDropdownMenuHandler}
          isOpen={menuProfile}>
          <img src={profile} alt='Профиль' />
        </div>
        <DropdownMenu
          isOpen={menuProfile}
          onClose={dropdownMenuCloseHandler}
        />
      </nav>
    </div>
  )
}

export default Drawer
