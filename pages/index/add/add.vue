<template>
	<view class="add-describe">
		<image src="../../../static/img/zu.png" mode="" class="logo"></image>
		<text class="text-top">请确认阀门通电并按下阀门按钮三秒，
</text>
		<text class="text-top">黄灯闪烁，使设备处于待连接状态。</text>
		<view class="btn-po">
			<view class="checked-class" @click="radioCilck">
				<image src="../../../static/img/chechked.png" v-if="checkeds"></image>
				<image src="../../../static/img/nochecked.png" v-if="!checkeds"></image>
				<text>已确认上述步骤</text>
			</view>
			<view class="btn-blue" @click="toScan">下一步</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checkeds: false
			};
		},
		methods: {
			radioCilck(e) {
				this.checkeds = !this.checkeds
			},
			/*-跳转到输入设备编号-*/
			toScan(){
			
				if(!this.checkeds){
					uni.showToast({
						icon:'none',
						title:"勾选并完成所需步骤"
					})
					return
				}

				uni.navigateTo({
					url:'../scan/scan'
				})
			}
		}
	}
</script>

<style lang="scss">
	.add-describe {
		padding-top: 69upx;
		.logo {
			width: 212upx;
			height: 212upx;
			display: block;
			margin: 0 auto;
			margin-bottom: 58upx;
			
		}

		text {
			display: block;

		}

		.text-top {
			text-align: center;
			line-height: 1.8;
			font-size: 30upx;
			font-weight:bold;

		

			&:nth-of-type(2) {
				margin-bottom: 70upx;
			}
		}

		.text-bottom {
			padding-left: 100upx;
			font-size: 24upx;
			font-weight:bold;
			line-height:60upx;
		}



		.btn-po {
			position: fixed;
			left: 0;
			right: 0;
			margin: auto;
			bottom: 180upx;

			.checked-class {
				margin-bottom: 40upx;
				display: flex;
				align-items: center;
				justify-content: center;


				image {

					display: block;
					width: 24upx;
					height: 24upx;
					margin-right: 15upx;
				}

				text {
					display: block;
					font-size:22upx;
					
				}
			}

		}
	}
</style>
