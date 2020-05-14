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
			<view class="lately1">
				<image src="../../static/logo.png"></image>
				<text>咖啡厅</text>
				<text style="margin-top: 50rpx;">进行中</text>
				<text style="margin-top: 50rpx;margin-left: 100px;">time</text>
				<view class="lately2">
					查看详情
				</view>
			</view>
			<view class="lately1">
				<image src="../../static/logo.png"></image>
				<text>大会议</text>
				<view class="lately2">
					查看详情
				</view>
			</view>

			<view class="lately1">
				<image src="../../static/logo.png"></image>
				<text>大会议</text>
				<view class="lately2">
					查看详情
				</view>
			</view>
		</view>

		<view class="foot">
			<view>
				<button type="primary">申请会议室</button>
			</view>

			<view>
				<button type="primary">查看所有未开始的会议</button>
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
				title: 'Hello'
			}
		},
		components: {
			uniNoticeBar
		},
		onLoad() {

		},
		methods: {
			look: function() {
				console.log(123);
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
