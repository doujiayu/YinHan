<template>
	<div id="mine">
		<header>
			<div class="top">
				<div class="topone">
					<img src="../../static/img/18.png" v-if='img==""' />
					<img :src="img" v-else/>
				</div>
				<div class="main">
					<ul>
						<li v-if='names==null'>您的名字</li>
						<li v-else>{{names}}</li>
						<li>
							<span>活跃度</span>
							<img src="../../static/img/symbols-fi活跃度.png" alt="图片加载有误" />
							<img src="../../static/img/symbols-fi活跃度.png" alt="图片加载有误" />
							<img src="../../static/img/symbols-fi活跃度.png" alt="图片加载有误" />
							<img src="../../static/img/symbols-fi活跃度.png" alt="图片加载有误" />
							<img src="../../static/img/symbols-fi活跃度.png" alt="图片加载有误" />
						</li>
					</ul>
				</div>
			</div>
			<div class="bottomm">
				<div class="bottom_item" @click="goGz">
					<div class="bottomone">
						<img src="../../static/img/symbols-关注.png" alt="图片加载有误" />
						<p>我关注的</p>
					</div>
				</div>
				<div class="bottom_item" @click="goZg">
					<div class="bottomone">
						<img src="../../static/img/symbols-关注我的.png" alt="图片加载有误" />
						<p>关注我的</p>
					</div>
				</div>
				<div class="bottom_item" @click="goMxd">
					<div class="bottomone">
						<img src="../../static/img/symbols-我心动的.png" alt="图片加载有误" />
						<p>我心动的</p>
					</div>
				</div>
				<div class="bottom_item" @click="goXdw">
					<div class="bottomone">
						<img src="../../static/img/symbols-对我心动.png" alt="图片加载有误" />
						<p>对我心动</p>
					</div>
				</div>
			</div>
		</header>

		<section class="picture">
			<p style='display: flex; justify-content: space-between;'>
				<span>请上传您的4张生活照</span>
				<span @click="goXc">我的相册</span>
			</p>
			<div class="picture_item" style='display: flex;'>
				<el-upload name='album' action='string' list-type="picture-card" :file-list="imgList" :headers="header" :on-preview="handlePictureCardPreview" :on-success='handleSuccess' :on-remove.self="handleRemove" multiple :limit="4" :on-exceed="handleExceed" :http-request='upload' :on-error='handleError' accept="image/*" ref='upload'>
					<i class="el-icon-plus"></i>
				</el-upload>
			</div>
		</section>
		<section class="set">
			<div class="setitem" @click="goWsxx">
				<div class="setleft">
					<img src="../../static/img/symbols-账号安全.png" alt="图片加载有误" />
					<p>编辑信息</p>
				</div>
				<div class="setright">
					<img src="../../static/img/24.png" alt="图片加载有误" />
				</div>
			</div>
			<div class="setitem" @click="go">
				<div class="setleft">
					<img src="../../static/img/symbols-账号安全.png" alt="图片加载有误" />
					<p>账号管理</p>
				</div>
				<div class="setright">
					<img src="../../static/img/24.png" alt="图片加载有误" />
				</div>
			</div>
			<div class="setitem" @click="goMe" style="position: relative;">
				<div class="setleft">
					<img src="../../static/img/symbols-消息.png" alt="图片加载有误" />
					<p>消息</p>
					<div v-for="item in listData" v-show="item.is_read==0?true:false">
						<span class="dot"></span>
					</div>
				</div>
				<div class="setright">
					<img src="../../static/img/24.png" alt="图片加载有误" />
				</div>
			</div>
			<div class="setitem" @click="goXhjl">
				<div class="setleft">
					<img src="../../static/img/symbols-邂逅记录.png" alt="图片加载有误" />
					<p>心动记录</p>
				</div>
				<div class="setright">
					<img src="../../static/img/24.png" />
				</div>
			</div>
			<div class="setitem" @click="goZf">
				<div class="setleft">
					<img src="../../static/img/symbols-我的支付.png" alt="图片加载有误" />
					<p>我的支付</p>
				</div>
				<div class="setright">
					<img src="../../static/img/24.png" alt="图片加载有误" />
				</div>
			</div>
			<div class="setitem" @click="goXy">
				<div class="setleft">
					<img src="../../static/img/symbols-注册协议.png" alt="图片加载有误" />
					<p>选择服务号会员注册协议</p>
				</div>
				<div class="setright">
					<img src="../../static/img/24.png" alt="图片加载有误" />
				</div>
			</div>
			<div class="mark" v-show='successType'>
				<div class="mark_content">
					<h2 style='font-size:1.4rem; text-align:center;'>您已经上传4了张照片了哦！</h2>
				</div>
			</div>
		</section>
	</div>
