window.HandyHit = window.HandyHit || {};
window.HandyHit.data = window.HandyHit.data || {};

HandyHit.data.simpleData = {
    0: {
        categoryName: '学习',
        knowledgeList: [
            {
                id: 0,
                title: '澡堂开放时间',
                content: [
                    {isImage: false, content: '很多人都曾有过占座的经历。通常情况下，他们会选择在第一天晚上去教室占好第二天上午第一节课的座位，而在中午时占好下午的坐位。上课前，就算提前20分钟到教室，也会发现前5排已经“名花有主”了。有时候做清洁的阿姨为了杜绝这种占座行为，会把占座的书收起来堆到一块，但是这根本阻止不了同学们学习的热情。上完白天的课后，尽职尽责的班委还会组织全班同学在专教进行集体自习，一方面督促大家学习，另一方面也增进同学之间的感情。这也不失为集体活动的一种好方法。'},
                    {isImage: true, content: 'image/4_2.jpg'},
                    {isImage: false, content: '正心楼7层是一区考研专用教室，平时不上课，成为考研学子必争之地。每当四六级或是自主招生考试封楼时，又一次的占座大战硝烟即起。也许还能看到有抢先一步的人用卫生纸占上了一排位置。'},
                    {isImage: true, content: 'image/6_2.jpg'}
                ]
            },
            {
                id: 1,
                title: '食堂开放时间',
                content: [
                    {isImage: false, content: '很多人都曾有过占座的经历。通常情况下，他们会选择在第一天晚上去教室占好第二天上午第一节课的座位，而在中午时占好下午的坐位。上课前，就算提前20分钟到教室，也会发现前5排已经“名花有主”了。有时候做清洁的阿姨为了杜绝这种占座行为，会把占座的书收起来堆到一块，但是这根本阻止不了同学们学习的热情。上完白天的课后，尽职尽责的班委还会组织全班同学在专教进行集体自习，一方面督促大家学习，另一方面也增进同学之间的感情。这也不失为集体活动的一种好方法。'},
                    {isImage: true, content: 'image/4_2.jpg'},
                    {isImage: false, content: '正心楼7层是一区考研专用教室，平时不上课，成为考研学子必争之地。每当四六级或是自主招生考试封楼时，又一次的占座大战硝烟即起。也许还能看到有抢先一步的人用卫生纸占上了一排位置。'},
                    {isImage: true, content: 'image/6_2.jpg'}
                ]
            },
            {
                id: 2,
                title: '图书馆开放时间',
                content: [
                    {isImage: false, content: '很多人都曾有过占座的经历。通常情况下，他们会选择在第一天晚上去教室占好第二天上午第一节课的座位，而在中午时占好下午的坐位。上课前，就算提前20分钟到教室，也会发现前5排已经“名花有主”了。有时候做清洁的阿姨为了杜绝这种占座行为，会把占座的书收起来堆到一块，但是这根本阻止不了同学们学习的热情。上完白天的课后，尽职尽责的班委还会组织全班同学在专教进行集体自习，一方面督促大家学习，另一方面也增进同学之间的感情。这也不失为集体活动的一种好方法。'},
                    {isImage: true, content: '/image/4_2.jpg'},
                    {isImage: false, content: '正心楼7层是一区考研专用教室，平时不上课，成为考研学子必争之地。每当四六级或是自主招生考试封楼时，又一次的占座大战硝烟即起。也许还能看到有抢先一步的人用卫生纸占上了一排位置。'},
                    {isImage: true, content: '/image/6_2.jpg'}
                ]
            }
        ]
    },
    1: {
        categoryName: '生活',
        knowledgeList: []
    },
    2: {
        categoryName: '饮食',
        knowledgeList: []
    },
    3: {
        categoryName: '娱乐',
        knowledgeList: []
    }
};

HandyHit.data.categories = [];
for (var id in HandyHit.data.simpleData) {
    HandyHit.data.categories.push({id: id, name: HandyHit.data.simpleData[id]['categoryName']})
}