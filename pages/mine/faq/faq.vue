<template>
	<view>
		<view class="nav">
			<view class="nav-item" @click="toFaqDetails(item)" v-for="(item,index) in list" :key='index'>
				<view class="item-left">
					<view class="icon">
						<image src="../../../static/img/wenti-9.png" mode=""></image>
					</view>
					<view class="text">{{item.title}}</view>
				</view>
				<view class=""></view>
				<view class="icon-right">
					<image src="../../../static/img/right.png"></image>
				</view>
			</view>


		</view>
	</view>
</template>

<script>
	import {
		getProblem
	} from '@/common/js/mine.js'
	export default {
		data() {
			return {
				list: [], //常见问题列表
			}
		},
		onLoad() {

			this.queryProblem()
		},
		methods: {
			//跳转问题详情
			toFaqDetails(item) {
				
				uni.navigateTo({
					url: "../faqDetails/faqDetails?id="+item.id+'&title='+item.title
				})
			},
			//获取问题列表
			async queryProblem() {
				console.log("列表")
				let result = await getProblem({});
				console.log(result);
				this.list = result.data;
				console.log(this.list)
			}
		}
	}
</script>

<style lang="scss">
	page{
		padding-top: 20upx;
	}

</style>
