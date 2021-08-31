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
      result= data.filter(item=>item.state>=2)
      break;
    default:
      break
  }
  return result
}


const takeout = () => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [data, setData] = useState([])

  // eslint-disable-next-line react-hooks/rules-of-hooks,react-hooks/exhaustive-deps
  useEffect(async () => {
    const result = await getTakeoutList()
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

  function showConfirm(key,state) {
    let title=''
    switch (state){
      case 0:
        title='确定接单？'
        break
      case 1:
        title='确定已送出？'
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
        changeState(key,state+1)
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
      //  0表示待接单，1表示待送出，2表示已送出，3表示用户已收到
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
            onClick={()=>showConfirm(record.key,record.state)}
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
      //  0表示待接单，1表示待送出，2表示已送出，3表示用户已收到
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
    {title: '评价', dataIndex: 'comment', key: 'comment'},
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
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
  );
};

export default takeout;
