HandyHit['knowledgeDetail'] = function (params) {
    var categoryId = parseInt(params.categoryId);
    var id = parseInt(params.id);
    var knowledge = HandyHit.data.simpleData[categoryId]['knowledgeList'][id];
    var title = knowledge['title'];
    var content = knowledge['content'];
    var viewModel = {
        title: title,
        content: content
    };
    return viewModel;
};   