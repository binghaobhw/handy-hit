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
            $.get('http://today.hit.edu.cn/rss.xml', {}, function(res, code) {
                var xml = $(res);
                var items = xml.find('item');
                $.each(items, function(i, v) {
                    var entry = {
                        title: $(v).find('title').text(),
                        pubDate: $(v).find('pubDate').text(),
                        description: $.trim($(v).find('description').text())
                    };
                    var pubDate = new Date(entry['pubDate']);
                    var year = pubDate.getFullYear().toString();
                    var month = (pubDate.getMonth() + 1).toString();
                    var day = pubDate.getDate().toString();
                    var hour = pubDate.getHours().toString();
                    var minute = pubDate.getMinutes().toString();
                    var second = pubDate.getSeconds().toString();
                    entry['pubDate'] = year + '-' +
                        (month[1] ? month : '0' + month) + '-' +
                        (day[1] ? day : '0' + day) + ' ' +
                        (hour[1] ? hour: '0' + hour) + ':' +
                        (minute[1] ? minute: '0' + minute) + ':' +
                        (second[1] ? second: '0' + second);
                    HandyHit.data.feedEntrySource.store().insert(entry);
                });
                DevExpress.ui.notify('获取成功', 'info', 1000);
            });
            /*$.ajax({
                url: "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D'http%3A%2F%2Ftoday.hit.edu.cn%2Frss.xml'%20and%20charset%3D'gb2312'&format=json",
                dataType: 'xml',
                success: function(data) {
                    if (data.query.count == 0) {
                        DevExpress.ui.notify('获取出错，再试试', 'error', 1000);
                        return;
                    }
                    for (var i = 0; i < data.query.results.item.length; ++i) {
                        var entry = data.query.results.item[i];
                        var pubDate = new Date(entry['pubDate']);
                        var year = pubDate.getFullYear().toString();
                        var month = (pubDate.getMonth() + 1).toString();
                        var day = pubDate.getDate().toString();
                        var hour = pubDate.getHours().toString();
                        var minute = pubDate.getMinutes().toString();
                        var second = pubDate.getSeconds().toString();
                        entry['pubDate'] = year + '-' +
                            (month[1] ? month : '0' + month) + '-' +
                            (day[1] ? day : '0' + day) + ' ' +
                            (hour[1] ? hour: '0' + hour) + ':' +
                            (minute[1] ? minute: '0' + minute) + ':' +
                            (second[1] ? second: '0' + second);
                        entry['description'] = $.trim(entry['description']);
                        HandyHit.data.feedEntrySource.store().insert(entry);
                    }
                    DevExpress.ui.notify('获取成功', 'info', 1000);
                }
            });*/
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