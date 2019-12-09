<template>
	<view class="equipment" @click.stop="btnDetails">
		<!-- 正常模式-->
		<view
			class="equipment-details"
			:class="item.device_state == 1 ? 'equipment-back' : 'equipment-back2'"
		>
			<view class="return-class" @click="btnReturn">
				<image src="../../../static/img/dayu.png" mode=""></image>
				<text>返回</text>
			</view>
			<image
				src="../../../static/img/zuk.png"
				mode=""
				class="state-img"
				v-if="item.device_state == 1"
			></image>
			<image
				src="../../../static/img/sw.png"
				mode=""
				class="state-img"
				v-if="item.device_state == 2"
			></image>
			<view class="state-text" v-if="item.device_state == 1">阀门已开启</view>
			<view class="state-text" v-if="item.device_state == 2">阀门已关闭</view>
			<view class="state-days" v-if="item.device_state == 1">
				使用第{{ Math.ceil(item.use_time_user) }}天
			</view>
			<view class="state-da" v-if="item.device_state == 1 && item.state_s">
				即将到使用期限
			</view>
			<view class="time" @click="timeBtn" v-if="listime != ''">
				<view class="time-text">
					{{ !listime.open_time ? '暂未设置' : listime.open_time + '开启' }}-{{
						!listime.closing_time ? '暂未设置' : listime.closing_time + '关闭'
					}}
				</view>
				<view class="time-btn">查看定时</view>
			</view>
			<view class="equipment-details-bottom">
				<view class="bottom-item" @click="btnState">
					<image
						src="../../../static/img/kaiguaneq2.png"
						mode=""
						v-if="item.device_state == 1"
					></image>
					<image
						src="../../../static/img/kaiguaneq1.png"
						mode=""
						v-else
					></image>
					<view class="details-bottom-hit">开关</view>
				</view>
				<view class="bottom-item" @click="btnTiming">
					<image
						src="../../../static/img/Shape1.png"
						mode=""
						v-if="state"
					></image>
					<image src="../../../static/img/Shape2.png" mode="" v-else></image>
					<view class="details-bottom-hit">定时</view>
				</view>
			</view>
		</view>
		<view class="details-top">
			<view
				class="details-top-btn"
				@click.stop="btnBroadside"
				:style="{ color: offLine ? '#000' : '#fff' }"
			>
				...
			</view>
			<view class="details-top-ul" v-show="broadsideType">
				<view class="details-top-li" @click="btnEntrance(1)">
					<image src="../../../static/img/hand.png" mode=""></image>
					<text class="">操作记录</text>
				</view>
				<view
					class="details-top-li"
					@click="btnEntrance(2)"
					v-if="type == 1 && !offLine"
				>
					<image src="../../../static/img/share.png" mode=""></image>
					<text class="">共享设备</text>
				</view>
				<view
					class="details-top-li"
					@click="btnEntrance(3)"
					v-if="type == 1 && !offLine"
				>
					<image src="../../../static/img/set.png" mode=""></image>
					<text class="">设置</text>
				</view>
				<view class="details-top-li" @click="btnEntrance(4)">
					<image src="../../../static/img/del.png" mode=""></image>
					<text class="" v-if="type == 1">删除设备</text>
					<text class="" v-if="type == 2">解绑设备</text>
				</view>
			</view>
		</view>
		<loading ref="loading" :custom="false" :shadeClick="false"></loading>
		<confirmationModule
			:confrimationShow="confrimationShows"
			:contType="contTypes"
			title="提示"
			:contText="contText"
			contTextTwo="是否删除?"
			@onConfirm="onPromptConfirm"
			@onCancels="onPromptCancels"
		></confirmationModule>
	</view>
</template>

