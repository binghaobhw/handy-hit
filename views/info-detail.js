HandyHit['infoDetail'] = function (params) {
    var content;
    var pictures = [];
    var selectedIndex = ko.observable(0);
    var galleryVisible = ko.observable(false);
    HandyHit.data.feedEntrySource.store().byKey(params.id)
        .done(function(dataItem) {
            content = dataItem['content'];
            var domain = 'http://today.hit.edu.cn';
            // cross domain relative path
//            content = content.replace(/src="([^"]*)"/g, 'src="' + domain + '$1"' + ' data-bind="click: click"');
            content = content.replace(/href="([^"]*)"/g, 'href="' + domain + '$1"');
            content = content.replace(/src="([^"]*)"/g, function(whole, group) {
                var picturePath = domain + group;
                pictures.push(picturePath);
                return 'src="' + picturePath + '" onclick="HandyHit[\'infoDetail\'].showGallery(' + (pictures.length - 1) + ');"';
            });
//            pictures = content.match(/src="([^"]*)"/g);
//            for (var i = 0; i < pictures.length; i++) {
//                pictures[i] = pictures[i].replace(/src="([^"]*)"/, '$1');
//            }
        });

    function showGallery(index) {
        selectedIndex(index);
        changeGalleryVisible();
    }

    function changeGalleryVisible() {
        galleryVisible = !galleryVisible;
    }

    var viewModel = {
        // Put the binding properties here
        content: content,
        pictures: pictures,
        galleryVisible: galleryVisible,
        showGallery: showGallery,
        changeGalleryVisible: changeGalleryVisible,
        selectedIndex: selectedIndex
    };
    return viewModel;
};
