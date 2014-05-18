window.HandyHit = window.HandyHit || {};
window.HandyHit.util = window.HandyHit.util || {};
HandyHit.util.isConnected = function() {
    return navigator.connection.type !== Connection.NONE;
};