</template>
<script>
	import { Indicator } from 'mint-ui';
	export default {
		name: "mine",
		data() {
			return {
				me: [],
				dialogImageUrl: '',
				dialogVisible: false,
				fileList: [],
				files: "",
				imageMes: "",
				imageUrl: "",
				imgNum: 0,
				tokenNew: "",
				names: null,
				img: null,
				title: null,
				idImg: null, //图片id
				imgNum: 5,
				num: [], //成功上传图片的个数
				successType: false,
				userId: null,
				imgList: [],
				listData: []
			}
		},
		mounted() {
			this.tokenNew = sessionStorage.getItem("Token")
			this.mine();
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
				Indicator.close();
				for(var i = 0; i < res.data.data.length; i++) {
					if(i <= 3) {
						this.imgList.push(res.data.data[i]);
					} else {
						break;
					}
				}
			}).catch(res => {
				Indicator.close();
				console.log(res)
			})
			this.$http({
					method: "get",
					url: "http://yinhan-media.weiyingjia.org/api/yinhan/messages",
					headers: {
						"Authorization": "Bearer " + this.tokenNew
					}
				}).then(response => {
					Indicator.close();
					this.listData = response.data.data;
				})
				.catch(error => {
					Indicator.close();
					throw error;
				})

		},
		methods: {
			goXc() {
				this.$router.push({
					path: "/Album"
				})
			},
			go() {
				this.$router.push({
					path: "/account"
				})
			},
			goMe() {
				this.$router.push({
					path: "/me"
				})
			},
			goGz() {
				this.$router.push({
					path: "/meinterest"
				})
			},
			goZg() {
				this.$router.push({
					path: "/interestme"
				})
			},
			goXy() {
				this.$router.push({
					path: "/agreement"
				})
			},
			goMxd() {
				this.$router.push({
					path: "/meheartbeat"
				})
			},
			goXdw() {
				this.$router.push({
					path: "/heartbeatme"
				})
			},
			goZf() {
				this.$router.push({
					path: "/payment"
				})
			},
			goWsxx() {
				this.$router.push({
					path: "/redact"
				})
			},
			goXhjl() {
				this.$router.push({
					path: "/record"
				})
			},
			dataURLtoFile(dataurl, filename) { //将base64转换为文件
				var arr = dataurl.split(','),
					mime = arr[0].match(/:(.*?);/)[1],
					bstr = atob(arr[1]),
					n = bstr.length,
					u8arr = new Uint8Array(n);
				while(n--) {
					u8arr[n] = bstr.charCodeAt(n);
				}
				return new File([u8arr], filename, {
					type: mime
				});
			},
			upload(item) {
				console.log(item)
				let thi_s = this
				lrz(item.file, {
					width: 1000
				}, (results) => {
					item.file = thi_s.dataURLtoFile(results.base64, item.file.name)
					var _this = this;
					var formData = new FormData();
					formData.append("album", item.file);
					var newData = formData.get('album')
					var xml = new XMLHttpRequest();
					xml.open(
						"post",
						"http://yinhan-media.weiyingjia.org/api/yinhan/memberalbum",
						true
					);
					xml.onload = function() {
						var json = eval("(" + xml.responseText + ")");
					};
					xml.setRequestHeader("Authorization", "Bearer " + this.tokenNew)
					xml.send(formData);
				})
			},
			mine() {
				this.$http({
						method: "get",
						url: "http://yinhan-media.weiyingjia.org/api/yinhan/my",
						headers: {
							"Authorization": "Bearer " + this.tokenNew
						}
					}).then(res => {
						this.title = res.data.data.in.bewrite;
						this.names = res.data.data.wechat.nickname;
						this.img = res.data.data.wechat.headimgurl;
					})
					.catch(error => {
						throw error
					})
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleExceed(files, fileList) {
				document.getElementsByClassName('el-upload el-upload--picture-card')[0].style.display = 'none';
				this.$message.warning({
					message: "限制为4张",
					duration: 6000
				});
			},
			handleSuccess(response, file, fileList) {
				this.idImg = response.data.id;
				this.$message.success({
					message: "您已上传成功哦！",
					duration: 6000
				});
			},
			handleRemove(response, file) {
				document.getElementsByClassName('el-upload el-upload--picture-card')[0].style.display = 'block';
				this.files = file;
				this.$http({
					method: "post",
					url: "http://yinhan-media.weiyingjia.org/api/yinhan/memberalbum/del",
					data: {
						id: response.response === undefined ? response.id : response.response.data.id
					},
					headers: {
						"Authorization": "Bearer " + this.tokenNew
					}
				}).then(res => {
					this.$message.success({
						message: "您已删除成功！",
						duration: 6000
					});
				}).catch(error => {
					throw error
				})
			},
			handleError(e, s, ss) {
				this.$message.error('上传照片大小不能超过2M哦！')
			}
		},
		computed: {
			header() {
				return {
					"Authorization": "Bearer " + this.tokenNew
				}
			}
		},
		created() {
			window.scroll(0, 0);
		}
	}
