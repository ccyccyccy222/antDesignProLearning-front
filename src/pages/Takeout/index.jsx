import React, {useEffect, useState} from 'react';
import {Table, Tabs, Tag,Modal} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {getTakeoutList, updateTakeoutList} from "@/services/ant-design-pro/api";

const { TabPane } = Tabs;
const { confirm } = Modal;

// 打印现在是哪个tab
function callback(key) {
  // eslint-disable-next-line no-console
  console.log(key);
}

const filterData=(data,type)=>{
  let result=[]
  switch (type){
    case 0:
      // 表示接单列表
      result= data.filter(item=>item.state<2)
      break;
    case 1:
      // 表示已送出列表
      result= data.filter(item=>item.state>=2&&item.state<4)
      break;
    case 2:
      // 表示异常列表
      result= data.filter(item=>item.state>=4)
      break;
    default:
      break
  }
  return result
}

// 匹配菜品
const pickFood=(num)=>{
  let str;
  switch (num){
    case 1:
      str="番茄牛尾汤红酒牛肉面 x1";
      break;
    case 2:
      str="香辣火锅汤雪花肥牛面 x1";
      break;
    case 3:
      str="番茄香草汤半筋半肉面 x1";
      break;
    case 4:
      str="经典酸辣汤猪小排面 x1";
      break;
    case 5:
      str="大师素油拌面 x1";
      break;
    case 6:
      str="西北酱小排拌面 x1";
      break;
    case 7:
      str="老火油红酒牛肉拌面 x1";
      break;
    default:
      str="未知菜品";
      break;
  }
  return str;
}

// 处理订单
const disposeOrder=(list)=>{
  list.forEach(element=>{
    let str=element.order
    const strArray=str.split(",")
    str=''
    strArray.forEach((item)=>{
      // eslint-disable-next-line no-console
      // console.log(`${index}: ${item};`)
      // eslint-disable-next-line no-console
      // console.log(pickFood(Number(item)))
      str+=`${pickFood(Number(item))}\n`
    })
    // eslint-disable-next-line no-console
    // console.log(str)
    // eslint-disable-next-line no-param-reassign
    element.order=str
    // eslint-disable-next-line no-console
    // console.log("\n")
  })
}