<script>
let timess;
let time;
import confirmationModule from '@/components/confirmation-module/confirmation-module.vue';
import loading from '@/components/xuan-loading/xuan-loading.vue';
import {
	getDevicelistDevice_del,
	getDevicelistDevice_state,
	getDevicelistDevice_details,
	getTimerIndex,
	getShareddeviceDel_device,
	getDevicelistDevice_untying
} from '@/common/js/index.js';
export default {
	components: {
		confirmationModule,
		loading
	},
	data() {
		return {
			confrimationShows: false,
			contTypes: 1,
			contText: '删除后无法继续控制',
			broadsideType: false, //判断是否显示更多
			state: false,
			offLine: false, //判断是否离线模式
			item: {}, //列表传过来的详情数据
			type: '',
			details_one: false,
			detailstype: 1,
			listime: '',
			timeceshi: false
		};
	},
	onLoad(e) {
		this.type = e.type;
		console.log(e);
		this.item = JSON.parse(e.item);
		console.log(this.item.days_remaining);
		if (this.item.days_remaining < 30) {
			this.item.state_s = true;
		} else {
			this.item.state_s = false;
		}
	},
	onUnload() {
		clearInterval(timess);
	},
	onHide() {
		clearInterval(timess);
	},
	onShow() {
		this.listime = '';
		this.timeceshi = false;
		this.submitTimerIndex();

		this.queryDevicelistDevic();
	},

	methods: {
		queryDevicelistDevic() {
			this.queryDevicelistDevice_details(this.item.name_of_device, res => {
				console.log('测试2');
				this.item.device_state = res.data.device_state;
				if (this.item.device_state == 3) {
					clearInterval(timess);
					uni.switchTab({
						url: '../../tabbar/index/index'
					});
				}
				if (this.timeceshi == true) {
					return;
				}
				this.times();
			});
		},
		//定时检查开启状态
		async times() {
			timess = setInterval(() => {
				this.timeceshi = true;
				this.queryDevicelistDevice_details(this.item.name_of_device, res => {
					console.log('测试');

					this.item.device_state = res.data.device_state;
					if (this.item.device_state == 3) {
						clearInterval(timess);
						uni.switchTab({
							url: '../../tabbar/index/index'
						});
					}
				});
			}, 5000);
		},
		/*-点击其他地方关闭更多-*/
		btnDetails() {
			this.broadsideType = false;
		},
		/*-点击侧边按钮-*/
		btnBroadside() {
			this.broadsideType = true;
		},
		/*-点击开关-*/
		btnState() {
			if (this.item.days_remaining < 1) {
				uni.showToast({
					icon: 'none',
					title: '使用期限已到期'
				});
				return;
			}
			this.submitDevicelistDevice_state();
		},
		onPromptConfirm() {
			console.log(this.type);
			if (this.type == 1) {
				this.submitDevicelistDevice_del();
			} else {
				console.log('AAAAAAAAAAAAAAAAAAAAA');
				this.submitDevicelistDevice_untying();
			}

			this.confrimationShows = false;
		},
		async submitDevicelistDevice_untying() {
			let result = await getDevicelistDevice_untying({
				name_of_device: this.item.name_of_device
			});
			if (result.code == 2017) {
				uni.showToast({
					icon: 'none',
					title: '解绑成功'
				});
				this.btnReturn();
			} else {
				uni.showToast({
					icon: 'none',
					title: result.msg
				});
			}
			console.log('EEEEEEEEEEEEEEEE');
			console.log(result);
			console.log('EEEEEEEEEEEEEEEE');
		},
		onPromptCancels() {
			this.confrimationShows = false;
		},
		/*-点击更多选项-*/
		btnEntrance(e) {
			console.log(this.item)
			switch (e) {
				case 1:
					uni.navigateTo({
						url:
							'../../mine/record/record?name_of_device=' +
							this.item.name_of_device
					});
					break;
				case 2:
					uni.navigateTo({
						url:
							'../sharedList/sharedList?name_of_device=' +
							this.item.name_of_device
					});
					break;
				case 3:
					uni.navigateTo({
						url:
							'../equipmentSetting/equipmentSetting?name_of_device=' +
							this.item.name_of_device +
							'&device_user=' +
							this.item.device_user +
							'&wifi_name=' +
							this.item.wifi_name
					});
					break;
				case 4:
					this.confrimationShows = true;

					break;
			}
		},

		/*-定时-*/
		btnTiming() {
			uni.navigateTo({
				url:
					'../timingList/timingList?name_of_device=' + this.item.name_of_device
			});
		},
		/*-删除设备-*/
		async submitDevicelistDevice_del() {
			let result = await getDevicelistDevice_del({
				name_of_device: this.item.name_of_device
			});
			if (result.code == 2008) {
				uni.showToast({
					icon: 'none',
					title: '删除成功'
				});
				this.btnReturn();
			} else {
				uni.showToast({
					icon: 'none',
					title: result.msg
				});
			}

			console.log(result);
		},
		timeBtn() {
			uni.navigateTo({
				url:
					'../timingList/timingList?name_of_device=' +
					this.item.name_of_device +
					'&timeType=1'
			});
		},
		/*-离线模式重新配网-*/
		toadd() {
			uni.navigateTo({
				url: '../add/add'
			});
		},
		/*-开关-*/
		async submitDevicelistDevice_state() {
			console.log('点击开关');
			// if (this.details_one) {
			// 	clearInterval(time);
			// 	return;
			// }
			// this.details_one=true
			clearInterval(timess);
			this.$refs.loading.open();

			let result = await getDevicelistDevice_state({
				state: this.item.device_state == 1 ? 2 : 1,
				name_of_device: this.item.name_of_device
			});
			console.log(result);
			if (result.code == 2030) {
				this.Device_details(this.item.name_of_device, this.item.device_state);
			}
		},
		btnReturn() {
			uni.switchTab({
				url: '../../tabbar/index/index'
			});
		},
		Device_details(name_of_device, state) {
			console.log('正在检测');
			clearInterval(timess);
			setTimeout(() => {
				this.$refs.loading.close();
				if (this.detailstype == 1) {
					uni.showToast({
						icon: 'none',
						title: '操作失败，请检查网络'
					});
					this.timeceshi = false;
					this.queryDevicelistDevic();

					clearInterval(time);
				}
			}, 19000);
			console.log(state);
			clearInterval(timess);

			time = setInterval(() => {
				this.queryDevicelistDevice_details(name_of_device, res => {
					console.log(res);
					if (res.data.device_state != 3 && res.data.device_state == state) {
						console.log('正在等待啊');
					} else if (res.data.device_state == 3) {
						clearInterval(time);
						this.$refs.loading.close();
						uni.showToast({
							icon: 'none',
							title: '设备异常'
						});
						setTimeout(() => {
							clearInterval(timess);
							uni.switchTab({
								url: '../../tabbar/index/index'
							});
						}, 1000);

						this.detailstype = 2;

						//当设备异常弹出所有的异常弹框
					} else {
						this.$refs.loading.close();
						this.detailstype = 2;
						this.item.device_state = this.item.device_state == 1 ? 2 : 1;
						clearInterval(time);
						clearInterval(timess);
						this.timeceshi = false;
						this.queryDevicelistDevic();
					}
				});
			}, 2000);
		},

		/*-检测设备当前状态-*/
		async queryDevicelistDevice_details(name_of_device, fun) {
			let result = await getDevicelistDevice_details({
				name_of_device: name_of_device
			});
			console.log(result);
			fun(result);
		},
		/*-获取定时列表-*/
		async submitTimerIndex() {
			this.time = '';
			let result = await getTimerIndex({
				name_of_device: this.item.name_of_device
			});
			for (let i in result.data) {
				if (result.data[i].state_type == 1 && result.data[i].state != 4) {
					this.listime = result.data[i];
				}
			}
			console.log(result);
		}
	}
};
</script>

