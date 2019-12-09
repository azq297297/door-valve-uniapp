<template>
	<view class="select">
		<view class="item-select" v-for="(item,index) in list" :key="index" @click="btnSelects(item)">
			<view class="item-left">
				<image src="../../../static/img/fenzu-2.png" mode=""></image>
				<text>{{item.title}}</text>
			</view>
			<view class="itme-right">
				<view class="itme-right-text" v-if='item.selects==1'>当前分组</view>
			
				<image src="../../../static/img/chechked.png" mode="" v-if='item.selects==3'></image>
				<image src="../../../static/img/nochecked.png" mode="" v-if='item.selects==2'></image>
					<view class="itme-right-text" v-if='item.selects==4'>离线模式</view>

			</view>
		</view>


		<view class="btn-blue" @click="submitDevicelistDevice_class_edit">完成</view>
	</view>
</template>

<script>
	import {
		getGroupingIndex,
		getDevicelistDevice_class_edit
	} from '@/common/js/index.js'
	export default {
		data() {
			return {
				list: [

				],
				selects: 1,
				name_of_device:'',
				classid:""
			};
		},
		onLoad(e) {
console.log(e)
this.name_of_device=e.name_of_device
			this.item = JSON.parse(e.item)
			this.queryGroupingIndex()
		},
		methods: {
			/*-选择分组-*/
			btnSelects(item) {
				if (item.selects == 1||item.selects == 4) {
					return

				}
				for (let i in this.list) {
					if (this.list[i].selects == 1) {

					} else {
						this.list[i].selects = 2
					}
				}
				item.selects = item.selects == 3 ? 2 : 3
				this.classid=item.id
			},
			async queryGroupingIndex() {
				let defaultIndex=0
				let result = await getGroupingIndex({
				})
				console.log(result)
				for (let i in result.data) {
					if(result.data[i].title == '默认分组'){
						defaultIndex=i
					}
					if (result.data[i].id == this.item.class.id) {
						result.data[i].selects = 1
					} else {

						result.data[i].selects = 2

					}
					if(result.data[i].state==2){
						
						result.data[i].selects = 4
					}

				}
				let dataArr=result.data
				let str = dataArr.splice(defaultIndex, 1);
				dataArr.unshift(str[0]);
				this.list = dataArr
				
				// let str = this.list.splice(defaultIndex, 1);
				// this.list.unshift(str[0]);
				// this.list =  result.data
			},
			async submitDevicelistDevice_class_edit(){
				if(this.classid==''){
					uni.showToast({
						icon:"none",
						title:"请选择分组"
					})
					return
				}
				let result =await getDevicelistDevice_class_edit({
					name_of_device:this.name_of_device,
					class:this.classid
				})
				if(result.code==2023){
					uni.showToast({
						icon:"none",
						title:"修改成功"
					})
					setTimeout(()=>{
						uni.navigateBack({
						    delta: 1
						},1000);
					})
				}
				console.log(result)
			}
		}
	}
</script>

<style lang="scss">
	.select {
		padding-top: 20upx;
		font-size: 26upx;

		.item-select {
			background: #fff;
			height: 80upx;
			border-bottom: 2upx solid #e1e1e1;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.item-left {
				box-sizing: border-box;
				padding-left: 60upx;
				display: flex;


				color: rgba(0, 0, 0, 1);

				image {
					display: block;
					margin-right: 23upx;
					width: 37upx;
					height: 37upx;
				}
			}

			.itme-right {
				display: flex;
				justify-content: center;
				width: 200upx;

				image {
					width: 30upx;
					height: 30upx;
				}

				.itme-right-text {}
			}
		}
	}

	.btn-blue {
		margin-top: 193upx;
	}
</style>
