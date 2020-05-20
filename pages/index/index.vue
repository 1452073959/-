<template>
	<view class="content">
		<!-- 文字滚动 -->
		<uni-notice-bar showIcon="true" showClose="true" scrollable="true" single="true" text="版本通知"></uni-notice-bar>
		<view class="lately">
			<view class="text">
				<text>
					进行中的会议
				</text>
			</view>
			<view v-if="under.length">
			<view class="lately1" v-for="(item, index) in under" :key="item">
				<image :src="item.user.email"></image>
				<text>{{item.room}}</text><text style="margin-left: 65px;font-size: 24rpx;">开始时间:{{item.start}}</text>
				<text style="margin-top: 70rpx;">进行中</text>
				<text style="margin-top: 70rpx;margin-left: 65px;font-size: 24rpx;">结束时间:{{item.over}}</text>
				<view class="lately2" @click="show(item)">
					查看详情
				</view>
			</view>
			
			</view>
			<view style="text-align: center;" v-else>
				暂无相关预约数据
			</view>
		</view>

		<view class="foot">
			<view>
				<button type="primary" @click="toapplly">申请会议室</button>
			</view>

			<view>
				<button type="primary" @click="tonotstart">未开始的会议</button>
			</view>

		</view>
	</view>
</template>

<script>
	//版本通知组件
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	export default {
		data() {
			return {
				under: '',
			}
		},
		components: {
			uniNoticeBar
		},
		onShow() {
			this.underway();
		},
		methods: {
			toapplly: function() {
				if (getApp().globalData.userInfo == null) {
					uni.showModal({
						title: '提示',
						content: '请先去授权登陆',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								uni.switchTab({
									url: '/pages/mine/mine'
								});
							} else if (res.cancel) {
								console.log('用户点击取消');
								return false;
							}
						}
					});
				} else {
					uni.navigateTo({
						url: '/pages/apply/apply'
					});
				}

			},
			tonotstart() {
				uni.navigateTo({
					url: '/pages/notstart/notstart'
				});
			},
			show(e){
				console.log(e);
				uni.navigateTo({
				    url: '/pages/show/show?data=' + encodeURIComponent(JSON.stringify(e))
				});
			},
			//进行中的会议
			underway() {
				let _this = this;
				uni.request({
					url: _this.$loginUrl + '/api/v1/underway', //仅为示例，并非真实接口地址。
					method: 'GET',
					success: (res) => {
						console.log(res.data);
						if (res.data.code == 200) {
							_this.under = res.data.data;
						}
					},
					fail: (res) => {
						console.log(res.data);
					}
				});
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		height: 100%;
		/* 				align-items: stretch;
		justify-content: space-between; */
		/*父元素必须设置高度*/
	}

	.lately {
		height: 80%;
		background-color: #fff;
		width: 95%;
		margin: 0 auto;
		background-color: #eed;
	}

	.text {
		height: 82rpx;
		border-bottom: 1rpx solid #ddd;
		background: #fff;
		line-height: 36px;
	}

	.text text {
		margin-left: 30rpx;
		font-size: 30rpx;
	}

	.lately1 text {
		line-height: 50rpx;
		/* height: 200rpx; */
		position: absolute;
		margin-top: 5rpx;
	}

	.lately1 {
		margin-top: 5px;
		background: #fff;
	}

	image {
		margin: 20rpx;
		height: 100rpx;
		width: 100rpx;
	}

	.lately2 {
		text-align: center;
		color: #007AFF;
		line-height: 70rpx;
		border-top: 1px solid #DDDDDD;

	}

	.foot {
		position: fixed;
		display: flex;
		bottom: 5rpx;
		height: 100rpx;
		width: 100%;
		justify-content: space-around;
		/* 		padding: 5px;
		padding-left: ; */
	}
</style>
