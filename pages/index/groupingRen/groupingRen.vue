<template>
	<view class="ren">
		<view class="ren-item" v-for="(item,index) in list" :key='index' @click="btnAmend(item)">
			<image src="../../../static/img/groupinIcon.png" mode=""></image>
			<view class="ren-item-text">
				<input type="text" value="" :placeholder="item.name" v-if="item.amend" @confirm="confirms" :id='item.id' :focus='item.amend' />
				<text class="" v-else>{{item.name}}</text>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						id: 0,
						name: '分组1',
						amend: false
					},
					{
						id: 1,
						name: '分组1',
						amend: false
					},
					{
						id: 2,
						name: '分组1',
						amend: false
					},
					{
						id: 3,
						name: '分组1',
						amend: false
					}
				],
				list2: []
			};
		},
		onLoad() {

			this.list[1].amend = true
		},
		methods: {
			/*-点击修改分组名-*/
			btnAmend(item) {
				for (let i in this.list) {
					this.list[i].amend = false
				}
				item.amend = true;

			},
			/*-输入完点击完成-*/
			confirms(e) {
				console.log(e);

				for (let i in this.list) {
					if (this.list[i].amend) {
						this.list[i].name = e.detail.value;
						this.list[i].amend = false;
						for (let s in this.list2) {
							if (this.list2[s].id == this.list[i].id) {
								this.list2[s].name = this.list[i].name;
								console.log(this.list2);
								return
							}
						}
						this.list2.push(this.list[i]);


					}
				}

				console.log(this.list2);
			}
		}
	}
</script>

<style lang="scss">
	.ren {
		padding-top: 20upx;

		.ren-item {
			background: #fff;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			padding: 0 50upx;

			border-bottom: 1px solid #e1e1e1;
			height: 100upx;

			image {
				display: block;
				width: 60upx;
				height: 60upx;
				margin-right: 20upx;
			}

			.ren-item-text {
				width: 100%;

				input {
					width: 100%;
					display: block;
					border: 1upx solid #e6e6e6;
					height: 60upx;
					box-sizing: border-box;
					padding: 0 30upx;
				}

				text {}
			}

		}
	}
</style>
