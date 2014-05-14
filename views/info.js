﻿HandyHit.data.feedEntries = ko.observableArray();
HandyHit.info = function (params) {
    var isLoaded = ko.observable(false),
        loadPanelVisible = ko.observable(false),
        loadPanelMessage = ko.observable();

    function loadData() {
        isLoaded(false);
        loadPanelVisible(true);
        loadPanelMessage('正在加载资讯');

        HandyHit.feed.load(function(result) {
            if (!result.error) {
                HandyHit.data.feedEntries(result.feed.entries);
                isLoaded(true);
                loadPanelVisible(false);
            }
        });
    }

    function navigateDetail(entry) {
        var id = HandyHit.data.feedEntries.indexOf(entry);
        HandyHit.app.navigate('infoDetail/' + id);
    }

    var viewModel = {
        // Put the binding properties here
        isLoaded: isLoaded,
        loadPanelVisible: loadPanelVisible,
        loadPanelMessage: loadPanelMessage,
        feedEntries: HandyHit.data.feedEntries,
        viewShowing: loadData,
        navigateDetail: navigateDetail
    };

    return viewModel;
};