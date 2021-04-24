export default {
	pages: [
		'pages/loading/index', // 入口页面
	],
	subpackages: [
		{
			root: 'pages/main', // 首页
			pages: ['index'],
		},
		{
			root: 'pages/page-abc', // 公共组件页
			pages: ['index'],
		},
	],
	preloadRule: {},
	window: {
		navigationStyle: 'custom', // 关掉微信顶部导航
		backgroundTextStyle: 'dark', // 'light'-浅色风格 'dark'-深色风格
		navigationBarBackgroundColor: '#fff',
		navigationBarTitleText: 'WeChat',
		navigationBarTextStyle: 'black',
		onReachBottomDistance: 200, // 触发上拉刷新
		enablePullDownRefresh: false, // 开启下拉刷新
	},
}
