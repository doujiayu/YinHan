<template>
	<div class="main">
		<div class="bannerImg" style="padding-bottom: 1rem;" v-cloak>
			<!--<swiper loop auto :list="bannerList"></swiper>-->
			<swiper :list="bannerList" style="width:100%;margin:0 auto;" :aspect-ratio="300/800" dots-position="center"></swiper>
		</div>
		<div v-for="(item,index) in listData" :key="item.id" class="activee" @click="go(index)">
			<!--<router-link class="activeContainer" :to="'/DetailPage/'+item.id">-->
			<div class="photo">
				<img :src="item.img" />
			</div>
			<div class="activemain" style="margin-left: -1rem;width: 58%;">
				<h3>{{item.title}}</h3>
				<p>活动时间：{{item.start}} - {{item.end}}</p>
				<div class="areaMain">
					<p style="color: #666666;font-size: 1.07rem;width: 6rem;">地区：{{item.place}}</p>
					<span v-if="item.status==1">报名中</span>
					<span v-if="item.status==0">未开启</span>
					<span v-if="item.status==2">已结束</span>
				</div>
			</div>
			<!--</router-link>-->
		</div>
	</div>
</template>
<script>
	import { Swiper } from 'vux'
	import { Indicator } from 'mint-ui';
	export default {
		name: "Encounter",
		components: {
			Swiper
		},
		data() {
			return {
				listData: [],
				bannerList: [],
				tokenNew: "",
				forwardId: []
			};
		},
		created() {
			this.tokenNew = sessionStorage.getItem("Token");
			this.activity();
			this.banner();
		},
		methods: {
			// click(id) {
			//     this.$router.push({
			//         name: "DetailPage",
			//         query: {
			//             id: id
			//         }
			//     })
			// }
			go(index) {
				this.$router.push({
					path: "/DetailPage",
					query: {
						id: this.forwardId[index]
					}
				})
			},
			//活动列表
			activity() {
				var _this = this;
				Indicator.open({
				  text: 'Loading...',
				  spinnerType: 'fading-circle'
				});

				this.$http({
						method: "get",
						url: "http://yinhan-media.weiyingjia.org/api/yinhan/actives",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + this.tokenNew
						}
					})
					.then(res => {
						//						console.log(res)
						_this.listData = res.data.data;
						Indicator.close();
						this.listData.map(function(value, index) {
							_this.forwardId.push(value.id)
						})
					})
					.catch(error => {
						throw error;
					});
			},
			banner() {
				var _this = this;
				this.$http({
						method: "get",
						url: "http://yinhan-media.weiyingjia.org/api/yinhan/banners",
						params: {
							type: 2
						}
					})
					.then(res => {
						this.bannerList = res.data.data;
					})
					.catch(error => {
						throw error;
					});
			}
		},
		updated() {
			window.scroll(0, 0);
		}
	};
</script>
<style lang="scss" scoped>
	.main {
		margin-bottom: 5rem;
	}
	
	.bannerImg {
		width: 100%;
		/*height: 12rem;
		padding-bottom: 4rem;*/
	}
	
	.bannerImg img {
		width: 100%;
		max-width: 100%;
		overflow: hidden;
		object-fit: scale-down;
	}
	
	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}
	
	.el-carousel__item:nth-child(2n + 1) {
		background-color: #d3dce6;
	}
	
	.el-carousel {
		z-index: 0;
		height: 100%;
	}
	
	.activee {
		width: 94.7%;
		margin: 0 auto;
		display: flex;
		justify-content: space-around;
		padding: 1rem 0;
		background: #ffffff;
		box-shadow: 0 2px 9px 0 #eeeeee;
		border-radius: 3px;
	}
	
	.photo {
		width: 8.07rem;
		height: 6.71rem;
	}
	
	.photo>img {
		width: 100%;
		height: 100%;
		max-width: 100%;
		object-fit: scale-down;
	}
	
	.activemain>h3 {
		font-size: 1.21rem;
		color: #000000;
		font-weight: bold;
		letter-spacing: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.activemain>p {
		margin-top: 0.8rem;
		font-size: 1;
		color: #000000;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.areaMain {
		display: flex;
		justify-content: space-between;
		margin-top: 1.6rem;
	}
	
	.areaMain span {
		margin-top: -1.2rem;
		color: #ffffff;
		padding: 0.7rem 1.5rem;
		background: #b674fd;
		box-shadow: 0 2px 4px 0 rgba(182, 116, 253, 0.39);
		border-radius: 3px;
	}
	
	.areaMain p {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
