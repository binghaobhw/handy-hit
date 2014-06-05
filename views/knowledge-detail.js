HandyHit['knowledgeDetail'] = function(params) {

    var indexMap;
    var paragraphs = HandyHit.data.currentKnowledge().paragraphs;
    var pictures;
    buildPicture();
    function buildPicture() {
        indexMap = {};
        pictures = [];
        for (var i = 0; i < paragraphs.length; i++) {
            if ('image' in paragraphs[i]) {
                pictures.push(paragraphs[i]['image']);
                indexMap[i] = pictures.length - 1;
            }
        }
        HandyHit.buildPicture(pictures, 'knowledgeDetail');
    }
    function toWeChetFriend() {
        HandyHit.util.toWeChetFriend('我用Handy HIT看了[' + HandyHit.data.currentKnowledge().title + ']。指南在手，工大任我走！');
    }
    function toWeChetTimeline() {
        HandyHit.util.toWeChetTimeline('我用Handy HIT看了[' + HandyHit.data.currentKnowledge().title + ']。指南在手，工大任我走！');
    }
    var actionSheetVisible = ko.observable(false);
    var viewModel = {
        paragraphs: paragraphs,
        navigatePicture: function(index) {
            HandyHit.navigatePicture(indexMap[index]);
        },
        title: HandyHit.data.currentKnowledge().title,
        viewShown: function() {
            if (HandyHit.data.pictureOwner() != 'knowledgeDetail') {
                HandyHit.buildPicture(pictures, 'knowledgeDetail');
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