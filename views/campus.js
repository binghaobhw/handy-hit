HandyHit.data = HandyHit.data || {};
HandyHit.data.currentCampus = ko.observable();
HandyHit.data.campusChanged = ko.observable(false);
HandyHit['campus'] = function(params) {
    function navigateMap(campus) {
        HandyHit.data.currentCampus(campus);
        if (HandyHit.data.currentCampus() !== campus) {
            HandyHit.data.campusChanged(true);
        } else {
            HandyHit.data.campusChanged(false);
        }
        HandyHit.app.navigate('map/' + campus['id']);
    }
    var viewModel = {
        // Put the binding properties here
        campusList: HandyHit.data.markerData,
        navigateMap: navigateMap,
        headerClick: function() {
            $('#campus-list').dxList('instance').scrollTo(0);
        },
        backVisible: false,
        menuVisible: false,
        menuItems: [],
        menuClick: null
    };

    return viewModel;
};