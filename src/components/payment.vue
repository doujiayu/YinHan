<template>
	<div id="payment" v-cloak>
		<div class="main">
			<button @click="checkType(1)" :class="nowIndex==1?'active':''">待支付</button>
			<button @click="checkType(2)" :class="nowIndex==2?'active':''">已完成</button>
		</div>
		<dl class="mess" v-show="ascny">
			<dt>
        <img src="../../static/img/symbols-失败.png"/>
      </dt>
			<dd>您还没有订单哦</dd>
		</dl>
		<div class="container" v-for='(demo,index) in [1,2]' v-show='nowIndex===demo?"nowIndex":""'>
			<ul v-for='item in listData' v-cloak>
				<li>
					<span style="color: #999999;">商品名称：</span>
					<span style="margin-left: 0.7rem;color: #333333;">{{item.product_name}}</span>
				</li>
				<li>
					<span style="color: #999999;">下单时间：</span>
					<span style="margin-left: 0.7rem;color: #333333;">{{item.created_at}}</span>
				</li>
				<li>
					<span style="color: #999999;">订单编号：</span>
					<span style="margin-left: 0.7rem;color: #333333;">{{item.orderid}}</span>
				</li>
				<li>
					<span style="color: #999999;">订单金额：</span>
					<span style="margin-left: 0.7rem;color: #FF265C;">￥{{item.amount}}</span>
				</li>
				<li style="border-bottom: 1px solid #F5F5F5;">
					<span style="color: #999999;">订单状态：</span>
					<span style="margin-left: 0.7rem;color: #333333;" v-if='item.pay_status==0'>待支付</span>
					<span style="margin-left: 0.7rem;color: #333333;" v-if='item.pay_status==1'>支付成功</span>
					<span style="margin-left: 0.7rem;color: #333333;" v-if='item.pay_status==2'>已退款</span>
				</li>
				<li class="choose" v-show='demo==1'>
					<button @click='cancleOrder(item.id)'>取消订单</button>
					<button @click="sureOrder(item.id)">确认订单</button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui';

	export default {
		name: "payment",
		data() {
			return {
				bol: false,
				index: 1,
				tokenNew: "",
				listData: [],
				nowIndex: 2,
				ascny: false
			}
		},
		methods: {
			commonData() {
				Indicator.open({
					text: 'Loading...',
					spinnerType: 'fading-circle'
				});
				this.$http({
					method: "get",
					url: "http://yinhan-media.weiyingjia.org/api/yinhan/orders",
					params: {
						type: this.nowIndex
					},
					headers: {
						"Authorization": "Bearer " + this.tokenNew
					}
				}).then(res => {
					Indicator.close();
					console.log(res.data.data)
					this.listData = res.data.data;
					if(this.listData.length == 0) {
						this.ascny = true
					} else {
						this.ascny = false
					}
				})
			},
			checkType(demo) {
				this.nowIndex = demo;
				this.listData.length = 0
				this.commonData();
			},
			//取消订单
			cancleOrder(id) {
				this.$http({
					method: "post",
					url: "http://yinhan-media.weiyingjia.org/api/yinhan/order/cancel",
					data: {
						id: id
					},
					headers: {
						"Authorization": "Bearer " + this.tokenNew
					}
				}).then(res => {
					console.log(res)
					this.$message.success({
						message: "取消成功",
						duration: 6000
					});
					//					this.listData = res.data.data;
					this.commonData();

				})
			},
			//确认订单
			sureOrder(id) {
				this.$http({
					method: "post",
					url: "http://yinhan-media.weiyingjia.org/api/yinhan/order/pay",
					data: {
						id: id
					},
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + this.tokenNew
					}
				}).then(res => {
					this.$message.success({
						message: "您已经支付成功哦,请在'我心动的'中查看",
						duration: 6000
					});
					this.alertMark = false;
					this.commonData();
					setTimeout(() => {
						//							this.successType = true;
						this.$router.push({
							path: "/payment"
						});
					}, 2000);
				}).catch(res => {
					console.log(res);
				});
			}
		},
		created() {
			this.tokenNew = sessionStorage.getItem("Token")
			this.commonData();
		}
	}
</script>

<style>
	#payment {
		padding-bottom: 5rem;
	}
	
	#payment .head {
		width: 100%;
		padding-bottom: 0.1rem;
		box-shadow: 0 2px 4px 0 #F7F7F7;
	}
	
	#payment .bottom {
		font-size: 1.15rem;
		color: #333333;
		letter-spacing: 0;
		margin-bottom: 0.5rem;
	}
	
	#payment .bottom a {
		background: url(../../static/img/retreat.png) 1rem 0.5rem no-repeat;
		padding: 0.3rem 1.2rem;
		background-size: 0.8rem;
	}
	
	#payment .bottom font {
		display: inline-block;
		padding: 0.45rem 0;
	}
	
	#payment .main {
		padding: 0.2rem;
		width: 94.8%;
		margin: 0 auto;
		margin-top: 1rem;
		background: #F3F3F3;
		border-radius: 3px;
		display: flex;
		justify-content: space-between;
	}
	
	#payment .main button {
		width: 49.5%;
		padding: 0.8rem 0;
		/*background: #FFFFFF;*/
		border-radius: 3px;
		font-size: 1.14rem;
		color: #c1c1c1;
		letter-spacing: 0;
	}
	
	#payment .container {
		width: 94.7%;
		margin: 1rem auto;
		background: #FFFFFF;
		box-shadow: 0 2px 9px 0 #EEEEEE;
		border-radius: 3px;
	}
	
	#payment .container ul {
		padding: 1rem 0.7rem;
	}
	
	#payment .container ul li {
		line-height: 2;
		font-size: 1.07rem;
	}
	
	#payment .main .active {
		background: white;
		color: #B674FD;
	}
	
	#payment .choose {
		display: flex;
		justify-content: space-around;
		margin-top: 1rem;
	}
	
	#payment .choose button {
		padding: 0.7rem 2.5rem;
		box-shadow: 0 2px 4px 0 rgba(182, 116, 253, 0.39);
		border-radius: 3px;
		background: #B674FD;
		color: #FFFFFF;
	}
	
	#payment .choose button:nth-of-type(1) {
		color: #c1c1c1;
		background: #F3F3F3;
	}
	
	#payment .mess {
		width: 100%;
		font-size: 1.2rem;
		text-align: center;
		color: #666;
		padding: 10rem 0;
	}
	
	#payment .mess>dt {
		width: 20%;
		margin: 0 auto;
	}
	
	#payment .mess>dt>img {
		width: 100%;
		max-width: 100%;
	}
</style>
