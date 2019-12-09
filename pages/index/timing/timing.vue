<template>
	<view class="timing">
		<view class="del" @click="del" v-if="!timingTypes">删除</view>
		<!-- 设置定时 -->
		<view class="timing-list">
			<view class="timing-list-wapper u-f">
				<!-- 重复 -->
				<view style="width: 100%;">
					<view class="timing-list-main">重复</view>
					<view class="">
						<picker
							@change="bindPickerChange"
							:value="index"
							:range="repeatList"
							style="width: 100%;
"								class="pickers"
						>
						<view class="timing-list-times">
							<view v-if="index != 2">{{ repeatList[index] }}</view>
							<view class="" v-else>
								{{ weekDaysText == '' ? '自定义' : weekDaysText }}
							</view>
							</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="timing-list-wapper u-f u-f-jsb">
				<view style="width: 100%;">
					<!-- 开启 -->
					<view class="timing-list-main u-f">开启</view>
					<picker
						mode="time"
						:value="openTime"
						start="00:00"
						end="23:59"
						@change="bindTimeChange(1, $event)"
						class="pickers"
					>
						<view class="timing-list-times">{{ openTime }}</view>
					</picker>
				</view>
				<view><button @click="timingDelete(1)">移除</button></view>
			</view>

			<view class="timing-list-wapper u-f u-f-jsb">
				<view style="width: 100%;">
					<!-- 关闭 -->
					<view class="timing-list-main u-f">关闭</view>
					<picker
						mode="time"
						:value="closeTime"
						start="00:00"
						end="23:59"
							class="pickers"
						@change="bindTimeChange(2, $event)"
					>
						<view class="timing-list-times">{{ closeTime }}</view>
					</picker>
				</view>
				<view><button @click="timingDelete(2)">移除</button></view>
			</view>
		</view>
		<view
			class="btn-blue"
			:class="btnFinishSty ? 'btn-finish1' : 'btn-finish'"
			@click="btnFinish"
		>
			保存
		</view>

		<!-- 自定义按钮 -->

		<view
			class="timing-customize"
			@click.stop="customize()"
			v-if="customizetype"
		>
			<view class="timing-customize-cont" @click.stop>
				<view class="btn">
					<view class="" @click.stop="customize()">取消</view>
					<view class="" @click="confirm()">确定</view>
				</view>
				<view
					class="week-item"
					v-for="(item, index) in weekDay"
					:key="index"
					@click="selectweek(item)"
				>
					<view class="week-item-left">{{ item.name }}</view>
					<view class="week-item-right">
						<image
							src="../../../static/img/pitch.png"
							mode=""
							v-if="item.checkeds"
						></image>
						<image src="../../../static/img/nopitch.png" mode="" v-else></image>
					</view>
				</view>
			</view>
		</view>
		<confirmationModule
			:confrimationShow="confrimationShows"
			:contType="contTypes"
			:title="title"
			:contText="contText"
			@onConfirm="onPromptConfirm"
			@onCancels="onPromptCancels"
		></confirmationModule>
	</view>
</template>

