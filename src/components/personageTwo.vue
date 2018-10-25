<template>
	<div id="personageTwo">
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
			<el-button type="text" style="color: rgb(153, 153, 153);">已拒绝</el-button>
			<el-button type="text" @click="open6">再次心动</el-button>
		</div>
		<!-- 对他心动 -->
		<div class="mark" v-show='likeType'>
			<div class="mark_content">
				<h2 style='font-size:1.4rem;  text-align:center;'>对ta心动</h2>
				<!--<p>送ta19.9元的鲜花 </p>-->
				<p>内测期间暂不收费 </p>
				<p>如果对方回赠鲜花 双方即可获得联系方式！</p>
				<div class="btn">
					<span @click='goLike(0)'>取消</span>
					<span @click='goLike(3)'>求牵</span>
				</div>
			</div>
		</div>
		<div class="mark" v-show='successType'>
			<div class="mark_content">
				<h2 style='font-size:1.4rem;  text-align:center;'>恭喜您为爱支付成功！</h2>
				<p>您的鲜花已送达 请随时留意ta的应邀信息!</p>
				<div style='font-size:1rem'>【如果对方没有同意交换信息，您所支付的钱会在48小时之后，自动退到原账户中】 </div>
			</div>
		</div>
		<div class="mark" v-show='goType'>
			<div class="mark_content">
				<h2 style='font-size:1.4rem;  text-align:center;'>失败</h2>
				<p>很抱歉您的求牵失败！您是否需要向ta再次发起心动？</p>
				<div class="btn">
					<span @click='goLike(2)'>取消</span>
					<span @click='goLike(3)'>求牵</span>
				</div>
			</div>
		</div>
		<!--再次心动模态框-->
		<div class="mark" v-show='alertMark'>
			<div class="mark_content">
				<!--<h2 style='font-size:1.4rem;  text-align:center;'>您确定支付19.9元牵手成功吗？</h2>-->
				<h2 style='font-size:1.4rem;  text-align:center;'>内测期间暂不收费</h2>
				<div class="btn">
					<span @click='deleMark'>取消</span>
					<span @click="okFun">确定</span>
				</div>
			</div>
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
		name: "personageTwo",
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
				imgSrc: '',
				alertMark: false
			};
		},
		created() {
			this.tokenNew = sessionStorage.getItem("Token");
			this.sumId = this.$route.params.id;
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
			open6() {
				this.likeType = true;
				window.scroll(0, 0);
			},
			goLike(demo) {
				switch(demo) {
					case 0: //quxiao
						this.likeType = false; //喜换
						this.successType = false;
						this.goType = true; //取消
						break;
					case 3: //生成订单
						this.likeType = false; //喜换
						this.goType = false; //取消
						//						this.alertMark = true;
						this.$http({
							method: "post",
							url: "http://yinhan-media.weiyingjia.org/api/yinhan/order",
							params: {
								ordertype: 1,
								product_id: this.productId,
								price: 0,
								total: 1
							},
							headers: {
								Authorization: "Bearer " + this.tokenNew
							}
						}).then(res => {
							this.payId = res.data.data.id
							this.alertMark = true;
							this.successType = false;
						}).catch(res => {
							console.log(res.response.data.message);
							this.$message.error({
								message: res.response.data.message,
								duration: 60000
							});
						});
						break;
					case 2: //quxiao
						this.likeType = false; //喜换
						this.successType = false;
						this.goType = false; //取消
						break;
				}
			},
			okFun() {
				this.$http({
						method: "post",
						url: "http://yinhan-media.weiyingjia.org/api/yinhan/order/pay",
						params: {
							id: this.payId
						},
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + this.tokenNew
						}
					})
					.then(res => {
						this.alertMark = false;
						this.successType = true;
						setTimeout(() => {
							this.$router.push({
								path: "/payment"
							});
						}, 8000);
					})
					.catch(res => {
						console.log(res);
					});
			},
			deleMark() {
				this.alertMark = false;
				this.$message.error({
					message: "您已生成求牵记录,请在我的支付、未支付中查看",
					duration: 6000
				});
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
			deleMark() {
				this.alertMark = false;
				this.$message.error({
					message: "您已生成求牵记录,请在我的支付、未支付中查看",
					duration: 6000
				});
			},
			okFun() {
				this.$http({
						method: "post",
						url: "http://yinhan-media.weiyingjia.org/api/yinhan/order/pay",
						params: {
							id: this.payId
						},
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + this.tokenNew
						}
					})
					.then(res => {
						this.alertMark = false;
						this.successType = true;
						this.$message.success({
							message: "支付成功",
							duration: 6000
						});
						setTimeout(() => {
							this.$router.push({
								path: "/payment"
							});
						}, 8000);
					})
					.catch(res => {
						console.log(res);
					});
			}
		},
	};
</script>

