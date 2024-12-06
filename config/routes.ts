export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './user/Login' }],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/account',
    name: '账号管理',
    icon: 'UserSwitchOutlined',
    component: './Account',
    access: 'canAdmin',
  },
  { path: '/video', name: '视频管理', icon: 'VideoCameraOutlined', component: './Video' },
  { path: '/customer', name: '注册用户', icon: 'UserOutlined', component: './Customer' },
  { path: '/payment', name: '订单管理', icon: 'PayCircleOutlined', component: './Payment' },
  { path: '/member', name: '会员配置', icon: 'ShoppingCartOutlined', component: './Member' },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
