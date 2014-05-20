HandyHit['infoDetail'] = function (params) {
    var content;
    HandyHit.data.feedEntrySource.store().byKey(params.id)
        .done(function(dataItem) {
            content = dataItem['content'];
            var url = 'http://today.hit.edu.cn';
            // cross domain relative path
            content = content.replace(/src="([^"]*)"/g, 'src="' + url + '$1"');
            content = content.replace(/href="([^"]*)"/g, 'href="' + url + '$1"');
        });

    var viewModel = {
        // Put the binding properties here
        content: content
    };
    return viewModel;
};
