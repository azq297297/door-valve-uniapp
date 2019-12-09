<template>
	<view>
		<view class="connect-progress">
			<cmd-progress type="circle" :percent="percent" :stroke-width='10' stroke-color="rgba(50,125,244,1)" :width='100' custom>
				<text class="">{{percent}}%</text>
			</cmd-progress>
			
		</view>
		
		  <view style="text-align: center;">
		<text class="connect-text">正在尝试与设备建立连接</text>
		<text class="connect-text">请耐心等待</text>
	</view>
	</view>
</template>

<script>
	let times=''
	let querytime=''
	import {
		getDevicelistDevice_user_bind
	} from '@/common/js/index.js'
	import cmdProgress from "@/components/cmd-progress/cmd-progress.vue"
	
	export default {
		components: {
			cmdProgress
		},
		data() {
			return {
				percent: 0,
				sss: "ssss",
				strokeColor:'#000',
				wifiName:'',
				type:false
			};
		},
		onHide() {
		clearInterval(times)
		clearInterval(querytime)	
		},
		onUnload(){
			clearInterval(times)
			clearInterval(querytime)	
		},
		onLoad(e) {
			console.log(e)
			this.wifiName=e.wifiName
			let that = this
			let percent = 5
			times = setInterval(function() {
				if (that.percent >= 98) {
					clearInterval(times)
					return
				}
				if (that.percent >= 90) {
					percent = 1
				}

				that.percent = percent + that.percent
			}, 1000);
			querytime = setInterval(() => {
				this.queryDevicelistDevice_user_bind( (res) => {
					console.log(res);
					if (res.code == 200) {
						this.type=true
						uni.navigateTo({
							url: '../connectSucceed/connectSucceed?deviceName=' + res.data.deviceName+'&wifiName='+this.wifiName
						});
						clearInterval(querytime)

					}
				})
			}, 5000);
			setTimeout(()=>{
				if(!this.type){
					uni.navigateTo({
						url: '../connectErr/connectErr'
					});
				}
					clearInterval(querytime);
			},300000)
		},
		methods: {
			/*-获取连接结果-*/
			async queryDevicelistDevice_user_bind(fun) {
				let result = await getDevicelistDevice_user_bind({});

				fun(result);
			}

		}
	}
</script>

<style lang="scss">
	.connect-progress {
		position: relative;
		text-align: center;
		padding-top: 64upx;
		margin-bottom: 47upx;

		text {
		
			color: #007AFF;
			font-weight: 600;
			font-size: 40upx;

		}
	}

	.connect-text {
		display: block;
		text-align: center;
		font-size: 28upx;
		line-height: 50upx;
		color: rgba(36, 36, 36, 1);


	}
</style>
