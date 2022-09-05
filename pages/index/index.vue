<template>
    <!-- explore.wxml -->
    <view>
        <view class="container">
            <view class="picture">
                <block v-for="(photo, index) in listData" :key="index">
                    <view class="item">
                        <view>
                            <!-- <image show-menu-by-longpress lazy-load mode="widthFix" src="/images/about-on.png" /> -->
                            <image show-menu-by-longpress lazy-load mode="widthFix" :src="photo.src" />
                        </view>
                        <!-- <view class="text-center">{{ photo.pid }}</view> -->
                    </view>

                    <view class="null-wrap"></view>
                </block>
            </view>
            <!-- 空列表提示 -->
            <view v-if="listData.length == 0" class="flex flex-column flex-items-center">
                <!-- <image class="data-img" lazy-load mode="widthFix" src="/images/no-result.png" /> -->
                <view>还没有数据哦~</view>
            </view>
            <!-- 置底了 -->
            <view v-if="reachBottom" class="flex flex-center">~ 到底啦 ~</view>
        </view>
    </view>
</template>

<script>
// index.js
export default {
    data() {
        return {
            listData: [],

            photo: {
                src: ''
            },

            reachBottom: 0
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        this.getAppList(false);
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: async function () {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: async function () {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {}
};
</script>
<style>
/**explore.wxss**/
.container {
    padding: 0 20rpx;
}

/* 瀑布流布局 */
.picture {
    column-gap: 5rpx;
    column-count: auto;
    margin: 20rpx 0;
}

.item {
    break-inside: avoid;
    border-radius: 15rpx;
    width: 94% !important;
    box-shadow: 0 0 5px 2px #999;
    margin: 12px;
    align-items: center; /** 垂直居中*/
    display: flex;
    justify-content: center; /** flex 属性， 水平居中**/
}

.item image {
    height: auto;
}

.null-wrap {
    height: 30rpx;
}

.data-img {
    width: 300rpx;
    height: 300rpx;
}
</style>
