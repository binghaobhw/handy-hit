(function() {
    "use strict";

    var HandyHit = window.HandyHit = { };
    
    // Uncomment the line below to disable platform-specific look and feel and to use the Generic theme for all devices
    DevExpress.devices.current("iPhone5");

    $(function() {
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
                title: "Products",
                action: "#products",
                icon: "info"
              }
            ],
            commandMapping: {
                "ios-header-toolbar": {
                    commands: [
                        { id: "search", location: 'right', showText: false }
                    ]
                },
                "android-footer-toolbar": {
                    commands: [
                        { id: "search", location: 'center', showText: false }
                    ]
                },
                "tizen-footer-toolbar": {
                    commands: [
                        { id: "search", location: 'center', showText: false }
                    ]
                },
                "generic-header-toolbar": {
                    commands: [
                        { id: "search", location: 'right', showText: false }
                    ]
                },
                "win8-phone-appbar": {
                    commands: [
                        { id: "search", location: 'center', showText: true }
                    ]
                }
            }
        });

        HandyHit.app.router.register(":view/:id", { view: "category", id: undefined });
        HandyHit.app.navigate();
    });
    
})();