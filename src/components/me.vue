<template>
	<div id="msg">
		<dl class="mess" v-show="ascny">
			<dt><img src="../../static/img/symbols-失败.png"/></dt>
			<dd>您还没有消息哦</dd>
		</dl>
		<ul class="list" v-show="ascny1">
			<li v-for='item in listData' @click='detailPage(item.sender_id,item.id)' :class="item.is_read!=0?'active':''">
				<img :src="item.sender_img" />
				<div>
					<p>
						<span>{{item.sender_name}}</span>
						<span>{{item.createtime}}</span>
					</p>
					<p>
						<span>{{item.sender_age}}</span>
						<span>{{item.sender_address}}</span>
						<span>{{item.content}}</span>
					</p>
				</div>
			</li>
		</ul>
	</div>
</template>
<script type="text/javascript">
	import { Indicator } from 'mint-ui';
	export default {
		name: "me",
		data() {
			return {
				listData: [], //数据
				detailId: null, // 详情页id
				toenNew: "",
				ascny: false,
				ascny1: true,
				messId: null
			}
		},
		mounted() {
			this.tokenNew = sessionStorage.getItem("Token")
			window.scroll(0, 0);
			Indicator.open({
				text: 'Loading...',
				spinnerType: 'fading-circle'
			});
			this.$http({
					method: "get",
					url: "http://yinhan-media.weiyingjia.org/api/yinhan/messages",
					headers: {
						"Authorization": "Bearer " + this.tokenNew
					}
				}).then(res => {
					Indicator.close();
					console.log(res)
					this.listData = res.data.data;
					this.listData == "" ? this.ascny = true : this.ascny = false;
					this.listData == "" ? this.ascny1 = false : this.ascny1 = true;
				})
				.catch(error => {
					Indicator.close();
					throw error;
				})
		},
		methods: {
			detailPage(id, meId) {
				//				this.detailId = id;
				//				this.messId = meId;
				this.$router.push({
					path: '/details/' + meId,
					name: "details",
					params: {
						id: id,
						meId: meId
					}
				});
			}
		}
	}
</script>
<style type="text/css">
	#msg {
		padding-bottom: 5rem;
	}
	
	#msg .list {
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	
	#msg .list li {
		display: flex;
		width: 95%;
		margin: 0rem auto;
		margin-top: 0.9rem;
		height: 5.57rem;
		/*background: #FFFFFF;*/
		box-shadow: 0 2px 9px 0 #EEEEEE;
		border-radius: 3px;
	}
	
	#msg .list li:nth-of-type(1) {
		margin-top: 1rem;
	}
	
	#msg .list li img {
		display: flex;
		margin: auto 0.8rem;
		width: 4.71rem;
		height: 4.71rem;
		max-width: 100%;
		border-radius: 50%;
	}
	
	#msg .list li div {
		width: 100%;
		padding-right: 1rem;
		justify-content: space-around;
		display: flex;
		flex-direction: column;
	}
	
	#msg .list li div p {
		display: flex;
		justify-content: space-between;
	}
	
	#msg .list li div p:nth-of-type(1) span:nth-of-type(1) {
		color: #000000;
		font-size: 1.1rem;
	}
	
	#msg .list li div p:nth-of-type(1) {
		margin-top: 0.5rem;
	}
	
	#msg .list li div p:nth-of-type(2) {
		margin-bottom: 0.5rem;
	}
	
	#msg .list li div p:nth-of-type(1) span:nth-of-type(2),
	#msg .list li div p:nth-of-type(2) span:nth-of-type(2) {
		color: #666;
		font-size: 0.8rem;
	}
	
	#msg .list li div p:nth-of-type(2) span:nth-of-type(1),
	#msg .list li div p:nth-of-type(2) span:nth-of-type(3) {
		color: #E6C2FC;
		font-size: x-small;
	}
	
	#msg .mess {
		width: 100%;
		font-size: 1.2rem;
		text-align: center;
		color: #666;
		padding: 10rem 0;
	}
	
	#msg .mess>dt {
		width: 20%;
		margin: 0 auto;
	}
	
	#msg .mess>dt>img {
		width: 100%;
		max-width: 100%;
	}
	
	#msg .active {
		background: #999;
	}
</style>
