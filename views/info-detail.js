HandyHit['infoDetail'] = function (params) {
    var entry = HandyHit.data.feedEntries()[params.id];
    var content = entry['content'];
    var url = 'http://today.hit.edu.cn';
    var contentTree = $('<div>' + content + '</div>');
    contentTree.find('img').each(function() {
        var src = $(this).attr('src');
        if (src.charAt(0) != '/') {
            src = url + '/' + src;
        } else {
            src = url + src;
        }
        $(this).attr('src', src);
    });
    modifiedContent = contentTree.html();
    var viewModel = {
        // Put the binding properties here
        content: modifiedContent
    };

    return viewModel;
};