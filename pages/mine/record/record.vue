<template>
	<view class="">
		<view v-if="list.length!=0">
			<view class="item-record" v-for="(item,index) in list" :key='index'>
				<view class="item-record-left">
					<view class="item-name">用户：{{item.user_phone}}</view>
					<view class="item-mode">设备：{{item.name_of_device}}</view>
					<view class="item-operation">操作：{{item.type}}</view>
				</view>
				<view></view>
				<view class="item-record-right">
					<view class="">{{item.arr[0]}}</view>
					<view class="">{{item.arr[1]}}</view>
				</view>
			</view>

		</view>

		<view class="item-wu" v-else>暂无操作记录</view>
	</view>
</template>

<script>
	import {
		getOperation
	} from '@/common/js/mine.js'
	import {
		getOperationDevice_operation
	} from '@/common/js/index.js'
	export default {
		data() {
			return {
				list: [], //操作记录数据
			};
		},
		onLoad(item) {
			console.log(item)
			
			if(item.name_of_device){
				this.queryOperationDevice_operation(item.name_of_device)
			}else{
				this.queryOperation();
			}

		},
		methods: {
			//获取操作记录
			async queryOperation() {
				let result = await getOperation({
				
				});
				this.list = result.data
				console.log(this.list);
				for (let i in this.list) {
					var str = this.list[i].cretate_time
					var strs = new Array(); //定义一数组
					strs = str.split(" "); //字符分割 
					this.list[i].arr = strs
				}
			},
			//
			async queryOperationDevice_operation(name_of_device) {
				let result = await getOperationDevice_operation({
					name_of_device: name_of_device
				});
				this.list = result.data.reverse()
				console.log(this.list);
				for (let i in this.list) {
					var str = this.list[i].cretate_time
					var strs = new Array(); //定义一数组
					strs = str.split(" "); //字符分割 
					this.list[i].arr = strs
				}
			
			
			}
		}
	}
</script>

<style lang="scss">
	.item-record {
		padding: 20upx 70upx;
		background: #fff;
		border-bottom: 1px solid #e1e1e1;
		display: flex;
		justify-content: space-between;
		align-content: center;

		&:nth-of-type(1) {
			border-top: 1px solid rgba(213, 213, 213, 1);
		}

		.item-record-left {
			font-size: 26upx;
			line-height: 1.7;
			color: rgba(0, 0, 0, 1);
		}

		.item-record-right {
			text-align: center;
			font-size: 20upx;
			line-height: 1.9;
			display: flex;
			flex-flow: column;
			justify-content: center;
			color: rgba(123, 123, 123, 1);
		}
	}

	.item-wu {
		text-align: center;
		padding-top: 200upx;
	}
</style>
