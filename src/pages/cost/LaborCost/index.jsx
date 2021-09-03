import React, {useState} from 'react';
import {Button, Form, Input, InputNumber, Modal, Select, Table,Radio} from 'antd';
import useForm from "antd/es/form/hooks/useForm";
import styles from "@/pages/Material/index.less";

const {Search} = Input;
const {Option} = Select;

const formItemLayout = {
  // labelCol: {span: 6},
  // wrapperCol: {span: 14},
  // 标签宽度
  labelCol: {span: 6},
  // 内容框宽度
  wrapperCol: {span: 13},
};

const laborCost = () => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form] = useForm();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isModalVisible, setIsModalVisible] = useState(false);


  // 处理模态框
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // 返回执行结果
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


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
      filters: [
        {
          text: '服务员',
          value: '服务员'
        },
        {
          text: '总经理',
          value: '总经理'
        },
        {
          text: '后堂经理',
          value: '后堂经理'
        },
        {
          text: '厨师',
          value: '厨师'
        },
        {
          text: '前台经理',
          value: '前台经理'
        },
        {
          text: '前台收银',
          value: '前台收银'
        },
        {
          text: '洗碗工',
          value: '洗碗工'
        },
        {
          text: '财务经理',
          value: '财务经理'
        },
        {
          text: '采购员',
          value: '采购员'
        }
      ],
      onFilter: (value, record) => record.position.indexOf(value) === 0
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
          title: '社保',
          dataIndex: 'socialSecurity',
          key: 'socialSecurity',
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
          title: '其他',
          dataIndex: 'otherOff',
          key: 'otherOff',
        },
      ],
    },
    {
      title: '总工资',
      dataIndex: 'totalSalary',
      key: 'totalSalary',
    },
    {
      title: '应到账工资',
      dataIndex: 'handSalary',
      key: 'handSalary',
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
        form.setFieldsValue(record)
        showModal()
      }}>
        更新</a>,
    },
  ];

  const data = [];
  for (let i = 1; i < 20; i += 1) {
    let id
    if(i<10) {
      id=`00000${i}`
    }
    else id=`0000${i}`
     const name=`ccy${i}`
    data.push({
      key:i,
      laborId:id,
      name,
      position:'服务员',
      baseSalary:3000,
      overTimeAllowance:0,
      mealAllowance:800,
      otherAllowance:0,
      socialSecurity:150,
      timeOff:0,
      otherOff:0,
      totalSalary:3950,
      handSalary:3000,
      toAccount:false,
      updateTime:'2021-8-24 23:12:01'
    });
  }

  return (
    <div>
      <div className={styles.tableHead}>
        <Search placeholder="请输入查询的员工姓名"
                enterButton
                // onChange={inputChange}
                style={{width: 300, marginRight: 15}}/>
        <Button type="primary" onClick={() =>
        {
          const record={
            name:'',
            type:'',
            unit:'',
            remaining:0
          }
          form.setFieldsValue(record)
          showModal()
        }}>添加员工</Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        size="middle"
      />,
      <Modal title="修改" visible={isModalVisible}
             onOk={handleOk} onCancel={handleCancel}
             width={500}
             bodyStyle={{padding: 20}}>
        <Form
          form={form}
          name="form"
          {...formItemLayout}
          // onFinish={handleOk}
        >
          <Form.Item
            name="laborId"
            label="员工编号"
            rules={[
              {
                required: true,
                message: '请输入员工编号',
              },
            ]}
          >
            <Input placeholder="请输入员工编号"/>
          </Form.Item>
          <Form.Item
            name="name"
            label="姓名"
            rules={[
              {
                required: true,
                message: '请输入员工姓名',
              },
            ]}
          >
            <Input placeholder="请输入员工姓名"/>
          </Form.Item>

          <Form.Item
            name="type"
            label="职位"
            hasFeedback
            rules={[{required: true, message: '请选择员工职位'}]}
          >
            <Select placeholder="请选择员工职位">
              <Option value='服务员'>服务员</Option>
              <Option value="总经理">总经理</Option>
              <Option value='后堂经理'>后堂经理</Option>
              <Option value="厨师">厨师</Option>
              <Option value="前台经理">前台经理</Option>
              <Option value="前台收银">前台收银</Option>
              <Option value="洗碗工">洗碗工</Option>
              <Option value="财务经理">财务经理</Option>
              <Option value="采购员">采购员</Option>
            </Select>
          </Form.Item>

          <Form.Item label="基本工资" name="baseSalary"
                     rules={[{required: true, message: '请输入基本工资'}]}>
            <InputNumber min={0} max={1000000}/>
          </Form.Item>

          <Form.Item label="加班补贴" name="overTimeAllowance"
                     rules={[{required: true, message: '请输入加班补贴'}]}>
            <InputNumber min={0} max={1000000}/>
          </Form.Item>

          <Form.Item label="餐补" name="mealAllowance"
                     rules={[{required: true, message: '请输入餐补'}]}>
            <InputNumber min={0} max={1000000}/>
          </Form.Item>

          <Form.Item label="社保" name="baseSalary" rules={[{required: true, message: '请输入社保'}]}>
            <InputNumber min={0} max={1000000}/>
          </Form.Item>

          <Form.Item label="其他补贴" name="socialSecurity"
                     rules={[{required: true, message: '请输入其他补贴'}]}>
            <InputNumber min={0} max={1000000}/>
          </Form.Item>

          <Form.Item label="请假扣款"  name="timeOff"
                     rules={[{required: true, message: '请输入请假扣款'}]}>
            <InputNumber min={0} max={1000000}/>
          </Form.Item>

          <Form.Item label="其他扣款"  name="otherOff"
                     rules={[{required: true, message: '请输入其他扣款'}]}>
            <InputNumber min={0} max={1000000}/>
          </Form.Item>

          <Form.Item label="总工资" name="totalSalary"
                     rules={[{required: true, message: '请输入总工资'}]}>
            <InputNumber min={0} max={1000000}/>
          </Form.Item>

          <Form.Item label="应入账工资" name="handSalary"
                     rules={[{required: true, message: '请输入应入账工资'}]}>
            <InputNumber min={0} max={1000000}/>
          </Form.Item>

          <Form.Item label="是否已入账" name="toAccount"
                     rules={[{required: true}]}>
            <Radio.Group>
              <Radio value={true}>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>
          </Form.Item>

        </Form>
      </Modal>
    </div>
  );
};

export default laborCost;
