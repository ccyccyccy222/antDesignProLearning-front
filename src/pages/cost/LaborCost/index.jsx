import React, {useEffect, useState} from 'react';
import {Button, Form, Input, InputNumber, Modal, Select, Table, Radio} from 'antd';
import useForm from "antd/es/form/hooks/useForm";
import styles from "@/pages/Material/index.less";
import {getLaborList, updateLaborList} from "@/services/ant-design-pro/api";

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

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [laborId, setLaborId] = useState('000021');
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [baseSalary, setBaseSalary] = useState(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [timeOff, setTimeOff] = useState(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [otherOff, setOtherOff] = useState(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [handSalary, setHandSalary] = useState(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [overTimeAllowance, setOverTimeAllowance] = useState(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [socialSecurity, setSocialSecurity] = useState(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [mealAllowance, setMealAllowance] = useState(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [otherAllowance, setOtherAllowance] = useState(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [totalSalary, setTotalSalary] = useState(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [data, setData] = useState([])

  // eslint-disable-next-line react-hooks/rules-of-hooks,react-hooks/exhaustive-deps
  useEffect(async () => {
    const result = await getLaborList()
    setData(result)
  }, [])

  // 自动计算总工资
  const sumTotalSalary=(a,b,c,d)=>{
    //  应到账工资+餐补+社保+其他补贴
    // eslint-disable-next-line no-console
    console.log("handSalary:", a, ";mealAllowance:", b, ";socialSecurity:", c,';otherAllowance:',d)
    const newTotalSalary=a+b+c+d
    form.setFieldsValue({"totalSalary": newTotalSalary})
    setTotalSalary(newTotalSalary)
  }

  // 自动计算应到账工资
  const sumHandSalary = (a, b, c,d) => {
    //  基本工资-扣款项+加班补贴
    // eslint-disable-next-line no-console
    console.log("baseSalary:", a, ";timeOff:", b, ";otherOff:", c,";overTimeAllowance:",d)
    const newHandSalary = a - b - c+d
    sumTotalSalary(newHandSalary,mealAllowance,socialSecurity,otherAllowance)
    form.setFieldsValue({"handSalary": newHandSalary})
    setHandSalary(newHandSalary)
  }


  // 更新列表
  const updateList=async (values)=>{
    // 调用service中的方法，修改状态，返回修改后的数组
    const res=await updateLaborList(values)
    setData(res.list)
    return res
  }

  // 处理模态框
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    let formValue;
    form.validateFields().then(value => {
      // eslint-disable-next-line no-console
      console.log("value :",value)
      formValue=value
      updateList(formValue).then(res=>{
        let content=''
        // eslint-disable-next-line default-case
        switch (res.requestType){
          case 0:
            //    添加
            content='添加成功'
            break
          case 1:
            content='修改成功'
            break
        }
        Modal.success({
          content,
        })
      } )

    });
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
      sorter: (a, b) => {
        return a.baseSalary-b.baseSalary
      },
      sortDirections: ['descend','ascend'],
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
      sorter: (a, b) => {
        return a.totalSalary-b.totalSalary
      },
      sortDirections: ['descend','ascend'],
    },
    {
      title: '应到账工资',
      dataIndex: 'handSalary',
      key: 'handSalary',
      sorter: (a, b) => {
        return a.handSalary-b.handSalary
      },
      sortDirections: ['descend','ascend'],
    },
    {
      title: '是否入账',
      dataIndex: 'toAccount',
      key: 'toAccount',
      filters: [
        {
          text: '是',
          value: true
        },
        {
          text: '否',
          value: false
        }
      ],
      onFilter: (value, record) => record.toAccount===value,
      render: (_, record) => {
        return (record.toAccount === true ? '是' : '否')
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      sorter: (a, b) => {
        const aDate = new Date(a.updateTime)
        const bDate = new Date(b.updateTime)
        if (aDate > bDate) return 1
        return -1
      },
      sortDirections: ['descend','ascend'],
    },
    {
      // title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_, record) => <a onClick={() => {
        // eslint-disable-next-line no-console
        console.log(record)
        setMealAllowance(record.mealAllowance)
        setSocialSecurity(record.socialSecurity)
        setOtherAllowance(record.otherAllowance)
        setOverTimeAllowance(record.overTimeAllowance)
        setTotalSalary(record.totalSalary)
        setBaseSalary(record.baseSalary)
        setTimeOff(record.timeOff)
        setOtherOff(record.otherOff)
        setHandSalary(record.handSalary)
        form.setFieldsValue(record)
        showModal()
      }}>
        更新</a>,
    },
  ];

  return (
    <div>
      <div className={styles.tableHead}>
        <Search placeholder="请输入查询的员工姓名"
                enterButton
          // onChange={inputChange}
                style={{width: 300, marginRight: 15}}/>
        <Button type="primary" onClick={() => {
          const record = {
            laborId:`0000${data.length+1}`,
            name:'',
            position:'',
            baseSalary:0,
            overTimeAllowance:0,
            mealAllowance:0,
            socialSecurity:0,
            otherAllowance:0,
            timeOff:0,
            otherOff:0,
            totalSalary:0,
            handSalary:0,
            toAccount:false,
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
          style={{whiteSpace:'pre'}}
          // onFinish={handleOk}
        >
          <Form.Item
            name="laborId"
            label="员工编号"
          >
            <span className="ant-form-text">{laborId}</span>
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
            name="position"
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
            <InputNumber min={0} max={1000000}
                         onChange={(value) => {
                           setBaseSalary(value)
                           sumHandSalary(value, timeOff, otherOff,overTimeAllowance)
                         }}/>
          </Form.Item>

          <Form.Item label="加班补贴" name="overTimeAllowance"
                     rules={[{required: true, message: '请输入加班补贴'}]}>
            <InputNumber min={0} max={1000000} onChange={(value) => {
              setOverTimeAllowance(value)
              sumHandSalary(baseSalary, timeOff, otherOff,value)
            }}/>
          </Form.Item>

          <Form.Item label="餐补" name="mealAllowance"
                     rules={[{required: true, message: '请输入餐补'}]}>
            <InputNumber min={0} max={1000000}
                         onChange={(value) => {
                           setMealAllowance(value)
                           sumTotalSalary(handSalary, value, socialSecurity,otherAllowance)
                         }}/>
          </Form.Item>

          <Form.Item label="社保" name="socialSecurity" rules={[{required: true, message: '请输入社保'}]}>
            <InputNumber min={0} max={1000000}
                         onChange={(value) => {
                           setSocialSecurity(value)
                           sumTotalSalary(handSalary, mealAllowance, value,otherAllowance)
                         }}/>
          </Form.Item>

          <Form.Item label="其他补贴" name="otherAllowance"
                     rules={[{required: true, message: '请输入其他补贴'}]}>
            <InputNumber min={0} max={1000000}
                         onChange={(value) => {
                           setOtherAllowance(value)
                           sumTotalSalary(handSalary, mealAllowance, socialSecurity,value)
                         }}/>
          </Form.Item>

          <Form.Item label="请假扣款" name="timeOff"
                     rules={[{required: true, message: '请输入请假扣款'}]}>
            <InputNumber min={0} max={1000000}
                         onChange={(value) => {
                           setTimeOff(value)
                           sumHandSalary(baseSalary, value, otherOff,overTimeAllowance)
                         }}/>
          </Form.Item>

          <Form.Item label="其他扣款" name="otherOff"
                     rules={[{required: true, message: '请输入其他扣款'}]}>
            <InputNumber min={0} max={1000000}
                         onChange={(value) => {
                           setOtherOff(value)
                           sumHandSalary(baseSalary, timeOff, value,overTimeAllowance)
                         }}/>
          </Form.Item>

          <Form.Item label="总工资" name="totalSalary">
            <span className="ant-form-text">{`${totalSalary}\t（基本工资+所有补贴-所有扣款）`}</span>
          </Form.Item>

          <Form.Item label="应入账工资:" name="handSalary">
            {/* {`应入账工资:${handSalary}(基本工资-扣款项+加班补贴)`} */}
            <span className="ant-form-text">{`${handSalary}\t（基本工资-请假扣款-其他扣款+加班补贴）`}</span>
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
