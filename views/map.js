ko.bindingHandlers.map = {
    init: function(element) {
        if (HandyHit.util.isConnected()) {
            if (typeof AMap !== 'undefined') {
                var mapObj = new AMap.Map(element.id, {
                    touchZoom: true
                });
                mapObj.plugin(["AMap.ToolBar"],function(){
                    var toolBar = new AMap.ToolBar({
                        ruler: false,
                        direction: false
                    });
                    mapObj.addControl(toolBar);
                });
                mapObj.plugin('AMap.Geolocation', function() {
                    var geolocation = new AMap.Geolocation({
                        enableHighAccuracy: true,//是否使用高精度定位，默认:true
                        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                        showButton: true,        //显示定位按钮，默认：true
                        buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
                        buttonOffset: new AMap.Pixel(20, 15),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                        showCircle: false,        //定位成功后用圆圈表示定位精度范围，默认：true
                        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                        zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    });
                    mapObj.addControl(geolocation);
                });
                var currentCampus = HandyHit.data.currentCampus();
                for (var j = 0; j < currentCampus.markers.length; ++j) {
                    var markerData = currentCampus.markers[j];
                    var markerContent = $('<div></div>');
                    var icon = $('<img>');
                    icon.attr('src', 'img/marker.png');
                    icon.addClass('marker-content');
                    var label = $('<div></div>');
                    label.append(markerData['name']);
                    label.addClass('marker-content');
                    markerContent.append(icon);
                    markerContent.append(label);
                    new AMap.Marker({
                        map: mapObj,
                        content: markerContent[0],
                        position: new AMap.LngLat(markerData['lng'], markerData['lat'])
                    });
                }
                var center = new AMap.LngLat(currentCampus.center['lng'], currentCampus.center['lat']);
                mapObj.setZoomAndCenter(16, center);
            }
        } else {
            HandyHit.util.notifyOffline();
        }
    }
};
HandyHit['map'] = function(params) {

    var viewModel = {
        // Put the binding properties here
        title: HandyHit.data.currentCampus().campus
    };

    return viewModel;
};