<style lang="scss">
page {
	height: 100%;
}

.equipment-back {
	background: url(data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAaAAD/4QMxaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0NSA3OS4xNjM0OTksIDIwMTgvMDgvMTMtMTY6NDA6MjIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjAyQjU3MTc5Q0M3QjExRTk5MTFEQUQxN0VCOEY1NjA1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjAyQjU3MTdBQ0M3QjExRTk5MTFEQUQxN0VCOEY1NjA1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDJCNTcxNzdDQzdCMTFFOTkxMURBRDE3RUI4RjU2MDUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDJCNTcxNzhDQzdCMTFFOTkxMURBRDE3RUI4RjU2MDUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAARDAwMDQwSDQ0SGhEP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)
		no-repeat;
	// background: url(../../../static/img/back.jpg) no-repeat;
}

.equipment-back2 {
	background: url(data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAaAAD/4QMxaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0NSA3OS4xNjM0OTksIDIwMTgvMDgvMTMtMTY6NDA6MjIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjJFMkFDRTFFQ0M3QjExRTk5MTFEQUQxN0VCOEY1NjA1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjJFMkFDRTFGQ0M3QjExRTk5MTFEQUQxN0VCOEY1NjA1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDJCNTcxN0ZDQzdCMTFFOTkxMURBRDE3RUI4RjU2MDUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDJCNTcxODBDQzdCMTFFOTkxMURBRDE3RUI4RjU2MDUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAARDAwMDQwSDQ0SGhEP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)
		no-repeat;
	// background: url(../../../static/img/back2.jpeg) no-repeat;
}

