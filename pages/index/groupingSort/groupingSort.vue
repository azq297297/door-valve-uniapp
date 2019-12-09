<template>
	<view>
		<dragSort :list="list" :props="props" @change="onDragSortChange"></dragSort>
	</view>
</template>

<script>
	import dragSort from '../../../components/drag-sort/index.vue'
	import {
		getGroupingIndex,
		getGroupingGrouping_num
	} from "@/common/js/index.js"
	export default {
		components: {
			dragSort
		},
		data() {
			return {
				props: {
					label: 'label'
				},
				id: '',
				list: [{
						label: '标题1'
					},
					{
						label: '标题2'
					},
					{
						label: '标题3'
					},
					{
						label: '标题4'
					},
					{
						label: '标题5'
					}
				]
			};
		},
		onLoad() {

		},
		mounted() {
			this.queryGroupingIndex();
		},
		methods: {
			/*-移动分组-*/
			onDragSortChange(e) {
				console.log(e);
				this.queryGroupingGrouping_num(e.data.id, e.frontData == undefined? 100: e.frontData.id)
			},
			/*-获取分组-*/
			async queryGroupingIndex() {
				let result = await getGroupingIndex({});
				console.log(result);
				for (let i in result.data) {
					result.data[i].label = result.data[i].title
					if (result.data[i].title == '默认分组') {
						
						result.data.splice(i, 1)

					}
				}
				this.list = result.data

				console.log(this.list)

			},
			/*-修改分组-*/
			async queryGroupingGrouping_num(id, num) {
				let result = await getGroupingGrouping_num({
					id: id,
					num: num
				})
				if (result.code == 200) {
					uni.showToast({
						icon: 'none',
						title: '已修改完成！'
					})
				}

				console.log(result);
			}
		}
	}
</script>

<style lang="scss">

</style>