<script>
import confirmationModule from '@/components/confirmation-module/confirmation-module.vue';
import {
	getTimerimer_add,
	getTimerTimer_del,
	getTimerTimer_edit
} from '@/common/js/index.js';
export default {
	components: {
		confirmationModule
	},
	data() {
		return {
			name_of_device: '',
			confrimationShows: false,
			contTypes: 1,
			item: {},
			title: '提示',
			contText: '确认删除？',
			customizetype: false,
			openTime: '未设置',
			weekDaysText: '',
			timingTypes: false,
			closeTime: '未设置',
			btnFinishStyle: false,
			timingType: false,
			weekDays: '',
			repeatList: ['每天', '执行一次', '自定义'], //重复的picker数据
			index: 0, //picker选择的下标
			btnFinishSty: false,
			weekDay: [
				{
					name: '星期一',
					id: '1',
					checkeds: true
				},
				{
					name: '星期二',
					id: '2',
					checkeds: false
				},
				{
					name: '星期三',
					id: '3',
					checkeds: false
				},
				{
					name: '星期四',
					id: '4',
					checkeds: false
				},
				{
					name: '星期五',
					id: '5',
					checkeds: false
				},
				{
					name: '星期六',
					id: '6',
					checkeds: false
				},
				{
					name: '星期日',
					id: '7',
					checkeds: false
				}
			],
			weekDayCancle: ''
		};
	},
	computed: {},
	onLoad(e) {
		console.log(e);

		if (e.timingType) {
			this.timingTypes = true;
			this.name_of_device = e.name_of_device;
		} else {
			this.item = JSON.parse(e.item);
			console.log(this.item);
			this.name_of_device = this.item.name_of_device;
			this.id = this.item.id;
			console.log('AAAAAAAAAAAAAAAA');
			this.openTime =
				this.item.open_time == null ? '未设置' : this.item.open_time;
			this.closeTime =
				this.item.closing_time == null ? '未设置' : this.item.closing_time;

			if (this.item.state == 3) {
				console.log('BBBBBBBBBBBBBBBB');
				this.index = 2;
				this.weekDaysText = this.item.stateText;
				this.weekDays = this.item.week;
			} else if (this.item.state == 2) {
				this.index = 0;
			} else {
				this.index = 1;
			}
		}
	},
	methods: {
		// 选择时间
		bindTimeChange(type, e) {
			let value = '';
			if (e.target.value) {
				value =
					e.target.value.length === 2 ? `${e.target.value}:00` : e.target.value;
			} else {
				value = '00:00';
			}
			this.openTime.length || this.closeTime.length === 5
				? (this.btnFinishSty = true)
				: (this.btnFinishSty = false);
			if (type === 1) {
				this.openTime = value;
			} else {
				this.closeTime = value;
			}
		},
		// picker点击事件
		bindPickerChange: function(e) {
			console.log(e);
			this.index = e.target.value;
			this.weekDayCancle = e.target.value;
			if (this.index == 2) {
				this.customizetype = true;
			}
		},
		// 保存结束按钮事件
		btnFinish() {
			if (this.openTime != '未设置' || this.closeTime != '未设置') {
				let timeType = this.CompareDate(this.openTime, this.closeTime);
				console.log(timeType);
				if (
					timeType ||
					this.openTime == '未设置' ||
					this.closeTime == '未设置'
				) {
					//判断添加还是修改
					if (this.timingTypes) {
						this.submitTimerimer_add();
					} else {
						this.submitTimerTimer_edit();
					}
				} else {
					uni.showToast({
						title: '开启时间不能大于关闭时间',
						icon: 'none'
					});
				}
			}

			// this.submitTimerimer_add()
		},
		// 点击移除按钮事件
		timingDelete(type) {
			if (type === 1) {
				this.openTime = '未设置';
			} else {
				this.closeTime = '未设置';
			}
			this.btnFinishSty =
				this.openTime.length === 3 && this.closeTime.length === 3
					? false
					: true;
		},
		//选择星期
		selectweek(item) {
			item.checkeds = !item.checkeds;
		},
		customize() {
			this.customizetype = false;
		},
		confirm() {
			//储存选择的星期天
			let arrweekday = [];
			let arrweekdayText = [];
			//查找选择哪些星期天
			for (let i in this.weekDay) {
				if (this.weekDay[i].checkeds) {
					arrweekdayText.push(this.weekDay[i].name);
					switch (this.weekDay[i].name) {
						case '星期一':
							arrweekday.push(1);
							break;
						case '星期二':
							arrweekday.push(2);
							break;
						case '星期三':
							arrweekday.push(3);
							break;
						case '星期四':
							arrweekday.push(4);
							break;
						case '星期五':
							arrweekday.push(5);
							break;
						case '星期六':
							arrweekday.push(6);
							break;
						case '星期日':
							arrweekday.push(7);
							break;
					}
				}
			}

			console.log(arrweekday.join(','));
			this.weekDays = arrweekday.join(',');
			this.weekDaysText = arrweekdayText.join(',');
			this.customizetype = false;
		},
		/*-删除-*/
		del() {
			this.confrimationShows = true;
		},
		/*-点击确定-*/
		onPromptConfirm() {
			this.submitTimerTimer_del();
		},
		/*-点击取消-*/
		onPromptCancels() {
			this.confrimationShows = false;
		},
		/*-添加定时-*/
		async submitTimerimer_add() {
			let state = 0;
			let week = '';
			if (this.index == 0) {
				state = 2;
			} else if (this.index == 1) {
				state = 1;
			} else if (this.index == 2) {
				state = 3;
				week = this.weekDays;
			}
			if (this.openTime == '未设置' && this.closeTime == '未设置') {
				uni.showToast({
					title: '请设置定时',
					icon: 'none'
				});
				return;
			}
			let post = {
				state: state,
				name_of_device: this.name_of_device,
				open_time: this.openTime == '未设置' ? '' : this.openTime,
				closing_time: this.closeTime == '未设置' ? '' : this.closeTime,
				week: week
			};
			console.log(post);
			let result = await getTimerimer_add(post);
			console.log(result);
			if (result.code == 2026) {
				uni.showToast({
					icon: 'none',
					title: '添加成功'
				});
				uni.navigateBack({
					delta: 1
				});
			} else {
				uni.showToast({
					icon: 'none',
					title: result.msg
				});
			}
		},
		/*-删除定时-*/
		async submitTimerTimer_del() {
			let post = {
				name_of_device: this.name_of_device,
				id: this.id
			};

			let result = await getTimerTimer_del(post);
			console.log(result);
			if (result.code == 2008) {
				uni.showToast({
					icon: 'none',
					title: '删除成功'
				});
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					});
				}, 1000);
			}
			this.confrimationShows = false;
		},
		/*-修改定时-*/
		async submitTimerTimer_edit() {
			let state = 0;
			let week = '';
			if (this.index == 0) {
				state = 2;
			} else if (this.index == 1) {
				state = 1;
			} else if (this.index == 2) {
				state = 3;
				week = this.weekDays;
			}
			if (this.openTime == '未设置' && this.closeTime == '未设置') {
				uni.showToast({
					title: '请设置定时',
					icon: 'none'
				});
				return;
			}
			let result = await getTimerTimer_edit({
				id: this.item.id,
				state: state,
				name_of_device: this.name_of_device,
				open_time: this.openTime == '未设置' ? '' : this.openTime,
				closing_time: this.closeTime == '未设置' ? '' : this.closeTime,
				week: week
			});
			if (result.code == 2010) {
				uni.showToast({
					icon: 'none',
					title: '修改成功'
				});

				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					});
				}, 1000);
			} else {
				uni.showToast({
					icon: 'none',
					title: result.msg
				});
			}
			console.log(result);
		},
		/*-出来时间判断-*/
		CompareDate(t1, t2) {
			let a = t1.split(':');
			let b = t2.split(':');

			if (a[0] == b[0]) {
				if (a[1] >= b[1]) {
					return false;
				} else {
					return true;
				}
			} else if (a[0] > b[0]) {
				return false;
			} else {
				return true;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.timing {
	width: 100%;
	height: 100%;

	.del {
		height: 82upx;
		font-size: 28upx;
		padding-right: 45upx;
		box-sizing: border-box;
		line-height: 82upx;
		color: rgba(227, 3, 3, 1);
		text-align: right;
	}

	.timing-list {
		background: #ffffff;

		.timing-list-wapper {
			width: 100%;
			height: 130upx;
			padding-left: 79upx;
			padding-right: 45upx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1upx solid #e3e3e3;

			.timing-list-main {
				font-size: 26upx;
			}
			.pickers {
				position: relative;
			}
			.timing-list-times {
				position: absolute;
				top: -100upx;
				display: flex;
				align-items:flex-end;
				
				left: 0;
				font-size: 18upx;
				width: 100%;
				margin-bottom: 12upx;
				padding-bottom: 10upx;
				height: 120upx;
				color: blue;
			}

			button {
				width: 141upx;
				height: 67upx;
				border: none;
				background: rgba(219, 219, 219, 1);
				box-shadow: 0px 3upx 6upx rgba(190, 190, 190, 0.58);
				border-radius: 34upx;
				font-size: 25upx;
				font-weight: 400;
				line-height: 67upx;
			}
		}
	}

	.timing-bottom {
		height: 400upx;

		.btn-finish {
			width: 550upx;
			height: 80upx;
			background: #e3e3e3;
			color: #505050;
			font-size: 30upx;
			border-radius: 40upx;
			cursor: pointer;
		}

		.btn-finish1 {
			width: 550upx;
			height: 80upx;
			background: #09bb07;
			color: #505050;
			font-size: 30upx;
			border-radius: 40upx;
			cursor: pointer;
		}
	}

	.timing-customize {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.58);
		position: fixed;
		bottom: 0;

		.timing-customize-cont {
			position: fixed;
			width: 100%;
			bottom: 0;

			.btn {
				width: 100%;
				height: 75upx;
				font-size: 30upx;
				background: rgba(235, 235, 235, 1);
				border: 1px solid rgba(203, 203, 203, 1);
				display: flex;
				align-items: center;
				box-sizing: border-box;
				justify-content: space-between;
				padding: 0 50upx;
			}

			.week-item {
				height: 84upx;
				background: #fff;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 26upx;
				padding-left: 50upx;
				padding-right: 56upx;
				box-sizing: border-box;
				border-bottom: 1px solid rgba(209, 209, 209, 1);

				.week-item-right {
					image {
						width: 33upx;
						height: 33upx;
					}
				}
			}
		}
	}
}

.btn-blue {
	margin-top: 60upx;
}
button::after{
	border: none !important;
}
</style>
