<template>
	<div id='wrap' v-cloak>
		<div class="section">
			<div class="baseitem">
				<dl style="width: 5rem;height: 5rem;">
					<img src="../../static/img/18.png" alt="图片加载有误" v-if='img==""' style='border-radius: 50%;width: 100%;max-width: 100%;' />
					<img :src="img" alt="图片加载有误" style='border-radius: 50%;max-width: 100%;height: 100%;' v-else/>
					<dt>
						<dd v-if='names' style="width: 15rem;">{{names}}</dd>
					</dt>
				</dl>
				<h1>请输入您的基本信息</h1>
				<p>
					<label for="">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</label>
					<input type="text" placeholder="请输入姓名" v-model="personal.name" @input="okname">
				</p>
				<p>
					<label for="">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄：</label>
					<input type="text" maxlength="2" placeholder="请输入年龄" v-model="personal.age" @input="okkkk">
				</p>
				<p>
					<label for="">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</label>
					<el-radio v-model="personal.sex" label="男">男</el-radio>
					<el-radio v-model="personal.sex" label="女">女</el-radio>
				</p>
				<p style='border:none;'>
					<label for="">婚姻状况：</label>
					<el-radio-group v-model="personal.status">
						<el-radio @change="change()" :label="1">未婚</el-radio>
						<el-radio @change="change()" :label="2">离异</el-radio>
						<el-radio @change="change()" :label="3">丧偶</el-radio>
					</el-radio-group>
				</p>

				<div class="load" v-show="show">
					<p>请上传身份证正反面</p>
					<!--<el-upload name='album' :headers="header" action="http://yinhan-media.weiyingjia.org/api/yinhan/memberimg" type='1' list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-error='handleError'>
						<i class="el-icon-plus"></i>
					</el-upload>-->
					<el-upload name='album' action='string' list-type="picture-card" :file-list="imgList" :headers="header" :on-preview="handlePictureCardPreview" :on-success='handleSuccess' :on-remove.self="handleRemove" multiple :limit="2" :on-exceed="handleExceed" :http-request='upload' :on-error='handleError' accept="image/*" ref='upload'>
						<i class="el-icon-plus"></i>
					</el-upload>
				</div>
				<div class="load" v-show="show1">
					<p>请上传离婚证明和身份证正反面</p>
					<!--<el-upload name='album' :headers="header" action="http://yinhan-media.weiyingjia.org/api/yinhan/memberimg" type='2' list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-error='handleError'>
						<i class="el-icon-plus"></i>
					</el-upload>-->
					<el-upload name='album' action='string' list-type="picture-card" :file-list="imgList" :headers="header" :on-preview="handlePictureCardPreview" :on-success='handleSuccess' :on-remove.self="handleRemove" multiple :limit="3" :on-exceed="handleExceedd" :http-request='upload' :on-error='handleError' accept="image/*" ref='upload'>
						<i class="el-icon-plus"></i>
					</el-upload>
				</div>
				<div class="newimg load" v-show="show2">
					<p>请上传死亡证明和身份证正反面</p>
					<!--<el-upload name='album' :headers="header" action="http://yinhan-media.weiyingjia.org/api/yinhan/memberimg" type='3' list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-error='handleError'>
						<i class="el-icon-plus"></i>
					</el-upload>-->
					<el-upload name='album' action='string' list-type="picture-card" :file-list="imgList" :headers="header" :on-preview="handlePictureCardPreview" :on-success='handleSuccess' :on-remove.self="handleRemove" multiple :limit="3" :on-exceed="handleExceeddd" :http-request='upload' :on-error='handleError' accept="image/*" ref='upload'>
						<i class="el-icon-plus"></i>
					</el-upload>
				</div>
				<p class='mySelect'>
					<label for="" style="margin-left: -0.9rem;width: 8.5rem;">户籍所在地：</label>
					<x-address title="" v-model="personal.location" raw-value :list="addressData" value-text-align="left" label-align="justify" placeholder="请选择您的户籍所在地"></x-address>
					<!--<span class='moreAge'>
							<i class="el-icon-arrow-right"></i>
					</span>-->
				</p>
				<p>
					<label for="">身&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;高：</label>
					<input type="text" maxlength="3" placeholder="请输入身高(cm)" v-model="personal.height" @input="okkk">
				</p>
				<p>
					<label for="">体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;重：</label>
					<input type="text" maxlength="3" placeholder="请输入体重(kg)" v-model="personal.weight" @input="oook">

				</p>
				<p for="">民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族：</label>
					<input type="text" placeholder="请输入民族" v-model="personal.national" @input="okethnic">
				</p>
				<p>
					<label for="" style="margin-left: -0.9rem;">职业及职务：</label>
					<input type="text" placeholder="请输入您职业及职务" v-model="personal.postion" @input="okoccupation">
				</p>
				<p>
					<label for="">月&nbsp;&nbsp;收&nbsp;&nbsp;入：</label>
					<!--<input type="text" placeholder="请选择您的月收入" v-model="personal.income">-->
					<popup-picker title="" placeholder="请选择您的月收入" :data="myIncome" v-model="personal.income" value-text-align="left"></popup-picker>
				</p>
				<p>
					<label for="">文化程度：</label>
					<input type="text" placeholder="请输入您的文化程度" v-model="personal.education" @input="okeducation">
				</p>
				<p>
					<label for="">住房情况：</label>
					<el-radio-group v-model="personal.housing">
						<el-radio :label="0" style="margin-left: -0.1rem;">无</el-radio>
						<el-radio :label="1">租房</el-radio>
						<el-radio :label="2">自有住房</el-radio>
						<el-radio :label="3">其它</el-radio>
					</el-radio-group>
				</p>
				<p class='mySelect'>
					<label for="" style="width: 8rem;">家庭住址：</label>
					<x-address title="" v-model="personal.familyLocal" raw-value :list="addressData" value-text-align="left" label-align="justify" placeholder="请选择您的家庭住址"></x-address>
					<!--<span class='moreAge'>
							<i class="el-icon-arrow-right"></i>
					</span>-->
				</p>
				<p>
					<label for="">联系方式：</label>
					<input type="text" maxlength="11" placeholder="请输入您的联系方式" v-model.trim="personal.number" />
				</p>
				<p>
					<label for="">身份证号：</label>
					<input type="text" placeholder="请输入您的身份证号" v-model.trim="personal.IDcard">
				</p>
				<p>
					<label for="">子女情况：</label>
					<el-radio-group v-model="personal.children">
						<el-radio :label="0">无</el-radio>
						<el-radio :label="1">有</el-radio>
					</el-radio-group>
				</p>
				<p>
					<label for="">爱好特长：</label>
					<input type="text" placeholder="请输入您的爱好特长" v-model="personal.hobby" @input="ook()">
				</p>
			</div>
			<div class='required baseitem'>
				<h1>择偶要求</h1>
				<p class='mySelect'>
					<label for="">年&nbsp;&nbsp;龄&nbsp;&nbsp;段：</label>
					<!--<span class='moreAge'>
						<i class="el-icon-arrow-right"></i>
					</span>-->
					<popup-picker title="" placeholder="请选择您希望她/他的年龄段" :data="selectData" v-model="selection.agePart" value-text-align="left"></popup-picker>

				</p>
				<p class='mySelect'>
					<label for="">居&nbsp;&nbsp;住&nbsp;&nbsp;地：</label>
					<x-address title="" hide-district v-model="selection.address" raw-value :list="addressData" value-text-align="left" label-align="justify" placeholder="请选择您希望她/他的居住地"></x-address>
				</p>
				<p class='mySelect'>
					<label for="">身&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;高：</label>
					<popup-picker title="" placeholder="请选择您希望她/他的身高（cm）" :data="heightData" v-model="selection.height" value-text-align="left"></popup-picker>
				</p>
				<p>
					<label for="">体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;重：</label>
					<popup-picker title="" placeholder="请选择您希望她/他的体重（kg）" :data="weightData" v-model="selection.weight" value-text-align="left"></popup-picker>
				</p>
				<p class='mySelect'>
					<label for="" style="margin-left: -0.9rem;width: 8.5rem;">户籍所在地：</label>
					<x-address title="" v-model="selection.local" hide-district raw-value :list="addressData" value-text-align="left" label-align="justify" placeholder="请选择您希望她/他的户籍所在地"></x-address>
				</p>
				<p>
					<label for="">民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族：</label>
					<input type="text" placeholder="请输入您希望她/他的民族" v-model="selection.nation" @input="okkethnic">
				</p>
				<p class='mySelect'>
					<label for="">月&nbsp;&nbsp;收&nbsp;&nbsp;入：</label>
					<popup-picker title="" placeholder="请选择您希望她/他的月收入" :data="incomeData" v-model="selection.income" value-text-align="left"></popup-picker>
				</p>
				<p>
					<label for="">文化程度：</label>
					<input type="text" placeholder="请输入您希望她/他的文化程度" v-model="selection.education" @input="okkeducation">
				</p>
				<p>
					<label for="">婚姻状况：</label>
					<!--<el-checkbox-group v-model="selection.status">
						<el-checkbox :label="0">不限</el-checkbox>
						<el-checkbox :label="1">未婚</el-checkbox>
						<el-checkbox :label="2">离异</el-checkbox>
						<el-checkbox :label="3">丧偶</el-checkbox>
					</el-checkbox-group>-->
					<el-checkbox-group v-model="selection.status">
						<el-checkbox :label="0">不限</el-checkbox>
						<el-checkbox :label="1" style="margin-left: 3px;">未婚</el-checkbox>
						<el-checkbox :label="2" style="margin-left: 3px;">离异</el-checkbox>
						<el-checkbox :label="3" style="margin-left: 3px;">丧偶</el-checkbox>
					</el-checkbox-group>
					<!--<el-checkbox-group v-model="selection.status">
						<el-checkbox v-for="city in statusData" :label="city" :key="city">{{city}}</el-checkbox>
					</el-checkbox-group>-->
				</p>
				<p>
					<label for="">兴趣爱好：</label>
					<input type="text" placeholder="请输入您期望他/她的兴趣爱好" v-model="selection.hobby" @input="ookk()">
				</p>
				<p>
					<label for="">子女情况：</label>
					<el-radio-group v-model="selection.children">
						<el-radio :label="0">不限</el-radio>
						<el-radio :label="1">无</el-radio>
						<el-radio :label="2">有</el-radio>
					</el-radio-group>
				</p>
				<p>
					<label for="">住房情况：</label>
					<el-radio-group v-model="selection.housing">
						<el-radio :label="0" style="margin-left: -0.1rem;">无</el-radio>
						<el-radio :label="1">租房</el-radio>
						<el-radio :label="2">自有住房</el-radio>
						<el-radio :label="3">其它</el-radio>
					</el-radio-group>
				</p>
			</div>
			<div class="btn" style="margin-bottom: 4rem;">
				<span @click="getData()">确定</span>
			</div>
		</div>
	</div>
