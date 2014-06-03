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
        headerClick: function() {
            $('#knowledge-detail-scroll-view').dxScrollView('instance').scrollTo(0);
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