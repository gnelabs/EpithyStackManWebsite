import React from 'react';

const Home = React.lazy(() => import('./views/Home'));
const Login = React.lazy(() => import('./views/Login'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: Home},
  { path: '/login', exact: true, name: 'Login', component: Login}
];

export default routes;
