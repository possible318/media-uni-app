<style>
    /* 瀑布流布局 */
    .picture {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        /* column-count: 2; */
        column-gap: 5px;
    }

    .item {
        break-inside: avoid;
        border-radius: 15rpx;
        box-shadow: 0 0 15px 1px #999;
        width: 300rpx;
        margin: 15rpx;
    }

    .pic {
        position: relative;
        overflow: hidden;
        height: 300rpx;
        width: 300rpx;
    }
    
    .pic image {
        /* position: absolute; */
        width: 100%;
        height: 100%;
        /* object-fit: cover; */
    }
    
    .foot {
        width: 200rpx;
        margin: 12px;
        display: flex;
        justify-content: space-between;

    }
    .likeCount {
        font-family: 'Georgia', Times, Times New Roman, serif;
        color: #999999;
    }

    .null-wrap {
        height: 30rpx;
    }

    .data-img {
        width: 300rpx;
        height: 300rpx;
    }
</style>
<template>
    <view id="app">
        <view class="picture">
            <block v-for="(photo, index) in listData" :key="index">
                <view class="item">
                    <view class="pic">
                        <image show-menu-by-longpress mode='aspectFill' @click="clickImg(photo.src)" :src="photo.src"></image>
                        <!-- <image show-menu-by-longpress mode='aspectFill' @click="" src=""></image> -->
                    </view>
                    <view class="foot">
                        <div @click="actLike(photo.id)">
                            <uni-icons type="hand-up" size="20" color="#999"></uni-icons>
                            <span class="likeCount">({{photo.like}})</span>
                        </div>
                        <div @click="actDislike(photo.id)">
                            <uni-icons type="hand-down" size="20" color="#999"></uni-icons>
                            <span class="likeCount">({{photo.dislike}})</span>
                        </div>
                    </view>
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
</template>

<script>
    import {
        getPhotos,
        setDislike,
        setLike
    } from '../../utils/api.js';

    export default {
        data() {
            return {
                page: 0,
                // 当前页数
                total: 1,
                // 最大页数
                reachBottom: false,
                listData: []
            };
        },

        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function(options) {
            this.getAppList(false);
        },
        /**
         * 生命周期函数--监听页面初次渲染完成
         */
        onReady: function() {},
        /**
         * 生命周期函数--监听页面显示
         */
        onShow: function() {},
        /**
         * 生命周期函数--监听页面隐藏
         */
        onHide: function() {},
        /**
         * 生命周期函数--监听页面卸载
         */
        onUnload: async function() {},
        /**
         * 页面相关事件处理函数--监听用户下拉动作
         */
        onPullDownRefresh: async function() {
            this.refresh();
        },
        /**
         * 页面上拉触底事件的处理函数
         */
        onReachBottom: function() {
            this.getAppList(true);
        },
        /**
         * 用户点击右上角分享
         */
        onShareAppMessage: function() {},


        methods: {
            // 下拉刷新
            refresh() {
                this.setData({
                    page: 0,
                    total: 1
                });
                this.getAppList(false);
            },

            // 获取列表
            getAppList(status) {
                let page = this.page;
                if (status) {
                    page += 1;
                }
                if (page > this.total) {
                    this.setData({
                        reachBottom: true
                    });
                    return;
                }

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
                });
            },

            clickImg(url) {
                uni.previewImage({
                    urls: [url], //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
                    current: '', // 当前显示图片的http链接，默认是第一个
                    success: function(res) {},
                    fail: function(res) {},
                    complete: function(res) {},
                })
            },
            actLike(id) {
                uni.request({
                    url: setLike(),
                    data: {
                        id:id
                    },
                    success: (res) => {
                        // 点亮
                    }
                });
            },
            actDislike(id) {
                uni.request({
                    url: setDislike(),
                    data: {
                        id:id
                    },
                    success: (res) => {
                        alert('感谢反馈')
                    }
                });
                console.log(id)
            }
        }
    };
</script>
