HandyHit.data.feedEntrySource = new DevExpress.data.DataSource({
    store: {
        type: 'local',
        name: 'feedEntries',
        key: 'publishedDate',
        flushInterval: 5000
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
    function clear() {
        HandyHit.data.feedEntrySource.store().clear();
        DevExpress.ui.notify('清理成功', 'info', 1000);
    }

    function loadFromRemote() {
        if (HandyHit.util.isConnected()) {
            $.ajax({
                url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=-1&q=' + encodeURIComponent('http://today.hit.edu.cn/rss.xml'),
                dataType: 'jsonp',
                success: function(data) {
                    if (data.responseData != undefined && data.responseData.feed != undefined) {
                        var remoteFeedEntries = data.responseData.feed.entries;
                        for (var i = 0; i < remoteFeedEntries.length; i++) {
                            var date = new Date(remoteFeedEntries[i].publishedDate);
                            var year = date.getFullYear().toString();
                            var month = (date.getMonth() + 1).toString();
                            var day = date.getDate().toString();
                            var hour = date.getHours().toString();
                            var minute = date.getMinutes().toString();
                            var second = date.getSeconds().toString();
                            remoteFeedEntries[i].publishedDate = year + '-' +
                                (month[1] ? month : '0' + month) + '-' +
                                (day[1] ? day : '0' + day) + ' ' +
                                (hour[1] ? hour: '0' + hour) + ':' +
                                (minute[1] ? minute: '0' + minute) + ':' +
                                (second[1] ? second: '0' + second);
                            HandyHit.data.feedEntrySource.store().insert(remoteFeedEntries[i]);
                        }
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
        navigateDetail: navigateDetail,
        headerClick: function() {
            $('#info-list').dxList('instance').scrollTo(0);
        },
        backVisible: false,
        menuVisible: true,
        menuItems: ['清空缓存'],
        menuClick: function(e) {
            clear();
        }
    };

    return viewModel;
};