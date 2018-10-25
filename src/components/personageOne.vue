<template>
	<div id="personageOne">
		<big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
		<div class="main">
			<div class="banner">
				<mt-swipe :auto="4000">
					<mt-swipe-item v-for="item in bgImg" :key="item.id">
						<div class="mtimg">
							<img :src="item.img_url" class="images" @click="clickImg($event)" v-if="!showImg" />
						</div>
					</mt-swipe-item>
				</mt-swipe>
			</div>
			<div class="main_top">
				<div class="mainname">
					<ul class="mainnametop">
						<li>用户名：
							<span>{{inn.true_name}}</span>
						</li>
						<li>相亲编号：{{member.numbering}}</li>
					</ul>
					<div class="mainnamebottom">
						<div class="mainnameleft">
							<ul>
								<li>
									年龄：
									<span>{{inn.age}}岁</span>
								</li>
								<li>
									民族：
									<span>{{inn.nation}}</span>
								</li>
								<li>
									体重：
									<span>{{inn.weight}}kg</span>
								</li>
								<li>
									最高教育程度：
									<span>{{inn.education}}</span>
								</li>
								<li>
									月收入：
									<span>{{inn.income}}</span>
								</li>
								<li>
									子女情况：
									<span v-if="inn.children_status==0">无</span>
									<span v-if="inn.children_status==1">有</span>
								</li>
							</ul>
						</div>
						<div class="mainnameright">
							<ul>
								<li>
									性别：
									<span>{{inn.sex}}</span>
								</li>
								<li>
									身高：
									<span>{{inn.height}}cm</span>
								</li>
								<li>
									婚姻状况：
									<span v-if="inn.marital==1">未婚</span>
									<span v-if="inn.marital==2">离异</span>
									<span v-if="inn.marital==3">丧偶</span>
								</li>
								<li>
									职业及职务：
									<span>{{inn.worker}}</span>
								</li>
								<li>
									住房情况：
									<span v-if="inn.house_status==0">无</span>
									<span v-if="inn.house_status==1">租房</span>
									<span v-if="inn.house_status==2">自有住房</span>
									<span v-if="inn.house_status==3">其它</span>
								</li>
								<li>特长爱好：
									<span>{{inn.hobby}}</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="mainfoot">
				<div class="mainfootbox">
					<ul>
						<li class="top">择偶标准</li>
						<li class="bottom">
							<div class="mainfootboxleft">
								<ul>
									<li>
										年龄段：
										<span v-if="con.age==''">不限</span>
										<span>{{con.age}}</span>
									</li>
									<li>
										身高：
										<span v-if="con.height==''">不限</span>
										<span>{{con.height}}</span>
									</li>
									<li>
										月收入：
										<span v-if="con.income==''">不限</span>
										<span>{{con.income}}</span>
									</li>
									<li>
										户籍所在地：
										<span v-if="con.household_register_address_cn==''">不限</span>
										<span>{{con.household_register_address_cn}}</span>
									</li>
									<li>
										子女情况：
										<span v-if="con.children_status==0">不限</span>
										<span v-if="con.children_status==1">无</span>
										<span v-if="con.children_status==2">有</span>
									</li>
									<li>
										特长爱好：
										<span v-if="con.hobby==''">不限</span>
										<span>{{con.hobby}}</span>
									</li>
								</ul>
							</div>
							<div class="mainfootboxright">
								<ul>
									<li>
										民族：
										<span v-if="con.nation==''">不限</span>
										<span>{{con.nation}}</span>
									</li>
									<li>
										体重：
										<span v-if="con.weight==''">不限</span>
										<span>{{con.weight}}</span>
									</li>
									<li>
										婚姻状况：
										<!--<span>{{con.marital}}</span>-->
										<span v-if="con.marital===[1]">未婚</span>
										<span v-if="con.marital===[2]">离异</span>
										<span v-if="con.marital===[3]">丧偶</span>
										<span v-if="con.marital==[1,2]">未婚 离异</span>
										<span v-if="con.marital===[1,3]">未婚 丧偶</span>
										<span v-if="con.marital===[2,3]">离异 丧偶</span>
										<span v-else>不限</span>
									</li>
									<li>
										居住地：
										<span v-if="con.address_cn==''">不限</span>
										<span>{{con.address_cn}}</span>
									</li>
									<li>
										住房情况：
										<span v-if="con.house_status==0">无</span>
										<span v-if="con.house_status==1">租房</span>
										<span v-if="con.house_status==2">自有住房</span>
										<span v-if="con.house_status==3">其它</span>
									</li>
								</ul>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="footer">
			<el-button type="text" @click="okk">已同意</el-button>
		</div>
	</div>
