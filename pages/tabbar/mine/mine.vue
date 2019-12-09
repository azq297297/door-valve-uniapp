<template>
	<view>
		<view class="back">
			<view class="mine-top" v-if="loginType">
				<image :src="avatarUrl" mode=""></image>
				<text>{{nickName}}</text>
			</view>
			<view class="logout" @click="tologin" v-else>
				<view class="btn-blue">登录</view>
			</view>
			<!-- 我的操作列表 -->
			<view class="nav">
				<view class="nav-item" @click="toFaq">
					<view class="item-left">
						<view class="icon">
							<image src="../../../static/img/mineFaq.png" mode=""></image>
						</view>
						<view class="text">常见问题</view>
					</view>
					<view class=""></view>
					<view class="icon-right">
						<image src="../../../static/img/right.png"></image>
					</view>
				</view>
				<view class="nav-item" @click="toRecord">
					<view class="item-left">
						<view class="icon">
							<image src="../../../static/img/mineRecord.png" mode=""></image>
						</view>
						<view class="text">操作记录</view>
					</view>
					<view class=""></view>
					<view class="icon-right">
						<image src="../../../static/img/right.png"></image>
					</view>
				</view>
				<view class="nav-item" @click="toMessage">
					<view class="item-left">
						<view class="icon">
							<image src="../../../static/img/mineMessage.png" mode=""></image>
							<view class="icon-msagee" v-if="messageType!=0"></view>
						</view>
						<view class="text">消息通知</view>
						
					</view>
					<view class=""></view>
					<view class="icon-right">
						<image src="../../../static/img/right.png"></image>
					</view>
				</view>
				<view class="nav-item" @click="toFeedback">
					<view class="item-left">
						<view class="icon">
							<image src="../../../static/img/Feedback.png" mode=""></image>
						</view>
						<view class="text">我要反馈</view>
					</view>
					<view class=""></view>
					<view class="icon-right">
						<image src="../../../static/img/right.png"></image>
					</view>
				</view>
				<view class="nav-item" @click="toAbout">
					<view class="item-left">
						<view class="icon">
							<image src="../../../static/img/mineAbout.png" mode=""></image>
						</view>
						<view class="text">关于我们</view>
					</view>
					<view class=""></view>
					<view class="icon-right">
						<image src="../../../static/img/right.png"></image>
					</view>
				</view>
			</view>
			<view class="btnExit" @click="btnExit" v-if="loginType">退出登录</view>
		</view>
		<confirmationModule :confrimationShow='confrimationShows' title='提示' :contText='contText' :contTextTwo='contTextTwo'
		 @onConfirm="onPromptConfirm" @onCancels='onPromptCancels'></confirmationModule>
		<mrhardTabbar></mrhardTabbar>
	</view>
</template>

<script>
	import {getMessageIndex} from '@/common/js/mine.js'
	import mrhardTabbar from "@/components/mrhard-tabbar/mrhard-tabbar.vue";
	import confirmationModule from "@/components/confirmation-module/confirmation-module.vue"
	export default {
		components: {
			mrhardTabbar,
			confirmationModule
		},

		data() {
			return {
				confrimationShows: false,
				contText: "确认退出？",
				contTextTwo: '当前用户：188222222',
				loginType: false,
				nickName: '', //名称
				avatarUrl: '', //头像
				msg_count:"",
				messageType:0
			}
		},
		onShow() {
	
			
			if (uni.getStorageSync('token') == '') {
				this.loginType = false
			} else {
				
				this.loginType = true
				this.queryMessageIndex()
				this.nickName = uni.getStorageSync('nickName')
				this.avatarUrl = uni.getStorageSync('avatarUrl')
				console.log(this.avatarUrl)
			}
		},
		
		methods: {
			changeSwitch(e) { //切换开关事件
				uni.showToast({
					title: String(e)
				})
			},
			navigateBackCallback(e) { //点击返回事件
				uni.showToast({
					title: "点击了返回事件"
				})
			},
			/*-跳转登陆-*/
			tologin() {

				uni.navigateTo({
					url: '../../login/login'
				})
			},
			/*-跳转常见问题-*/
			toFaq() {
				uni.navigateTo({
					url: '../../mine/faq/faq'
				})
			},
			/*-跳转操作记录-*/
			toRecord() {
				if (this.loginType) {
					uni.navigateTo({
						url: '../../mine/record/record'
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: '还没登陆，请登录'
					})
					setTimeout(() => {
						this.tologin()
					}, 1000)

				}

			},
			/*-跳转消息通知-*/
			toMessage() {
				if (this.loginType) {
					uni.navigateTo({
						url: '../../mine/message/message'
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: '还没登陆，请登录'
					})
					setTimeout(() => {
						this.tologin()
					}, 1000)

				}

			},
			/*-跳转我要反馈-*/
			toFeedback() {

				if (this.loginType) {
					uni.navigateTo({
						url: '../../mine/feedback/feedback'
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: '还没登陆，请登录'
					})
					setTimeout(() => {
						this.tologin()
					}, 1000)

				}
			},
			/*-跳转关于我们-*/
			toAbout() {
				uni.navigateTo({
					url: '../../mine/about/about'
				})
			},
			/*-退出登陆清空缓存-*/
			onPromptConfirm() {
				this.confrimationShows = false

				uni.clearStorage();
				uni.navigateTo({
					url: '../../login/login'
				})

			},
			/*-消息通知-*/
			async queryMessageIndex(){
				let result=await getMessageIndex({
					state:2
				})
				this.msg_count=result.data.msg_count
				console.log(result)
				this.messageType=result.data.msg_count
			},
			onPromptCancels() {
				this.confrimationShows = false
			},
			btnExit() {
				this.contTextTwo='当前用户：'+uni.getStorageSync('phone')
				this.confrimationShows = true
			},
		}
	}
</script>

<style lang="scss">
	.mine-top {
		padding-top: 40upx;
		text-align: center;

		image {
			display: block;
			width: 140upx;
			height: 140upx;
			margin: 0 auto;
			border-radius: 50%;

		}

		text {
			font-size: 25upx;
			margin-bottom: 36upx;
			color: rgba(0, 0, 0, 1);
			display: block;

		}

	}

	.logout {
		padding-top: 40upx;
		padding-bottom: 30upx;
		margin-bottom: 18upx;
		background: #fff;

		.btn-blue {
			width: 350upx;
		}
	}

	.btnExit {
		width: 555upx;
		height: 67upx;
		background: rgba(227, 227, 227, 1);
		box-shadow: 0px 3upx 6upx rgba(159, 159, 159, 0.58);

		border-radius: 34upx;

		line-height: 67upx;
		text-align: center;


		font-size: 25upx;

		font-weight: 400;

		color: rgba(69, 69, 69, 1);

		margin: 0 auto;
		cursor: pointer;
	}
	.icon{
		position: relative;
	.icon-msagee{
		position: absolute;
		left: 50upx;
		top: 0;
		width: 10upx;
		height: 10upx;
		background: red;
		border-radius: 50%;
	}	
	}
	
</style>
