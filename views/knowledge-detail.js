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
        share: function() {
            window.plugins.socialsharing.share('Message only');
        }
    };
    return viewModel;
};   