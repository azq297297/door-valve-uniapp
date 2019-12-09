<template>
	<view>
		<view class="err-top">
			<image src="../../../static/img/wifistate.png" mode=""></image>
			<text>连接失败</text>
		</view>

		<view class="err-nav">
			<view class="err-text">
				<text>连接失败原因可能是：</text>
				<text>1.未正确连接到设备发送的WiFi上</text>
				<text>2.输入的账号和密码错误请耐心等待</text>
			</view>
			<view class="btn-blue" @click="btnConnertErr(2)">重新连接</view>

		</view>
	</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			/*-重新连接-*/
			btnConnertErr(e) {	
					uni.navigateTo({
						url: '../add/add'
					})
			

			}
		}
	}
</script>

<style lang="scss">
	.err-top {
		padding-top: 88upx;

		image {
			display: block;
			width: 178upx;
			height: 140upx;
			margin: 0 auto;
			margin-bottom: 47upx;

		}

		text {
			display: block;
			text-align: center;
			font-size: 28upx;
			
			margin-bottom: 74upx;

		}
	}

	.err-nav {
	

		.err-text{
			padding-bottom:330upx;
			text{
				text-align: center;
				display: block;
					font-size:28upx;
					line-height:50upx;
					color:rgba(36,36,36,1);
			}
		
		}
	}
</style>
