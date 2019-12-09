<template>
	<view class="scan">
		<view class="scan-text">请连接指定的设备WiFi“xxx”后返回此页面输入家庭WiFi的账号和密码为设备发送配网信息。
		</view>
		<view class="scan-text">
			注：在此页面连接设备WiFi后请勿再切换
			网络，否则可能导致配网失败</view>
		<view class="scan-input">
			<view class="scan-input-item">
				<image src="../../../static/img/wifi-6.png" mode=""></image>
				<input type="text" value="" v-model="wifiName" placeholder="请输入账号名称(不可输入汉字)" placeholder-class="placeholders" />
				<view class="" style="width: 37upx;"></view>
			</view>
			<view class="scan-input-item">
				<image src="../../../static/img/yuechi-2.png" mode="" style="height: 37upx;"></image>
				<input type="text" value="" v-model="wifiPassword" placeholder="请输入WiFi密码" placeholder-class="placeholders"
				 :password='password' />
				<image src="../../../static/img/open-eyes.png" mode="" @click="btnswitch" v-if="!password"></image>
				<image src="../../../static/img/yanjing.png" mode="" style="height: 21upx;" @click="btnswitch" v-else></image>
			</view> 

		</view>
		<view class="scan-bottom">
			<view class="btn-blue btn" @click="sendMessage">提交</view>
			<!-- <view class="scan-bottom-text" @click="toScanHelp">找不到添加的设备？查看帮助</view> -->
		</view>


	</view>
</template>

<script>
	import {
		newAb2Str
	} from '../../../common/js/utils.js'
	export default {
		data() {
			return {
				wifiName: '',
				wifiPassword: '',
				udpSocket: null,
				locationPort: null,
				password: true
			};
		},
		onLoad() {
			this.initUdpSocket();
		},
		methods: {
			btnswitch() {
				this.password = !this.password
			},
			initUdpSocket() {
				this.udpSocket = wx.createUDPSocket();
				console.log(this.udpSocket);
				if (this.udpSocket === null) {
					console.log('暂不支持')
					return;
				}
				this.locationPort = this.udpSocket.bind()

				this.udpSocket.onListening(function(res) {
					console.log('监 听中...')
					// console.log(res)
				})
				this.udpSocket.onError(function(res) {
					console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
					console.log(res)
					console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
				})
				let that = this
				this.udpSocket.onMessage(function(res) {
					console.log(123)
					let str = newAb2Str(res.message);
					console.log(str)

				})
			},
			sendMessage() {

				if(/[\u4E00-\u9FA5]/g.test( this.wifiName)){
					uni.showToast({
						icon:'none',
						title:'WiFi名称不能为汉字'
					})
					return
				}
				if(/[\u4E00-\u9FA5]/g.test( this.wifiPassword)){
					uni.showToast({
						icon:'none',
						title:'WiFi密码不能为汉字'
					})
					return
				}
			
			
				let message = {
					name: this.wifiName,
					pwd: this.wifiPassword,
					phone: uni.getStorageSync('phone')
				}
				console.log(JSON.stringify(message))
				this.udpSocket.send({
					address: '192.168.4.1',
					port: 9697,
					// address: '192.168.0.154',
					// port: 8080,
					message: JSON.stringify(message)
				})
				//初始化wifi
				this.startWifi()
			},
			toScanHelp() {
				uni.navigateTo({
					url: '../scanHelp/scanHelp'
				})
			},
			startWifi(){
				let that=this
				wx.startWifi({
				success: function() {
				//请求成功连接Wifi
				that.Connected();
				},
				fail: function(res) {
				
				uni.showToast({
					icon:"none",
					title:'接口调用失败'
				})
				
				}
				
				})
			
			},
			Connected(){
				let that=this
				wx.connectWifi({
				SSID: that.wifiName,
				password: that.wifiPassword,
				success: function(res) {
				uni.showToast({
				icon:"none",
				title: 'wifi连接成功',

				})
				uni.reLaunch({
							  url: '../connect/connect?wifiName='+that.wifiName
							});
			
				
				},
				
				fail: function(res) {
				console.log(res)
				wx.showToast({
				icon:'none',
				title: 'wifi连接失败',
				
				})
				
				}
				
				})
				
			},
			nextStep() {
				this.sendMessage()
				// uni.navigateTo({
				// 	url: '../scanDefeated/scanDefeated'
				// })
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #fff;
	}

	.scan {


		.logo {
			width: 178upx;
			height: 140upx;
			display: block;
			margin: 0 auto;

		}

		.scan-text {

			padding-top: 50upx;
			background: rgba(245, 245, 245, 1);
			box-sizing: border-box;
			padding-left: 125upx;
			padding-right: 84upx;

			font-size: 30upx;

			line-height: 60upx;
			color: rgba(36, 36, 36, 1);

			&:nth-of-type(2) {
				padding-bottom: 30upx;
			}
		}

		.scan-input {
			margin-top: 50upx;


			.scan-input-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 560upx;
				height: 62upx;
				background: rgba(255, 255, 255, 1);
				border: 1px solid rgba(172, 172, 172, 1);
				border-radius: 34upx;

				box-sizing: border-box;
				padding: 0 24upx;
				margin: 0 auto;

				image {
					width: 37upx;
					height: 26upx;
					display: block;
				}

				&:nth-of-type(1) {
					margin-bottom: 30upx;
				}
			}
		}

		.scan-bottom {
			width: 100%;
			padding-top: 60upx;


		}

	}

	.placeholders {
		font-size: 26upx;
		font-weight: 400;
		color: rgba(177, 177, 177, 1);
	}
</style>
