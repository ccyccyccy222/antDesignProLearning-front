let list = [
  {
    key:1,
    date: '2021-08-24 23:12:01',
    waterUnit: 5,
    waterVolume: 100,
    waterAmount: 500,
    electricUnit: 1.2,
    electricVolume: 300,
    electricAmount: 360,
    gasUnit: 4,
    gasVolume: 6000,
    gasAmount: 24000,
    totalAmount: 24860//(24000+360+500=24860)
  },
  {
    key:2,
    date: '2021-07-24 23:12:01',
    waterUnit: 5,
    waterVolume: 100,
    waterAmount: 500,
    electricUnit: 1.2,
    electricVolume: 300,
    electricAmount: 360,
    gasUnit: 4,
    gasVolume: 7000,
    gasAmount: 28000,
    totalAmount: 28860//(28000+360+500=28860)
  }
]

export default {
  'GET /api/utilitiesList':(req,res)=>{
    res.send(list)
  },
  'PUT /api/updateUtilitiesList':(req,res)=>{
    //0表示是添加，1表示是修改
    let requestType=0
    const date=new Date().Format("yyyy-MM-dd hh:mm:ss")
    //  修改
    const index=list.findIndex((item)=>{
      return item.date===req.body.date
    })
    if(index===-1){
      //  没有这个项，相当于新建
      const item={
        key:list.length+1,
        date:date,
        ...req.body,
      }
      list.push(item)
    }
    else {
      requestType=1

      for(let i in list[index]) {
        if (list[index][i] !== req[i]&&req.body[i]!==undefined) {
          list[index][i] = req.body[i]
          list[index].date=date
        }
      }

    }
    res.send({
      requestType:requestType,
      list:list
    })
  },
  'POST /api/addUtilities':(req,res)=>{
    const date=new Date().Format("yyyy-MM-dd hh:mm:ss")
    let item=req.body
    item.date=date
    item.key=list.length+1
    list.push(item)
    res.send({
      requestType:0,
      list:list
    })
  }
}
