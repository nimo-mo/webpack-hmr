
module.exports = [{
	title: '报表总览',
	iconCls: 'dashboard',
	href: '#/dashboard',
	path: '/dashboard',
	module: 'dashboard'
},{
	title: '用户管理',
	iconCls: 'user',
	href: '#/user/list',
	path: '/user/list',
	module: 'user',
	children: [{
		title: '普通用户',
		href: '#/user/list',
		path: '/user/list'
	},{
		title: '讲师管理',
		href: '#/lecturer/list',
		path: '/lecturer/list'
	},{
		title: '助理管理',
		href: '#/assistant/list',
		path: '/assistant/list'
	}]
},{
	title: '课程管理',
	iconCls: 'tasks',
	href: '#/course/list/all',
	path: '/course',
	module: 'course',
	children: [{
		title: '所有课程',
		href: '#/course/list/all',
		path: '/course/list/all'
	},{
		title: '已发布课程',
		href: '#/course/list/published',
		path: '/course/list/published'
	}]
},{
	title: '教室管理',
	iconCls: 'university',
	href: '#/classroom/list',
	path: '/classroom/list',
	module: 'classroom'
},{
	title: '微信回复管理',
	iconCls: 'wechat',
	href: '#/message/list/pushed',
	path: '/message',
	module: 'message',
	children: [{
		title: '自动回复',
		href: '#/message/list/pushed',
		path: '/message/list/pushed'
	},{
		title: '对话回复',
		href: '#/message/list/121',
		path: '/message/list/121'
	}]
},{
	title: 'Admin Plus',
	iconCls: 'user-plus',
	href: '#/admin/list',
	path: '/admin/list',
	module: 'admin',
	children: [{
		title: '系统管理员',
		href: '#/admin/list',
		path: '/admin/list'
	},{
		title: '菜单管理',
		href: '#/admin/privilege',
		path: '/admin/privilege'
	}]
}];
