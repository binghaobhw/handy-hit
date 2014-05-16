HandyHit['infoDetail'] = function (params) {
    var entry = HandyHit.data.feedEntries()[params.id];
    var content = entry['content'];
    var url = 'http://today.hit.edu.cn';
    // cross domain relative path
    content = content.replace(/src="([^"]*)"/g, 'src="' + url + '$1"');
    content = content.replace(/href="([^"]*)"/g, 'href="' + url + '$1"');
    var viewModel = {
        // Put the binding properties here
        content: content
    };

    return viewModel;
};