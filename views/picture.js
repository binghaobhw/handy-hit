HandyHit.data = HandyHit.data || {};
HandyHit.data.pictures = ko.observableArray();
HandyHit.data.selectedPicture = ko.observable(0);
HandyHit.navigatePicture = function(index) {
    HandyHit.data.selectedPicture(index);
    HandyHit.app.navigate('picture');
};

HandyHit['picture'] = function(params) {
    var viewModel = {
        // Put the binding properties here
        pictures: HandyHit.data.pictures,
        selectedIndex: HandyHit.data.selectedPicture
    };
    return viewModel;
};
