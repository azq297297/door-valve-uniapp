<template>
	<view>
		<view class="title">共享用户列表</view>
		<view class="shared-list" v-if="list.length!=0">
			<view class="item" v-for="(item,index) in list" :key='index' @click="relieve(item)">
				<view class="item-left">
					{{item.remarks}}
				</view>
				<view class="item-right">
					<view class="item-name">{{item.user_phone}}</view>
					<view class="item-btn" @click="relieve">解绑</view>
				</view>
				
			</view>
		
		</view>
		<view class="prompt" v-else>暂无用户</view>
		<view class="btn-blue" @click="addShared">添加用户</view>
		<confirmationModule :confrimationShow="confrimationShows" title="提示" :contText="contText" :contTextTwo="contTextTwo"
		 @onConfirm="onPromptConfirm" @onCancels="onPromptCancels"></confirmationModule>
	</view>
</template>

<script>
	import confirmationModule from '../../../components/confirmation-module/confirmation-module.vue'
	import {
		getShareddeviceIndex,
		getShareddeviceDel_device
	} from '@/common/js/index.js'
	export default {
		components: {
			confirmationModule
		},
		data() {
			return {
				confrimationShows: false,
				contText: '解绑后用户无法继续控制此设备',
				contTextTwo: '是否解绑？',
				item:{},
				name_of_device:'',
				list:[]
			};
		},
		onLoad(e) {
			console.log(e)
			this.name_of_device=e.name_of_device
			this.queryShareddeviceIndex();
		},
		methods: {
			/*-添加新的共享人-*/
			addShared() {
				uni.navigateTo({
					url: '../addShared/addShared?name_of_device='+this.name_of_device
				})

			},
			/*-点击解除-*/
			relieve(item) {
				this.item=item
				this.confrimationShows = true
			},
			/*-点击取消-*/
			onPromptCancels() {
				this.confrimationShows = false
			},
			/*-点击确认-*/
			onPromptConfirm() {
				this.subimtShareddeviceDel_device(this.item.name_of_device,this.item.id)
				this.confrimationShows = false
				
			},
			/*-获取共享列表-*/
			async queryShareddeviceIndex() {
				let result = await getShareddeviceIndex({
					name_of_device:this.name_of_device
				});
				console.log(result);
				this.list=result.data
			},
			/*-设备共享解绑-*/
			async subimtShareddeviceDel_device(name_of_device, id) {
				//设备参数name_of_device
				//设备共享人的id
				let result = await getShareddeviceDel_device({
					name_of_device: name_of_device,
					id: id
				})
				this.queryShareddeviceIndex()
				console.log(result)
			},

		}
	}
</script>

<style lang="scss">
	.shared-list {
		margin-bottom: 250upx;
		background: #fff;

		.item {
			display: flex;
			justify-content: space-between;
			padding: 25upx 60upx 25upx 76upx;
			border-bottom: 1upx solid rgba(213, 213, 213, 0.7);
			font-size: 26upx;
			.item-right{
				display: flex;
				align-items: center;
				.item-name{
					margin-right: 10upx;
						color: rgba(165, 165, 165, 1);
				}
			}
			.item-btn {
				border-left: 1upx solid rgba(213, 213, 213, 1);
				padding-left: 30upx;
				color: #000;
			}
		}
	}

	.title {

		font-size: 26upx;
		height: 60upx;
		padding-left: 64upx;
		line-height: 60upx;
		color: rgba(10, 10, 10, 1);


	}
	.prompt{
		text-align: center;
		font-size: 32upx;
		margin-bottom: 200upx;
		padding-top: 50upx;
	}
</style>
