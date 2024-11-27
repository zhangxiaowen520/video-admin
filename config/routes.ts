export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './user/Login' }],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  { path: '/account', name: '账号管理', icon: 'UserSwitchOutlined', component: './Account' },
  { path: '/video', name: '视频管理', icon: 'VideoCameraOutlined', component: './Video' },
  { path: '/customer', name: '客户管理', icon: 'UserOutlined', component: './Customer' },
  { path: '/payment', name: '付费记录', icon: 'PayCircleOutlined', component: './Payment' },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
