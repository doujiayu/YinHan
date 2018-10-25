<template>
	<div class="container">
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive" class="wrapper"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive" class="wrapper"></router-view>
		<ul class="nav" v-show="$route.meta.navShow">
			<router-link :tag="'li'" :to="{name:'home'}">
				<span class="icon icon1"></span>
				<span class="spanInfo">首页</span>
			</router-link>
			<li @click="fnTwo()">
				<router-link :tag="'li'" :to="{name:'Encounter'}">
					<span class="icon icon2"></span>
					<span class="spanInfo">邂逅</span>
				</router-link>
			</li>
			<li @click="fnOne()">
				<router-link :tag="'li'" :to="{name:'mine'}">
					<span class="icon icon3"></span>
					<span class="spanInfo">我的</span>
					<div v-for="item in listDataa">
						<time class="dott" v-show="item.is_read==0"></time>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				url: [], //banner
				listDataa: [],
				timer: null
			};
		},
		mounted() {
			if(sessionStorage.getItem("Token")) {
				this.tokenNew = sessionStorage.getItem("Token")
				this.timer = setInterval(() => {
					this.$http({
						method: "get",
						url: "http://yinhan-media.weiyingjia.org/api/yinhan/messages",
						headers: {
							"Authorization": "Bearer " + this.tokenNew
						}
					}).then(response => {
						this.listDataa = response.data.data;
						console.log(this.listDataa)
					}).catch(error => {
						throw error;
					})
				}, 30000)　　
			}
		},
		methods: {
			fnOne() {
				if(sessionStorage.phone == 0) {
					this.$router.push({
						path: "/login"
					});
				} else {
					this.$router.push({
						path: "/index/mine"
					});
				}
			},
			fnTwo() {
				if(sessionStorage.phone == 0) {
					this.$router.push({
						path: "/login"
					});
				} else {
					this.$router.push({
						path: "/index/Encounter"
					});
				}
			}
		}
	};
</script>
<style scoped>
	.container {
		height: 100%;
		overflow: hidden;
	}
	
	.nav {
		width: 100%;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 10;
		height: 3.5rem;
		box-shadow: 0 -2px 9px 0 rgba(0, 0, 0, 0.1);
		background: white;
		display: flex;
		justify-content: space-around;
		font-size: 1rem;
		overflow: hidden;
		color: #999;
	}
	
	.nav li {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	
	.router-link-active {
		color: #b674fd;
	}
	
	.nav li span {
		display: block;
		text-align: center;
	}
	
	.icon {
		width: 1.8rem;
		height: 1.7rem;
		margin: 0 auto;
		background-position: bottom center;
		background-repeat: no-repeat;
	}
	
	.icon1 {
		background-image: url(../../static/img/a-home.png);
		background-size: 100% 100%;
	}
	
	.icon2 {
		background-image: url(../../static/img/a-Encounter.png);
		background-size: 100% 100%;
	}
	
	.icon3 {
		background-image: url(../../static/img/a-mine.png);
		background-size: 100% 100%;
	}
	
	.router-link-active .icon1 {
		background-image: url(../../static/img/s-home.png);
		background-size: 100% 100%;
	}
	
	.router-link-active .icon2 {
		background-image: url(../../static/img/s-Encounter.png);
		background-size: 100% 100%;
	}
	
	.router-link-active .icon3 {
		background-image: url(../../static/img/s-mine.png);
		background-size: 100% 100%;
	}
	
	.dott {
		position: absolute;
		top: 0.5rem;
		right: 4rem;
		display: inline-block;
		width: 0.6rem;
		height: 0.6rem;
		border-radius: 50%;
		background: red;
	}
</style>
