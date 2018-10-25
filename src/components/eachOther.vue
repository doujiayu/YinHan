<template>
	<div id="eachOther">
		<div class="main">
			<div class="mainitem">
				<img src="../../static/img/symbols-心动.png" />
			</div>
			<p>
				恭喜相互心动
			</p>
		</div>
		<div class="container">
			<div class="containertop">
				<p>恭喜相互心动</p>
				<p>希望你二人本着真心，真诚，真情的宗旨善待对方。</p>
				<p>在人生的下半程开始一段浪漫温馨的爱情！</p>
				<p>祝愿二位早日传来喜讯！</p>
			</div>
			<div class="containerbottom">
				<!-- <img src="../../static/img/9.png" /> -->
				<img style="width: 5rem;height: 5rem;" :src="oneImg" alt='图片加载有误' />

				<span>
					<img src="../../static/img/symbols-动心2.png" />
				</span>
				<!-- <img src="../../static/img/10.png" />        -->
				<img style="width: 5rem;height: 5rem;" :src="twoImg" alt='图片加载有误' />
			</div>
			<div style="color: #B674FD;font-size: 1.2rem;">联系方式：{{phone}}</div>
		</div>
		<div class="mainbottom">
			<p>你们彼此留下了联系方式，别让缘分就</p>
			<p>这样溜走哟！</p>
		</div>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui';
	export default {
		name: "eachOther",
		data() {
			return {
				tokenNew: null,
				oneImg: null,
				twoImg: null,
				likeCheck: null, //心动类型
				phone: null,
				statustu: null
			}
		},
		updated() {
			window.scroll(0, 0);
		},
		methods: {

		},
		created() {
			this.tokenNew = sessionStorage.getItem("Token")
			this.likeCheck = this.$route.params.type; //2
			this.likeId = this.$route.params.liker
			console.log(this.likeId)
			//			console.log(this.likeId)
			//			console.log(this.likeCheck)
			Indicator.open({
				text: 'Loading...',
				spinnerType: 'fading-circle'
			});
			this.$http({
				method: "get",
				url: "/api/moved/" + this.likeId,
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + this.tokenNew
				}
			}).then(res => {
				Indicator.close();
				console.log(res)
				this.oneImg = res.data.data.album;
				this.twoImg = res.data.data.be_album;
				if(this.likeCheck == 2) { //对我心动
					//自己的手机号
					this.phone = res.data.data.phone;
				} else {
					//对方的手机号
					this.phone = res.data.data.be_phone;
				}
			}).catch(res => {
				Indicator.close();
				throw res;
			})
		}
	}
</script>

<style>
	#eachOther .main {
		padding: 3rem 0;
		width: 94.7%;
		margin: 2rem auto;
		background: #FFFFFF;
		box-shadow: 0 2px 9px 0 #EEEEEE;
		border-radius: 3px;
		text-align: center;
	}
	
	#eachOther .main .mainitem {
		width: 7.5rem;
		height: 7.5rem;
		margin: 0 auto;
	}
	
	#eachOther .main .mainitem img {
		width: 100%;
	}
	
	#eachOther .main p {
		font-size: 1.3rem;
		color: #000000;
		letter-spacing: 0;
	}
	
	#eachOther .container {
		width: 94.7%;
		margin: 2rem auto;
		background: #FFFFFF;
		box-shadow: 0 2px 9px 0 #EEEEEE;
		border-radius: 3px;
		text-align: center;
		color: #666666;
		font-size: 1.1rem;
		padding: 1rem 0 2rem 0;
	}
	
	#eachOther .container div {
		margin-top: 1rem;
	}
	
	#eachOther .containerbottom {
		display: flex;
		margin: auto;
		width: 60%;
		justify-content: space-around;
	}
	
	#eachOther .containerbottom span {
		display: block;
		margin: auto;
		width: 3rem;
		height: 3rem;
	}
	
	#eachOther .containerbottom span img {
		width: 100%;
	}
	
	#eachOther .mainbottom {
		color: #666666;
		letter-spacing: 0;
		font-size: 1rem;
		text-align: center;
		line-height: 1.7;
	}
</style>