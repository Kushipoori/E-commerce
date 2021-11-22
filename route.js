import Home from './Home';

import About from './About';
import Login from './Login/Login';
import Register from './Register/Register';

const route = [{
  exact: true, path: '/', component: Home, title: 'Home', isAuthRequired: true,
},
{
  path: '/about', component: About, title: 'About', isAuthRequired: true,
},

{
  exact: true, path: '/login', component: Login, title: 'Login', isAuthRequired: false,
},
{
  path: '/register', component: Register, title: 'Register', isAuthRequired: false,
},

];
export default route;
