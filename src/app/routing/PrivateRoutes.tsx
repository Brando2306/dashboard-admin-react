import {Suspense, lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {FallbackView} from '../../_metronic/partials'
// import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
// import {MenuTestPage} from '../pages/MenuTestPage'

export function PrivateRoutes() {
  const PairPage = lazy(() => import('../modules/pair/PairPage'))
  // const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  // const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  // const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  // const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  // const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  // const BuilderPageWrapper = lazy(() => import('../pages/layout-builder/BuilderPageWrapper'))

  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Route path='/pair' component={PairPage} />
        {/* <Route path='/dashboard' component={DashboardWrapper} />
        <Route path='/builder' component={BuilderPageWrapper} />
        <Route path='/crafted/pages/profile' component={ProfilePage} />
        <Route path='/crafted/pages/wizards' component={WizardsPage} />
        <Route path='/crafted/widgets' component={WidgetsPage} />
        <Route path='/crafted/account' component={AccountPage} />
        <Route path='/apps/chat' component={ChatPage} />
        <Route path='/menu-test' component={MenuTestPage} /> */}
        <Redirect from='/auth' to='/pair' />
        <Redirect exact from='/' to='/pair' />
        <Redirect to='error/404' />
      </Switch>
    </Suspense>
  )
}
