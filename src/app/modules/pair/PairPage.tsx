import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {ListPair} from './pages/ListPair'
import {CreatePair} from './pages/CreatePair'
import { PairProvider } from './context/PairProvider'
import { EditPair } from './pages/EditPair'

const pairBreadCrumbs: Array<PageLink> = [
  {
    title: 'Par',
    path: '/pair/list',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const PairPage = () => {
  return (
    <PairProvider>
      <Switch>
        <Route path='/pair/list'>
          <PageTitle breadcrumbs={pairBreadCrumbs}>Lista de pares</PageTitle>
          <ListPair />
        </Route>
        <Route path='/pair/create'>
          <PageTitle breadcrumbs={pairBreadCrumbs}>Crear par</PageTitle>
          <CreatePair />
        </Route>
        <Route path='/pair/edit/:pairId'>
          <PageTitle breadcrumbs={pairBreadCrumbs}>Editar par</PageTitle>
          <EditPair />
        </Route>
        <Redirect from='/pair' exact={true} to='/pair/list' />
        <Redirect to='/pair/list' />
      </Switch>
    </PairProvider>
  )
}

export default PairPage
