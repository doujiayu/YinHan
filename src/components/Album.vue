<template>
	<div id="Album">
		<dl class="mess" v-show="ascny">
			<dt><img src="../../static/img/symbols-失败.png"/></dt>
			<dd>您还没有照片哦</dd>
		</dl>
		<big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
		<div class="main" v-show="ascny1">
			<div class="mainitem">
				<div class="mainone" v-for="(image,index) in getAlbumData">
					<img :src="image.url" @click="clickImg($event)"  />
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import BigImg from '@/components/BigImg.vue';
	import { Indicator } from 'mint-ui';
	export default {
		name: "Album",
		components: {
			'big-img': BigImg
		},
		data() {
			return {
				getAlbumData: [], //数据保存
				tokenNew: '',
				ascny: false,
				ascny1: true,
				showImg: false,
				imgSrc: ''
			}
		},
		mounted() {
			this.tokenNew = sessionStorage.getItem("Token")
			this.getAlbum()
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
			getOn() {
				this.$router.go("-1")
			},
			updated() {
				window.scroll(0, 0);
			},
			//获取相册数据
			getAlbum() {
				var _this = this
				Indicator.open({
				  text: 'Loading...',
				  spinnerType: 'fading-circle'
				});
				this.$http({
					method: "get",
					url: "http://yinhan-media.weiyingjia.org/api/yinhan/memberalbums",
					params: {},
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + this.tokenNew
					}
				}).then(res => {
					console.log(res)
					Indicator.close();
					this.getAlbumData = res.data.data
					this.getAlbumData == "" ? this.ascny = true : this.ascny = false;
					this.getAlbumData == "" ? this.ascny1 = false : this.ascny1 = true;
				}).catch(res => {
					Indicator.close();
					console.log(res)
				})
			}
		}
	}
</script>

<style>
	#Album {
		padding-bottom: 6rem;
	}
	
	#Album .main {
		width: 90%;
		margin: 0 auto;
	}
	
	#Album .mainitem {
		margin-top: 1.3rem;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	
	#Album .mainitem .mainone {
		width: 30%;
		height: 11rem;
		padding-top: 1rem;
	}
	
	#Album .mainitem .mainone img {
		width: 100%;
		height: 100%;
		max-width: 100%;
	}
	
	#Album .mess {
		width: 100%;
		font-size: 1.2rem;
		text-align: center;
		color: #666;
		padding: 10rem 0;
	}
	
	#Album .mess>dt {
		width: 20%;
		margin: 0 auto;
	}
	
	#Album .mess>dt>img {
		width: 100%;
		max-width: 100%;
	}
</style>
