(function() {
    "use strict";

    window.HandyHit = window.HandyHit || {};
    
    // Uncomment the line below to disable platform-specific look and feel and to use the Generic theme for all devices
    DevExpress.devices.current("iPhone5");

    $(function() {
        function initFeed() {
            HandyHit.feed = new google.feeds.Feed("http://today.hit.edu.cn/rss.xml");
            HandyHit.feed.setResultFormat(google.feeds.Feed.JSON_FORMAT);
            HandyHit.feed.setNumEntries(20);
        }
        google.load("feeds", "1", {"callback": initFeed});
        HandyHit.app = new DevExpress.framework.html.HtmlApplication({
            namespace: HandyHit,
            
            navigationType: "navbar",
            navigation: [
                {
                    title: "分类",
                    action: "#category",
                    icon: "home"
                },
                {
                    title: "资讯",
                    action: "#info",
                    icon: "info"
                },
                {
                    title: "地图",
                    action: "#map",
                    icon: "map"
                }
            ],
            commandMapping: {
                "ios-header-toolbar": {
                    commands: [
                        {id: 'back', location: 'left', showText: false},
                        {id: 'search', location: 'right', showText: false}
                    ]
                }
            }
        });

        HandyHit.app.router.register(":view/:id", { view: "category", id: undefined });
        HandyHit.app.router.register(":view/:categoryId/:id", {view: undefined, categoryId: undefined, id: undefined});
        HandyHit.app.viewsWithoutNavBar = ['knowledgeDetail', 'infoDetail', 'picture'];
        HandyHit.app.resolveLayoutController.add(function(args) {
            var viewName = args.viewInfo.viewName;
            if(HandyHit.app.viewsWithoutNavBar.indexOf(viewName) != -1) {
                var result = $.grep(args.availableLayoutControllers, function (item, index) {
                    return item.navigationType == 'empty';
                });
                args.layoutController = result[0].controller;
            }
        });
        HandyHit.app.navigate();
    });
    
})();