<style>
	#personageTwo {
		overflow-x: hidden;
	}
	
	#personageTwo .head {
		width: 100%;
		line-height: 3rem;
		font-size: 1.5rem;
		color: #000;
		padding-left: 1rem;
	}
	
	#personageTwo .banner {
		width: 100%;
		height: 14rem;
		padding-bottom: 4rem;
	}
	
	#personageTwo .banner>img {
		width: 100%;
		max-width: 100%;
		height: 100%;
	}
	
	#personageTwo .mark_content p {
		width: 100%;
		line-height: 2.5rem;
		text-align: center;
	}
	
	#personageTwo .btn {
		padding: 1rem 0;
		display: flex;
		justify-content: space-around;
	}
	
	#personageTwo .btn span {
		border-radius: 3px;
		background: #B674FD;
		color: #FFFFFF;
		/*border: 1px solid #cccccc;*/
		padding: 0.5rem 1.2rem;
	}
	
	#personageTwo .btn span:hover {
		border: 1px solid #b674fd;
		color: #b674fd;
	}
	
	#personageTwo {
		position: relative;
		margin-bottom: 4rem;
	}
	
	#personageTwo .main {
		width: 94.7%;
		margin: 0 auto;
		padding-bottom: 3rem;
		padding-top: 1rem;
		border-top: 1px solid #f5f5f5;
	}
	
	#personageTwo .main_top {
		width: 100%;
		background: #ffffff;
		box-shadow: 0 2px 9px 0 #eeeeee;
		border-radius: 3px;
	}
	
	#personageTwo .mainname {
		width: 95%;
		margin: 0 auto;
	}
	
	#personageTwo .mainnametop {
		border-bottom: 1px solid #f5f5f5;
		display: flex;
		justify-content: space-between;
		padding: 0.6rem 0;
	}
	
	#personageTwo .mainnametop li:first-child {
		font-size: 1.2rem;
		color: #666666;
		letter-spacing: 0;
	}
	
	#personageTwo .mainnametop li:first-child span {
		color: #151515;
	}
	
	#personageTwo .mainnametop li:last-child {
		font-size: 1rem;
		color: #b674fd;
		margin-top: 0.35rem;
	}
	
	#personageTwo .mainnamebottom {
		margin-top: 0.5rem;
		display: flex;
	}
	
	#personageTwo .mainnamebottom li {
		font-size: 1.08rem;
		color: #666666;
		letter-spacing: 0;
		line-height: 2.5;
	}
	
	#personageTwo .mainnamebottom li span {
		color: #151515;
	}
	
	#personageTwo .mainnameright {
		margin-left: 2.8rem;
	}
	
	#personageTwo .speciality li {
		line-height: 2.5;
		font-size: 1.08rem;
		color: #666666;
		letter-spacing: 0;
	}
	
	#personageTwo .speciality li span {
		color: #151515;
	}
	
	#personageTwo .mainfoot {
		margin-top: 0.8rem;
		width: 100%;
		box-shadow: 0 2px 9px 0 #eeeeee;
		border-radius: 3px;
	}
	
	#personageTwo .mainfootboxright {
		margin-right: 3rem;
	}
	
	#personageTwo .mainfootbox {
		width: 95%;
		margin: 0 auto;
	}
	
	#personageTwo .top {
		padding: 1rem 0 1.3rem 0;
		font-size: 1.2rem;
		color: black;
		font-weight: bolder;
	}
	
	#personageTwo .bottom {
		display: flex;
		justify-content: space-between;
	}
	
	#personageTwo .bottom li {
		line-height: 2.5;
		font-size: 1.08rem;
		color: #666666;
		letter-spacing: 0;
	}
	
	#personageTwo .bottom li span {
		color: #151515;
	}
	/* 弹出层 */
	
	#personageTwo .mark {
		overflow: hidden;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 9999;
	}
	
	#personageTwo .mark_content {
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
	
	#personageTwo .mark_content>h2 {
		position: relative;
		text-align: left;
		line-height: 4rem;
		font-size: 1.7rem;
		border-bottom: 1px solid #eeeeee;
	}
	
	#personageTwo .dele {
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
	
	#personageTwo .el-message-box--center {
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
	
	#personageTwo .btn {
		line-height: 1.5;
	}
	
	#personageTwo .images {
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
	
	#personageTwo .footer {
		width: 100%;
		display: flex;
		padding-bottom: 3rem;
		justify-content: space-around;
		/*padding: 3rem 0;*/
	}
	
	#personageTwo .footer button {
		/* padding: 0.8rem 0;
		width: 10.7rem; */
		width: 35%;
		font-size: 0.9rem;
	}
	
	#personageTwo .footer button:first-child {
		background: #ffffff;
		border: 1px solid #b674fd;
		box-shadow: 0 2px 4px 0 rgba(182, 116, 253, 0.39);
		border-radius: 3px;
		color: #b674fd;
	}
	
	#personageTwo .footer button:last-child {
		background: #b674fd;
		box-shadow: 0 2px 4px 0 rgba(182, 116, 253, 0.39);
		border-radius: 3px;
		color: #ffffff;
	}
	/*再次心动模态框
	
	#personageTwo .mark {
		overflow: hidden;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
	}
	
	#personageTwo .mark_content {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 85%;
		transform: translate(-50%, -50%);
		background-color: #fff;
		border: 1px solid #ccc;
		border-radius: 5px;
		padding-bottom: 2rem;
	}
	
	#personageTwo .mark_content>h2 {
		position: relative;
		text-align: center;
		line-height: 4rem;
		font-size: 1.6rem;
		border-bottom: 1px solid #eeeeee;
	}*/
</style>