.equipment {
	height: 100%;
	position: relative;
}

.equipment-details {
	height: 100%;
	box-sizing: border-box;

	background-size: cover;
	padding-top: 92upx;

	.state-img {
		width: 196upx;
		height: 196upx;
		display: block;
		margin: 0 auto;
		margin-bottom: 28upx;
	}

	.state-text {
		text-align: center;
		font-size: 30upx;
		color: #fff;
		margin-bottom: 21upx;
	}

	.state-days {
		font-size: 38upx;
		text-align: center;

		line-height: 61upx;
		color: rgba(0, 0, 0, 1);

		width: 277upx;
		height: 61upx;
		background: rgba(255, 255, 255, 1);

		opacity: 1;
		border-radius: 31upx;
		margin: 0 auto;
	}

	.state-da {
		font-size: 21upx;
		color: rgba(255, 255, 255, 1);
		text-align: center;
		margin-top: 32upx;
	}

	.time {
		color: #fff;
		font-size: 30upx;
		margin-top: 200upx;

		.time-text {
			text-align: center;
		}

		.time-btn {
			text-align: center;
		}
	}

	.details-bottom-text {
		text-align: center;
		padding-top: 200upx;
		display: block;
		font-size: 26upx;
	}

	.equipment-details-bottom {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 110upx;
		margin: auto;
		display: flex;
		justify-content: center;
		text-align: center;

		.bottom-item {
			image {
				width: 117upx;
				height: 122upx;
			}

			.details-bottom-hit {
				font-size: 30upx;
				color: #fff;
			}

			&:nth-of-type(1) {
				margin-right: 185upx;
			}
		}
	}
}

.equipment-network {
	height: 100%;
	position: relative;

	.details-top {
		.details-top-btn {
			color: #000;
			padding: 20upx;
		}
	}

	.network-details {
		height: 100%;
		display: flex;
		flex-direction: column;
		text-align: center;
		align-items: center;
		justify-content: center;

		.network-details-top {
			opacity: 0.7;
			width: 213upx;
			height: 213upx;
			background: rgba(209, 209, 209, 1);
			display: flex;
			margin-bottom: 87upx;
			flex-direction: column;
			justify-content: center;
			border-radius: 50%;

			image {
				width: 149upx;
				height: 131upx;
				display: block;
				margin: 0 auto;
			}
		}

		.network-text {
			font-size: 30upx;
			margin-bottom: 94upx;
		}

		.network-btn {
			font-size: 30upx;
			color: #007aff;
		}
	}
}

.details-top {
	position: absolute;
	z-index: 100;
	right: 0;
	top: 0;
	width: 220upx;
	font-weight: 700;
	color: #fff;
	font-size: 40upx;

	.details-top-btn {
		text-align: center;
		font-size: 58upx;
	}

	.details-top-ul {
		background: #fff;
		border-radius: 30upx;
		margin-left: 10upx;
		margin-right: 20upx;

		.details-top-li {
			padding-left: 14upx;
			padding-right: 14upx;
			border-bottom: 1upx solid #e1e1e1;
			height: 80upx;
			color: #000;
			display: flex;
			align-items: center;

			&:last-of-type {
				border: none;
			}

			text {
				font-size: 26upx;
				display: block;
				font-weight: 500;
			}

			image {
				display: block;
				width: 35upx;
				height: 35upx;
				margin-right: 10upx;
			}
		}
	}
}

.return-class {
	position: fixed;
	left: 50upx;
	top: 35upx;
	color: #fff;
	font-size: 33upx;
	display: flex;
	align-items: center;
	image {
		width: 30upx;
		height: 30upx;
		display: block;
	}
	text {
		display: block;
	}
}
</style>
