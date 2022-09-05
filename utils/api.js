'use strict';

var HOST_URI = 'https://jxd.dishesdog.com';
var PHOTOS = '/photos';
var DETAIL = '/detail';
var LIKE = '/like';
var DISLIKE = '/dislike';

function _getPhotos() {
    return HOST_URI + PHOTOS;
}

function _getPhoto(id) {
    return HOST_URI + DETAIL + '?id=' + id;
}

function _setLike(id) {
    return HOST_URI + LIKE + '?id=' + id;
}

function _setDislke(id) {
    return HOST_URI + DISLIKE + '?id=' + id;
}

function _isNone(s) {
    return s == '' || s == null || s == undefined;
}

module.exports = {
    getPhotos: _getPhotos,
    getPhoto: _getPhoto,
    setLike: _setLike,
    setDislike: _setDislke,
    isNone: _isNone
};