</template>
<script>
	import { Indicator } from 'mint-ui';
	import { GroupTitle, Group, Cell, XInput, Selector, PopupPicker, Datetime, XNumber, ChinaAddressData, XAddress, XTextarea, XSwitch } from 'vux'
	export default {
		name: "Info",
		components: {
			Group,
			GroupTitle,
			Cell,
			XInput,
			Selector,
			PopupPicker,
			XAddress,
			Datetime,
			XNumber,
			XTextarea,
			XSwitch
		},
		data() {
			return {
				radio2: 6,
				isCheck: false,
				dialogImageUrl: "",
				dialogVisible: false,
				//下拉框数据
				selectData: [
					["不限", "40~50岁", "51~60岁", "61~70岁", "71岁以上"]
				],
				heightData: [
					["不限", "150cm以下", "151~160cm", "161~170cm", "171~180cm", "180cm以上"]
				],
				weightData: [
					["不限", "50kg以内", "50~60kg", "60~70kg", "70~80kg", "80~90kg", "90kg以上"]
				],
				incomeData: [
					["不限", "2000元以下", "2000~4000元", "4000~6000元", "6000~10000元", "1万元以上"]
				],
				myIncome: [
					["2000元以下", "2000~4000元", "4000~6000元", "6000~10000元", "1万元以上"]
				],
				names: null,
				img: null,
				address: null,
				children: null,
				idImg: null, //图片id
				personal: {
					name: "", //姓名
					age: "", //年龄
					height: "", //身高
					weight: "", //体重
					postion: "", //职位
					income: [], //收入
					education: "", //教育背景
					familyLocal: [], //家庭住址
					number: "", //手机号码
					IDcard: "", //身份证号
					hobby: "", //爱好
					sex: "男", //性别
					status: 0, //婚姻状况，
					location: [], //户籍所在地，
					national: "", //民族
					children: 0, //子女状况
					housing: 0 //住房情况
				},
				selection: {
					//择偶标准
					agePart: ["不限"], //年龄段
					address: [], //地址
					weight: ["不限"], //体重
					height: ["不限"], //身高
					children: 0, //子女情况
					status: [], //婚姻状态
					local: [], //户籍所在地
					nation: "", //民族
					income: ["不限"], //收入
					hobby: "", //爱好
					housing: 0, //住房情况
					education: "" //学历
				},
				show: true,
				show1: false,
				show2: false,
				tokenNew: "",
				getMsgdata: "",
				addressData: ChinaAddressData,
				age: null,
				statusData: ["不限", "未婚", "离异", "丧偶"],
				imgList: []

			};
		},
		mounted() {
			this.tokenNew = sessionStorage.getItem("Token");
			this.getMsg();
			window.scroll(0, 0);
		},
		methods: {
			//个人信息姓名
			okname() {
				if(this.personal.name.length > 10) {
					this.personal.name = this.personal.name.slice(0, 10)
				}
			},
			//个人信息民族
			okethnic() {
				if(this.personal.national.length > 10) {
					this.personal.national = this.personal.national.slice(0, 10)
				}
			},
			//个人信息职业
			okoccupation() {
				if(this.personal.postion.length > 10) {
					this.personal.postion = this.personal.postion.slice(0, 10)
				}
			},
			//个人信息年龄
			okkkk() {
				if(this.personal.age.length > 2) {
					this.personal.age = this.personal.age.slice(0, 2)
				}
			},
			//个人信息学历
			okeducation() {
				if(this.personal.education.length > 10) {
					this.personal.education = this.personal.education.slice(0, 10)
				}
			},
			//个人信息身高
			okkk() {
				if(this.personal.height.length > 3) {
					this.personal.height = this.personal.height.slice(0, 3)
				}
			},
			//个人信息的爱好特长
			ook() {
				if(this.personal.hobby.length > 10) {
					this.personal.hobby = this.personal.hobby.slice(0, 10)
				}
			},
			//个人信息体重
			oook() {
				if(this.personal.weight.length > 3) {
					this.personal.weight = this.personal.weight.slice(0, 3)
				}
			},
			//择偶要求的兴趣爱好
			ookk() {
				if(this.selection.hobby.length > 10) {
					this.selection.hobby = this.selection.hobby.slice(0, 10)
				}
			},
			//择偶要求民族
			okkethnic() {
				if(this.selection.nation.length > 10) {
					this.selection.nation = this.selection.nation.slice(0, 10)
				}
			},
			//择偶要求学历
			okkeducation() {
				if(this.selection.education.length > 10) {
					this.selection.education = this.selection.education.slice(0, 10)
				}
			},
			//未婚丧偶离异切换
			change() {
				if(this.personal.status == 1) {
					this.show = true;
					this.show1 = false;
					this.show2 = false;
				}
				if(this.personal.status == 2) {
					this.show = false;
					this.show1 = true;
					this.show2 = false;
				}
				if(this.personal.status == 3) {
					this.show = false;
					this.show1 = false;
					this.show2 = true;
				}
			},
			//数据获取
			getData() {
				let trueName = this.personal.name;
				let trueAge = this.personal.age;
				let trueIDcard = this.personal.IDcard;
				let trueNumber = this.personal.number;
				let trueHeight = this.personal.height;
				let trueLocation = this.personal.location;
				let trueWeight = this.personal.weight;
				let truePostion = this.personal.postion;
				let trueEducation = this.personal.education;
				let trueFamilyLocal = this.personal.familyLocal;
				let trueHobby = this.personal.hobby;
				let trueNational = this.personal.national;
				let trueChildren = this.personal.children;

				switch(trueChildren) {
					case 0:
						this.personal.children = 0;
						break;
					case 1:
						this.personal.children = 1;
						break;
				}
				let status = this.personal.status;
				switch(status) {
					case 1:
						this.personal.status = 1;
						break;
					case 2:
						this.personal.status = 2;
						break;
					case 3:
						this.personal.status = 3;
						break;
				}
				let housing = this.personal.housing;
				switch(housing) {
					case 0:
						this.personal.housing = 0;
						break;
					case 1:
						this.personal.housing = 1;
						break;
					case 2:
						this.personal.housing = 2;
						break;
					case 3:
						this.personal.housing = 3;
						break;
				}
				//择偶标准
				let seleAgePart = this.selection.agePart[0];
				let seleHeight = this.selection.height[0];
				let seleWeight = this.selection.weight[0];
				let seleIncome = this.selection.income[0];
				let trueIncome = this.personal.income[0];
				let seleChildren = this.selection.children;
				let seleAddress = this.selection.address;
				let seleStatus = this.selection.status;
				//				switch(seleStatus) {
				//					case 0:
				//						this.selection.status = 0;
				//						break;
				//					case 1:
				//						this.selection.status = 1;
				//						break;
				//					case 2:
				//						this.selection.status = 2;
				//						break;
				//				}
				let seleLocal = this.selection.local;
				let seleNation = this.selection.nation;
				let seleHobby = this.selection.hobby;
				let seleEducation = this.selection.education;
				let seleHousing = this.selection.housing;
				switch(seleHousing) {
					case 0:
						this.personal.housing = 0;
						break;
					case 1:
						this.personal.housing = 1;
						break;
					case 2:
						this.personal.housing = 2;
						break;
					case 3:
						this.personal.housing = 3;
						break;
				}
				var regNum = /^4[0-9]$|^[4-9]\d$|^1\d{2}$/;
				var regPhone = /(^1[3|4|5|6|7|8]\d{9}$)|(^09\d{8}$)/;
				var regPwd = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/
				let regword = /^[\u4e00-\u9fa5]+$/
				if(regNum.test(this.personal.age)) {
					if(regPhone.test(this.personal.number)) {
						if(regPwd.test(this.personal.IDcard)) {
							if(
								this.personal.name == "" ||
								this.personal.age == "" ||
								this.personal.sex == "" ||
								this.personal.number == "" ||
								this.personal.IDcard == "" ||
								this.personal.height == "" ||
								this.personal.location == [] ||
								this.personal.weight == "" ||
								this.personal.postion == "" ||
								this.personal.income == "" ||
								this.personal.education == "" ||
								this.personal.familyLocal == [] ||
								this.personal.hobby == "" ||
								this.personal.national == "" ||
								this.personal.children == null ||
								this.personal.status == null ||
								this.personal.housing == null
							) {
								this.$message.warning({
									message: "请完善个人基本信息",
									duration: 6000
								});
							} else {
								var _this = this;
								this.$http({
										method: "post",
										url: "http://yinhan-media.weiyingjia.org/api/yinhan/member",
										data: {
											true_name: trueName,
											age: trueAge,
											sex: _this.personal.sex,
											marital: _this.personal.status,
											register_address: JSON.stringify(trueLocation),
											height: trueHeight,
											weight: trueWeight,
											nation: trueNational,
											worker: truePostion,
											education: trueEducation,
											income: trueIncome,
											house_status: _this.personal.housing,
											address: JSON.stringify(trueFamilyLocal),
											idcard: trueIDcard,
											tel: trueNumber,
											children_status: _this.personal.children,
											hobby: trueHobby,
											//择偶要求
											con_age: seleAgePart,
											con_height: seleHeight,
											con_weight: seleWeight,
											con_income: seleIncome,
											con_register_address: JSON.stringify(seleLocal),
											con_address: JSON.stringify(seleAddress),
											con_nation: seleNation,
											con_marital: JSON.stringify(_this.selection.status),
											con_hobby: seleHobby,
											con_children_status: _this.selection.children,
											con_house_status: _this.selection.housing,
											con_education: seleEducation
										},
										headers: {
											Authorization: "Bearer " + this.tokenNew
										}
									})
									.then(res => {
										console.log(res.data.data)
										if(regword.test(_this.personal.name)) {
											if(regword.test(_this.personal.national)) {
												if(regword.test(_this.personal.postion)) {
													if(regword.test(_this.personal.education)) {
														if(regword.test(_this.personal.hobby)) {
															if(_this.selection.nation.length > 0) {
																if(regword.test(_this.selection.nation)) {
																	if(_this.selection.education.length > 0) {
																		if(regword.test(_this.selection.education)) {
																			if(_this.selection.hobby.length > 0) {
																				if(regword.test(_this.selection.hobby)) {
																					_this.$message.success({
																						message: "填写完成！",
																						duration: 6000
																					});
																					_this.$router.push({
																						path: "/index/home"
																					});
																				} else {
																					_this.$message.error({
																						message: "兴趣爱好不能带有数字、特殊字符和空格哦，请重新填写",
																						duration: 6000
																					});
																				}
																			} else {
																				_this.$message.success({
																					message: "填写完成！",
																					duration: 6000
																				});
																				_this.$router.push({
																					path: "/index/home"
																				});
																			}
																		} else {
																			_this.$message.error({
																				message: "择偶要求中学历不能带有数字、特殊字符和空格，请重新填写",
																				duration: 6000
																			});
																		}
																	} else {
																		if(_this.selection.hobby.length > 0) {
																			if(regword.test(_this.selection.hobby)) {
																				_this.$message.success({
																					message: "填写完成！",
																					duration: 6000
																				});
																				_this.$router.push({
																					path: "/index/home"
																				});
																			} else {
																				_this.$message.error({
																					message: "兴趣爱好不能带有数字、特殊字符和空格，请重新填写",
																					duration: 6000
																				});
																			}
																		} else {
																			_this.$message.success({
																				message: "填写完成！",
																				duration: 6000
																			});
																			_this.$router.push({
																				path: "/index/home"
																			});
																		}
																	}
																} else {
																	_this.$message.error({
																		message: "择偶要求中民族不能带有数字、特殊字符和空格，请重新填写",
																		duration: 6000
																	});
																}
															} else {
																if(_this.selection.education.length > 0) {
																	if(regword.test(_this.selection.education)) {
																		if(_this.selection.hobby.length > 0) {
																			if(regword.test(_this.selection.hobby)) {
																				_this.$message.success({
																					message: "填写完成！",
																					duration: 6000
																				});
																				_this.$router.push({
																					path: "/index/home"
																				});
																			} else {
																				_this.$message.error({
																					message: "兴趣爱好不能带有数字、特殊字符和空格，请重新填写",
																					duration: 6000
																				});
																			}
																		}
																	} else {
																		_this.$message.error({
																			message: "择偶要求中学历不能带有数字、特殊字符和空格，请重新填写",
																			duration: 6000
																		});
																	}
																} else {
																	if(_this.selection.hobby.length > 0) {
																		if(regword.test(_this.selection.hobby)) {
																			_this.$message.success({
																				message: "填写完成！",
																				duration: 6000
																			});
																			_this.$router.push({
																				path: "/index/home"
																			});
																		} else {
																			_this.$message.error({
																				message: "兴趣爱好不能带有数字、特殊字符和空格，请重新填写",
																				duration: 6000
																			});
																		}
																	} else {
																		_this.$message.success({
																			message: "填写完成！",
																			duration: 6000
																		});
																		_this.$router.push({
																			path: "/index/home"
																		});
																	}
																}
															}
														} else {
															_this.$message.error({
																message: "爱好特长不能带有数字、特殊字符和空格，请重新填写",
																duration: 6000
															});
														}
													} else {
														_this.$message.error({
															message: "学历不能带有数字、特殊字符和空格，请重新填写",
															duration: 6000
														});
													}
												} else {
													_this.$message.error({
														message: "职业及职务不能带有数字、特殊字符和空格，请重新填写",
														duration: 6000
													});
												}
											} else {
												_this.$message.error({
													message: "您输入的民族不合法，请重新填写",
													duration: 6000
												});
											}
										} else {
											_this.$message.error({
												message: "您输入的姓名不合法，请重新填写",
												duration: 6000
											});
										}
									})
									.catch(res => {
										_this.$message.error({
											message: "个人信息身高和体重只允许输入数字",
											duration: 6000
										});
									});
							}
						} else {
							this.$message.error({
								message: "您输入的身份证不合法，请重新输入！",
								duration: 6000
							});
						}
					} else {
						this.$message.error({
							message: "您的手机号不正确，请重新输入！",
							duration: 6000
						});
					}
				} else {
					this.$message.error({
						message: "年龄不允许小于40岁哦",
						duration: 6000
					});
				}
			},
			getMsg() {
				let _this = this;
				Indicator.open({
					text: 'Loading...',
					spinnerType: 'fading-circle'
				});
				this.$http({
					method: "get",
					url: "http://yinhan-media.weiyingjia.org/api/yinhan/my",
					params: {},
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + this.tokenNew
					}
				}).then(res => {
					Indicator.close();
					this.names = res.data.data.wechat.nickname;
					this.img = res.data.data.wechat.headimgurl;
				})
			},
			moreAge: () => {

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
				console.log(item.file)
				console.log(item.file.size + "原始图片的大小")
				let thi_s = this
				lrz(item.file, {
					width: 1000
				}, (results) => {
					item.file = thi_s.dataURLtoFile(results.base64, item.file.name)
					console.log(item.file.size + "压缩过后的图片大小");
					var _this = this;
					var formData = new FormData();
					formData.append("album", item.file);
					var newData = formData.get('album')
					console.log(newData);
					var xml = new XMLHttpRequest();
					xml.open(
						"post",
						"http://yinhan-media.weiyingjia.org/api/yinhan/memberimg",
						true
					);
					xml.onload = function() {
						var json = eval("(" + xml.responseText + ")");
						console.log(json);;
					};
					xml.setRequestHeader("Authorization", "Bearer" + this.tokenNew)
					xml.send(formData);
				})
			},
			handleRemove(response, fileList) {
				document.getElementsByClassName('el-upload el-upload--picture-card')[0].style.display = 'block';
				this.$http({
					method: "post",
					url: "http://yinhan-media.weiyingjia.org/api/yinhan/memberimg/del",
					data: {
						id: response.response.data.id
					},
					headers: {
						"Authorization": "Bearer " + this.tokenNew
					}
				}).then(res => {
					_this.$message.success({
						message: "您已删除成功！",
						duration: 6000
					});
				}).catch(error => {
					throw error
				})
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleExceed(files, fileList) {
				document.getElementsByClassName('el-upload el-upload--picture-card')[0].style.display = 'none';
				_this.$message.warning({
					message: "限制为2张",
					duration: 6000
				});
			},
			handleExceedd(files, fileList) {
				document.getElementsByClassName('el-upload el-upload--picture-card')[1].style.display = 'none';
				_this.$message.warning({
					message: "限制为3张",
					duration: 6000
				});
			},
			handleExceeddd(files, fileList) {
				document.getElementsByClassName('el-upload el-upload--picture-card')[2].style.display = 'none';
				_this.$message.warning({
					message: "限制为3张",
					duration: 6000
				});
			},
			handleSuccess(response, file, fileList) {
				this.idImg = response.data.id;
				_this.$message.success({
					message: "您已上传成功哦！",
					duration: 6000
				});
			},
			handleError() {
				_this.$message.error({
					message: "上传照片大小不能超过2M哦！",
					duration: 6000
				});
			}
		},
		computed: {
			header() {
				return {
					Authorization: "Bearer " + this.tokenNew
				};
			}
		}
	};
