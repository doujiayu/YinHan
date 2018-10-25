<template>
	<div id="meinterest">
		<dl class="mess" v-show="ascny">
			<dt><img src="../../static/img/symbols-失败.png"/></dt>
			<dd>您还没有关注别人哦</dd>
		</dl>
		<div class="maintop" v-show="ascny1">
			<!--<div class="time">
				今天
			</div>-->
			<div class="person">
				<div class="personitem" v-for="(items,index) in getData" @click="goOption(items.be_member_id)">
					<div class="photo">
						<img :src="items.be_avatar" />
					</div>
					<p><span class="namee">{{items.be_name}}</span><span>{{items.be_age}}岁</span></p>
					<button @click.stop='take(items.be_member_id)'>求牵</button>
				</div>
			</div>
		</div>
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
	import { Indicator } from 'mint-ui';
	export default {
		name: "meinterest",
		data() {
			return {
				getData: [], //关注列表接口数据存储,
				getId: [],
				tokenNew: '',
				alertMark: false,
				demoId: '', //牵手的人
				ascny: false,
				ascny1: true,
				detailId: null,
				payId: null
			}
		},
		mounted() {
			this.tokenNew = sessionStorage.getItem("Token")
			this.getMine()
		},
		updated() {
			window.scroll(0, 0);
		},
		methods: {
			//获取我关注的接口数据
			getMine() {
				Indicator.open({
					text: 'Loading...',
					spinnerType: 'fading-circle'
				});
				var _this = this
				this.$http({
					method: "get",
					url: "http://yinhan-media.weiyingjia.org/api/yinhan/follows",
					params: {
						type: "1"
					},
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + this.tokenNew
					}
				}).then(res => {
					Indicator.close();
					console.log(res.data.data)
					_this.getData = res.data.data
					_this.getData == "" ? this.ascny = true : this.ascny = false;
					_this.getData == "" ? this.ascny1 = false : this.ascny1 = true;
					_this.getData.map(function(value, index) {
						_this.getId.push(value.id)
					})
				}).catch(res => {
					Indicator.close();
					console.log(res)
				})
			},
			take(id) {
				//				this.demoId = index;
				this.$http({
						method: "post",
						url: "http://yinhan-media.weiyingjia.org/api/yinhan/order",
						params: {
							ordertype: 1,
							product_id: id,
							price: 0,
							total: 1
						},
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + this.tokenNew
						}
					})
					.then(res => {
						this.alertMark = true;
						this.payId = res.data.data.id
					})
					.catch(res => {
						console.log(res);
						this.$message.error({
							message: "已经求牵过了哦！",
							duration: 6000
						});
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
						//						console.log(res);
						this.$message.success({
							message: "您已经支付成功哦",
							duration: 6000
						});
						this.alertMark = false;
						setTimeout(() => {
							//							this.successType = true;
							this.$router.push({
								path: "/payment"
							});
						}, 2000);
					})
					.catch(res => {
						console.log(res);
					});
			},
			deleMark() {
				this.alertMark = false;
				//				this.$http({
				//						method: "post",
				//						url: "http://yinhan-media.weiyingjia.org/api/yinhan/order/cancel",
				//						params: {
				//							id: this.getId[this.demoId],
				//
				//						},
				//						headers: {
				//							"Content-Type": "application/json",
				//							Authorization: "Bearer " + this.tokenNew
				//						}
				//					})
				//					.then(res => {
				//						console.log(res);
				//						setTimeout(() => {
				//							this.$message.success('您已经取消订单了哦')
				//							this.$router.push({
				//								path: "/payment"
				//							});
				//						}, 1000);
				//					})
				//					.catch(res => {
				//						console.log(res);
				//						this.$message.success('取消订单失败，请重新操作')
				//					});
			},
			goOption(id) {
				this.detailId = id;
				//				console.log(this.detailId);
				this.$router.push({
					path: '/options',
					name: "options",
					params: {
						id: this.detailId
					}
				});
			}
			//求牵
			//			take(index) {
			//				var _this = this
			//				this.$http({
			//					method: "post",
			//					url: "http://yinhan-media.weiyingjia.org/api/yinhan/message",
			//					data: {
			//						member_id: _this.getId[index]
			//					},
			//					headers: {
			//						"Content-Type": "application/json",
			//						"Authorization": "Bearer " + this.tokenNew
			//					}
			//				}).then(res => {
			//					// _this.getData = res.data.data
			//					//					console.log(res)
			//					this.$router.push({
			//						path: "/"
			//					})
			//				}).catch(res => {
			//					console.log(res)
			//				})
			//			}
		}
	}
</script>

<style>
	#meinterest {
		padding-bottom: 5rem;
	}
	
	#meinterest .maintop {
		width: 94.7%;
		margin: 0 auto;
		margin-top: 1rem;
		box-shadow: 0 2px 9px 0 #EEEEEE;
		border-radius: 3px;
		margin-bottom: 5rem;
	}
	/*	/*
	#meinterest .time {
		padding: 1rem;
		font-size: 1.07rem;
		font-weight: 900!important;
	}*/
	
	#meinterest .person {
		padding: 1rem;
		display: flex;
		/*justify-content: space-around;*/
		flex-wrap: wrap;
	}
	
	#meinterest .personitem {
		width: 33.3333%;
		display: flex;
		flex-direction: column;
	}
	
	#meinterest .personitem p {
		padding-top: 1rem;
	}
	
	#meinterest .personitem .photo {
		width: 7rem;
		height: 7rem;
		margin: 0 auto;
	}
	
	#meinterest .personitem .photo img {
		width: 100%;
		height: 100%;
		object-fit: scale-down;
	}
	
	#meinterest .personitem>p {
		display: flex;
		justify-content: space-around;
		font-size: 1.07rem;
	}
	
	#meinterest .personitem>button {
		width: 5rem;
		margin: 1rem auto;
		padding: 0.6rem 0.8rem;
		background: #FFFFFF;
		border: 1px solid #B674FD;
		box-shadow: 0 2px 4px 0 rgba(182, 116, 253, 0.30);
		border-radius: 3px;
		color: #B674FD;
	}
	
	#meinterest .personitem>p>span:nth-of-type(2) {
		color: #B674FD;
	}
	/* 弹出层 */
	
	#meinterest .mark {
		overflow: hidden;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
	}
	
	#meinterest .mark_content {
		position: absolute;
		padding-bottom: 1rem;
		top: 50%;
		left: 50%;
		width: 82%;
		transform: translate(-50%, -50%);
		background-color: #fff;
		border: 1px solid #ccc;
		border-radius: 5px;
	}
	
	#meinterest .mark_content>h2 {
		position: relative;
		text-align: left;
		line-height: 4rem;
		font-size: 1.7rem;
		border-bottom: 1px solid #eeeeee;
		padding-left: 1rem;
	}
	
	#meinterest .btn {
		display: flex;
		padding: 1rem 0;
		justify-content: space-around;
	}
	
	#meinterest .btn span {
		border: 1px solid #cccccc;
		padding: .5rem 1rem;
	}
	
	#meinterest .mess {
		width: 100%;
		font-size: 1.2rem;
		text-align: center;
		color: #666;
		padding: 10rem 0;
	}
	
	#meinterest .mess>dt {
		width: 20%;
		margin: 0 auto;
	}
	
	#meinterest .mess>dt>img {
		width: 100%;
		max-width: 100%;
	}
	
	#meinterest .namee {
		width: 5rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
