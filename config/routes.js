export default [
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
    name: 'cost',
    icon: 'DollarOutlined',
    path: '/cost',
    routes: [
      {
        name: 'laborCost',
        path: '/cost/laborCost',
        component: './cost/LaborCost'
      },
      {
        name: 'utilities',
        path: '/cost/utilities',
        component: './cost/Utilities'
      },

    ]
  },
  {
    path: '/',
    redirect: '/food'
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
