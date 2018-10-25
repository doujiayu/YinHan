<template>
	<div id="interestme">

		<div class="maintop" v-show="ascny1">
			<div class="person">
				<div class="personitem" v-for="(items,index) in getData" @click="goOption(items.member_id)">
					<div class="photo">
						<img :src="items.avatar" />
					</div>
					<p><span class="namee">{{items.name}}</span><span>{{items.age}}岁</span></p>
					<button @click.stop="take(items.member_id)">牵手</button>
				</div>
			</div>
		</div>
		<dl class="mess" v-show="ascny">
			<dt><img src="../../static/img/symbols-失败.png"/></dt>
			<dd>还没有人关注您哦</dd>
		</dl>
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
		name: "interestme",
		data() {
			return {
				getData: null,
				getId: [],
				tokenNew: '',
				alertMark: false,
				demoId: '',
				ascny: false,
				ascny1: true,
				detailId: null,
				payId: null
			}
		},
		created() {
			this.tokenNew = sessionStorage.getItem("Token")
			this.getMine()
		},
		mounted() {

		},
		updated() {
			window.scroll(0, 0);
		},
		methods: {
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
						type: "2"
					},
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + this.tokenNew
					}
				}).then(res => {
					console.log(res.data.data)
					Indicator.close();
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
			//求牵
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
						//						console.log(res.data.data)
						this.payId = res.data.data.id
						//						console.log(this.payId)
						this.alertMark = true;
						//						setTimeout(() => {
						//							this.$message.success('您已经支付成功哦')
						//							this.$router.push({
						//								path: "/payment"
						//							});
						//						}, 1000);
					})
					.catch(res => {
						console.log(res);
						//						this.$message.success('今日已求牵5次，请明日再来！')
						this.$message.error({
							message: "已经求牵过了哦！",
							duration: 6000
						});
					});
				this.alertMark = true;
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
						this.$message.success({
							message: "您已经支付成功哦",
							duration: 6000
						});
						this.alertMark = false;
						setTimeout(() => {
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
			},
			goOption(id) {
				this.detailId = id;
				this.$router.push({
					path: '/options',
					name: "options",
					params: {
						id: this.detailId
					}
				});
			}
		}
	}
</script>

<style>
	#interestme {
		padding-bottom: 5rem;
	}
	
	#interestme .maintop {
		width: 94.7%;
		margin: 0 auto;
		margin-top: 1rem;
		box-shadow: 0 2px 9px 0 #EEEEEE;
		border-radius: 3px;
		margin-bottom: 5rem;
	}
	
	#interestme .person {
		padding: 1rem;
		display: flex;
		/*justify-content: space-around;*/
		flex-wrap: wrap;
	}
	
	#interestme .personitem {
		display: flex;
		flex-direction: column;
		width: 33.333%;
	}
	
	#interestme .personitem p {
		padding-top: 1rem;
	}
	
	#interestme .personitem .photo {
		width: 7rem;
		height: 7rem;
		margin: 0 auto;
	}
	
	#interestme .personitem .photo img {
		width: 100%;
		height: 100%;
		object-fit: scale-down;
	}
	
	#interestme .personitem>p {
		display: flex;
		justify-content: space-around;
		font-size: 1.07rem;
	}
	
	#interestme .personitem>button {
		width: 5rem;
		margin: 1rem auto;
		padding: 0.6rem 0.8rem;
		background: #FFFFFF;
		border: 1px solid #B674FD;
		box-shadow: 0 2px 4px 0 rgba(182, 116, 253, 0.30);
		border-radius: 3px;
		color: #B674FD;
	}
	
	#interestme .personitem>p>span:nth-of-type(2) {
		color: #B674FD;
	}
	/* 弹出层 */
	
	#interestme .mark {
		overflow: hidden;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
	}
	
	#interestme .mark_content {
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
	
	#interestme .mark_content>h2 {
		position: relative;
		text-align: left;
		line-height: 4rem;
		font-size: 1.7rem;
		border-bottom: 1px solid #eeeeee;
		padding-left: 1rem;
	}
	
	#interestme .btn {
		display: flex;
		padding: 1rem 0;
		justify-content: space-around;
	}
	
	#interestme .btn span {
		border: 1px solid #cccccc;
		padding: .5rem 1rem;
	}
	
	#interestme .mess {
		width: 100%;
		font-size: 1.2rem;
		text-align: center;
		color: #666;
		padding: 10rem 0;
	}
	
	#interestme .mess>dt {
		width: 20%;
		margin: 0 auto;
	}
	
	#interestme .mess>dt>img {
		width: 100%;
		max-width: 100%;
		object-fit: scale-down;
	}
	
	#interestme .namee {
		width: 5rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
