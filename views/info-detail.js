HandyHit['infoDetail'] = function (params) {
    var title;
    var content;
    var pictures;
    HandyHit.data.feedEntrySource.store().byKey(params.id)
        .done(function(dataItem) {
            title = dataItem['title'];
            content = dataItem['content'];
            var domain = 'http://today.hit.edu.cn';
            // cross domain relative path
            content = content.replace(/href="([^"]*)"/g, 'href="' + domain + '$1"');
            pictures = [];
            var index = -1;
            content = content.replace(/src="([^"]*)"/g, function (whole, group) {
                var picturePath = domain + group;
                pictures.push(picturePath);
                index += 1;
                return 'src="' + picturePath + '" onclick="HandyHit.navigatePicture(' + index + ');"';
            });
            HandyHit.buildPicture(pictures, 'infoDetail');
        });
    function toWeChetFriend() {
        HandyHit.util.toWeChetFriend('我用Handy HIT看了[' + title + ']。校内新闻想看就看！');
    }
    function toWeChetTimeline() {
        HandyHit.util.toWeChetTimeline('我用Handy HIT看了[' + title + ']。校内新闻想看就看！');
    }
    var viewModel = {
        // Put the binding properties here
        title: title,
        content: content,
        viewShown: function() {
            if (HandyHit.data.pictureOwner() != 'knowledgeDetail') {
                HandyHit.buildPicture(pictures, 'infoDetail');
            }
        },
        headerClick: function() {
            $('#info-detail-scroll-view').dxScrollView('instance').scrollTo(0);
        },
        backVisible: true,
        menuVisible: true,
        menuItems: ['分享到微信好友', '分享到微信朋友圈'],
        menuClick: function(e) {
            switch (e.itemData) {
                case '分享到微信好友':
                    toWeChetFriend();
                    break;
                case '分享到微信朋友圈':
                    toWeChetTimeline();
                    break;
            }
        }
    };
    return viewModel;
};
