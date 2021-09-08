let list=  [
  //五谷杂粮类
  {
    key: 1,
    name: '高筋粉',
    type:'五谷杂粮',
    unit:'斤（50斤/袋）',
    unitPrice:'50',
    supplier:'上海市闵行区西西食品商行',
    //一个月大概用去10袋
    remaining: 500,
    date: '2021-8-24 23:12:01',
  },
  {
    key: 2,
    name: '鸡蛋',
    type:'五谷杂粮',
    unit:'斤（40斤/筐）',
    // unitPrice:'50',
    supplier:'上海市闵行区西西食品商行',
    //一个月大概用去240斤
    remaining: 240,
    date: '2021-8-24 23:12:01',
  },
  {
    key: 3,
    name: '黄豆',
    type:'五谷杂粮',
    unit:'斤（100斤/袋）',
    // unitPrice:'50',
    supplier:'上海市闵行区西西食品商行',
    //一个月大概用去30斤
    remaining: 30,
    date: '2021-8-24 23:12:01',
  },
  {
    key: 4,
    name: '花生米',
    type:'五谷杂粮',
    unit:'斤（100斤/袋）',
    // unitPrice:'50',
    supplier:'上海市闵行区西西食品商行',
    //一个月大概用去30斤
    remaining: 30,
    date: '2021-8-24 23:12:01',
  },

  //干货杂货类
  {
    key: 5,
    name: '干香菇',
    type:'干货杂货',
    unit:'斤（100斤/袋）',
    // unitPrice:'50',
    supplier:'上海市闵行区西西食品商行',
    //一个月大概用去30斤
    remaining: 30,
    date: '2021-8-24 23:12:01',
  },
  {
    key: 6,
    name: '黑木耳',
    type:'干货杂货',
    unit:'斤（100斤/袋）',
    // unitPrice:'50',
    supplier:'上海市闵行区西西食品商行',
    //一个月大概用去30斤
    remaining: 30,
    date: '2021-8-24 23:12:01',
  },
  {
    key: 7,
    name: '红枣',
    type:'干货杂货',
    unit:'斤（100斤/袋）',
    // unitPrice:'50',
    supplier:'上海市闵行区西西食品商行',
    //一个月大概用去30斤
    remaining: 30,
    date: '2021-8-24 23:12:01',
  },
  {
    key: 8,
    name: '桂圆',
    type:'干货杂货',
    unit:'斤（100斤/袋）',
    // unitPrice:'50',
    supplier:'上海市闵行区西西食品商行',
    //一个月大概用去30斤
    remaining: 30,
    date: '2021-8-24 23:12:01',
  },
  {
    key: 9,
    name: '海带',
    type:'干货杂货',
    unit:'斤（100斤/袋）',
    // unitPrice:'50',
    supplier:'上海市闵行区西西食品商行',
    //一个月大概用去30斤
    remaining: 30,
    date: '2021-8-24 23:12:01',
  },

  //肉类
  {
    key: 10,
    name: '五花肉',
    type:'肉',
    unit:'斤',
    // unitPrice:'50',
    supplier:'上海市闵行区西西食品商行',
    //一个月大概用去150斤
    remaining: 150,
    date: '2021-8-24 23:12:01',
  },
  {
    key: 11,
    name: '猪里脊',
    type:'肉',
    unit:'斤',
    // unitPrice:'50',
    supplier:'上海市闵行区西西食品商行',
    //一个月大概用去150斤
    remaining: 150,
    date: '2021-8-24 23:12:01',
  },
  {
    key: 12,
    name: '牛里脊',
    type:'肉',
    unit:'斤',
    // unitPrice:'50',
    supplier:'上海市闵行区西西食品商行',
    //一个月大概用去150斤
    remaining: 150,
    date: '2021-8-24 23:12:01',
  },

  //调味类
  {
    key: 13,
    name: '盐',
    type:'调味',
    unit:'斤',
    // unitPrice:'50',
    supplier:'上海市闵行区西西食品商行',
    //一个月大概用去600斤
    remaining: 600,
    date: '2021-8-24 23:12:01',
  },
  {
    key: 14,
    name: '鸡精',
    type:'调味',
    unit:'斤',
    // unitPrice:'50',
    supplier:'上海市闵行区西西食品商行',
    //一个月大概用去600斤
    remaining: 600,
    date: '2021-8-24 23:12:01',
  },
  {
    key: 15,
    name: '白醋',
    type:'调味',
    unit:'斤（1斤/瓶）',
    // unitPrice:'50',
    supplier:'上海市闵行区西西食品商行',
    //一个月大概用去100斤
    remaining: 100,
    date: '2021-8-24 23:12:01',
  },
  {
    key: 16,
    name: '生抽',
    type:'调味',
    unit:'斤（1斤/瓶）',
    // unitPrice:'50',
    supplier:'上海市闵行区西西食品商行',
    //一个月大概用去300斤
    remaining: 300,
    date: '2021-8-24 23:12:01',
  },

  //冻货
  {
    key: 17,
    name: '鸡腿',
    type:'冻货',
    unit:'斤',
    // unitPrice:'50',
    supplier:'上海市闵行区西西食品商行',
    //一个月大概用去150斤
    remaining: 150,
    date: '2021-8-24 23:12:01',
  },
  {
    key: 18,
    name: '翅根',
    type:'冻货',
    unit:'斤',
    // unitPrice:'50',
    supplier:'上海市闵行区西西食品商行',
    //一个月大概用去150斤
    remaining: 150,
    date: '2021-8-24 23:12:01',
  },
]

//日期格式化
Date.prototype.Format = function (fmt) { // author: meizz
  const o = {
    "M+": this.getMonth() + 1, // 月份
    "d+": this.getDate(), // 日
    "h+": this.getHours(), // 小时
    "m+": this.getMinutes(), // 分
    "s+": this.getSeconds(), // 秒
    "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
    "S": this.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

export default {
  'GET /api/materialList':(req,res)=>{
    res.send(list)
  },
  'PUT /api/updateMaterialList':(req,res)=>{
    //0表示是添加，1表示是修改
    let requestType=0
    const date=new Date().Format("yyyy-MM-dd hh:mm:ss")
    const{name,type,unit,remaining}=req.body
    //  修改
    const index=list.findIndex((item)=>{
      return item.name===name
    })
    if(index===-1){
    //  没有这个项，相当于新建
      const item={
        key:list.length+1,
        name:name,
        type:type,
        unit:unit,
        supplier:'上海市闵行区西西食品商行',
        remaining:remaining,
        date:date
      }
      list.push(item)
    }
    else {
      requestType=1

      for(let i in list[index]) {
        if (list[index][i] !== req[i]&&req.body[i]!==undefined) {
          // console.log("list[index][i]!==req.body[i]")
          // console.log(`list[index][${i}]:${list[index][i]};
          // req.body[${i}]:${req[i]}`)
          list[index][i] = req.body[i]
          list[index].date=date
        }
      }
    }
    res.send({
      requestType:requestType,
      // list:list
    })
  }
}
