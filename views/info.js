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
    var refreshingText = ko.observable('正在获取最新资讯');
    function clear() {
        HandyHit.data.feedEntrySource.store().clear();
        DevExpress.ui.notify('清理成功', 'info', 1000);
    }

    function loadFromRemote() {
        if (HandyHit.util.isConnected()) {
            $.ajax({
                url: 'http://today.hit.edu.cn/rss.xml',
                dataType: 'jsonp',
                success: function(xml) {
                    DevExpress.ui.notify('获取成功', 'info', 1000);
                    $(xml).find('item').each(function() {
                        var pubDate = new Date($(this).find("pubDate").text());
                        var year = pubDate.getFullYear().toString();
                        var month = (pubDate.getMonth() + 1).toString();
                        var day = pubDate.getDate().toString();
                        var hour = pubDate.getHours().toString();
                        var minute = pubDate.getMinutes().toString();
                        var second = pubDate.getSeconds().toString();
                        var entry = {
                            title: $(this).find("title").text(),
                            content: $(this).find("description").text(),
                            pubDate: year + '-' +
                                (month[1] ? month : '0' + month) + '-' +
                                (day[1] ? day : '0' + day) + ' ' +
                                (hour[1] ? hour: '0' + hour) + ':' +
                                (minute[1] ? minute: '0' + minute) + ':' +
                                (second[1] ? second: '0' + second)
                        };
                        HandyHit.data.feedEntrySource.store().insert(entry);
                    });
                }
            });
        } else {
            HandyHit.util.notifyOffline();
        }
    }

    function navigateDetail(entry) {
        HandyHit.app.navigate('infoDetail/' + entry.publishedDate);
    }

    var actionSheetVisible = ko.observable(false);

    var viewModel = {
        // Put the binding properties here
        autoPagingEnabled: autoPagingEnabled,
        showNextButton: showNextButton,
        pullRefreshEnabled: pullRefreshEnabled,
        pullingDownText: pullingDownText,
        pulledDownText: pulledDownText,
        pullRefreshAction: loadFromRemote,
        refreshingText: refreshingText,
        feedEntrySource: HandyHit.data.feedEntrySource,
        navigateDetail: navigateDetail,
        backVisible: false,
        menuVisible: true,
        menuClick: function() {
            actionSheetVisible(true);
        },
        actionSheetVisible: actionSheetVisible,
        actionSheetItems: [
            {text: '清理缓存', clickAction: clear}
        ]
    };

    return viewModel;
};