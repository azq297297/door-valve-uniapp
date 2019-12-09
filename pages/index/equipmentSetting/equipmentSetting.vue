<template>
	<view>
		<view class="item">
			<view class="item-left">
				<image src="../../../static/img/wif1.png" mode=""></image>
				<text>WiFi</text>
			</view>
			<view class="item-right" style="padding-right: 40upx;">
				<text>{{wifi_name}}</text>
			</view>
		</view>
		<view class="item" @click="btnEntrance(1)">
			<view class="item-left">
				<image src="../../../static/img/set1.png" mode=""></image>
				<text>设备名称</text>
			</view>
			<view class="item-right">
				<text>{{device_user}}</text>
				<image src="../../../static/img/right.png" mode=""></image>
			</view>
		</view>
		<view class="item" @click="btnEntrance(2)">
			<view class="item-left">
				<image src="../../../static/img/feet.png" mode=""></image>
				<text>反馈问题</text>
			</view>
			<view class="item-right">
				<image src="../../../static/img/right.png" mode=""></image>
			</view>
		</view>
		<confirmationModule :confrimationShow='confrimationShows' :contType='contTypes' title='修改设备名称' @onConfirm="onPromptConfirm"
		 @onCancels='onPromptCancels'></confirmationModule>
	</view>
</template>

<script>
	import {
		getDevicelistevice_name_update
	} from '@/common/js/index.js'
	import confirmationModule from "@/components/confirmation-module/confirmation-module.vue"
	export default {
		components: {
			confirmationModule
		},
		data() {
			return {
				confrimationShows: false,
				contTypes: 2,
				device_user: '',
				name_of_device: "",
				wifi_name: ''
			};
		},
		onLoad(e) {
			console.log(e);
			/*-储存数据-*/
			this.device_user = e.device_user
			this.wifi_name = e.wifi_name
			this.name_of_device = e.name_of_device

		},
		methods: {
			btnEntrance(e) {
				switch (e) {
					case 1:
						this.confrimationShows = true
						break
					case 2:
						uni.navigateTo({
							url: '../../mine/feedback/feedback'
						})
						break

				}
			},
			/*-修改设备名称-*/
			async submitDevicelistevice_name_update(device_user) {
				let result = await getDevicelistevice_name_update({
					name_of_device: this.name_of_device,
					device_user: device_user
				})
				if (result.code == 2010) {
					this.device_user = device_user
					this.confrimationShows = false
					uni.showToast({
						icon: "none",
						title: '修改成功'
					})
				} else {
					uni.showToast({
						icon: "none",
						title: result.msg
					})
				}

				console.log(result)

			},
			onPromptConfirm(e) {
				if (e.length > 15) {
					uni.showToast({
						icon: "none",
						title: '设备名称不能大于15个字'
					})
					return false

				}
				this.submitDevicelistevice_name_update(e)

			},
			onPromptCancels(e) {
				this.confrimationShows = false
			}
		}
	}
</script>

<style lang="scss">
	.item {
		background: #fff;
		border-bottom: 2upx solid rgba(213, 213, 213, 1);
		height: 90upx;
		padding-left: 30upx;
		padding-right: 46upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.item-left {
			display: flex;
			align-items: center;

			image {
				width: 51upx;
				height: 51upx;
				display: block;
				margin-right: 40upx;
			}

			text {
				display: block;
				font-size: 26upx;


			}
		}

		.item-right {
			display: flex;
			align-items: center;

			image {
				width: 30upx;
				height: 30upx;
				display: block;
				margin-left: 10upx;
			}

			text {
				display: block;

				font-size: 26upx;



				color: rgba(178, 178, 178, 1);

			}
		}

	}
</style>
