HandyHit['infoDetail'] = function (params) {
    var detail = ko.observable();
    detail(HandyHit.data.feedEntries[params.id]);
    var viewModel = {
        // Put the binding properties here
        detail: detail
    };

    return viewModel;
};