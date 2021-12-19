import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '',
    name: 'doc',
    meta: {
      title: '菜单1',
      href: 'https://lison16.github.io/iview-admin-doc/#/',
      icon: 'ios-book'
    }
  },
  {
    path: '/xtgl1',
    name: 'xtgl1',
    meta: {
      icon: 'md-menu',
      title: '系统管理1',
      showAlways: true
    },
    component: Main,
    children: [
      {
        path: 'yhgl',
        name: 'yhgl',
        meta: {
          icon: 'md-funnel',
          title: '用户管理1'
        },
        component: () => import('@/view/xtgl1/yhgl/yhgl.vue')
      },
      {
        path: 'qxsz',
        name: 'qxsz',
        meta: {
          icon: 'md-funnel',
          title: '权限管理1'
        },
        component: () => import('@/view/xtgl1/qxgl/qxgl.vue')
      }
    ]
  },
  /* {
    path: '/multilevel',
    name: 'multilevel',
    meta: {
      icon: 'md-menu',
      title: '购票管理',
      showAlways: true,
      access: ['4']
    },
    component: Main,
    children: [
      {
        path: 'level_2_1',
        name: 'level_2_1',
        meta: {
          icon: 'md-funnel',
          title: '飞机票',
          showAlways: true,
          access: ['5']
        },
        component: parentView,
        children: [
          {
            path: 'level_2_11',
            name: 'level_2_12',
            meta: {
              icon: 'md-funnel',
              title: '购票',
              access: ['6']
            },
            component: () => import('@/view/multilevel/level-2-1.vue')
          },
          {
            path: 'level_2_13',
            name: 'level_2_14',
            meta: {
              icon: 'md-funnel',
              title: '退票',
              access: ['7']
            },
            component: () => import('@/view/multilevel/level-2-1.vue')
          }
        ]
      },
      {
        path: 'level_2_2',
        name: 'level_2_2',
        meta: {
          icon: 'md-funnel',
          title: '火车/高铁票',
          showAlways: true,
          access: ['8']
        },
        component: parentView,
        children: [
          {
            path: 'level_2_21',
            name: 'level_2_21',
            meta: {
              icon: 'md-funnel',
              title: '购票',
              access: ['9']
            },
            component: () => import('@/view/multilevel/level-2-2/level-3-1.vue')
          },
          {
            path: 'level_2_22',
            name: 'level_2_22',
            meta: {
              icon: 'md-funnel',
              title: '退票',
              access: ['10']
            },
            component: () => import('@/view/multilevel/level-2-2/level-3-1.vue')
          }
        ]
      },
      {
        path: 'level_2_3',
        name: 'level_2_3',
        meta: {
          icon: 'md-funnel',
          title: '船票',
          showAlways: true,
          access: ['11']
        },
        component: parentView,
        children: [
          {
            path: 'level_2_31',
            name: 'level_2_31',
            meta: {
              icon: 'md-funnel',
              title: '购票',
              access: ['12']
            },
            component: () => import('@/view/multilevel/level-2-3.vue')
          },
          {
            path: 'level_2_32',
            name: 'level_2_32',
            meta: {
              icon: 'md-funnel',
              title: '退票',
              access: ['13']
            },
            component: () => import('@/view/multilevel/level-2-3.vue')
          }
        ]
      }
    ]
  }, */
  {
    path: '/xtgl',
    name: 'xtgl',
    meta: {
      icon: 'md-menu',
      title: '系统管理',
      showAlways: true,
      access: ['sys:manage']
    },
    component: Main,
    children: [
      {
        path: 'user',
        name: 'user',
        meta: {
          icon: 'md-funnel',
          title: '用户管理',
          access: ['sys:user:list']
        },
        component: () => import('@/view/xtgl/user/user.vue')
      },
      {
        path: 'role',
        name: 'role',
        meta: {
          icon: 'md-funnel',
          title: '角色管理',
          access: ['sys:role:list']
        },
        component: () => import('@/view/xtgl/role/role.vue')
      },
      {
        path: 'menu',
        name: 'menu',
        meta: {
          icon: 'md-funnel',
          title: '菜单管理',
          access: ['sys:menu:list']
        },
        component: () => import('@/view/xtgl/menu/menu.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