</template>

<script>
	import {
		Swiper
	} from 'vux'
	import { Indicator } from 'mint-ui';
	import BigImg from '@/components/BigImg.vue';
	export default {
		name: "personageOne",
		components: {
			Swiper,
			'big-img': BigImg
		},
		data() {
			return {
				arr: [],
				isCheck: false,
				listId: "", //bus传递的数据
				member: {}, //存储的数据
				time: "this is a good time",
				likeType: false, //对他心动
				successType: false, //成功状态
				goType: false, //在一次
				bgImg: [],
				// 数据id
				sumId: "",
				watch: true,
				watchoff: false,
				tokenNew: "",
				productId: null,
				inn: {},
				con: {},
				demoId: '',
				alertMark: false,
				isCare: null, //是否关注
				house: [{
					id: 0,
					info: "无"
				}, {
					id: 1,
					info: "租房"
				}, {
					id: 0,
					info: "自有住房"
				}, {
					id: 0,
					info: "其他"
				}],
				payId: null,
				income: '',
				dqurl: "",
				showImg: false,
				imgSrc: ''
			};
		},
		created() {
			this.tokenNew = sessionStorage.getItem("Token");
			this.sumId = this.$route.params.id;
			this.messageId = this.$route.params.meId
			this.personalData();
			window.scroll(0, 0);
			this.dqurl = window.location.href;
		},
		methods: {
			clickImg(e) {
				this.showImg = true;
				// 获取当前图片地址
				this.imgSrc = e.currentTarget.src;
			},
			viewImg() {
				this.showImg = false;
			},
			//个人详情数据
			personalData() {
				Indicator.open({
					text: 'Loading...',
					spinnerType: 'fading-circle'
				});
				var _this = this;
				this.$http({
						method: "get",
						url: "http://yinhan-media.weiyingjia.org/api/yinhan/member/" + _this.sumId,
						params: {},
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + this.tokenNew
						}
					})
					.then(res => {
						Indicator.close();
						console.log(res.data.data)
						_this.productId = res.data.data.id
						_this.member = res.data.data;
						_this.inn = res.data.data.in;
						_this.con = res.data.data.con;
						_this.isCare = res.data.data.follow; //是否关注 1是 0否
						switch(this.isCare) {
							case 0: //未关注 要让他光注
								this.watch = true;
								this.watchoff = false;
								break;
							case 1:
								this.watchoff = true;
								this.watch = false;
								break;
						}
						console.log(res.data.data.image)
						_this.bgImg = res.data.data.image.slice(0, 4);
						//						_this.bgImg = res.data.data.image;
					})
					.catch(res => {
						Indicator.close();
						console.log(res);
					});
			},
			okk() {
				var _this = this;
				this.$router.push({
					path: '/eachOther',
					name: 'eachOther',
					params: {
						liker: _this.messageId,
						type: 1
					}
				});
			},
		},
	};
</script>

