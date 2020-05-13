<template>
	<view class="content">
		<view class="head">
			<view class="avatar">
				<open-data type="userAvatarUrl"></open-data>
			</view>
			<view class="NickName">
				<open-data type="userNickName"></open-data>
			</view>
		</view>

		<view class="login">
			<view class="logintrue">
				<view class="loginicon">
					请先登录账号
				</view>
				<button type="default" open-type="getPhoneNumber" @getphonenumber="wxGetphone">获取手机号</button>
				<button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
					授权登录
				</button>
			</view>


		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			//获取用户信息
			wxGetUserInfo() {
				let _this = this;
				uni.getUserInfo({
					provider: 'weixin',
					success: function(infoRes) {
						console.log(infoRes);
						let nickName = infoRes.userInfo.nickName; //昵称
						let avatarUrl = infoRes.userInfo.avatarUrl; //头像
					},
					fail(res) {

					}
				});
			},

			//获取用户手机号//暂无权限
			wxGetphone: function(e) {
				console.log(JSON.stringify(e.encryptedData));
				console.log(JSON.stringify(e.iv));
			},
			login: function() {
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						let code = loginRes.code;
						console.log(loginRes);
						uni.request({
							url: 'https://www.example.com/request', //仅为示例，并非真实接口地址。
							data: {
								text: 'uni.request'
							},
							header: {
								'custom-header': 'hello' //自定义请求头信息
							},
							success: (res) => {
								console.log(res.data);
								this.text = 'request success';
							}
						});
					}
				});

			},
			onLoad() {
				// this.login()
			}
		},


	}
</script>

<style>
	.content {
		width: 100%;
		height: 1050rpx;
		background-color: #F1F1F1;
	}

	.avatar {
		width: 100rpx;
		height: 100rpx;
		clip-path: circle(50rpx at center);
	}

	.NickName {
		font-size: 50rpx;
		margin-left: 25rpx;
	}

	.head {
		align-items: center;
		display: flex;
		height: 150rpx;
		width: 100%;
		padding-left: 50rpx;
		background-color: #fff;
	}

	.login {
		width: 100%;
		height: 500rpx;
		background-color: #fff;
		margin-top: 20rpx;
	}
	.logintrue{
		width: 100%;
		height: 500rpx;
		background-color: #fff;
		margin-top: 20rpx;
padding-top: 30rpx;
	}

	.loginicon {
		width: 80%;
		margin: 0 auto;
		background-color: #4CD964;
		height: 300rpx;

	}
</style>
