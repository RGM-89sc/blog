import loadable, { LoadableComponent } from '@loadable/component'

export interface IChildrenRouter {
  path: string
  exact: boolean
  name: string
  label: string
  component: LoadableComponent<any>
}

export interface IRouter {
  path: string
  exact: boolean
  name: string
  label: string
  component: LoadableComponent<any>
  children?: IChildrenRouter[]
}

const router: IRouter[] = [
  {
    path: '/',
    exact: true,
    name: 'homepage',
    label: '主页',
    component: loadable(() => import('../pages/HomePage'))
  },
  {
    path: '/post/:id',
    exact: true,
    name: 'post-detail',
    label: 'post详情',
    component: loadable(() => import('../pages/post-detail'))
  },
  {
    path: '/category',
    exact: true,
    name: 'category',
    label: '分类',
    component: loadable(() => import('../pages/category-list'))
  },
  {
    path: '/project',
    exact: true,
    name: 'project',
    label: '项目',
    component: loadable(() => import('../pages/project-list'))
  },
  {
    path: '/proving-ground',
    exact: true,
    name: 'proving-ground',
    label: '试验场',
    component: loadable(() => import('../pages/proving-ground'))
  }
]

export default router