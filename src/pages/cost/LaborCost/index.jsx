import React from 'react';
import {Form, Input, InputNumber, Modal, Select, Table} from 'antd';


const laborCost = () => {

  const columns = [
    {
      title: '员工编号',
      dataIndex: 'laborId',
      key: 'laborId',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '职位',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: '基本工资',
      dataIndex: 'baseSalary',
      key: 'baseSalary',
    },
    {
      title: '补贴项',
      children: [
        {
          title: '加班补贴',
          dataIndex: 'overTimeAllowance',
          key: 'overTimeAllowance',
        },
        {
          title: '餐补',
          dataIndex: 'mealAllowance',
          key: 'mealAllowance',
        },
        {
          title: '其他',
          dataIndex: 'otherAllowance',
          key: 'otherAllowance',
        },
      ],
    },
    {
      title: '扣款项',
      children: [
        {
          title: '请假',
          dataIndex: 'timeOff',
          key: 'timeOff',
        },
        {
          title: '社保',
          dataIndex: 'socialSecurity',
          key: 'socialSecurity',
        },
        {
          title: '其他',
          dataIndex: 'otherOff',
          key: 'otherOff',
        },
      ],
    },
    {
      title: '实发工资',
      dataIndex: 'realSalary',
      key: 'realSalary',
    },
    {
      title: '是否入账',
      dataIndex: 'toAccount',
      key: 'toAccount',
      render: (_, record) =>{return(record.toAccount===true?'是':'否')},
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      // title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_, record) => <a onClick={() => {
        // eslint-disable-next-line no-console
        console.log(record)
      }}>
        更新</a>,
    },
  ];

  const data = [];
  for (let i = 0; i < 20; i += 1) {
    data.push({
      laborId: i,
      name: '张小一',
      position: '服务员',
      baseSalary: 3000,
      overTimeAllowance: 0,
      mealAllowance: 0,
      otherAllowance: 0,
      timeOff: 0,
      socialSecurity: 0,
      otherOff: 0,
      realSalary: 3000,
      toAccount: false,
      updateTime: '2021-8-24 23:12:01'
    });
  }

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        size="middle"
      />,
    </div>
  );
};

export default laborCost;
