<template>
	<view>


		<view class="item">
			<view class="item-left">
				<image src="../../../static/img/chechked.png" mode=""></image>
				<text>WiFi</text>
			</view>
			<view class="item-right" style="padding-right: 40upx;">
				<text style="color:rgba(172,172,172,1);">{{wifiName}}</text>
			</view>
		</view>
		<view class="item">
			<view class="item-left">
				<image src="../../../static/img/chechked.png" mode=""></image>
				<text>设备名称</text>
			</view>
			<view class="item-right">
				<input type="text" value="" placeholder-class="placeholders" placeholder="deviceName" v-model="deviceName" />
			</view>
		</view>
		<view class="item">
			<view class="item-left">
				<image src="../../../static/img/chechked.png" mode=""></image>
				<text>设备分组</text>
			</view>
			<view class="item-right">
				<xfl-select :list="listArr" :clearable="false" :showItemNum="5" :isCanInput="false" :style_Container="'height: 57upx; font-size: 26upx;text-align: right;'"
				 :selectHideType="'hideAll'" @change='selectinputs' initValue='默认分组'>
				</xfl-select>
			</view>
		</view>
		<view class="hint">注:此设备型号为{{model}},使用限为{{day}}天。到达期限请更及时换。</view>
		<view class="btn-blue" @click="submitDevicelistDevice_add">开始使用</view>
		<confirmationModule :confrimationShow='confrimationShows' :contType='contTypes' title='修改设备名称' @onConfirm="onPromptConfirm"
		 @onCancels='onPromptCancels'></confirmationModule>
	</view>
</template>

<script>
	import xflSelect from '@/components/xfl-select/xfl-select.vue'; //导入
	import confirmationModule from "@/components/confirmation-module/confirmation-module.vue"
	import {
		getDevicelistDevice_add,
		getGroupingIndex,
		getDevicelisDevice_name_default
	} from '@/common/js/index.js'
	export default {
		components: {
			confirmationModule,
			xflSelect
		},
		data() {
			return {
				listArr: [], //要展示的数据
				list: [],
				confrimationShows: false,
				contTypes: 2,
				array: ['中国', '美国', '巴西', '日本'],
				index: 1,
				classId: "", //分组id
				deviceName: '', //设置设备名称
				deviceNames:'',
				day:'',
				model:'',
				name_of_device:'',
				wifiName:""				
			};
		},
		onLoad(e) {
			this.name_of_device=e.deviceName
			console.log(e)
			this.wifiName=e.wifiName
			console.log(this.wifiName)
			this.queryGroupingIndex()
			this.queryDevicelisDevice_name_default()
		},
		methods: {
			/*-选择分组-*/
			selectinputs(e) {
				console.log(e);
				let selectItem = e.orignItem
				for (let i in this.list) {
					console.log(this.list[i].title == selectItem)
					if (this.list[i].title == selectItem) {
						this.classId = this.list[i].id
					}
				}
				console.log(this.classId)

			},
			onPromptConfirm(e) {

			},
			onPromptCancels(e) {

			},
			/*-获取分组-*/
			async queryGroupingIndex() {
				let result = await getGroupingIndex({});
				console.log(result);
				let titleIndex=0
				if (result.code == 200) {
					for (let i in result.data) {
						console.log(result.data[i])
						if(result.data[i].title=='默认分组'){
							
							this.classId=result.data[i].id
							
						}
						this.listArr.push(result.data[i].title);
					};
					console.log(this.classId);
					//储存分组用于判断

					this.list = result.data

				}
			},
			/*-添加设备-*/
			async submitDevicelistDevice_add() {
				if (!this.deviceName) {

					uni.showToast({
						icon: 'none',
						title: '请输入设备名称'
					});
					return
				}
				console.log(this.classId)
				if (!this.classId) {
					uni.showToast({
						icon: 'none',
						title: '请选择设备分组'
					});
					return
				}
				let post = {
					name_of_device: this.name_of_device,
					class: this.classId,
					device_user: this.deviceName,
					wifi_name: this.wifiName,
				}
				let result = await getDevicelistDevice_add(post);
				console.log(result);
				if (result.code ==  2013) {
					
					uni.showToast({
						icon: 'none',
						title: '设备绑定成功'
					});
					setTimeout(() => {
						uni.switchTab({
							url: '../../tabbar/index/index'
						})
					}, 1000)

				} else {
				uni.showToast({
					icon: 'none',
					title: result.msg
				});
				}
			},
			async queryDevicelisDevice_name_default(){
				let result=await getDevicelisDevice_name_default({
					name_of_device:this.name_of_device==''?'aozhiqiang21':this.name_of_device
				})
				this.deviceName=result.data.default_name
				this.day=result.data.day
				this.model=result.data.model
				console.log(result)
			}
		}
	}
</script>

<style lang="scss">
	.item {
		background: #fff;

		height: 90upx;
		padding-left: 30upx;
		padding-right: 46upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;

		border-top: 2upx solid rgba(213, 213, 213, 1);

		.item-left {
			display: flex;

			image {
				width: 51upx;
				height: 51upx;
				display: block;
				margin-right: 40upx;
			}

			text {
				font-size: 26upx;
				font-weight: bold;
			}

		}

		.item-right {
			display: flex;
			align-items: center;
			font-size: 26upx;

			image {
				width: 30upx;
				height: 30upx;
				display: block;
				margin-left: 10upx;
			}

			input {
				display: block;
				width: 440upx;
				height: 57upx;
				background: rgba(255, 255, 255, 1);
				border: 1px solid rgba(211, 211, 211, 1);
				box-shadow: 0px 2upx 4upx rgba(0, 0, 0, 0.11);
				box-sizing: border-box;
				padding: 0 30upx;
				text-align: right;
				font-size: 26upx;

			}


		}

	}

	.hint {
		text-align: center;
		font-size: 22upx;
		margin-top: 126upx;
		color: rgba(0, 0, 0, 1);

	}

	.placeholders {
		text-align: right;
		color: rgba(172, 172, 172, 1);

	}

	.btn-blue {
		position: fixed;
		left: 0;
		right: 0;
		margin: o auto;
		bottom: 245upx;

	}
</style>
