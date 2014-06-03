HandyHit.data = HandyHit.data || {};
HandyHit.data.pictures = ko.observableArray();
HandyHit.data.selectedPicture = ko.observable(0);
HandyHit.data.pictureOwner = ko.observable();

HandyHit.navigatePicture = function(index) {
    HandyHit.data.selectedPicture(index);
    HandyHit.app.navigate('picture');
};

HandyHit.buildPicture = function(pictures, owner) {
    HandyHit.data.pictures.removeAll();
    for (var i = 0; i < pictures.length; i++) {
        HandyHit.data.pictures.push(pictures[i]);
    }
    HandyHit.data.pictureOwner(owner);
};

HandyHit['picture'] = function(params) {
    var viewModel = {
        // Put the binding properties here
        pictures: HandyHit.data.pictures,
        selectedIndex: HandyHit.data.selectedPicture,
        headerClick: null,
        backVisible: true,
        menuVisible: true,
        menuItems: [],
        menuClick: null
    };
    return viewModel;
};
