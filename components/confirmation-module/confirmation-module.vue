<template>
	<view class="confirmation-back" v-if="confrimationShow">
		<view class="confirmation" @click.stop>
			<view class="conf-title">
				<text>{{ title }}</text>
			</view>
			<view class="conf-cont" v-if="contType == 1">
				<text
					class="conf-cont-text"
					:style="{ textAlign: contText.length > 10 ? 'left' : 'center' }"
				>
					{{ contText }}
				</text>
				<text class="conf-cont-text">{{ contTextTwo }}</text>
			</view>
			<view class="conf-cont" v-if="contType == 2">
				<input
					type="text"
					placeholder="不超过十五个字"
					placeholder-class="placeholders"
					v-model="inputVal"
					class="input-class"
				/>
			</view>
			<view class="conf-cont" v-if="contType == 3">
				<text class="cont-text3">
					您同意使用阀门小程序约定条款，为了更好地使用程序控制硬件，必须按照说明使用软件以防……
				</text>
				<view class="checked-class" @click.stop="radioCilck">
					<image src="../../static/img/chechked.png" v-if="checkeds"></image>
					<image src="../../static/img/nochecked.png" v-if="!checkeds"></image>
					<text>我已阅读并同意使用条款</text>
				</view>
			</view>
			<view class="conf-cont" v-if="contType == 4">
				<text class="cont-text3 login-text">
					获取手机号是为了预防燃气泄露时给您发送短信即使通知。
				</text>
				<input
					type="number"
					v-model="phone"
					class="input-login"
					placeholder="请输入手机号"
					placeholder-class="placeholders"
				/>
				<view class="code-class">
					<input
						type="number"
						v-model="code"
						value=""
						placeholder="请输入六位验证码"
						placeholder-class="placeholders"
					/>
					<view
						class="btn-code"
						@click.stop="btnCode"
						:class="codeType ? 'code-time-class' : ''"
					>
						{{ codeText }}
					</view>
				</view>
			</view>
			<view class="conf-cont contType6" v-if="contType == 5">
				<text>失败的设备：{{ contText }}</text>
				<text>失败原因：</text>
				<text>1.手机或者设备连接的WiFi网络不佳</text>
				<text>2.设备与电源断开</text>
				<text>3.设备损坏</text>
			</view>
			<view class="hint-height">
				<view class="hint" v-if="contType == 4">
					<image
						src="../../static/img/jinggao.png"
						mode=""
						v-if="hintType != 0"
					></image>
					<text v-if="hintType == 1">请输入正确验证码</text>
					<text v-if="hintType == 2">请输入正确手机号</text>
				</view>
			</view>
			<view class="btn" v-if="btnType == 1">
				<view class="btn-left conf-btn-class" @click.stop="cancel">取消</view>
				<view class="btn-right conf-btn-class" @click.stop="affirm">确认</view>
			</view>
			<view class="btn btntwo" v-if="btnType == 2">
				<view class="btn-left conf-btn-class" @click.stop="cancelAbnormal">
					暂不使用
				</view>
				<view class="btn-right conf-btn-class" @click.stop="affirmAbnormal">
					继续使用
				</view>
			</view>
			<view class="btn btnThree" v-if="btnType == 3">
				<view class="btn-right conf-btn-class" @click.stop="affirm">
					一键登录
				</view>
			</view>
			<view class="btn btnThree" v-if="btnType == 4">
				<view class="btn-right conf-btn-class" @click.stop="cancel">
					我知道了
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getloginMsg_translate } from '@/common/js/login.js';
export default {
	data() {
		return {
			value: ['close'],
			checkeds: false,
			inputVal: '',
			codeType: false, //判断验证码获取中
			codeText: '获取验证码', //获取验证码文本
			hintType: 0, //
			phone: '', //登陆手机号
			code: '' //登陆验证码
		};
	},
	props: {
		/**
		 * contType  1:基础，2有输入框，3有单选框（同意条款）,4登陆获取手机号
		 * */
		contType: {
			type: Number,
			default: 1
		},
		//设备异常弹框携带的数据
		carry: {
			type: null,
			default: ''
		},
		confrimationShow: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: '提示'
		},
		contText: {
			type: String,
			default: '确认解散分组'
		},
		contTextTwo: {
			type: String,
			default: ''
		},
		btnType: {
			type: Number,
			default: 1
		}
	},

	onLoad() {},
	onUnload() {
		this.inputVal = '';
		console.log(this.inputVal);
	},
	methods: {
		//取消
		cancel() {
			if (this.contType == 3) {
				uni.clearStorage();
				uni.redirectTo({
					url: '../../login/login'
				});
			}
			this.inputVal = '';
			this.$emit('onCancels');
		},
		/*-勾选条款-*/
		radioCilck(e) {
			this.checkeds = !this.checkeds;
		},
		/*
		 * 点击确认 contType  1:基础，2有输入框，3选框（同意条款）
		 */
		affirm(e) {
			console.log(this.contType);
			switch (this.contType) {
				case 1:
					console.log('BBBBBBBBBB');
					if (this.btnType == 2) {
						this.$emit('onConfirm', '设备异常');
					} else {
						this.$emit('onConfirm');
					}

					break;
				case 2:
					if (this.inputVal != '') {
						this.$emit('onConfirm', this.inputVal);
						this.inputVal = '';
					} else {
						uni.showToast({
							title: '分组名字不能为空',
							icon: 'none'
						});
					}

					break;
				case 3:
					if (!this.checkeds) {
						uni.showToast({
							title: '必须勾选条款！',
							icon: 'none'
						});
					} else {
						this.$emit('onConfirm');
					}
					break;
				case 4:
					if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.phone)) {
						uni.showToast({
							icon: 'none',
							title: '手机号输入有误'
						});
						return;
					}
					if (!this.code) {
						uni.showToast({
							icon: 'none',
							title: '验证码不能为空'
						});
						return;
					}
					let loginData = {
						phone: this.phone,
						code: this.code
					};
					console.log(loginData);
					this.$emit('onConfirm', loginData);
					break;
			}
		},
		confrimationShowbtn() {},
		async queryloginMsg_translate() {
			if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.phone)) {
				uni.showToast({
					icon: 'none',
					title: '手机号输入有误'
				});
				return;
			}
			//判断是否获取验证码中，如果是那禁止点击
			if (this.codeType) {
				return false;
			}

			let result = await getloginMsg_translate({
				phone: this.phone
			});

			let times = 60; //验证码重新发送需要多少秒
			let codeTiem = setInterval(() => {
				if (times <= 1) {
					
					this.codeType = false;
					this.codeText = '获取验证码';
					console.log(this.codeType);
					console.log(this.codeText);
					clearInterval(codeTiem);
					return;
				}
				this.codeType = true;
				this.codeText = times + 's';
				times--;
			}, 1000);

			// console.log(result)
		},
		/*-获取验证码-*/
		btnCode() {
			this.queryloginMsg_translate();
		},

		/*-设备异常确认继续使用-*/
		affirmAbnormal() {
			this.$emit('onConfirm', this.carry);
		},
		/*-设备异常确认继续使用-*/
		cancelAbnormal() {
			this.$emit('onCancels', this.carry);
		}
	}
};
</script>
<style lang="less">
.confirmation-back {
	position: fixed;
	z-index: 888;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);

	.confirmation {
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
		width: 533upx;
		height: auto;
		background: #fff;
		color: #000;
		border-radius: 26upx;

		.conf-title {
			border-bottom: 1px solid rgba(112, 112, 112, 1);
			text-align: center;
			height: 82upx;
			font-size: 28upx;
			line-height: 82upx;
		}

		.contType6 {
			text {
				display: block;
				text-align: left;
				font-size: 28upx;
				line-height: 1.2;
			}
		}

		.conf-cont {
			text-align: center;
			box-sizing: border-box;
			padding: 50upx 40upx 0upx 50upx;
			font-size: 30upx;

			.conf-cont-text {
				display: block;
				line-height: 1.5;
			}

			.input-class {
				width: 90%;
				text-align: left;
				margin: 0 auto;
				border: 1px solid #999999;
				border-radius: 34upx;
				height: 62upx;
				box-sizing: border-box;
				padding: 0 20upx;
			}

			.cont-text3 {
				text-align: left;
				display: block;
				margin-bottom: 50upx;
				font-size: 25upx;
				line-height: 1.7;
			}

			.radio {
				font-size: 24upx;
			}

			.checked-class {
				padding-left: 40upx;
				display: flex;
				align-items: center;

				image {
					display: block;
					width: 30upx;
					height: 30upx;
					margin-right: 10upx;
				}

				text {
					display: block;
				}
			}

			.login-text {
				margin-bottom: 20upx;
			}

			.input-login {
				width: 100%;
				text-align: left;
				border: 1px solid #999999;
				border-radius: 40upx;
				height: 62upx;
				box-sizing: border-box;
				padding: 0 30upx;
				font-size: 23upx;
				margin-bottom: 30upx;
			}

			.code-class {
				display: flex;

				input {
					text-align: left;
					border-radius: 34upx;
					height: 60upx;
					box-sizing: border-box;
					padding: 0 30upx;
					font-size: 23upx;
					border: 1px solid rgba(172, 172, 172, 1);
				}

				.btn-code {
					margin-left: 20upx;
					font-size: 23upx;
					width: 200upx;
					background: #4cd964;
					height: 62upx;
					text-align: center;
					line-height: 62upx;
					border-radius: 40upx;
					color: #fff;
				}

				.code-time-class {
					color: #555555;
				}
			}
		}

		.hint-height {
			height: 60upx;

			.hint {
				display: flex;
				align-content: center;
				justify-content: center;

				image {
					height: 35upx;
					width: 35upx;
					display: block;
					margin-top: 15upx;
					margin-right: 10upx;
				}

				text {
					font-size: 23upx;
					line-height: 60upx;
					display: block;
					color: red;
				}
			}
		}

		.btn {
			padding: 0 50upx;
			display: flex;

			.conf-btn-class {
				height: 67upx;
				line-height: 67upx;
				padding: 0 30upx;
				width: 100%;
				text-align: center;
				border-radius: 34upx;
				font-size: 25upx;
				margin-bottom: 50upx;
				color: #fff;
			}

			.btn-left {
				background: rgba(117, 203, 71, 1);
				box-shadow: 0px 3upx 6upx rgba(71, 230, 0, 0.48);
				margin-right: 40upx;
			}

			.btn-right {
				background: rgba(50, 125, 244, 1);
				box-shadow: 0px 3upx 6upx rgba(11, 118, 244, 0.58);
			}
		}

		.btntwo {
			.btn-left {
				background: #75ca84;
				margin-right: 40upx;
			}

			.btn-right {
				background: #f16161;
			}
		}

		.btnThree {
			.conf-btn-class {
				padding: 0 30upx;
				height: 70upx;
				line-height: 70upx;
			}
		}
	}
}

.radio radio {
	transform: scale(0.6);
}

.placeholders {
	font-size: 23upx;
	text-align: left;

	color: rgba(191, 191, 191, 1);
}
</style>
