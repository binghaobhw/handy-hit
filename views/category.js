HandyHit.category = function (params) {
    var viewModel = {
        categories: HandyHit.data.categories,
        headerClick: function() {
            $('#category-list').dxList('instance').scrollTo(0);
        },
        backVisible: false,
        menuVisible: false,
        menuItems: [],
        menuClick: null
    };
    return viewModel;
};    