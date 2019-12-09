<template>
	<view class="add-shared">
		<view class="add-shared-text-one">什么是共享设备？</view>
		<view class="add-shared-text-two">共享设备是指你是第一个连接设备的人，此时设备只能由你控制，且其他人无法连接，如果想让其他人使用此设备,此时需要输入共用人的手机号码以便让他人使用。</view>
		<input type="text" v-model="remarks" value="" placeholder="备注名(不超过十个字)" placeholder-style="color:rgba(191,191,191,1);" />
		<input type="text" v-model="phone" placeholder="请输入要共享人的手机号" placeholder-style="color:rgba(191,191,191,1);">
		<view class="btn" @click="btnaddShared">添加用户</view>
		<view class="prompt-add" v-if="promptAdd">
			<view class="prompt-conter">
				<image src="../../../static/img/chenggong-3.png" mode=""></image>
				<text>此用户将收到你的共用邀请</text>
			</view>

		</view>

	</view>
</template>

<script>
	import {
		getShareddeviceDevice_user_add
	} from '@/common/js/index.js'
	export default {
		data() {
			return {
				phone: "",
				name_of_device: '',
				remarks: '',
				promptAdd:false
			};
		},
		onLoad(e) {
			this.name_of_device = e.name_of_device
		},
		methods: {
			/*-点击添加设备按钮-*/
			btnaddShared() {

				if (!(/^1[3456789]\d{9}$/.test(this.phone))) {

					uni.showToast({
						icon:'none',
						title: "手机号码有误，请重填"
					})
					return false;
				}
				if (!this.remarks) {
					uni.showToast({
						icon:'none',
						title: "设备备注不能为空"
					})

					return false;
				}
				if(this.remarks.length>10){
					
					uni.showToast({
						icon:'none',
						title: "设备备注不能超过10个字"
					})
					
					return false;
				}
				this.submitShareddeviceDevice_user_add()
			},
			/*-添加设备-*/
			async submitShareddeviceDevice_user_add() {

				let result = await getShareddeviceDevice_user_add({
					phone: this.phone,
					name_of_device: this.name_of_device,
					remarks: this.remarks
				});
				if(result.code==2019){
					this.promptAdd=true
					setTimeout(()=>{
						uni.navigateBack({
							delta: 1
											
						});
					},1500)
									
				}else{
					uni.showToast({
						icon:'none',
						title:result.msg
					})
				}

				console.log(result);
			}
		}
	}
</script>

<style lang="scss">
	.add-shared {
		color: rgba(10, 10, 10, 1);
		font-size: 26upx;
		padding-left: 88upx;
		padding-right: 88upx;
		padding-top: 50upx;

		.add-shared-text-one {
			font-weight: bold;
			margin-bottom: 50upx;
		}

		.add-shared-text-two {

			font-weight: bold;
			line-height: 50upx;

			margin-bottom: 60upx;

		}

		input {
			display: block;
			width: 560upx;
			height: 62upx;
			background: rgba(255, 255, 255, 1);
			border: 2upx solid rgba(172, 172, 172, 1);
			opacity: 1;
			box-sizing: border-box;
			padding: 0 20upx;
			border-radius: 34upx;
			font-size: 23upx;
			font-weight: 400;

			&:nth-of-type(1) {
				margin-bottom: 38upx;
			}

		}
	}

	.btn {
		font-size: 25upx;
		font-weight: 400;
		width: 555upx;
		height: 67upx;
		border-radius: 34upx;
		background: rgba(50, 125, 244, 1);
		box-shadow: 0px 3upx 6upx rgba(0, 137, 255, 0.58);
		text-align: center;
		line-height: 67upx;
		color: #fff;
		margin: 0 auto;
		margin-top: 108upx;
	}

	.prompt-add {
		position: fixed;
		left: 0;
		top: 0;
		height: 100vh;
		width: 100%;
		z-index: 99999;
		background: rgba(0, 0, 0, 0.58);
		display: flex;
		align-items: center;
	
		justify-content: center;

		.prompt-conter {
			box-shadow:0px 3upx 6upx rgba(0,0,0,0.16);
			opacity:1;
			border-radius:26upx;
			background: #fff;
			width: 533upx;
			height: 320upx;
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: center;
			image {
				display: block;
				width: 118upx;
				height: 118upx;
				margin-bottom: 33upx;
			}
			text{
				font-size:26upx;
			}
		}

	}
</style>
