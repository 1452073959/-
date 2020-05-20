<template>
	<view v-if="show1">
		<uni-notice-bar showIcon="true" showClose="true" scrollable="true" single="true" text="版本通知"></uni-notice-bar>
		<view @tap="showPicker('date1')" class="datetime">会议开始时间:
			<view class="timeshow">
				{{begin.result?begin.result:''}}
			</view>
		</view>
		<view @tap="showPicker('date2')" class="datetime">会议结束时间:
			<view class="timeshow">
				{{overtime.result?overtime.result:''}}
			</view>
		</view>
		<view class="uni-title uni-common-pl">用途:</view>
		<view class="uni-textarea">

			<textarea @blur="bindTextAreaBlur" auto-height  />
			</view>
		<view class="radio">
			<text style="font-size: 40rpx;">请选择会议室:</text>

			<view class="filter-body-section-body style-flex style-flex-wrap" style="width: 100%;		display: flex;
		justify-content: space-between; ">
				<axb-check-box ref="radio3" :list="sartTime" @change="radioChangeType"></axb-check-box>
			</view>
		</view>

		<w-picker mode="date" startYear="2020" endYear="2029" value="2020-04-09 17:19:00" :current="false" fields="minute"
		 @confirm="onConfirm($event,'date1')" @cancel="onCancel" :disabled-after="false" ref="date1"></w-picker>
		<w-picker mode="date" startYear="2020" endYear="2029" value="2020-04-09 17:19:00" :current="false" fields="minute"
		 @confirm="onConfirm2($event,'date2')" @cancel="onCancel" :disabled-after="false" ref="date2"></w-picker>
		 
		 
			 <view style="margin: 0 auto; margin-top: 100rpx; width: 95%;">
				  <button type="primary" @click="submit">提交申请</button>
			 </view>
<!-- 			          <button class="" @click="dyxi">发送订阅消息</button> -->
	</view>


</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue"
	import axbCheckBox from '../../components/axb-checkbox/axb-checkbox.vue'
	export default {
		data() {
			return {
				present: '',
				show1:false,
				begin: '',
				overtime: '',
				behoof:'',
				meeting:'',
				uerInfo:'',
				sartTime: [{ // 开始日期
						name: '小会议室',
						value: '小会议室',
						checked: 0
					}, {
						name: '大会议室',
						value: '大会议室',
						checked: 0
					},
					{
						name: '咖啡厅',
						value: '咖啡厅',
						checked: 0
					}
				],
			}
		},
		components: {
			wPicker,
			axbCheckBox,
		},
		methods: {
			showPicker(type) {
				this.$refs[type].show();
			},
			onConfirm(res, type) {
				this.result = res;
				this.begin = res;

			},

			onConfirm2(res, type) {
				this.result = res;
				this.overtime = res;
			},
			onCancel() {
				console.log('取消选择')
			},

			radioChangeType: function(val) {
				console.log(val) 
				this.meeting=val;
			},
			bindTextAreaBlur: function(e) {
				console.log(e.detail.value)
				this.behoof=e.detail.value;
			},
			
			//订阅消息
			dyxi(){				
				console.log('dyxx');
				wx.requestSubscribeMessage({
				  tmplIds: ['JijPxhl-oR5WSGzfYzep8ZbrBY-gPEnJPur0RSqgbp0'], // 此处可填写多个模板 ID，但低版本微信不兼容只能授权一个
				  success (res) {
				    console.log('已授权接收订阅消息')
				  }
				})
				
				},
			
			submit:function()
			{
				let _this = this;				
				uni.request({
				    url:  _this.$loginUrl + '/api/v1/order', //仅为示例，并非真实接口地址。
				    data: {
				        begin: _this.begin,
						overtime:_this.overtime,
						behoof:_this.behoof,
						meeting:_this.meeting,
						uerInfo:_this.uerInfo,
						session_key: uni.getStorageSync('storage_key')
				    },
					method: 'POST',
				    header: {
				        'custom-header': 'hello' //自定义请求头信息
				    },
				    success: (res) => {
				        console.log(res.data);		
						if(res.data.code==400){
							uni.showToast({
							   title: res.data.message,							  
							   duration: 2000,
							   icon:'none',
							});
						}else{
							uni.showToast({
							   title: '预约成功',							  
							   duration: 2000,
							   icon:'none',
							});
							uni.redirectTo({
							   	url: '/pages/forward/forward'
							});
						}

				    },
					fail:(res)=>{
						   console.log(res.data);
					}
				});
			},
			onLoad() {
				// this.present = this.date()
				this.uerInfo=getApp().globalData.userInfo;
				if(this.uerInfo!=null){
					this.login= true;
				}
				this.show1= true;
			},

			date() {
				Date.prototype.Format = function(fmt) { // author: meizz
					var o = {
						"M+": this.getMonth() + 1, // 月份
						"d+": this.getDate(), // 日
						"h+": this.getHours(), // 小时
						"m+": this.getMinutes(), // 分
						"s+": this.getSeconds(), // 秒
						"q+": Math.floor((this.getMonth() + 3) / 3), // 季度
						"S": this.getMilliseconds() // 毫秒
					};
					if (/(y+)/.test(fmt))
						fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
					for (var k in o)
						if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" +
							o[k]).substr(("" + o[k]).length)));
					return fmt;
				}
				return new Date().Format("yyyy-MM-dd hh:mm:ss");
			}

		}
	}
</script>

<style>
	.head {
		height: 150rpx;
		/* background-color: #007AFF; */
	}

	.datetime {
		height: 150rpx;
		font-size: 40rpx;
		margin-top: 10rpx;
		margin-left: 18rpx;
	}
	.timeshow{
		border: 1px solid #C0C0C0;
		height: 50rpx;
		font-size: 40rpx;
		border-radius: 6rpx;
		width: 90%;
		margin: 0 auto;
		margin-top: 20rpx;
		padding: 10rpx;
	}

	.radio {
		display: flex;
		flex-direction: column;
		margin-top: 20rpx;
		margin-left: 18rpx;
	}


	.uni-textarea {
		border: 1px solid #C0C0C0;
		/* height: 300rpx; */
		font-size: 40rpx;
		border-radius: 6rpx;
		width: 90%;
		margin: 0 auto;
		margin-top: 20rpx;
		padding: 10rpx;
	}

	.uni-textarea textarea {
		width: 100%;

	}

	.uni-title {
		font-size: 40rpx;
		margin-top: 20rpx;
		margin-left: 18rpx;
	}
</style>
