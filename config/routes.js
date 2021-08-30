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
    component: './Material',
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
