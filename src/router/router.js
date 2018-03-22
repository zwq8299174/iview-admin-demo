import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/login.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: () => import('@/views/form/article-publish/preview.vue')
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: () => import('@/views/home/home.vue') },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: () => import('@/views/own-space/own-space.vue') },
        { path: 'order/:order_id', title: '订单详情', name: 'order-info', component: () => import('@/views/advanced-router/component/order-info.vue') }, // 用于展示动态路由
        { path: 'shopping', title: '购物详情', name: 'shopping', component: () => import('@/views/advanced-router/component/shopping-info.vue') }, // 用于展示带参路由
        { path: 'message', title: '消息中心', name: 'message_index', component: () => import('@/views/message/message.vue') }
    ]
};

// 作为Main组件的子页面展示并且在顶部主导航显示的路由写在navRouter里
export const navRouter = [
	{
		path: '/dashboard',
		name: 'dashboard',
		title: '我的面板',
		redirect: '/workbench',
		component: Main
	},
	{
		path: '/office',
		name: 'office',
		title: '在线办公',
		redirect: '/workbench',
		component: Main
	},
	{
		path: '/cms',
		name: 'cms',
		title: '内容管理',
		redirect: '/workbench',
		component: Main
	},
	{
		path: '/system',
		name: 'system',
		title: '系统设置',
		redirect: '/group-user',
		component: Main
	},
	{
		path: '/code',
		name: 'code',
		title: '代码生成',
		redirect: '/example',
		component: Main
	}
];


// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
	{
        path: '/workbench',
        icon: 'key',
        name: 'workbench',
		nav: 'dashboard',
        title: '个人信息',
        component: Main,
		redirect: '/workbench/index',
        children: [
            {
				path: 'index',
				title: '我的工作台',
				name: 'workbench_index',
				component: () => import('@/views/dashboard/workbench/workbench.vue')
			}
        ]
    },
	{
        path: '/group-user',
        icon: 'person-stalker',
        name: 'group-user',
		nav: 'system',
        title: '机构用户',
        component: Main,
		redirect: '/group-user/user',
        children: [
            { path: 'user', title: '用户管理',icon: 'person', name: 'group-user_user', component: () => import('@/views/system/group-user/user.vue') },
			{ path: 'group', title: '机构管理',icon: 'icon-jigou', name: 'group-user_group', component: () => import('@/views/system/group-user/group.vue') },
			{ path: 'area', title: '区域管理', icon: 'icon-quyu',name: 'group-user_area', component: () => import('@/views/system/group-user/area.vue') }
        ]
    },
	{
        path: '/system-setting',
        icon: 'settings',
        name: 'system-setting',
		nav: 'system',
        title: '系统设置',
        component: Main,
		redirect: '/system-setting/menu',
        children: [
			{
				path: 'menu',
				title: '菜单管理',
				icon: 'android-menu',
				name: 'system-setting_menu',
				component: () => import('@/views/system/system/menu.vue')
			},
			{
				path: 'role',
				title: '角色管理',
				icon: 'android-contact',
				name: 'system-setting_role',
				component: () => import('@/views/system/system/role.vue')
			},
			{
				path: 'diction',
				title: '字典管理',
				icon: 'ios-book',
				name: 'system-setting_diction',
				component: () => import('@/views/system/system/dict.vue')
			}
		]
	},
	{
        path: '/console',
        icon: 'clipboard',
        name: 'console',
		nav: 'system',
        title: '日志查询',
        component: Main,
		redirect: '/console/logquery',
        children: [
			{
				path: 'logquery',
				title: '日志查询',
				icon: 'cloud',
				name: 'console_logquery',
				component: () => import('@/views/system/group-user/user.vue')
			},
			{
				path: 'monitor',
				title: '连接池监视',
				icon: 'easel',
				name: 'console_monitor',
				component: () => import('@/views/system/group-user/user.vue')
			}
		]
	},
	{
        path: '/code-gen',
        icon: 'clipboard',
        name: 'code-gen',
		nav: 'code',
        title: '代码生成',
        component: Main,
		redirect: '/code-gen/logquery',
        children: [
			{
				path: 'menu',
				title: '代码生成',
				icon: 'android-menu',
				name: 'system-setting_user',
				component: () => import('@/views/system/group-user/user.vue')
			}
		]
	},
	{
        path: '/example',
        icon: 'clipboard',
        name: 'example',
		nav: 'code',
        title: '生成示例',
        component: Main,
		redirect: '/example/single-table',
        children: [
			{
				path: 'teacher',
				title: '教师测试',
				icon: 'ios-list-outline',
				name: 'teacher',
				component: () => import('@/views/modules/teacher2.vue')
			},
			{
				path: 'single-table',
				title: '单表',
				icon: 'ios-list-outline',
				name: 'example_single-table',
				component: () => import('@/views/code/example/single-table.vue')
			},
			{
				path: 'multilevel-table',
				title: '主子表',
				icon: 'ios-copy-outline',
				name: 'example_multilevel-table',
				component: () => import('@/views/code/example/multilevel-table.vue')
			}
		]
	},
    // {
    //     path: '/access',
    //     icon: 'key',
    //     name: 'access',
    //     title: '权限管理',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '权限管理', name: 'access_index', component: () => import('@/views/access/access.vue') }
    //     ]
    // },
    // {
    //     path: '/access-test',
    //     icon: 'lock-combination',
    //     title: '权限测试页',
    //     name: 'accesstest',
    //     access: 0,
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '权限测试页', name: 'accesstest_index', access: 0, component: () => import('@/views/access/access-test.vue') }
    //     ]
    // },
    // {
    //     path: '/international',
    //     icon: 'earth',
    //     title: {i18n: 'international'},
    //     name: 'international',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: {i18n: 'international'}, name: 'international_index', component: () => import('@/views/international/international.vue') }
    //     ]
    // },
    // {
    //     path: '/component',
    //     icon: 'social-buffer',
    //     name: 'component',
    //     title: '组件',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'text-editor',
    //             icon: 'compose',
    //             name: 'text-editor',
    //             title: '富文本编辑器',
    //             component: () => import('@/views/my-components/text-editor/text-editor.vue')
    //         },
    //         {
    //             path: 'md-editor',
    //             icon: 'pound',
    //             name: 'md-editor',
    //             title: 'Markdown编辑器',
    //             component: () => import('@/views/my-components/markdown-editor/markdown-editor.vue')
    //         },
    //         {
    //             path: 'image-editor',
    //             icon: 'crop',
    //             name: 'image-editor',
    //             title: '图片预览编辑',
    //             component: () => import('@/views/my-components/image-editor/image-editor.vue')
    //         },
    //         {
    //             path: 'draggable-list',
    //             icon: 'arrow-move',
    //             name: 'draggable-list',
    //             title: '可拖拽列表',
    //             component: () => import('@/views/my-components/draggable-list/draggable-list.vue')
    //         },
    //         {
    //             path: 'area-linkage',
    //             icon: 'ios-more',
    //             name: 'area-linkage',
    //             title: '城市级联',
    //             component: () => import('@/views/my-components/area-linkage/area-linkage.vue')
    //         },
    //         {
    //             path: 'file-upload',
    //             icon: 'android-upload',
    //             name: 'file-upload',
    //             title: '文件上传',
    //             component: () => import('@/views/my-components/file-upload/file-upload.vue')
    //         },
    //         {
    //             path: 'count-to',
    //             icon: 'arrow-graph-up-right',
    //             name: 'count-to',
    //             title: '数字渐变',
    //             // component: () => import('@/views/my-components/count-to/count-to.vue')
    //             component: () => import('@/views/my-components/count-to/count-to.vue')
    //         },
    //         {
    //             path: 'split-pane-page',
    //             icon: 'ios-pause',
    //             name: 'split-pane-page',
    //             title: 'split-pane',
    //             component: () => import('@/views/my-components/split-pane/split-pane-page.vue')
    //         }
    //     ]
    // },
    // {
    //     path: '/form',
    //     icon: 'android-checkbox',
    //     name: 'form',
    //     title: '表单编辑',
    //     component: Main,
    //     children: [
    //         { path: 'artical-publish', title: '文章发布', name: 'artical-publish', icon: 'compose', component: () => import('@/views/form/article-publish/article-publish.vue') },
    //         { path: 'workflow', title: '工作流', name: 'workflow', icon: 'arrow-swap', component: () => import('@/views/form/work-flow/work-flow.vue') }
	//
    //     ]
    // },
    // // {
    // //     path: '/charts',
    // //     icon: 'ios-analytics',
    // //     name: 'charts',
    // //     title: '图表',
    // //     component: Main,
    // //     children: [
    // //         { path: 'pie', title: '饼状图', name: 'pie', icon: 'ios-pie', component: resolve => { require('@/views/access/access.vue') },
    // //         { path: 'histogram', title: '柱状图', name: 'histogram', icon: 'stats-bars', component: resolve => { require('@/views/access/access.vue') }
	//
    // //     ]
    // // },
    // {
    //     path: '/tables',
    //     icon: 'ios-grid-view',
    //     name: 'tables',
    //     title: '表格',
    //     component: Main,
    //     children: [
    //         { path: 'dragableTable', title: '可拖拽排序', name: 'dragable-table', icon: 'arrow-move', component: () => import('@/views/tables/dragable-table.vue') },
    //         { path: 'editableTable', title: '可编辑表格', name: 'editable-table', icon: 'edit', component: () => import('@/views/tables/editable-table.vue') },
    //         { path: 'searchableTable', title: '可搜索表格', name: 'searchable-table', icon: 'search', component: () => import('@/views/tables/searchable-table.vue') },
    //         { path: 'exportableTable', title: '表格导出数据', name: 'exportable-table', icon: 'code-download', component: () => import('@/views/tables/exportable-table.vue') },
    //         { path: 'table2image', title: '表格转图片', name: 'table-to-image', icon: 'images', component: () => import('@/views/tables/table-to-image.vue') }
    //     ]
    // },
    // {
    //     path: '/advanced-router',
    //     icon: 'ios-infinite',
    //     name: 'advanced-router',
    //     title: '高级路由',
    //     component: Main,
    //     children: [
    //         { path: 'mutative-router', title: '动态路由', name: 'mutative-router', icon: 'link', component: () => import('@/views/advanced-router/mutative-router.vue') },
    //         { path: 'argument-page', title: '带参页面', name: 'argument-page', icon: 'android-send', component: () => import('@/views/advanced-router/argument-page.vue') }
    //     ]
    // },
    // {
    //     path: '/error-page',
    //     icon: 'android-sad',
    //     title: '错误页面',
    //     name: 'errorpage',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '错误页面', name: 'errorpage_index', component: () => import('@/views/error-page/error-page.vue') }
    //     ]
    // }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    preview,
    locking,
	...navRouter,
    ...appRouter,
    page500,
    page403,
    page404
];
