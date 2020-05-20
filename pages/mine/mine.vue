<template>
	<view class="content" v-if="show1">
		<view class="head">
			<view class="avatar">
				<open-data type="userAvatarUrl"></open-data>
			</view>
			<view class="NickName">
				<open-data type="userNickName"></open-data>
			</view>
		</view>

		<view style="margin-top: 30rpx;">
			<view class="login" v-if="loginin">
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
			<view v-else>
				<!-- 一般用法 -->
				<uni-list>
					<!-- <uni-list-item title="我的预约" @click="userall"></uni-list-item> -->
					<uni-list-item title="我的已完成预约" @click="stocks"></uni-list-item>
					<uni-list-item title="我的未完成预约" @click="Forward"></uni-list-item>
				</uni-list>
			</view>
		</view>
	</view>
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	export default {
		data() {
			return {
				loginin: true,
				userInfo: '',
				OpenId: '',
				show1:false,
			}
		},
		components: {
			uniList,
			uniListItem
		},
		methods: {
			//获取用户信息
			wxGetUserInfo() {
				let _this = this;
				uni.getUserInfo({
					provider: 'weixin',
					success: function(infoRes) {
						_this.login()
					},
					fail(res) {
						console.log('用户拒绝授权')
					}
				});
			},

			//获取用户手机号//暂无权限
			wxGetphone: function(e) {
				console.log(JSON.stringify(e.encryptedData));
				console.log(JSON.stringify(e.iv));
			},
			login: function() {
				let _this = this;
				uni.showLoading({
					title: '登录中...'
				});
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						let code = loginRes.code;
						uni.request({
							url: _this.$loginUrl + '/api/v1/login', //仅为示例，并非真实接口地址。
							data: {
								code: code,
							},
							header: {
								'custom-header': 'hello' //自定义请求头信息
							},
							success: (res) => {
								_this.OpenId = res.data.openid
								getApp().globalData.token = res.data.session_key
								try {
									uni.setStorageSync('storage_key', res.data.session_key);
								} catch (e) {
									// error
								}
								uni.getSetting({
									success(res) {
										if (res.authSetting['scope.userInfo']) {
											_this.loginin = false;
											// 已经授权，可以直接调用 getUserInfo 获取头像昵称
											//非第一次授权获取用户信息
											wx.getUserInfo({
												success: function(res) {
													_this.userInfo = res.userInfo;
													getApp().globalData.userInfo = res.userInfo;
													_this.updateUserInfo();
												},
											})
										} else {
											console.log('用户未授权')
										}
									}
								})
								_this.show1=true;
								uni.hideLoading();
							}
						});
					}
				});
			},
			Forward: function() {
				uni.navigateTo({
					url: '/pages/forward/forward'
				});
			},

			stocks() {
				uni.navigateTo({
					url: '/pages/stocks/stocks'
				});
			},
			userall() {
				uni.navigateTo({
					url: '/pages/userall/userall'
				});
			},
			// 向后台更新信息
			updateUserInfo() {
				let _this = this;
				uni.request({
					url: _this.$loginUrl + '/api/v1/updateUserInfo', //服务器端地址
					data: {
						openid: _this.OpenId,
						userInfo: _this.userInfo,
						session_key: uni.getStorageSync('storage_key')
					},
					method: 'POST',
					header: {
						'content-type': 'application/json'
					},
					success: (res) => {
						
					}

				});
			},
			onLoad() {
				this.login()
			}
		},


	}
</script>

<style>
	.content {
		width: 100%;
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

	.logintrue {
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
