let initialData=[
  {
    key:1,
    date:'2021-8-24 23:12:01',
    customer:'ccyccyccy222',
    platform:'美团',
    order:'番茄牛尾汤红酒牛肉面 x1',
    state:0,
    comment:''
  },
  {
    key:2,
    date:'2021-8-24 23:12:01',
    customer:'xiaoMing',
    platform:'饿了么',
    order:'番茄牛尾汤红酒牛肉面 x1',
    state:0,
    comment: ''
  },
  {
    key:3,
    date:'2021-8-24 23:12:01',
    customer:'xiaoHong',
    platform:'美团',
    order:'番茄牛尾汤红酒牛肉面 x1\n经典酸辣汤猪小排面 x1',
    state:0,
    comment: ''
  },
  {
    key:4,
    date:'2021-8-24 23:12:01',
    customer:'Jack',
    platform:'美团',
    order:'经典酸辣汤猪小排面 x1',
    state:2,
    comment: ''
  },
  {
    key:5,
    date:'2021-8-24 23:12:01',
    customer:'xiaoDong',
    platform:'饿了么',
    order:'经典酸辣汤猪小排面 x1',
    state:3,
    comment: '非常非常非常好吃！根本停不下来~'
  },
  {
    key:6,
    date:'2021-8-24 23:12:01',
    customer:'xiaoFang',
    platform:'美团',
    order:'经典酸辣汤猪小排面 x1',
    state:3,
    comment: '非常好吃，点了好多次了，每天中午都吃这家~'
  },
  {
    key:7,
    date:'2021-8-24 23:12:01',
    customer:'xiaoYao',
    platform:'饿了么',
    order:'香辣火锅汤雪花肥牛面 x1',
    state:3,
    comment: '超级入味！强推！外卖包装得也很好，发得很快！'
  }
]

export default {
  'GET /api/takeoutList':initialData,
  'PUT /api/updateTakeoutList':(req,res)=>{
    const{key,state}=req.body
    //筛选列表进行修改
    initialData.map((item,index)=>{
      if(item.key===key) initialData[index].state= state
    //  也可以
    //   if(item.key===key) item.state=state
    //   return item
        })
    res.send({
      code:0
    })
  }
}
