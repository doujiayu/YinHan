import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import options from '@/components/options'
import login from '@/components/login'
import account from '@/components/account'
import me from '@/components/me'
import mine from '@/components/mine'
import Encounter from '@/components/Encounter'
import DetailPage from '@/components/DetailPage'
import meinterest from '@/components/meinterest'
import interestme from '@/components/interestme'
import agreement from '@/components/agreement'
import Album from '@/components/Album'
import meheartbeat from '@/components/meheartbeat'
import heartbeatme from '@/components/heartbeatme'
import payment from '@/components/payment'
import Info from '@/components/Info'
import record from '@/components/record'
import advices from '@/components/advices'
import eachOther from '@/components/eachOther'
import redact from '@/components/redact'
import details from '@/components/details'
import BigImg from '@/components/BigImg'
import index from '@/components/index'
import particulars from '@/components/particulars'
import personage from '@/components/personage'
import personageOne from '@/components/personageOne'
import personageTwo from '@/components/personageTwo'
import personageThree from '@/components/personageThree'

// import weblogin from '@/components/weblogin'

Vue.use(Router)

export default new Router({
	//消除路由中的#号
	//	mode: "history",
	routes: [{
		//主页
		path: "/",
		redirect: "./index/home",
		meta: {
			navShow: true,
			keepAlive: true
		},
	}, {
		//底部导航
		name: "index",
		path: "/index",
		component: index,
		children: [{
			name: "home",
			path: "home",
			meta: {
				title: "首页",
				navShow: true,
				keepAlive: true
			},
			component: home
		}, {
			name: "mine",
			path: "mine",
			meta: {
				title: "我的",
				navShow: true,
				keepAlive: false
			},
			component: mine
		}, {
			//消息详情
			path: '/details/:id',
			name: 'details',
			component: details,
			meta: {
				navShow: true,
				keepAlive: false
			}
		}, {
			name: "Encounter",
			path: "Encounter",
			meta: {
				title: "邂逅",
				navShow: true,
				keepAlive: false
			},
			component: Encounter
		}, {
			//详情
			path: '/options/:id',
			name: 'options',
			component: options,
			meta: {
				navShow: true,
				keepAlive: false
			}
		}, {
			//登录
			path: '/login',
			name: 'login',
			component: login,
			meta: {
				navShow: false,
				keepAlive: false
			}
		}, {
			//账号管理
			path: '/account',
			name: 'account',
			component: account,
			meta: {
				navShow: true,
				keepAlive: false
			}
		}, {
			//消息
			path: '/me',
			name: 'me',
			component: me,
			meta: {
				navShow: true,
				keepAlive: false
			}
		}, {
			//邂逅详情
			path: '/DetailPage',
			name: 'DetailPage',
			component: DetailPage,
			meta: {
				navShow: true,
				keepAlive: false
			}
		}, {
			//我的关注
			path: '/meinterest',
			name: 'meinterest',
			component: meinterest,
			meta: {
				navShow: true,
				keepAlive: false
			}
		}, {
			//关注我的
			path: '/interestme',
			name: 'interestme',
			component: interestme,
			meta: {
				navShow: true,
				keepAlive: false
			}
		}, {
			//注册协议
			path: '/agreement',
			name: 'agreement',
			component: agreement,
			meta: {
				navShow: true,
				keepAlive: false
			}
		}, {
			//我的相册
			path: '/Album',
			name: 'Album',
			component: Album,
			meta: {
				navShow: true,
				keepAlive: false
			}
		}, {
			//我心动的
			path: '/meheartbeat',
			name: 'meheartbeat',
			component: meheartbeat,
			meta: {
				navShow: true,
				keepAlive: false
			}
		}, {
			//对我心动
			path: '/heartbeatme',
			name: 'heartbeatme',
			component: heartbeatme,
			meta: {
				navShow: true,
				keepAlive: false
			}
		}, {
			//支付记录
			path: '/payment',
			name: 'payment',
			component: payment,
			meta: {
				navShow: true,
				keepAlive: false
			}
		}, {
			//完善信息
			path: '/Info',
			name: 'Info',
			component: Info,
			meta: {
				navShow: false,
				keepAlive: false
			}
		}, {
			//邂逅记录
			path: '/record',
			name: 'record',
			component: record,
			meta: {
				navShow: true,
				keepAlive: false
			}
		}, {
			//对方向你打了招呼
			path: '/advices',
			name: 'advices',
			component: advices,
			meta: {
				navShow: true,
				keepAlive: false
			}
		}, {
			//彼此心动
			path: '/eachOther',
			name: 'eachOther',
			component: eachOther,
			meta: {
				navShow: true,
				keepAlive: false
			}
		}, {
			//编辑信息
			path: '/redact',
			name: 'redact',
			component: redact,
			meta: {
				navShow: false,
				keepAlive: false
			}
		}, {
			//邂逅成功详情 显示邀约中
			path: '/particulars/:id',//显示邀约中
			name: 'particulars',
			component: particulars,
			meta: {
				navShow: true,
				keepAlive: false
			}
		}, {
			//心动成功详情   显示拒绝同意
			path: '/personage/:id',
			name: 'personage',
			component: personage,
			meta: {
				navShow: true,
				keepAlive: false
			}
		}, {
			//心动成功详情   显示同意
			path: '/personageOne/:id',
			name: 'personageOne',
			component: personageOne,
			meta: {
				navShow: true,
				keepAlive: false
			}
		}, {
			//心动成功详情   显示拒绝和再次邀请
			path: '/personageTwo/:id',
			name: 'personageTwo',
			component: personageTwo,
			meta: {
				navShow: true,
				keepAlive: false
			}
		}, {
			//心动成功详情   显示拒绝
			path: '/personageThree/:id',
			name: 'personageThree',
			component: personageThree,
			meta: {
				navShow: true,
				keepAlive: false
			}
		}]
	}, {
		//主页
		path: '/BigImg',
		name: 'BigImg',
		component: BigImg,
		meta: {
			navShow: true,
		}
	}]
})
