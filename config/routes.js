import { CoffeeOutlined } from '@ant-design/icons';
export default [
  {
    path: '/',
    redirect: '/food',
  },
  {
    name: 'food',
    icon: 'CoffeeOutlined',
    path: '/food',
    component: './Food',
  },
  {
    name: 'material',
    icon: 'HddOutlined',
    path: '/material',
    redirect: '/material/list',
    routes: [
      {
        name: 'list',
        path: '/material/list',
        component: './material/List',
      },
      {
        name: 'history',
        path: '/material/history',
        component: './material/History',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'takeout',
    icon: 'SendOutlined',
    path: '/takeout',
    component: './Takeout',
  },
  {
    path: '/login',
    layout: false,
    component: './Login',
    routes: [
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