<style>
	#personageOne {
		overflow-x: hidden;
	}
	
	#personageOne .head {
		width: 100%;
		line-height: 3rem;
		font-size: 1.5rem;
		color: #000;
		padding-left: 1rem;
	}
	
	#personageOne .banner {
		width: 100%;
		height: 14rem;
		padding-bottom: 4rem;
	}
	
	#personageOne .banner>img {
		width: 100%;
		max-width: 100%;
		height: 100%;
	}
	
	#personageOne .mark_content p {
		width: 100%;
		line-height: 2.5rem;
		text-align: center;
	}
	
	#personageOne .btn {
		padding: 1rem 0;
		display: flex;
		justify-content: space-around;
	}
	
	#personageOne .btn span {
		border-radius: 3px;
		background: #B674FD;
		color: #FFFFFF;
		/*border: 1px solid #cccccc;*/
		padding: 0.5rem 1.2rem;
	}
	
	#personageOne .btn span:hover {
		border: 1px solid #b674fd;
		color: #b674fd;
	}
	
	#personageOne {
		position: relative;
		margin-bottom: 4rem;
	}
	
	#personageOne .main {
		width: 94.7%;
		margin: 0 auto;
		padding-bottom: 3rem;
		padding-top: 1rem;
		border-top: 1px solid #f5f5f5;
	}
	
	#personageOne .main_top {
		width: 100%;
		background: #ffffff;
		box-shadow: 0 2px 9px 0 #eeeeee;
		border-radius: 3px;
	}
	
	#personageOne .mainname {
		width: 95%;
		margin: 0 auto;
	}
	
	#personageOne .mainnametop {
		border-bottom: 1px solid #f5f5f5;
		display: flex;
		justify-content: space-between;
		padding: 0.6rem 0;
	}
	
	#personageOne .mainnametop li:first-child {
		font-size: 1.2rem;
		color: #666666;
		letter-spacing: 0;
	}
	
	#personageOne .mainnametop li:first-child span {
		color: #151515;
	}
	
	#personageOne .mainnametop li:last-child {
		font-size: 1rem;
		color: #b674fd;
		margin-top: 0.35rem;
	}
	
	#personageOne .mainnamebottom {
		margin-top: 0.5rem;
		display: flex;
	}
	
	#personageOne .mainnamebottom li {
		font-size: 1.08rem;
		color: #666666;
		letter-spacing: 0;
		line-height: 2.5;
	}
	
	#personageOne .mainnamebottom li span {
		color: #151515;
	}
	
	#personageOne .mainnameright {
		margin-left: 2.8rem;
	}
	
	#personageOne .speciality li {
		line-height: 2.5;
		font-size: 1.08rem;
		color: #666666;
		letter-spacing: 0;
	}
	
	#personageOne .speciality li span {
		color: #151515;
	}
	
	#personageOne .mainfoot {
		margin-top: 0.8rem;
		width: 100%;
		box-shadow: 0 2px 9px 0 #eeeeee;
		border-radius: 3px;
	}
	
	#personageOne .mainfootboxright {
		margin-right: 3rem;
	}
	
	#personageOne .mainfootbox {
		width: 95%;
		margin: 0 auto;
	}
	
	#personageOne .top {
		padding: 1rem 0 1.3rem 0;
		font-size: 1.2rem;
		color: black;
		font-weight: bolder;
	}
	
	#personageOne .bottom {
		display: flex;
		justify-content: space-between;
	}
	
	#personageOne .bottom li {
		line-height: 2.5;
		font-size: 1.08rem;
		color: #666666;
		letter-spacing: 0;
	}
	
	#personageOne .bottom li span {
		color: #151515;
	}
	/* 弹出层 */
	
	#personageOne .mark {
		overflow: hidden;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 9999;
	}
	
	#personageOne .mark_content {
		position: absolute;
		padding-bottom: 1rem;
		top: 50%;
		left: 50%;
		width: 82%;
		transform: translate(-50%, -50%);
		background-color: #FFFFFF;
		color: #000;
		border: 1px solid #ccc;
		border-radius: 5px;
		line-height: 3;
		text-align: center;
	}
	
	#personageOne .mark_content>h2 {
		position: relative;
		text-align: left;
		line-height: 4rem;
		font-size: 1.7rem;
		border-bottom: 1px solid #eeeeee;
	}
	
	#personageOne .dele {
		position: absolute;
		top: 120%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		width: 2.8rem;
		height: 2.8rem;
		line-height: 2.8rem;
		border-radius: 50%;
		background: #eeeeee;
		font-size: 2rem;
		color: #b674fd;
		border: 1px solid #b674fd;
	}
	
	#personageOne .el-message-box--center {
		width: 80%;
		position: absolute;
		top: 40%;
		/* left: 10%; */
		margin: auto;
		position: absolute;
		left: 0;
		right: 0;
		/* top: 0; */
		/* bottom: 0; */
	}
	
	#personageOne .btn {
		line-height: 1.5;
	}
	
	#personageOne .images {
		margin: 0 auto;
		width: 9rem;
		height: 100%;
	}
	
	.mint-swipe-items-wrap {
		width: 100%;
	}
	
	.vue-directive-image-previewer .wrapper {
		z-index: 999;
	}
	
	.vue-directive-image-previewer-pic {
		z-index: 999;
	}
	
	.mtimg {
		display: flex;
		width: 100%;
		height: 100%;
	}
	
	#personageOne .footer {
		width: 100%;
		display: flex;
		padding-bottom: 3rem;
		justify-content: space-around;
		/*padding: 3rem 0;*/
	}
	
	#personageOne .footer button {
		/* padding: 0.8rem 0;
		width: 10.7rem; */
		width: 35%;
		font-size: 0.9rem;
	}
	/*#personageOne .footer button:first-child {
		background: #ffffff;
		border: 1px solid #b674fd;
		box-shadow: 0 2px 4px 0 rgba(182, 116, 253, 0.39);
		border-radius: 3px;
		color: #b674fd;
	}*/
	
	#personageOne .footer button:first-child {
		background: #b674fd;
		box-shadow: 0 2px 4px 0 rgba(182, 116, 253, 0.39);
		border-radius: 3px;
		color: #ffffff;
	}
</style>
