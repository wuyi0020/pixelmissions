import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'NavView',
    component: () => import('@/views/Home/NavView.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home/HomeView.vue')
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/Home/AboutView.vue')
      },
      {
        path: 'author',
        name: 'author',
        component: () => import('@/views/Home/AllAuthorView.vue')
      },
      {
        path: 'createOrder/:id',
        name: 'createOrder',
        component: () => import('@/views/Home/CreatOrderView.vue')
      },
      {
        path: 'order/',
        name: 'Order',
        component: () => import('@/views/Home/OrderView.vue')
      },
      {
        path: 'pay/',
        name: 'PayDone',
        component: () => import('@/views/Home/PayDoneView.vue')
      },
      {
        path: 'usercenter/:userid',
        name: 'UserCenter',
        component: () => import('@/views/Home/UserCenterView.vue')
      },
      {
        path: 'usercomission/:userid',
        name: 'UserComission',
        component: () => import('@/views/Home/UserComissionView.vue')
      },
      {
        path: 'faq',
        name: 'Faq',
        component: () => import('@/views/Home/AboutView.vue')
      },
      {
        path: ':pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/Home/ErrorView.vue')
      },
      {
        path: 'art/:id',
        name: 'Art',
        component: () => import('@/views/Home/ArtView.vue')
      },
      {
        path: 'allart',
        name: 'AllArtView',
        component: () => import('@/views/Home/AllArtView.vue')
      },
      {
        path: 'comission/:id',
        name: 'ComissionView',
        component: () => import('@/views/Home/ComissionView.vue')
      },
      {
        path: 'upload',
        name: 'UploadArtView',
        component: () => import('@/views/Home/UploadArtView.vue')
      },
      {
        path: 'uploadcomission',
        name: 'UploadComissionView',
        component: () => import('@/views/Home/UploadComissionView.vue')
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        children: [
          {
            path: 'art/:id',
            name: 'DashboardArt',
            component: () => import('@/views/Home/Dashboard/DashboardArt.vue')
          },
          {
            path: 'comission/:id',
            name: 'DashboardComission',
            component: () =>
              import('@/views/Home/Dashboard/DashboardComission.vue')
          },
          {
            path: 'edit',
            name: 'EditView',
            children: [
              {
                path: 'art/:id',
                name: 'EditArtView',
                component: () =>
                  import('@/views/Home/Dashboard/EditArtView.vue')
              },
              {
                path: 'user/:id',
                name: 'EditUserView',
                component: () =>
                  import('@/views/Home/Dashboard/EditUserView.vue')
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Home/UserLogin.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Home/UserRegister.vue')
  },
  {
    path: '/admin',
    component: () => import('@/views/Admin/AdminView.vue'),
    children: [
      {
        path: 'product',
        name: 'AdminProduct',
        component: () => import('@/views/Admin/AdminProduct.vue')
      },
      {
        path: 'order',
        name: 'AdminOrder',
        component: () => import('@/views/Admin/AdminOrder.vue')
      },
      {
        path: 'login',
        name: 'AdminLogin',
        component: () => import('@/views/Admin/AdminLogin.vue')
      },
      {
        path: '',
        name: 'AdminHome',
        component: () => import('@/views/Admin/AdminLogin.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