</script>

<style>
	body {
		overflow-y: scroll;
	}
	
	#mine {
		position: relative;
		padding-bottom: 8rem;
		width: 100%;
		height: 100%;
		overflow-y: scroll;
		overflow-x: hidden;
	}
	
	#mine .head {
		width: 100%;
		padding-bottom: 0.1rem;
	}
	
	#mine .bottom {
		font-size: 1.15rem;
		color: #333333;
		letter-spacing: 0;
		margin-bottom: 0.5rem;
	}
	
	#mine .bottom a {
		background: url(../../static/img/retreat.png) 1rem 0.5rem no-repeat;
		padding: 0.3rem 1.2rem;
		background-size: 0.8rem;
	}
	
	#mine .bottom font {
		display: inline-block;
		padding: 0.45rem 0;
	}
	
	#mine header {
		position: relative;
		width: 100%;
		height: 11rem;
		background-image: linear-gradient(125deg, #b674fd 10%, #cb9dfd 50%);
		border-radius: 0 0 20% 20%;
	}
	
	#mine .top {
		display: flex;
		/*justify-content: space-around;*/
	}
	
	#mine .topone {
		margin: auto 0;
		width: 7.43rem;
		height: 7.43rem;
		border-radius: 50%;
		padding: 1rem;
	}
	
	#mine .topone img {
		border: 2px solid white;
		background: white;
		border-radius: 50%;
		width: 100%;
		max-width: 100%;
		height: 100%;
	}
	
	#mine .main ul {
		padding: 1rem 1rem 1rem 0;
		line-height: 1.8;
	}
	
	#mine .main ul li:nth-of-type(1) {
		font-size: 1.2rem;
		letter-spacing: 0;
		color: white;
	}
	
	#mine .main ul li:nth-of-type(2) {
		font-size: 1rem;
		color: white;
	}
	
	#mine .main ul li:nth-of-type(2) img {
		width: 0.92rem;
	}
	
	#mine .main ul li:nth-of-type(3) {
		width: 120%;
		font-size: 0.8rem;
		color: white;
		font-weight: 100;
	}
	
	#mine .bottomm {
		width: 95%;
		margin: 0 auto;
		background: #ffffff;
		box-shadow: 0 2px 9px 0 rgba(182, 116, 253, 0.4);
		border-radius: 3px;
		display: flex;
		justify-content: space-around;
	}
	
	#mine .bottom_item {
		padding: 1rem 0;
	}
	
	#mine .bottomone {
		display: flex;
		flex-direction: column;
		line-height: 2;
		font-size: 1.1rem;
	}
	
	#mine .bottomone img {
		width: 1.69rem;
		height: 1.71rem;
		margin: 0 auto;
	}
	
	#mine .picture {
		width: 95%;
		margin: 0 auto;
		margin-top: 4rem;
		box-shadow: 0 2px 9px 0 #eeeeee;
		border-radius: 3px;
	}
	
	#mine .picture p {
		color: #333;
		font-size: 1.1rem;
		padding: 0.8rem;
	}
	
	#mine .picture_item {
		padding: 0 0.8rem 0.8rem 0.8rem;
		display: flex;
		justify-content: space-between;
	}
	
	#mine .pictureone {
		width: 4.43rem;
		height: 4.43rem;
		background: #eeeeee;
		border-radius: 3px;
	}
	
	#mine .set {
		width: 95%;
		margin: 1rem auto;
		background: #ffffff;
		box-shadow: 0 2px 9px 0 #eeeeee;
		border-radius: 3px;
	}
	
	#mine .setitem {
		width: 95%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		padding: 0.5rem 0;
		border-bottom: 1px solid #f5f5f5;
	}
	
	#mine .setleft {
		display: flex;
	}
	
	#mine .setleft img {
		width: 1.34rem;
		height: 1.29rem;
		margin: auto;
	}
	
	#mine .setleft p {
		padding: 0.5rem;
		margin-left: 0.5rem;
		font-size: 1.1rem;
		color: #333333;
	}
	
	#mine .setright {
		width: 1.5rem;
		display: flex;
		height: 2rem;
	}
	
	#mine .setright img {
		width: 100%;
		margin: auto;
		padding-top: 0.7rem;
	}
	
	#mine .btn {
		width: 100%;
	}
	
	#mine .btn button {
		padding: 0.7rem 4rem;
		background: #ffffff;
		border: 1px solid #b674fd;
		border-radius: 3px;
		color: #b674fd;
		margin: 3rem auto;
		display: block;
	}
