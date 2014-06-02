window.HandyHit = window.HandyHit || {};
window.HandyHit.util = window.HandyHit.util || {};
HandyHit.util.isConnected = function() {
    return navigator.connection.type !== Connection.NONE;
};
HandyHit.util.notifyOffline = function() {
    DevExpress.ui.notify('无网络连接', 'warning', 1000);
};
HandyHit.util.loadScript = function(url) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.body.appendChild(script);
};
HandyHit.util.toWeChetFriend = function(content) {
    window.plugins.sharePlugin.toWeChetFriend(
        '',
        content,
        DevExpress.ui.notify('分享成功', 'info', 1000),
        DevExpress.ui.notify('分享失败', 'info', 1000)
    );
};
HandyHit.util.toWeChetTimeline = function(content) {
    window.plugins.sharePlugin.toWeChetTimeline(
        '',
        content,
        DevExpress.ui.notify('分享成功', 'info', 1000),
        DevExpress.ui.notify('分享失败', 'info', 1000)
    );
};