const takeout = () => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [data, setData] = useState([])

  // eslint-disable-next-line react-hooks/rules-of-hooks,react-hooks/exhaustive-deps
  useEffect(async () => {
    const result = await getTakeoutList()
    // 处理订单
    disposeOrder(result)
    setData(result)
  }, [])



  const changeState= async (key,state)=>{
    // eslint-disable-next-line no-console
    console.log(key);
    // eslint-disable-next-line no-console
    console.log(state);
    const {code}=await updateTakeoutList({key, state})
    if(code===0){
      const result = await getTakeoutList()
      // 处理订单
      disposeOrder(result)
      setData(result)
      let content=''
      switch (state){
        case 1:
          content='接单成功'
          break
        case 2:
          content='送出成功'
          break
        default:
          break
      }
      Modal.success({
        content
      });
    }
  }


  function showConfirm(key,state,type) {
    // type=0表示接单及送出
    let title=''
    let newState=state
    switch (state){
      case 0:
        // eslint-disable-next-line no-param-reassign
        newState+=1
        title='确定接单？'
        break
      case 1:
        // eslint-disable-next-line no-param-reassign
        newState+=1
        title='确定已送出？'
        break
      case 4:
        switch (type){
          case 1:
        //    表示确定退款
            // eslint-disable-next-line no-param-reassign
            newState=5
            title='确定退款？'
            break
          case 2:
        //    表示取消退款
            // eslint-disable-next-line no-param-reassign
            newState=6
            title='确定不退款？'
            break
          default:
            break
        }
        break
      default:
        break
    }
    confirm({
      title,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        // eslint-disable-next-line no-console
        console.log('OK');
        changeState(key,newState)
      }
    });
  }

  const columnReceiving = [
    {title: '时间', dataIndex: 'date', key: 'date'},
    {
      title: '顾客', dataIndex: 'customer', key: 'customer',
    },
    {title: '平台', dataIndex: 'platform', key: 'platform'},
    {title: '订单', dataIndex: 'order', key: 'order'},
    {
      title: '状态', dataIndex: 'state', key: 'state',
      //  0表示待接单，1表示待送出，2表示已送出，3表示用户已收到,4表示用户申请退款且未处理，5表示用户申请退款且已处理
      render: (_,record) => {
        let color=''
        let content=''
        switch (record.state){
          case 0:
            color='gold'
            content='待接单'
            break
          case 1:
            color='lime'
            content='待送出'
            break
          default:
            break
        }
        return( <Tag color={color}>
          {content}</Tag>)
      },
    },
    {
      // title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_,record) =>{
        const {state} = record
        return(
          <a
            onClick={()=>showConfirm(record.key,record.state,0)}
          >
            {state>0?'点击送出':'点击接单'}</a>
        )
      } ,
    },
  ];

  const columnHistory = [
    {title: '时间', dataIndex: 'date', key: 'date'},
    {
      title: '顾客', dataIndex: 'customer', key: 'customer',
    },
    {title: '平台', dataIndex: 'platform', key: 'platform'},
    {title: '订单', dataIndex: 'order', key: 'order'},
    {
      title: '状态', dataIndex: 'state', key: 'state',
      //  0表示待接单，1表示待送出，2表示已送出，3表示用户已收到,4表示用户申请退款且未处理，5表示用户申请退款且已处理
      render: (_,record) => {
        let color=''
        let content=''
        switch (record.state){
          case 2:
            color='cyan'
            content='正在派送'
            break
          case 3:
            color='purple'
            content='已完成'
            break
          default:
            break
        }
        return( <Tag color={color}>
          {content}</Tag>)
      },
    },
    {title: '评价', dataIndex: 'comment', key: 'comment',
    render:(_,record)=>{
      return(<div>{record.comment===''?"无":record.comment}</div>)
    }},
  ];

  const columnError = [
    {title: '时间', dataIndex: 'date', key: 'date'},
    {
      title: '顾客', dataIndex: 'customer', key: 'customer',
    },
    {title: '平台', dataIndex: 'platform', key: 'platform'},
    {title: '订单', dataIndex: 'order', key: 'order'},
    {title: '取消订单原因', dataIndex: 'refundReason', key: 'refundReason',
      render:(_,record)=>{
        return(<div>{record.refundReason===''?"无":record.refundReason}</div>)
      }},
    {
      title: '退款处理', dataIndex: 'state', key: 'state',
      //  0表示待接单，1表示待送出，2表示已送出，3表示用户已收到，4表示用户申请退款且未处理，5表示用户申请退款且已退款,，6表示用户申请退款但不退款
      render: (_,record) => {
        let result=(<p>state error</p>)
        if(record.state===4){
          result=(<div>
            <a style={{marginRight:15}} onClick={()=>showConfirm(record.key,record.state,1)}>确认退款</a>
            <a onClick={()=>showConfirm(record.key,record.state,2)}>取消退款</a>
          </div>)
        }else if(record.state===5){
            result=(<p>已退款</p>)
        }else if(record.state===6){
          result=(<p>已取消退款</p>)
        }
        return result
      },
    },
  ];

  return (
    <Tabs defaultActiveKey="1" onChange={callback}>

      <TabPane tab="外卖接单" key="1">
        <Table
          columns={columnReceiving}
          dataSource={filterData(data,0).sort((a, b)=> {
            return a.state - b.state;
          })}
          style={{whiteSpace:'pre'}}
        />
      </TabPane>

      <TabPane tab="历史记录" key="2">
        <Table
          columns={columnHistory}
          dataSource={filterData(data,1).sort((a, b)=> {
            return a.state - b.state;
          })}
          style={{whiteSpace:'pre'}}
        />
      </TabPane>
      <TabPane tab="异常处理" key="3">
        <Table
          columns={columnError}
          dataSource={filterData(data,2).sort((a, b)=> {
            return a.state - b.state;
          })}
          style={{whiteSpace:'pre'}}
        />
      </TabPane>
    </Tabs>
  );
};

export default takeout;
