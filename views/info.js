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
HandyHit.info = function (params) {
    var autoPagingEnabled = ko.observable(true);
    var showNextButton = ko.observable(false);
    var pullRefreshEnabled = ko.observable(true);
    var pullingDownText = ko.observable('往下拉更新资讯');
    var pulledDownText = ko.observable('可以松开了');

    function loadFromRemote() {
        HandyHit.feed.load(function(result) {
            if (!result.error) {
                remoteFeedEntries = result.feed.entries;
                for (var i = 0; i < remoteFeedEntries.length; i++) {
                    HandyHit.data.feedEntrySource.store().insert(remoteFeedEntries[i]);
                }
            }
        });
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
        viewShowing: function() {
            if (!HandyHit.util.isConnected()) {
                DevExpress.ui.notify('无网络连接', 'warning', 3000);
            }
        },
        navigateDetail: navigateDetail
    };

    return viewModel;
};