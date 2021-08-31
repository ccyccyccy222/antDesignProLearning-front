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


const takeout = () => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [data, setData] = useState([])

  // eslint-disable-next-line react-hooks/rules-of-hooks,react-hooks/exhaustive-deps
  useEffect(async () => {
    const result = await getTakeoutList()
    setData(result)
  }, [])

  // function showConfirm(state) {
  //   let title=''
  //   switch (state){
  //     case 0:
  //       title='确定接单？'
  //       break
  //     case 1:
  //       title='确定已送出？'
  //       break
  //     default:
  //       break
  //   }
  //   confirm({
  //     title,
  //     icon: <ExclamationCircleOutlined />,
  //     onOk() {
  //       // eslint-disable-next-line no-console
  //       console.log('OK');
  //     }
  //   });
  // }

  const changeState= async (key,state)=>{
    // eslint-disable-next-line no-console
    console.log(key);
    // eslint-disable-next-line no-console
    console.log(state);
    const {code,message}=await updateTakeoutList({key, state})
    if(code===0){
      const result = await getTakeoutList()
      setData(result)
      Modal.success({
        content:message,
      });
    }
  }

  const columns = [
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
            onClick={()=>changeState(record.key,record.state+1)}
          >
            {state>0?'点击送出':'点击接单'}</a>
        )
      } ,
    },
  ];


  return (
    <Tabs defaultActiveKey="1" onChange={callback}>

      <TabPane tab="外卖接单" key="1">
        <Table
          columns={columns}
          dataSource={data}
          style={{whiteSpace:'pre'}}
        />
      </TabPane>

      <TabPane tab="历史记录" key="2">
        Content of Tab Pane 2
      </TabPane>
      <TabPane tab="异常处理" key="3">
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
  );
};

export default takeout;
