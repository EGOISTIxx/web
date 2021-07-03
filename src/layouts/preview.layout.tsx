import React, { useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import Drawer from '../components/Navigation/Drawer/Drawer.component'
import FilmGrid from '../components/FilmPageGrip/FilmGrid.component'
import ItemForWatching from '../pages/showItemForWatching.page'
import MainFilmPage from '../pages/films.page'
import { Context } from '../common/context/context'
import PaymentPage from '../pages/payment.page'
import ProfilePage from '../pages/profile.page'
import MainSerialPage from '../pages/serials.page'
import Search from '../components/Search/Search.component'

const PreviewLayout: React.FC = () => {
  const [menuProfile, setMenuProfile] = useState(false)
  const [searchBlock, setSearchBlock] = useState(false)

  return (
    <>
      <Context.Provider
        value={{
          menuProfile,
          setMenuProfile,
          searchBlock,
          setSearchBlock,
        }}>
        <Drawer />
        <Switch>
          <Route path={'/'} exact component={FilmGrid} />
          <Route path={'/films'} component={MainFilmPage} />
          <Route path={'/serials'} component={MainSerialPage} />
          <Route path={'/search'} component={Search}/>
          <Route path={'/stream'} />
          <Route path={'/profile'} component={ProfilePage}/>
          <Route path={'/payment'} component={PaymentPage} />
          <Route
            path={'/:categories/:title'}
            component={ItemForWatching}
          />
          <Redirect to={'/'} />
        </Switch>
      </Context.Provider>
    </>
  )
}

export default PreviewLayout
