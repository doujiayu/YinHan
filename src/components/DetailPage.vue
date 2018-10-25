<template>
	<div id='wrapp' v-cloak>
		<div class="main">
			<div>
				<div class="banner_img">
					<img :src="listData.img" alt="">
				</div>
				<div class="title">
					<h1>{{listData.title}}</h1>
				</div>
				<div class="detail_info" v-html="listData.text">
				</div>
			</div>
			<div class="actives">
				<div class='content'>
					<div class="title">
						<h1>活动详情</h1>
					</div>
					<ul>
						<li>
							<span style="width: 6.7rem;">活动地区：</span>
							<span style="width: 100%;">{{listData.place}}</span>
						</li>
						<li>
							<span style="width: 6.7rem;">活动时间：</span>
							<span style="width: 100%;">{{listData.start}}-{{listData.end}}</span>
						</li>
						<li>
							<span style="width: 6.7rem;">报名费用：</span>
							<span style="width: 100%;">{{listData.price}}元，前一个月免费</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="btn" style="margin-bottom: 5rem;" @click='baoming' v-if="listData.user_active==0">
			<span>我要报名</span>
		</div>
		<div class="btn" style="margin-bottom: 5rem;" v-if="listData.user_active==1">
			<span>已报名</span>
		</div>
		<div class="btn" style="margin-bottom: 5rem;" v-if="listData.user_active==3">
			<span>活动已结束</span>
		</div>
		<div class="mark" v-show='isCheck'>
			<div class="mark_content">
				<h2>报名</h2>
				<ul>
					<li>
						<span>在这里，你会更快遇见有缘分的他/她！</span>
					</li>
					<li>
						<span>报名人数：</span>
						<span>
							<!--<span @click="cl" style="font-size: 1.5rem;" class="variation">-</span>-->
						<button class="btnn" @click="cl">-</button>
						<input class="inptt" type="number" v-model="num" />
						<!--<span @click="add" style="font-size: 1.5rem;" class="variation">+</span>-->
						<button class="btnn" @click="add">+</button>
						</span>
					</li>
					<li>
						<span>报名费用：</span>
						<span style='color:#F40166;'>{{listData.price}}元，前一个月免费</span>
					</li>
				</ul>
				<div class="dele">
					<button @click="isCheck=false">取消</button>
					<button @click='apply'>支付</button>
				</div>
			</div>
		</div>
		<div class="mark" v-show='alertMark'>
			<div class="mark_content">
				<h2 style='font-size:1.4rem;  text-align:center;'>您确定支付吗？</h2>
				<div class="btnnn">
					<span @click='deleMark'>取消</span>
					<span @click="okFun">确定</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { Indicator } from 'mint-ui';
	export default {
		name: "DetailPage",
		data() {
			return {
				isCheck: false,
				listData: [],
				applyId: "",
				tokenNew: "",
				num: 1,
				summId: "",
				alertMark: false,
				payId: null
			};
		},
		mounted() {
			this.summId = this.$route.query.id;
			this.tokenNew = sessionStorage.getItem("Token");
			this.activity();
		},
		methods: {
			activity() {
				Indicator.open({
					text: 'Loading...',
					spinnerType: 'fading-circle'
				});
				var _this = this;
				this.$http({
						method: "get",
						url: "http://yinhan-media.weiyingjia.org/api/yinhan/active/" + _this.summId,
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + this.tokenNew
						}
					}).then(res => {
						console.log(res)
						Indicator.close();
						//0 是没有报名 1 是报名 3 是活动已经结束
						var end = new Date(res.data.data.end).getTime();
						var now = new Date().getTime();
						if(end < now) {
							this.listData.user_active = 3;
						}
						_this.listData = res.data.data;
					})
					.catch(error => {
						Indicator.close();
						throw error;
					});
			},
			add() {
				this.num++;
			},
			cl() {
				if(this.num == 1) {
					this.num = 1;
				} else {
					this.num--;
				}
			},
			apply() {
				this.alertMark = true;
				this.isCheck = false
				if(localStorage.phone == 0) {
					this.$router.push({
						path: "/login"
					})
					return
				} else {
					var _this = this;
					this.$http({
						method: "post",
						url: "http://yinhan-media.weiyingjia.org/api/yinhan/order",
						data: {
							ordertype: 2,
							product_id: _this.summId,
							price: 0,
							total: _this.num
						},
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + this.tokenNew
						}
					}).then(res => {
						console.log(res)
						_this.payId = res.data.data.id
						_this.isCheck = false;
					}).catch(res => {
						this.$message.error({
							message: "报名活动人数已满",
							duration: 6000
						});
						this.isCheck = false
						this.alertMark = false
						throw res
					})
				}

			},
			baoming() {
				this.isCheck = !this.isCheck
				window.scroll(0, 0);
			},
			okFun() {
				var _this = this;
				this.$http({
					method: "post",
					url: "http://yinhan-media.weiyingjia.org/api/yinhan/order/pay",
					params: {
						id: _this.payId,
					},
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + this.tokenNew
					}
				}).then(res => {
					console.log(res)
					this.$message.success({
						message: "您已经支付成功哦！",
						duration: 6000
					});
					_this.isCheck = false;
					_this.$router.push({
						path: "/payment"
					});
				});
			},
			deleMark() {
				this.alertMark = false;
			},
		},
		created() {},
	};
