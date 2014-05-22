HandyHit['infoDetail'] = function (params) {
    var title;
    var content;
    HandyHit.data.feedEntrySource.store().byKey(params.id)
        .done(function(dataItem) {
            title = dataItem['title'];
            content = dataItem['content'];
            var domain = 'http://today.hit.edu.cn';
            // cross domain relative path
            content = content.replace(/href="([^"]*)"/g, 'href="' + domain + '$1"');
            HandyHit.data.pictures.removeAll();
            var index = -1;
            content = content.replace(/src="([^"]*)"/g, function (whole, group) {
                var picturePath = domain + group;
                HandyHit.data.pictures.push(picturePath);
                index += 1;
                return 'src="' + picturePath + '" onclick="HandyHit.navigatePicture(' + index + ');"';
            });
        });

    var viewModel = {
        // Put the binding properties here
        title: title,
        content: content
    };
    return viewModel;
};
