(function() {
    "use strict";

    window.HandyHit = window.HandyHit || {};
    
    // Uncomment the line below to disable platform-specific look and feel and to use the Generic theme for all devices
    DevExpress.devices.current("iPhone5");

    $(function() {
        HandyHit.app = new DevExpress.framework.html.HtmlApplication({
            namespace: HandyHit,
            
            navigationType: "navbar",
            navigation: [
                {
                    title: "指南",
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
                    action: "#campus",
                    icon: "map"
                }
            ],
            commandMapping: {
                "ios-header-toolbar": {
                    commands: [
                        {id: 'back', location: 'left', showText: false},
                        {id: 'search', location: 'right', showText: false},
                        {id: 'share', location: 'right', showText: false}
                    ]
                }
            }
        });

        HandyHit.app.router.register(":view/:id", { view: "category", id: undefined });
        HandyHit.app.router.register(":view/:categoryId/:id", {view: undefined, categoryId: undefined, id: undefined});
        HandyHit.app.viewsWithoutNavBar = [
            'knowledge',
            'knowledgeDetail',
            'infoDetail',
            'picture',
            'map'
        ];
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