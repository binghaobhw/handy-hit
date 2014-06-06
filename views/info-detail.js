HandyHit['infoDetail'] = function (params) {
    var title;
    var description;
    var pictures;
    HandyHit.data.feedEntrySource.store().byKey(params.id)
        .done(function(dataItem) {
            title = dataItem['title'];
            description = dataItem['description'];
            var domain = 'http://today.hit.edu.cn';
            // cross domain relative path
            description = description.replace(/href="([^"]*)"/g, 'href="' + domain + '$1"');
            pictures = [];
            var index = -1;
            description = description.replace(/src="([^"]*)"/g, function (whole, group) {
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
    var actionSheetVisible = ko.observable(false);
    var viewModel = {
        // Put the binding properties here
        infoTitle: title,
        description: description,
        viewShown: function() {
            if (HandyHit.data.pictureOwner() != 'knowledgeDetail') {
                HandyHit.buildPicture(pictures, 'infoDetail');
            }
        },
        backVisible: true,
        menuVisible: true,
        menuClick: function() {
            actionSheetVisible(true);
        },
        actionSheetVisible: actionSheetVisible,
        actionSheetItems: [
            {text: '分享到微信好友', clickAction: toWeChetFriend},
            {text: '分享到微信朋友圈', clickAction: toWeChetTimeline}
        ]
    };
    return viewModel;
};
