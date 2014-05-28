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

    var viewModel = {
        // Put the binding properties here
        title: title,
        content: content,
        viewShown: function() {
            if (HandyHit.data.pictureOwner() != 'knowledgeDetail') {
                HandyHit.buildPicture(pictures, 'infoDetail');
            }
        }


    };
    return viewModel;
};
