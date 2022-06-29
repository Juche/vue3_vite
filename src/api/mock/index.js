import Mock from 'mockjs';

const Random = Mock.Random;

const testList1 = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|2-8': [
    {
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id|+1': 1,
    },
  ],
});

function testList2() {
  const monitorList = [];
  for (var i = 0; i < 3; i++) {
    monitorList.push(
      Mock.mock({
        userid: '25788869998_1562054852076593528',
        appid: Random.natural(100, 3000),
        content: Random.cparagraph(2, 4),
        timestamp: 1562054852,
      }),
    );
  }

  // 这里返回你想要的数据格式
  return {
    success: true,
    data: monitorList,
    message: '获取数据成功',
  };
}

// 以api路径为值，将testList函数暴露出去
// exports.user_info = testList;
export { testList1, testList2 };
