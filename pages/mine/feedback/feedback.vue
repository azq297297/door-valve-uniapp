<template>
	<view>
		<view class="textarea-cont">
			<textarea placeholder-style="color:rgba(201,198,198,1);" placeholder="您有什么问题？" maxlength='100' v-model='textareaVal' />
			<view class="textarea-max">{{textareaVal.length}}/100</view>
			</view>
			<view class="btn-blue" @click="toFeedbackStatus">提交</view>
	</view>
</template>

<script>
	import {getFeedbackIndex} from '@/common/js/mine.js'
	
	export default {
		data() {
			return {
				textareaVal:""
			};
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title:"反馈问题"
			})
		},
		methods:{
			toFeedbackStatus(){
				let ss=/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig

				if(this.textareaVal==''){
					uni.showToast({
						icon: 'none',
						title: '反馈问题不能为空！'
					})
					return false
				}
				if(ss.test(this.textareaVal) ||/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im.test(this.textareaVal)){
					uni.showToast({
						icon: 'none',
						title: '请正确输入文字，禁止特殊符号'
					})
					return false
				}
				this.submitFeedbackIndex()
			
			},
			async submitFeedbackIndex(){
				let result=await getFeedbackIndex({
					text:this.textareaVal
				})
				uni.reLaunch({
					url:'../feedbackStatus/feedbackStatus'
				})
			}
			
		}
	}
</script>

<style lang="scss">
.textarea-cont{
	width:640upx;
	height:290upx;
	box-sizing: border-box;
	position: relative;
	margin:0 auto;
	margin-top:100upx;
	textarea{
		box-sizing: border-box;
		padding: 10upx 20upx 50upx 20upx;
		width: 100%;
		height: 100%;
		font-size: 26upx;
		line-height: 1.7;
		border: 1px solid #c6c6c6;
		background: #fff;
	}
	.textarea-max{
		font-size: 25upx;
		position: absolute;
		right: 20upx;
		bottom: 10upx;
	}
}
.btn-blue{
	margin-top: 140upx;
}

</style>
