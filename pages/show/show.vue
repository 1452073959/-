<template>
	<view>
		<view class="grid">
			<view>开始时间:</view>
			<view>{{show.start}}</view>
			<view>结束时间:</view>
			<view>{{show.over}}</view>
			<view>预约人:</view>
			<view>{{show.user.name}}</view>
			<view>会议室:</view>
			<view>{{show.room}}</view>
			<view>用途:</view>
			<view>{{show.purpose}}</view>
		</view>

		<view v-if="delbutton">
			<button type="primary" @click="del(show)">撤销该预约</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: null,
				uerInfo: null,
				delbutton: false,
			}
		},
		onLoad: function(e) {
			let data = JSON.parse(decodeURIComponent(e.data));
			this.show = data;
			this.uerInfo = getApp().globalData.userInfo;
			// console.log(this.uerInfo);
		},
		onShow: function() {
			console.log(this.uerInfo.nickName);
			console.log(this.show.user.name);
			if (this.uerInfo.nickName == this.show.user.name) {
				this.delbutton = true
			}
		},
		methods: {
			del(e) {
				console.log(e);
				let _this = this;
				uni.request({
					url: _this.$loginUrl + '/api/v1/del',
					data: {
						id: e.id,
					},
					method: 'GET',
					success: (res) => {
						console.log(res.data);
						if (res.data.code == 200) {
							uni.showToast({
								title: '删除成功',
								duration: 2000,
								icon: 'none',
							});
							uni.redirectTo({
								url: '/pages/forward/forward'
							});
						}
					},
					fail: (res) => {
						console.log(res.data);
					}
				});

			},
		}
	}
</script>

<style>
	.grid {
		display: grid;
		grid-template-columns: 40% 60%;
		grid-template-rows: 120rpx 120rpx 100rpx 100rpx 350rpx;
		text-align: center;
		height: 100%;
		/* color: ; */
	}

	.grid view {
		/* border: 1px solid #007AFF; */
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
