window.HandyHit = window.HandyHit || {};
window.HandyHit.util = window.HandyHit.util || {};
HandyHit.util.isConnected = function() {
    return navigator.connection.type !== Connection.NONE;
};
HandyHit.util.notifyOffline = function() {
    DevExpress.ui.notify('无网络连接', 'warning', 3000);
};
HandyHit.util.loadScript = function(url) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.body.appendChild(script);
};
HandyHit.util.toWeChet = function(content) {
    window.plugins.sharePlugin.toWeChet(
        '',
        '我在[Handy Hit]上看到了[' + content + ']',
        DevExpress.ui.notify('分享成功', 'info', 3000),
        DevExpress.ui.notify('分享失败', 'info', 3000)
    );
};
HandyHit.util.toSMS = function(title, content, number) {
    window.plugins.socialsharing.shareViaSMS(content, title, number,
        DevExpress.ui.notify('分享成功', 'info', 3000),
        DevExpress.ui.notify('分享失败', 'info', 3000)
    );
};