</script>

<style scoped>
	body {
		overflow-y: scroll;
	}
	
	#wrap {
		position: relative;
		overflow: hidden;
	}
	
	#wrap .head {
		width: 100%;
		padding-bottom: 0.1rem;
		box-shadow: 0 2px 4px 0 #f7f7f7;
	}
	
	#wrap .head img {
		width: 100%;
		max-width: 100%;
	}
	
	#wrap .bottom {
		font-size: 1.15rem;
		color: #333333;
		letter-spacing: 0;
		margin-bottom: 0.5rem;
	}
	
	#wrap .bottom a {
		background: url(../../static/img/retreat.png) 1rem 0.5rem no-repeat;
		padding: 0.3rem 1.2rem;
		background-size: 0.8rem;
	}
	
	#wrap .bottom font {
		display: inline-block;
		padding: 0.45rem 0;
	}
	
	#wrap .btn>span {
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
	
	#wrap .moreAge {
		font-weight: bolder;
		font-size: 1.3rem;
	}
	
	#wrap .section {
		padding: 0.8rem;
	}
	
	#wrap .baseitem,
	#wrap .required {
		padding: 0 1rem;
		background: #ffffff;
		box-shadow: 0 2px 9px 0 #eeeeee;
		border-radius: 3px;
	}
	
	#wrap .required {
		margin-top: 1rem;
		padding-top: 1rem;
	}
	
	#wrap h1 {
		margin: 1rem 0;
		font-size: 1.21rem;
	}
	
	#wrap .baseitem p,
	#wrap .required p {
		line-height: 3.5rem;
		display: flex;
		border-bottom: 1px solid #eeeeee;
		align-items: center;
		flex-direction: center;
		padding-right: 1rem;
	}
	
	#wrap .baseitem dl {
		display: flex;
		padding-top: 1rem;
		font-size: 1.07rem;
	}
	
	#wrap .baseitem dl dt img {
		width: 100%;
		height: auto;
	}
	
	#wrap .baseitem dl dd {
		margin-left: 1rem;
		margin-top: 2rem;
	}
	
	#wrap .baseitem p label {
		display: inline-block;
		/*width: 8rem;*/
	}
	
	#wrap .baseitem p input {
		flex: 1;
		border: none;
		outline: none;
		padding-left: 0.5rem;
		background-color: #fff;
		border-radius: 5px;
		height: 2rem;
		line-height: 2rem;
	}
	
	#wrap .baseitem p textarea {
		height: 3rem;
		border: none;
		outline: none;
		padding-left: 0.5rem;
		color: black;
	}
	
	#wrap .baseitem p input::-webkit-input-placeholder {
		color: #cccccc;
		font-size: 1rem;
	}
	
	#wrap .el-radio__input.is-checked .el-radio__inner {
		border-color: #b674fd;
		background: #b674fd;
	}
	/* 弹出层 */
	
	#wrap .mark {
		/*position: absolute;*/
		position: fixed;
		/*top: 0;*/
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
	}
	
	#wrap .mark_content {
		position: absolute;
		top: 71%;
		bottom: 0rem;
		left: 50%;
		width: 100%;
		transform: translate(-50%, 0);
		background-color: #fff;
		padding: 0.5rem;
	}
	
	#wrap .mark_content>.list {
		display: flex;
		justify-content: space-between;
		line-height: 3rem;
		border-bottom: 1px solid #eeeeee;
	}
	
	#wrap .mark_content>ul {
		padding: 1rem;
		text-align: center;
		padding-bottom: 6rem;
	}
	
	#wrap .mark_content>ul>li {
		display: flex;
		line-height: 2.5rem;
		justify-content: center;
		text-align: center;
	}
	
	#wrap .mark_content>ul>li>span {
		flex: 25%;
		text-align: center;
		font-size: 1.2rem;
	}
	
	#wrap .mark_content>ul>li>span:hover {
		color: #b674fd;
	}
	/* 上传图片 */
	
	#wrap .load div {
		display: flex;
		border-bottom: 1px solid #eeeeee;
		padding: 1rem 3rem;
	}
	
	#wrap .load div input {
		flex: 1;
		width: 100%;
	}
	
	#wrap .el-radio {
		display: flex;
	}
	
	#wrap .el-upload,
	#wrap .el-upload--picture-card {
		background-color: #fbfdff;
		border: 1px dashed #c0ccda;
		border-radius: 6px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		width: 148px;
		height: 148px;
		line-height: 146px;
		vertical-align: top;
		background: url(../../static/img/15.png) no-repeat !important;
	}
	
	#wrap .nomarry_con img {
		width: 5.43rem;
		height: 3.43rem;
	}