</style>
<style>
	#mine .el-upload--picture-card {
		position: relative;
		width: 4.43rem;
		height: 4.43rem;
		background: #eeeeee;
		border-radius: 3px;
	}
	
	#mine .el-icon-plus {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	
	#mine .el-upload-list--picture-card .el-upload-list__item {
		width: 4.43rem;
		height: 4.43rem;
		background: #eeeeee;
		border-radius: 3px;
	}
	
	#mine .el-upload-list__item-preview .el-icon-zoom-in:before {
		content: "";
	}
	
	#mine .el-upload-list__item-delete {
		margin-left: 0;
	}
	/* 弹出层 */
	
	#mine .mark {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 9;
	}
	
	#mine .mark_content {
		position: absolute;
		/*padding-bottom: 1rem;*/
		top: 50%;
		left: 50%;
		width: 82%;
		transform: translate(-50%, -50%);
		background-color: #fff;
		border: 1px solid #ccc;
		border-radius: 5px;
	}
	
	#mine .mark_content>h2 {
		position: relative;
		text-align: left;
		line-height: 4rem;
		font-size: 1.7rem;
		padding-left: 1rem;
	}
	
	* {
		box-sizing: border-box;
	}
	
	#mine .img-list {
		overflow: hidden;
		width: 100%;
	}
	
	.img-list .img-content {
		float: left;
		position: relative;
		display: inline-block;
		width: 200px;
		height: 270px;
		padding: 5px;
		margin: 5px 20px 20px 0;
		border: 1px solid #d1dbe5;
		border-radius: 4px;
		transition: all .3s;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
	}
	
	.img-list .img-content img {
		display: block;
		width: 100%;
		height: 190px;
		margin: 0 auto;
		border-radius: 4px;
	}
	
	.img-list .img-content .name {
		margin-top: 10px;
	}
	
	.img-list .img-content .name>div {
		width: 90%;
		text-overflow: ellipsis;
		overflow: hidden;
		height: 25px;
		line-height: 25px;
	}
	
	.img-list .img-content:hover .del,
	.img-list .img-content:hover .layer {
		opacity: 1;
	}
	
	.img-list .img-content .del,
	.img-list .img-content .layer {
		opacity: 0;
		transition: all .3s;
	}
	
	.img-list .img-content .del {
		position: absolute;
		bottom: 10px;
		right: 10px;
		color: #8492a6;
		cursor: pointer;
		font-size: 1.1em;
	}
	
	.img-list .img-content .layer {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		height: 200px;
		color: #fff;
		text-align: center;
		z-index: 5;
		background-color: rgba(0, 0, 0, .4);
	}
	
	.img-list .img-content .layer i {
		font-size: 1.6em;
		margin-top: 80px;
	}
	
	.picture_item,
	.picture_item>div {
		width: 100%;
		display: flex;
		flex-wrap: nowrap;
	}
	
	#mine .dot {
		position: absolute;
		top: 1.5rem;
		right: 2rem;
		display: inline-block;
		width: 0.6rem;
		height: 0.6rem;
		border-radius: 50%;
		background: red;
	}
	/*#mine .dott{
		position: absolute;
		bottom: -1%;
		right: 3rem;
		z-index: -88;
		display: inline-block;
		width: 0.6rem;
		height: 0.6rem;
		border-radius: 50%;
		background: red;
	}*/
</style>
