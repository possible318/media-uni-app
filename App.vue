<script>
    // app.js
    export default {
        data() {
            return {};
        },
        onLaunch: function() {
            // console.log('start!');
            var logs = uni.getStorageSync('logs') || [];
            logs.unshift(Date.now());
            uni.setStorageSync('logs', logs);
        },
        globalData: {}
    };
</script>
<style>
    /**app.wxss**/
    .container {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        /*padding: 200rpx 0;*/
        box-sizing: border-box;
    }

    .topic-owner {
        display: flex;
        align-items: center;
        margin-bottom: 10rpx;
        margin-left: 10rpx;
    }

    .owner-avatar {
        width: 80rpx;
        height: 80rpx;
        left: 10rpx;
        margin-right: 20rpx;
        border-radius: 100%;
    }

    .topic-created {
        margin-left: 30rpx;
        font-size: 14px;
        color: #999;
    }

    .topic-tit {
        flex: 1;
        box-sizing: border-box;
        padding-right: 10rpx;
        line-height: 1.4;
        font-size: 14px;
        color: #333;
    }

    .topic-info {
        margin-bottom: 40rpx;
        color: #777;
    }

    .topic-desc {
        width: 700rpx;
        padding-left: 20rpx;
        padding-right: 20rpx;
        margin-top: 20rpx;
        margin-bottom: 20rpx;
        line-height: 1.4;
        word-wrap: break-word;
        word-break: normal;
        font-size: 14px;
        color: #333;
        /*border-top:1px solid #ddd;*/
    }

    .topic-tags {
        width: 700rpx;
        padding-left: 20rpx;
        padding-right: 20rpx;
        margin-bottom: 20rpx;
        line-height: 1.4;
        word-wrap: break-word;
        word-break: normal;
        font-size: 14px;
        color: #999;
    }

    .replies {
        width: 730rpx;
        border-top: 1px solid #ddd;
    }

    .replies-item {
        padding: 10rpx 0 10rpx 20rpx;
        border-bottom: 1px solid #eee;
    }

    .reply-owner {
        display: flex;
        align-items: center;
        margin-bottom: 10rpx;
    }

    .reply-avatar {
        width: 60rpx;
        height: 60rpx;
        border-radius: 100%;
        margin-right: 30rpx;
    }

    .reply-name,
    .reply-time,
    .reply-content {
        font-size: 14px;
        color: #999;
    }

    .reply-time {
        margin-left: 30rpx;
        color: #ccc;
    }

    .reply-content {
        padding-left: 20rpx;
        padding-right: 20rpx;
        line-height: 1.4;
        word-wrap: break-word;
        word-break: normal;
        color: #999;
        margin-bottom: 5rpx;
    }

    .photo-list {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .photo-item {
        display: flex;
        flex-direction: row;
        padding: 2rpx 0rpx;
    }

    .photo {
        width: 373rpx;
        height: 373rpx;
        background: #ffffff;
    }

    .switch-form {
        display: flex;
        /*margin-bottom:;*/
        margin-left: 17rem;
    }

    .navigator-hover {
        color: blue;
    }

    .weui-loading {
        width: 20px;
        height: 20px;
        display: inline-block;
        vertical-align: middle;
        -webkit-animation: weuiLoading 1s steps(12, end) infinite;
        animation: weuiLoading 1s steps(12, end) infinite;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iciIgd2lkdGg9JzEyMHB4JyBoZWlnaHQ9JzEyMHB4JyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJub25lIiBjbGFzcz0iYmsiPjwvcmVjdD4KICAgIDxyZWN0IHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjRTlFOUU5JwogICAgICAgICAgdHJhbnNmb3JtPSdyb3RhdGUoMCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+CiAgICA8L3JlY3Q+CiAgICA8cmVjdCB4PSc0Ni41JyB5PSc0MCcgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHJ4PSc1JyByeT0nNScgZmlsbD0nIzk4OTY5NycKICAgICAgICAgIHRyYW5zZm9ybT0ncm90YXRlKDMwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4KICAgICAgICAgICAgICAgICByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyM5Qjk5OUEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSg2MCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+CiAgICAgICAgICAgICAgICAgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz4KICAgIDwvcmVjdD4KICAgIDxyZWN0IHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjQTNBMUEyJwogICAgICAgICAgdHJhbnNmb3JtPSdyb3RhdGUoOTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNBQkE5QUEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxMjAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNCMkIyQjInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxNTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNCQUI4QjknCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxODAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNDMkMwQzEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyMTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNDQkNCQ0InCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyNDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNEMkQyRDInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyNzAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNEQURBREEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgzMDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNFMkUyRTInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgzMzAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0Pgo8L3N2Zz4=) no-repeat;
        background-size: 100%;
    }

    .load-more-wrap {
        text-align: center;
        padding: 10px 20px 20px 20px;
    }

    .load-content {
        padding: 5px;
        color: #666;
        font-size: 26rpx;
    }

    /*.loading-text{
  font-size: 26rpx;
  display: inline-block;
  vertical-align: middle;
}*/

    .search-bar {
        width: 100%;
        /*position: fixed;*/
        height: 62rpx;
        top: 0;
        background: #ffffff;
    }

    .search-bar-warper {
        background: #eeeeee;
        height: 60rpx;
        margin: 0 20rpx;
        border-radius: 10rpx;
        padding-left: 20rpx;
        align-items: center;
        display: flex;
        /*width:100%;*/
    }
</style>
