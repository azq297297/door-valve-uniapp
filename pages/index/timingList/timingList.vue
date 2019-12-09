<template>
	<view class="timingList">
		<view class="timingList-item" v-for="(item,index) in list" :key='index' @click.stop="totiming(item)"  v-if="timeType==1&&item.checked ||timeType!=1">
			<view class="timingList-item-left">
				<view class="times">{{!item.open_time?'暂未设置':item.open_time+'开启'}}-{{!item.closing_time?'暂未设置':item.closing_time+'关闭'}}</view>
				<view class="repetition" v-if="item.state==4">重复：执行完成</view>
			<view class="repetition" v-else>重复：{{item.stateText}}</view>
			</view>
			
			<view class="timingList-item-right" v-if="item.name_of_device==name_of_device&&item.chetype!=2" @click.stop> 
				<switch :checked='item.state==4?false:item.checked' style="transform:scale(0.7)" @change="switch1Change"  :id='item.id'/>

			</view>
		</view>
	
		<view class="addtiming" @click="btnAdd" v-if="timeType!=1">
			<image src="../../../static/img/adds.png" mode=""></image>
			<text>添加定时</text>
		</view>
	</view>
</template>

<script>
	import {
		getTimerIndex,
		getTimerEquipment_state
	} from '@/common/js/index.js'
	export default {
		data() {
			return {
				name_of_device: "",
				list: [],
				timeType:''
			};
		},
		onLoad(e) {
			console.log(e)
		
			this.timeType=e.timeType
			if(	this.timeType==1){
				uni.setNavigationBarTitle({
				    title: '查看定时'
				});
			}else{
				uni.setNavigationBarTitle({
				    title: '定时列表'
				});
			}
			this.name_of_device = e.name_of_device
			console.log(this.name_of_device)
			
		},
		onShow() {
			this.submitTimerIndex()
		},
		methods: {
			/*-跳转新增定时-*/
			btnAdd() {
				uni.navigateTo({
					url: '../timing/timing?name_of_device=' + this.name_of_device + '&timingType=' + 1
				})
			},
			/*-获取定时列表-*/
			async submitTimerIndex() {
				let result = await getTimerIndex({
					name_of_device: this.name_of_device
				})
				console.log(result)
				let dataArr=[]
				for(let i in  result.data){
					if( result.data[i].name_of_device==this.name_of_device){
						if(this.timeType!=1){
							if(result.data[i].phone==uni.getStorageSync('phone')){
								dataArr.push(result.data[i])
							}
						}else{
							if(result.data[i].state==4){
								
							}else{
								if(result.data[i].phone==uni.getStorageSync('phone')){
									result.data[i].chetype=1
									dataArr.push(result.data[i])
								}else{
										result.data[i].chetype=2
										dataArr.push(result.data[i]);
								}
							
							}
							
						}
					
						
						
					}
					
				}
				console.log(dataArr);
				this.list =dataArr;
				for (let i in this.list) {
				this.list[i].checked=this.list[i].state_type==1?true:false
				
					if (this.list[i].state == 1) {
						if(this.list[i].surplus){
							this.list[i].stateText = '执行一次 '+this.list[i].surplus
						}else{
							this.list[i].stateText = '执行完成'
						}
						

					} else if (this.list[i].state == 2) {
						this.list[i].stateText = '每天执行'
					} else if (this.list[i].state == 3) {
						let week = this.list[i].week.split(",");
						console.log(week)
						let arrweekday = []
						for (let s in week) {
							switch (week[s]) {
									case '1':
									arrweekday.push('星期一')
									break
									case '2':
									arrweekday.push("星期二")
									break
									case '3':
									arrweekday.push("星期三")
									break
									case '4':
									arrweekday.push("星期四")
									break
									case '5':
									arrweekday.push("星期五")
									break
									case '6':
									arrweekday.push("星期六")
									break
									case '7':
									arrweekday.push("星期日")
									break
								}
							}
							this.list[i].stateText = arrweekday.join(',')

						}
					}
					console.log(this.list)

				},
				
				switch1Change(e){
						console.log(e);
						for(let i in this.list){
							if(this.list[i].id==e.currentTarget.id){
								console.log("AAAAAAAAAAAEEEEEEEEEEEEEE")
								
								this.submitTimerEquipment_state(this.list[i].id,this.list[i].name_of_device,this.list[i].state==4?2:this.list[i].state_type,i)
							}
							
						}
						
						
				},
				 async submitTimerEquipment_state(device_id,name_of_device,state_type,i){
					let result=await getTimerEquipment_state({
						device_id:device_id,
						name_of_device:name_of_device,
						state_type:state_type==1?2:1,
					})
					if(result.code==2023){
					this.submitTimerIndex()
					}else{
						uni.showToast({
							icon:'none',
							title:result.msg
						})
					}
					console.log(result)
				},
				/*-跳转到添加页（修改）-*/
				totiming(item){
					if(this.timeType==1){
						return
					}
					console.log(item);
					uni.navigateTo({
						url:'../timing/timing?item='+JSON.stringify(item)
					})
				}
			}
		}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.timingList {
		height: 100%;
		
		.timingList-item {
			background: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 122upx;
			border-top: 1px solid rgba(213, 213, 213, 0.7);

			.timingList-item-left {
				box-sizing: border-box;
				padding-left: 76upx;
				padding-right: 46upx;
				font-size: 26upx;

				.times {
					margin-bottom: 12upx;
					color: rgba(0, 0, 0, 1);
				}

				.repetition {
					color: rgba(66, 121, 245, 1);

				}
			}
		}

		.addtiming {
			
			margin: auto;
		
			bottom: 339upx;
			width: 305upx;
			background: #fff;
			height: 339upx;
			box-sizing: border-box;
			padding-top: 63upx;
			border-radius: 30upx;
			margin-top:200upx;

			image {
				display: block;
				margin: 0 auto;
				margin-bottom: 52upx;
				width: 107upx;
				height: 107upx;
			}

			text {
				display: block;
				text-align: center;
				font-size: 26upx;
				font-weight: 400;
			}
		}
	}
</style>
