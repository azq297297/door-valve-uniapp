<template>
	<view class="details-back">
		
		<view class="title">
			<image src="../../../static/img/chechked.png" mode=""></image>
			<div class="title-text" style="text-align: center;">{{title}}</div>
		</view>
		<view class="details">  <rich-text :nodes="strings"></rich-text></view>
		<!-- <rich-text :nodes="article_content"></rich-text> -->
		 

	</view>
</template>

<script>
	import {getProblemProblem_details} from '@/common/js/mine.js'

	export default {
		data() {
			return {
				title:'',
				article_content: '', 
				 strings: '',//常见问题详情数据（富文本）
			};
		},
		onLoad(e) {
			console.log(e);
			//获取常见问题详情数据
			this.title=e.title
			this.queryProblemProblem_details(e.id)
		},
		methods:{
			async queryProblemProblem_details(id){
				let result=await getProblemProblem_details({
					id:id
				})
				this.strings=result.data.text
				
				console.log(result)
			}
		}
	}
</script>

<style lang="scss">
	.details-back {
background: #fff;
		margin-top: 30upx;
		padding-bottom: 30upx;
		font-size: 30upx;

		.title {
			padding: 10upx 40upx;
			display: flex;
			align-content: center;
			border-bottom: 1px solid #e2e2e2;
			line-height: 80upx;

			image {
				display: block;
				width: 80upx;
				height: 80upx;
				margin-right: 20upx;
			}

		}

		.details-text {
			padding: 20upx 30upx 40upx 70upx;
			line-height: 1.9;
			font-size: 26upx;

		}
	}
	.details{
		box-sizing: border-box;
		padding: 0 40upx;
		image{
			max-width: 100%;
		}
	}
</style>