</script>

<style>
	/*  */
	
	#wrapp {
		width: 100%;
		background: #FFFFFF!important;
	}
	
	#wrapp .main {
		display: block;
		margin: 0 auto;
		padding: 0 1rem;
		margin-top: 0.8rem;
	}
	
	#wrapp .main>div {
		/*padding-bottom: 1rem;*/
		box-shadow: 0 2px 10px 0 #eeeeee;
		border-radius: 3px;
	}
	
	#wrapp .banner_img {
		width: 100%;
		margin-bottom: 0.8rem;
		background: #ffffff;
		box-shadow: 0 2px 10px 0 #eeeeee;
		border-radius: 3px;
	}
	
	#wrapp .banner_img img {
		width: 100%;
		height: auto;
	}
	
	#wrapp .title {
		padding-left: 0.8rem;
		padding-right: 1rem;
		font-size: 1.7rem;
		padding-bottom: 0.5rem;
	}
	
	#wrapp .title>h1 {
		font-size: 1.21rem;
		border-bottom: 1px solid #eeeeee;
		line-height: 3rem;
	}
	
	#wrapp .detail_info {
		padding-left: 0.8rem;
		color: #666666;
		line-height: 1.8rem;
		overflow-x: hidden;
	}
	
	#wrapp .detail_info p img {
		width: 97%;
		height: auto;
	}
	
	#wrapp .detail_info p:nth-child(1) {
		/*background-color: #f00;*/
		text-indent: 0;
		margin-left: 0;
		padding-left: 0;
	}
	
	#wrapp .actives {
		margin-top: 1rem;
	}
	
	#wrapp .actives>.content {
		padding-bottom: 1rem;
		border: 1px solid #eeeeee;
		box-shadow: 0 2px 10px 0 #eeeeee;
		border-radius: 3px;
	}
	
	#wrapp .actives>div>ul>li {
		padding-left: 0.8rem;
		display: flex;
		line-height: 2.5rem;
		color: #666666;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrapp;
	}
	
	#wrapp .btn>span {
		text-align: center;
		color: #fff;
		display: block;
		margin: 2rem auto;
		width: 11rem;
		height: 3rem;
		line-height: 3rem;
		background: #b674fd;
		box-shadow: 0 2px 4px 0 rgba(182, 116, 253, 0.39);
		border-radius: 3px;
	}
	/* 弹出层 */
	
	#wrapp .mark {
		overflow: hidden;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
	}
	
	#wrapp .mark_content {
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
	
	#wrapp .mark_content>h2 {
		position: relative;
		text-align: center;
		line-height: 4rem;
		font-size: 1.6rem;
		border-bottom: 1px solid #eeeeee;
	}
	
	#wrapp .mark_content>ul {
		padding: 1rem;
	}
	
	#wrapp .mark_content>ul>li {
		display: flex;
		line-height: 2.5rem;
	}
	/*.dele {
		position: absolute;
		top: 120%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		width: 2rem;
		height: 2rem;
		line-height: 2.8rem;
		border-radius: 50%;
		background: #EEEEEE;
		font-size: 1rem;
		color: #A7A7A7;
	}*/
	
	#wrapp .dele {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}
	
	#wrapp .dele button {
		padding: 0.6rem 1.6rem;
		margin: 0 auto;
		display: block;
		background: #ffffff;
		border: 1px solid #b674fd;
		box-shadow: 0 2px 4px 0 rgba(182, 116, 253, 0.3);
		border-radius: 3px;
		font-size: 1.07rem;
		color: #b674fd;
	}
	
	#wrapp .variation {
		display: inline-block;
		padding: 0 1rem;
	}
	
	#wrapp .btnn {
		width: 3rem;
		background: #FFFFFF;
		font-size: 1.5rem;
		border: 1px solid #CCCCCC;
		float: left;
	}
	
	#wrapp .inptt {
		width: 4rem;
		text-align: center;
		font-size: 1.5rem;
		border: 1px solid #CCCCCC;
		float: left;
	}
	
	#wrapp .btnnn {
		line-height: 1.5;
		padding: 1rem 0;
		display: flex;
		justify-content: space-around;
	}
	
	#wrapp .btnnn span {
		border-radius: 3px;
		border: 1px solid #cccccc;
		padding: 0.5rem 1.2rem;
	}
</style>
