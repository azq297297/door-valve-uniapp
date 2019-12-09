<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="less">
	/* 公共样式 */
	
	// @import url('/common/css/common.css');
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	page {
		background: rgba(245, 245, 245, 1);
	}

	.nav {
		margin-bottom: 120upx;
		background: #fff;

		.nav-item {

			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 97upx;
			border-bottom: 1px solid #e1e1e1;
			padding: 0 45upx;

			.item-left {
				display: flex;
				align-items: center;
				font-size: 26upx;

			}

			.icon {
				width: 51upx;
				height: 51upx;
				margin-right: 29upx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.icon-right {
				width: 30upx;
				height: 30upx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

	}

	.btn-class {
		width: 600upx;
		height: 80upx;
		text-align: center;
		background: #007AFF;
		line-height: 80upx;
		color: #fff;
		margin: 0 auto;
		margin-top: 120upx;
		border-radius: 40upx;
		font-size: 30upx;
	}

	.btn-blue {
		width: 555upx;
		height: 67upx;
		line-height: 67upx;
		background: rgba(50, 125, 244, 1);
		box-shadow: 0px 3upx 6upx rgba(0, 137, 255, 0.58);
		font-size: 25upx;
		font-weight: 400;
		border-radius: 34upx;
		margin: 0 auto;
		color: #fff;
		text-align: center;
	}
</style>
