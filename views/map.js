ko.bindingHandlers['myMap'] = {
    init: function(element) {
        var mapObj = new AMap.Map(element.id);
        function initMarkers() {
            for (var i = 0; i < HandyHit.data.markerData.length; i++) {
                var markerData = HandyHit.data.markerData[i];
                new AMap.Marker({
                    map: mapObj,
                    content: markerData['name'],
                    position: new AMap.LngLat(markerData['lng'], markerData['lat'])
                });
            }
        }
        initMarkers();

        mapObj.plugin('AMap.Geolocation', function () {
            var geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                showButton: true,        //显示定位按钮，默认：true
                buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            });
            mapObj.addControl(geolocation);
        });
        /*mapObj.plugin('AMap.CloudDataLayer', function () {
            var layerOptions = {
                map: mapObj,
                query:{}
            };
            var cloudDataLayer = new AMap.CloudDataLayer('5378cc94e4b0850d7b1d362a', layerOptions); //实例化云图层类

            AMap.event.addListener(cloudDataLayer, 'click', function (result) {
                var clouddata = result.data;
                var infoWindow = new AMap.InfoWindow({
                    content:"<h3><font face=\"微软雅黑\"color=\"#3366FF\">"+ clouddata._name +"</font></h3><hr />地址："+ clouddata._address + "<br />" + "创建时间：" + clouddata._createtime+ "<br />" + "更新时间：" + clouddata._updatetime,
                    size:new AMap.Size(300, 0),
                    autoMove:true,
                    offset:new AMap.Pixel(0,-5)
                });

                infoWindow.open(mapObj, clouddata._location);
            });
        });*/
    }
};
HandyHit.map = function (params) {
    var viewModel = {
        // Put the binding properties here
    };

    return viewModel;
};