</style>
<style>
	#wrap .el-radio__input.is-checked .el-radio__inner {
		border-color: #b674fd;
		background: #b674fd;
	}
	
	#wrap .el-radio__input.is-checked+.el-radio__label {
		color: #b674fd;
	}
	
	#wrap .el-radio__inner {
		border-radius: 20%;
	}
	
	#wrap .el-radio+.el-radio {
		margin: 4px;
	}
	
	#wrap .el-radio__label {
		padding-left: 7px;
	}
	/*.el-upload--picture-card {
		position: relative;
		width: 4.43rem;
		height: 4.43rem;
		background: #EEEEEE;
		border-radius: 3px;
	}*/
	
	#wrap .el-icon-plus {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	
	#wrap .el-upload-list--picture-card .el-upload-list__item {
		width: 4.43rem;
		height: 4.43rem;
		background: #eeeeee;
		border-radius: 3px;
	}
	
	#wrap .el-radio {
		margin-left: 6px;
	}
	
	#wrap .el-radio__input {
		margin-right: -7px;
	}
	
	#wrap .el-upload--picture-card {
		position: relative;
		width: 4.43rem;
		height: 4.43rem;
		background: #eeeeee;
		border-radius: 3px;
	}
	
	#wrap .el-icon-zoom-in:before {
		content: "";
	}
	
	#wrap .el-upload-list__item-delete {
		margin-left: 0;
	}
	
	#wrap .mySelect label {
		padding-right: 0.2rem;
	}
	/*#wrap .mySelect div {
		display: flex;
	}*/
	
	#wrap .vux-cell-box {
		width: 100%;
	}
	
	#wrap .vux-cell-box:before {
		border-top: none;
	}
	
	#wrap .vux-popup-picker-placeholder {
		opacity: 0.6;
		/*text-indent: 2em;*/
	}
	
	#wrap .el-checkbox__input.is-checked .el-checkbox__inner {
		background: #B674FD;
		border-color: #B674FD;
	}
	
	#wrap .el-checkbox__input.is-checked+.el-checkbox__label {
		color: #B674FD;
	}
	
	#wrap .el-checkbox__label {
		padding-left: 0;
	}
</style>
