<template>
	<view class="feedbackStatus">
		<image src="../../../static/img/chenggong-3.png" mode="" class="status-icon"></image>
		<view class="status-text-one">反馈提交成功</view>
		<view class="status-text-two">近期可能会给您致电</view>
		<view class="btn-blue" @click="btnIndex">返回首页</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: "反馈问题"
			})
		},
		methods: {
			btnIndex() {
				uni.switchTab({
					url: "../../tabbar/mine/mine"
				})
			}
		}
	}
</script>

<style lang="scss">
	.feedbackStatus {
		padding-top: 100upx;

		.status-icon {
			width: 118upx;
			height: 119upx;
			display: block;
			margin: 0 auto;

		}

		.status-text-one {
			text-align: center;
			font-size: 26upx;
			font-weight: 400;
			margin-bottom: 66upx;
			margin-top: 33upx;
		}

		.status-text-two {
			text-align: center;
			font-size: 27upx;
			font-weight: 400;
			margin-bottom: 50upx;
		}
	}
</style>
