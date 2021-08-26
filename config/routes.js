export default [
  {
    path: '/',
    redirect:'/food'
  },
  {name:'food',
    path: '/food',
  component: './Food'},
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
