HandyHit.knowledge = function (params) {
    var categoryId = parseInt(params.id);
    var originList = HandyHit.data.simpleData[categoryId]['knowledgeList'];
    var title = ko.observable(HandyHit.data.simpleData[categoryId]['categoryName']);
    var knowledgeList = ko.observableArray(originList.concat());
    var searchString = ko.observable('');
    searchString.extend({
        rateLimit: {
            method: "notifyWhenChangesStop", timeout: 500
        }
    }).subscribe(function(newValue) {
        search(newValue);
    });

    function search(searchString) {
        knowledgeList.removeAll();
        for (var i = 0; i < originList.length; i++) {
            if (originList[i]['title'].indexOf(searchString) != -1) {
                knowledgeList.push(originList[i]);
            }
        }
    }

    function navigateDetail(item) {
        HandyHit.app.navigate('knowledgeDetail/' + categoryId + '/' + item['id']);
    }

    var viewModel = {
        searchString: searchString,
        toggleSearch: function() {
            viewModel.showSearch(!viewModel.showSearch());
            viewModel.searchString('');
        },
        showSearch: ko.observable(false),
        knowledgeList: knowledgeList,
        title: title(),
        navigateDetail: navigateDetail
    };
    return viewModel;
};  