<template>
	<view>
		<view class="" v-if="messageList.length!=0">
			<view class="item-message" v-for="(item,index) in messageList" :key="index">
				<view class="item-messagei-time">{{item.create_time==null?'暂无数据':item.create_time}}</view>
				<view class="item-messagei-cont">{{item.text}}</view>
			</view>
		</view>
		<view class="" v-else style="text-align: center;padding-top: 30upx;">暂无数据</view>

	</view>
</template>

<script>
	import {
		getMessage
	} from '@/common/js/mine.js'
	export default {
		data() {
			return {
				page: 1, //第几页
				messageList: [], //消息列表
			}

		},
		onLoad() {
			this.queryMessage()
		},
		onReachBottom() {
			this.queryMessage()
		},
		methods: {
			async queryMessage() {
				let result = await getMessage({
					pagesize:10,
					page: this.page,
					state: 1
				});
				if (result.code == 2003) {
					uni.redirectTo({
						url: '../../login/login'
					})
					return

				}
				console.log(result);
				if (this.page == 1) {
					this.messageList = result.data.data
				} else {
					this.messageList.push(...result.data.data);
				}
				if (this.messageList.length < result.data.count) {
					this.page++;
				}
			}
		}
	}
</script>

<style lang="scss">
	.item-message {
		padding: 20upx 31upx 20upx 60upx;
		background: #fff;
		border-bottom: 1px solid #e1e1e1;

		&:nth-of-type(1) {
			border-top: 1px solid #e1e1e1;
		}

		.item-messagei-time {

			font-size: 22upx;

			color: rgba(123, 123, 123, 1);
		}

		.item-messagei-cont {


			font-size: 25upx;
			line-height: 43upx;
			color: rgba(0, 0, 0, 1);
		}

	}
</style>
