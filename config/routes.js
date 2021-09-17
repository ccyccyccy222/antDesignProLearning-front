export default [
  {
    name: 'food',
    icon: 'CoffeeOutlined',
    path: '/food',
    component: './Food',
    access:'canChef'
  },
  {
    name: 'material',
    icon: 'HddOutlined',
    path: '/material',
    component: './Material',
    access:'canChef'
  },
  {
    name: 'takeout',
    icon: 'SendOutlined',
    path: '/takeout',
    component: './Takeout',
    access:'canFOM'
  },
  {
    name: 'cost',
    icon: 'DollarOutlined',
    path: '/cost',
    access:'canFM',
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
