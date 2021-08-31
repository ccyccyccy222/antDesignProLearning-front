let initialData=[
  {
    key:1,
    date:'2021-8-24 23:12:01',
    customer:'ccyccyccy222',
    platform:'美团',
    order:'番茄牛尾汤红酒牛肉面 x1',
    state:0
  },
  {
    key:2,
    date:'2021-8-24 23:12:01',
    customer:'xiaoMing',
    platform:'饿了么',
    order:'番茄牛尾汤红酒牛肉面 x1',
    state:0
  },
  {
    key:3,
    date:'2021-8-24 23:12:01',
    customer:'xiaoHong',
    platform:'美团',
    order:'番茄牛尾汤红酒牛肉面 x1\n经典酸辣汤猪小排面 x1',
    state:0
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
      code:0,
      message:'修改成功'
    })
  }
}
