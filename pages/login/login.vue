<template>
		<view class="content" >
			<image src="../../static/img/login-img.png" mode="" class="logo"></image>
			<!--#ifdef MP-WEIXIN -->
			<button type="primary" open-type="getUserInfo" @getuserinfo="getuserinfo" class="">微信一键登录</button>
			<!-- #endif -->
			<confirmationModule :confrimationShow='confrimationShows' :btnType='3' :contType='contTypes' title='登陆/注册' contText='确认删除分组2'
			 @onConfirm="onPromptConfirm"></confirmationModule>

		</view>
</template>

<script>
	import confirmationModule from "@/components/confirmation-module/confirmation-module.vue"
	import {
		getLogin
	} from '@/common/js/login.js'
	export default {
		components: {
			confirmationModule
		},
		data() {
			return {
				confrimationShows: false,
				contTypes: 4,
				userInfo: {}, //授权后返回的用户信息
			}
		},
		onLoad() {},

		methods: {
			/**
			 *  授权登陆
			 * */
			getuserinfo(e) {
				console.log(JSON.parse(e.detail.rawData).avatarUrl)
				if (e.detail.errMsg == 'getUserInfo:ok') {
					this.userInfo = e.detail.userInfo;
					this.confrimationShows = true;
					console.log(this.userInfo);
					uni.setStorageSync('avatarUrl', JSON.parse(e.detail.rawData).avatarUrl);
					uni.setStorageSync('nickName', this.userInfo.nickName);
				}
			},
			/*-登陆-*/
			async submitLogin(loginData) {
				 wx.showLoading({ title: "加载中…" })
				loginData.nickname = this.userInfo.nickName
				console.log('登陆请求接口前')
				console.log(loginData)
				let result = await getLogin({
					phone:loginData.phone,
					code:loginData.code,
					nickname:this.userInfo.nickName
				});
				 wx.hideLoading()
				console.log('登陆请求接口后')
				console.log(result)
				if(result.code==200){
					//储存token
					uni.setStorageSync('token', result.data.token);
					//储存手机号
					uni.setStorageSync('authorization', result.data.authorization);
					//储存授权
					uni.setStorageSync('phone', result.data.phone);
					//关闭弹窗
					this.confrimationShows = false
					uni.showToast({
						icon: 'none',
						title: '登陆成功'
					})
					setTimeout(()=>{
					uni.switchTab({
						url:'../tabbar/index/index'
					})	
					},1000)
				}else{
					uni.showToast({
						icon:'none',
						title:result.msg
					})
				}
			
				

			},
			onPromptConfirm(e) {
				console.log(e)
				this.submitLogin(e)
			},



		}
	};
</script>

<style lang="scss">
	page {
		background: #fff;
		padding-top: 126upx;
	}

	.content {
		.logo {
			width: 196upx;
			height: 196upx;
			display: block;
			margin: 0 auto;
			margin-bottom: 126upx;
		}

		button {
			width: 497upx;
			height: 85upx;
			border-radius: 8upx;
			margin: 0 auto;
		}
	}
	

</style>
