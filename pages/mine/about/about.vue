<template>
	<view>
		<view class="about-cont">流体小程序：可以高效地匹配阀门控制器，精确的控制阀门的开关状态</view>
		<view class="about-versions">

			<view class="about-versions-label">当前版本</view>
			<view class="">v1.00</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: "关于我们"
			})
		}
	}
</script>

<style lang="scss">
	.about-cont {

		padding-top: 59upx;
		width: 573upx;
		height: 108upx;
		font-size: 26upx;
		line-height: 50upx;
		color: rgba(10, 10, 10, 1);
		margin: 0 auto;
		margin-bottom: 35upx;
	}

	.about-versions {
		background: #fff;
		padding-left: 145upx;
		font-size: 26upx;
		height: 100upx;

		align-items: center;
		display: flex;

		.about-versions-label {
			margin-right: 30upx;
		}
	}
</style>
