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
      {
        name: 'materialCost',
        path: '/cost/materialCost',
        component: './cost/MaterialCost'
      },

    ]
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
    path: '/',
    redirect: '/food'
  },
  {
    component: './404',
  },
];
