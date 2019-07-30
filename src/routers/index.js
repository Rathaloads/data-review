import * as routeNames from './route-names'
import Auth from '../views/auth/index'
import Login from '../views/auth/login'

import Apps from '../views/apps/index'
import DataInput from '../views/apps/data-input'
import DataReview from '../views/apps/data-review'

export default [
  {
    path: '/',
    redirect: { name: routeNames.AUTH_LOGIN }
  },
  {
    path: '/auth',
    name: routeNames.AUTH,
    component: Auth,
    redirect: { name: routeNames.AUTH_LOGIN },
    children: [
      {
        path: 'login',
        name: routeNames.AUTH_LOGIN,
        component: Login
      }
    ]
  },
  {
    path: '/apps',
    name: routeNames.APPS,
    redirect: { name: routeNames.APPS_DATA_INPUT },
    component: Apps,
    children: [
      {
        path: 'data-input',
        name: routeNames.APPS_DATA_INPUT,
        component: DataInput
      },
      {
        path: 'data-review',
        name: routeNames.APPS_DATA_REVIEW,
        component: DataReview
      }
    ]
  }
]
