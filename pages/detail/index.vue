<template>
    <view>
        <loading v-if="loading">Loading</loading>

        <modal class="modal" v-if="!hideInfo" no-cancel @confirm="closeInfo">
            <view v-if="!hideCamera">
                <text>Camera: {{ photo.camera }}</text>
            </view>
            <view v-if="!hideLens">
                <text>Lens: {{ photo.lens }}</text>
            </view>
            <view v-if="!hideAperture">
                <text>Aperture: {{ photo.aperture }}</text>
            </view>
            <view v-if="!hideISO">
                <text>ISO: {{ photo.iso }}</text>
            </view>
            <view v-if="!hideRate">
                <text>Rate: {{ photo.rating }}</text>
            </view>
            <view v-if="!hideVote">
                <text>Vote: {{ photo.votes_count }}</text>
            </view>
            <view v-if="!hideView">
                <text>View: {{ photo.times_viewed }}</text>
            </view>
        </modal>

        <view class="container">
            <view class="topic-detail">
                <view class="topic-owner">
                    <image class="owner-avatar" :src="photo.user.userpic_url" :id="photo.user.id" @tap="loadUser"></image>
                    <view class="topic-tit">{{ photo.user.fullname }} ({{ photo.user.username }})</view>
                </view>
                <image :style="'width: 750rpx; height: ' + height + 'rpx; background-color: #ffffff;'" :src="photo.images[0].url" mode="aspectFit" @tap="showPhotoInfo"></image>
                <view class="topic-desc">
                    <text>{{ photo.description }}</text>
                </view>
                <view class="topic-tags">
                    <block v-for="(item, index) in tags" :key="index">#{{ item }}</block>
                </view>
                <!-- <block wx:for="{{pages}}"> -->
                <!-- <text>{{item[0]}} ({{item[1]}})</text> -->
                <!-- </block> -->
            </view>
            <view class="replies">
                <block v-for="(item, index) in comments" :key="index">
                    <view class="replies-item" :id="item.id">
                        <view class="reply-owner">
                            <image class="reply-avatar" :src="item.user.userpic_url" :id="item.user.id" @tap="loadUser"></image>
                            <text class="reply-name">{{ item.user.fullname }}</text>
                            <!-- <text class="reply-time">{{item.created_at}}</text> -->
                        </view>
                        <view class="reply-content">
                            {{ item.body }}
                        </view>
                    </view>
                </block>
            </view>
        </view>
    </view>
</template>

<script>
// detail.js
var Api = require('../../utils/api.js');

var util = require('../../utils/util.js');

export default {
    data() {
        return {
            title: '',
            photo: {
                camera: '',
                lens: '',
                aperture: '',
                iso: '',
                rating: '',
                votes_count: '',
                times_viewed: '',

                user: {
                    userpic_url: '',
                    id: '',
                    fullname: '',
                    username: ''
                },

                images: '',
                description: ''
            },

            comments: [],
            tags: [],
            id: 0,
            height: 0,
            pages: [],
            loading: true,
            hideInfo: true,
            hideCamera: true,
            hideLens: true,
            hideAperture: true,
            hideISO: true,
            hideRate: true,
            hideVote: true,
            hideView: true,
            url: ''
        };
    },
    onLoad: function (options) {
        console.log('load photo detail');
        this.fetchDetail(options.id);
    },
    methods: {
        showPhotoInfo: function (e) {
            this.setData({
                hideInfo: false
            });
        },

        closeInfo: function (e) {
            this.setData({
                hideInfo: true
            });
        },

        loadUser: function (event) {
            var id = event.currentTarget.id;
            var url = '../user/user?id=' + id;
            uni.navigateTo({
                url: url
            });
        },

        fetchDetail: function (id) {
            var that = this;
            console.log(id);
            uni.request({
                url: Api.getPhoto(id),
                data: {
                    image_size: 4,
                    tags: '1'
                },
                success: function (res) {
                    var photo = res.data.photo; // var pages = getXML(res.data.photo.description);

                    that.setData({
                        photo: photo,
                        height: (photo.height * 750) / photo.width,
                        pages: util.getXML(photo.description),
                        hideCamera: Api.isNone(photo.camera),
                        hideLens: Api.isNone(photo.lens),
                        hideAperture: Api.isNone(photo.aperture),
                        hideISO: Api.isNone(photo.iso),
                        hideRate: Api.isNone(photo.rating),
                        hideVote: Api.isNone(photo.votes_count),
                        hideView: Api.isNone(photo.times_viewed),
                        tags: photo.tags
                    });
                }
            });
        },
    }
};
</script>
<style>
.container {
    align-items: flex-start;
}
</style>
