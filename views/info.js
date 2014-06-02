HandyHit.data.feedEntrySource = new DevExpress.data.DataSource({
    store: {
        type: 'local',
        name: 'feedEntries',
        key: 'publishedDate',
        flushInterval: 2000
    },
    pageSize: 10,
    sort: {
        getter: 'publishedDate',
        desc: true
    }
});
HandyHit['info'] = function(params) {
    var autoPagingEnabled = ko.observable(true);
    var showNextButton = ko.observable(false);
    var pullRefreshEnabled = ko.observable(true);
    var pullingDownText = ko.observable('往下拉更新资讯');
    var pulledDownText = ko.observable('可以松开了');

    function loadFromRemote() {
        if (HandyHit.util.isConnected() && HandyHit.feed != undefined) {
            HandyHit.feed.load(function(result) {
                if (!result.error) {
                    var remoteFeedEntries = result.feed.entries;
                    for (var i = 0; i < remoteFeedEntries.length; i++) {
                        HandyHit.data.feedEntrySource.store().insert(remoteFeedEntries[i]);
                    }
                }
            });
        } else {
            HandyHit.util.notifyOffline();
        }
    }

    function navigateDetail(entry) {
        HandyHit.app.navigate('infoDetail/' + entry.publishedDate);
    }

    var viewModel = {
        // Put the binding properties here
        autoPagingEnabled: autoPagingEnabled,
        showNextButton: showNextButton,
        pullRefreshEnabled: pullRefreshEnabled,
        pullingDownText: pullingDownText,
        pulledDownText: pulledDownText,
        pullRefreshAction: loadFromRemote,
        feedEntrySource: HandyHit.data.feedEntrySource,
        navigateDetail: navigateDetail
    };

    return viewModel;
};