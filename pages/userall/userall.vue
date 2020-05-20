<template>
	<view class="content">
		<!-- 文字滚动 -->
		<uni-notice-bar showIcon="true" showClose="true" scrollable="true" single="true" text="版本通知"></uni-notice-bar>
		<view class="lately">
			<view class="text">
				<text>
					我的预约
				</text>
			</view>
			<view class="lately1" v-for="item in all" :key="all">
				<image :src="item.user.email"></image>
				<text>{{item.room}}</text>
				<text style="margin-top: 70rpx;">未开始</text>
				<text style="margin-top: 70rpx;margin-left: 100px;">{{item.user.name}}</text>
				<view class="lately2">
					查看详情
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				all:null,
			}
		},
		onLoad()
		{
			this.userall();
		},
		methods: {
			userall() {
				let _this = this;
				uni.request({
					url: _this.$loginUrl + '/api/v1/userall',
					data: {
						session_key: uni.getStorageSync('storage_key')
					},
					method: 'POST',
					success: (res) => {
						console.log(res.data);
						if (res.data.code == 200) {
							_this.all = res.data.data;
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
		height: 100%;
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
		height: 200rpx;
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
