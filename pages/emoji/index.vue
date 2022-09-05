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
// explore.js
import { getPhotos } from '../../utils/api.js';
var WARP_SECOND = 1000 * 60;
var CACHED_TIME = WARP_SECOND * 2; // sec

export default {
    data() {
        return {
            page: 1,

            // 当前页数
            total: 1,

            // 最大页数
            reachBottom: false,

            listData: [],

            photo: {
                src: ''
            }
        };
    }, // initData: function (f) {
    //   var cachedPhotos = wx.getStorageSync(f);
    //   if (!cachedPhotos) {
    //     this.fetchData();
    //   } else {
    //     var nowTs = Date.now();
    //     var oldTs = parseInt(wx.getStorageSync('requestTs') || 0);
    //     if (nowTs - oldTs > CACHED_TIME || !oldTs) {
    //       this.fetchData();
    //     } else {
    //       this.setData({
    //         loading: false,
    //         listData: cachedPhotos
    //       })
    //     }
    //   }
    // },

    /**
     * 生命周期函数--监听页面加载
     */
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
    onPullDownRefresh: async function () {
        this.refresh();
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        this.getAppList(true);
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
        // 下拉刷新
        refresh() {
            this.setData({
                page: 1,
                total: 1
            });
            this.getAppList(false);
        },

        // 获取列表
        getAppList(status) {
            // 上拉加载pageIndex += 1
            let page = this.page;

            if (status) {
                page += 1;
            } // 当前页数大于最大页数不执行后续

            if (page > this.total) {
                this.setData({
                    reachBottom: true
                });
                return;
            } // wx.showLoading({
            //   mask: true,
            //   title: '加载中'
            // })

            uni.request({
                url: getPhotos(),
                data: {
                    page
                },
                success: (res) => {
                    var l = res.data.data.list;
                    var p = res.data.data.page;
                    var t = res.data.data.total; // 下拉刷新直接赋值，上拉加载合并数组(调用接口使用)

                    let newArray = status ? this.listData.concat(l) : l;

                    if (status) {
                        newArray = this.listData.concat(l);
                    }

                    this.setData({
                        page: p,
                        //更新页数
                        listData: newArray,
                        total: t
                    });
                }
            }); // wx.setStorageSync(that.data.feature, newData);
            // wx.setStorageSync('requestTs', Date.now());
        }
    }
};
</script>
<style>
/**explore.wxss**/
/* 全局内边距 */
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
