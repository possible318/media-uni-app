<template>
    <!-- index.wxml -->
    <view>
        <view class="updateList" v-for="(update, index) in updateList" :key="update.unique">
            <view class="version">Ver {{ update.version }}</view>

            <view class="date">{{ update.date }}</view>

            <view class="itemList" v-for="(item, index1) in update.updateItems" :key="item.unique">{{ item }}</view>
        </view>
        <view class="author"></view>
    </view>
</template>

<script>
//about.js
export default {
    data() {
        return {
            updateList: [
                {
                    version: '1.0',
                    date: '2022.08.25',
                    updateItems: ['尖小呆', '一个人美嘴甜的大美女', '收录了尖小呆微博B站的照片']
                }
            ],

            update: {
                unique: '',
                version: '',
                date: '',
                updateItems: []
            }
        };
    },
    onLoad: function () {},
    methods: {}
};
</script>
<style>
page {
    background-color: #fff;
}

.updateList {
    margin: 30rpx;
    padding-bottom: 30rpx;
    border-bottom: 1rpx solid #e5e5e5;
}

.version {
    color: #353535;
    font-size: 34rpx;
    line-height: 48rpx;
}

.date {
    font-size: 26rpx;
    color: #888;
    line-height: 37rpx;
    margin-bottom: 10rpx;
}

.itemList {
    text-align: left;
    font-size: 26rpx;
    color: #353535;
    line-height: 37rpx;
}

.author {
    position: fixed;
    bottom: 0;
    width: 100%;
    color: #888;
    font-size: 20rpx;
    text-align: center;
    margin-bottom: 30rpx;
}

.author image {
    display: block;
    width: 40rpx;
    height: 40rpx;
    margin: 0 auto;
    margin-bottom: 10rpx;
}

.author text {
    display: block;
    line-height: 28rpx;
}
</style>
