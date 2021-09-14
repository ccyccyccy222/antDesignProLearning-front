import React, {useEffect, useState} from 'react';
import {Button, DatePicker, Form, InputNumber, Modal, Table} from 'antd';
import useForm from "antd/es/form/hooks/useForm";
import styles from "@/pages/Material/index.less";
import {
  getUtilitiesList,
  updateUtilitiesList
} from "@/services/ant-design-pro/api";


const formItemLayout = {
  // labelCol: {span: 6},
  // wrapperCol: {span: 14},
  // 标签宽度
  labelCol: {span: 15},
  // 内容框宽度
  wrapperCol: {span: 3},
};


const utilities = () => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form] = useForm();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isModalVisible, setIsModalVisible] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [data, setData] = useState([])
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedDate, setSelectedDate] = useState('')
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentID, setCurrentID] = useState(0)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const [waterUnit, setWaterUnit] = useState(0)
  // // eslint-disable-next-line react-hooks/rules-of-hooks
  // const [waterVolume, setWaterVolume] = useState(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [waterAmount, setWaterAmount] = useState(0)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [electricAmount, setElectricAmount] = useState(0)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [gasAmount, setGasAmount] = useState(0)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [totalAmount, setTotalAmount] = useState(0)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [item, setItem] = useState({})

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [ifFilter, setIfFilter] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [filterData, setFilterData] = useState(data);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [ifAdd, setIfAdd] = useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks,react-hooks/exhaustive-deps
  useEffect(async () => {
    const result = await getUtilitiesList()
    setData(result)
  }, [])

  // 更新列表
  const updateList = async (values) => {
    // const res = ifAdd?await addUtilities(values):await updateUtilitiesList(values)
    // 调用service中的方法，修改状态，返回修改后的数组
    // const res = await updateUtilitiesList(values)
    const res=await updateUtilitiesList(values)
    const result = await getUtilitiesList()
    setData(result)
    // setData(res.list)
    return res
  }

  // 自动计算费用
  const sumEachAmount=(unit,volume)=>{
    const amout=unit*volume
    return amout
  }

  // 自动计算总费用
  const sumTotal=(water,electric,gas)=>{
    return water+electric+gas
  }

  // 日期选择
  const onChange=(date,dateString)=> {
    // eslint-disable-next-line no-console
    console.log(date)
    // eslint-disable-next-line no-console
    console.log(dateString)
    setIfFilter(true)
    const arr=[]
    for(let i=0;i<data.length;i+=1){
      if(data[i].date.indexOf(dateString)>=0){
        arr.push(data[i]);
      }
    }
    setFilterData(arr)
  }


  // 处理模态框
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    let formValue;
    form.validateFields().then(value => {
      // eslint-disable-next-line no-console
      console.log("value :", value)
      formValue = value
      updateList({currentID,...formValue}).then(res => {
        let content = ''
        // eslint-disable-next-line default-case
        switch (res.requestType) {
          case 0:
            //    添加
            content = '添加成功'
            break
          case 1:
            content = '修改成功'
            break
        }
        Modal.success({
          content,
        })
      })

    });
    // 返回执行结果
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '水费',
      children: [
        {
          title: '单价(单位：元)',
          dataIndex: 'waterUnit',
          key: 'waterUnit',
        },
        {
          title: '用量(单位：吨)',
          dataIndex: 'waterVolume',
          key: 'waterVolume',
        },
        {
          title: '总价(单位：元)',
          dataIndex: 'waterAmount',
          key: 'waterAmount',
        }
      ],
    },
    {
      title: '电费',
      children: [
        {
          title: '单价(单位：元)',
          dataIndex: 'electricUnit',
          key: 'electricUnit',
        },
        {
          title: '用量(单位：度)',
          dataIndex: 'electricVolume',
          key: 'electricVolume',
        },
        {
          title: '总价(单位：元)',
          dataIndex: 'electricAmount',
          key: 'electricAmount',
        }
      ],
    },
    {
      title: '煤气费',
      children: [
        {
          title: '单价(单位：元)',
          dataIndex: 'gasUnit',
          key: 'gasUnit',
        },
        {
          title: '用量(单位：立方米)',
          dataIndex: 'gasVolume',
          key: 'gasVolume',
        },
        {
          title: '总价(单位：元)',
          dataIndex: 'gasAmount',
          key: 'gasAmount',
        }
      ],
    },
    {
      title: '总价',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
    },
    {
      // title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_, record) => <a onClick={() => {
        // eslint-disable-next-line no-console
        console.log(record)
        setIfAdd(false)
        setItem(record)
        setWaterAmount(record.waterAmount)
        setGasAmount(record.gasAmount)
        setElectricAmount(record.electricAmount)
        setSelectedDate(record.date)
        setTotalAmount(record.totalAmount)
        setCurrentID(record.key)
        form.setFieldsValue(record)
        showModal()
      }}>
        更新</a>,
    },
  ];

  return (
    <div>
      <div className={styles.tableHead}>
        <DatePicker onChange={onChange} picker="month"  style={{marginRight: 15}}/>
        <Button type="primary" onClick={() => {
          // setIfAdd(true)
          setCurrentID(data.length+1)
          const record = {
            key:currentID,
            date: '',
            waterUnit: 0,
            waterVolume: 0,
            waterAmount: 0,
            electricUnit: 0,
            electricVolume: 0,
            electricAmount: 0,
            gasUnit: 0,
            gasVolume: 0,
            gasAmount: 0,
            totalAmount: 0
          }
          setIfAdd(true)
          setItem(record)
          setWaterAmount(record.waterAmount)
          setGasAmount(record.gasAmount)
          setElectricAmount(record.electricAmount)
          setSelectedDate(record.date)
          setTotalAmount(record.totalAmount)
          form.setFieldsValue(record)
          showModal()
        }}>添加</Button>
      </div>
      <Table
        columns={columns}
        dataSource={ifFilter?filterData:data}
        bordered
        size="middle"
      />,
      <Modal title={ifAdd?"添加":"修改"} visible={isModalVisible}
             onOk={handleOk} onCancel={handleCancel}
             width={400}
             bodyStyle={{display:'flex',justifyContent:"center"}}>
        <Form
          form={form}
          name="form"
          {...formItemLayout}
          style={{whiteSpace: 'pre',textAlign:'center'}}
          // onFinish={handleOk}
        >

          {/* <Form.Item */}
          {/*  // name="label4" */}
          {/* > */}
          {/*  <span className="ant-form-text">{`上次更新时间:  ${selectedDate}`}</span> */}
          {/* </Form.Item> */}

          <Form.Item
            name="date"
            hidden={true}
          >
            {/* {selectedDate} */}
            <span className="ant-form-text">{selectedDate}</span>
          </Form.Item>

          <Form.Item
            // name="label1"
          >
            <span className="ant-form-text">水费</span>
          </Form.Item>
          <Form.Item
            name="waterUnit"
            label="单价(单位：元)"
            rules={[
              {
                required: true
              },
            ]}
          >
            <InputNumber min={0} max={1000000} onChange={(value)=>{
              item.waterUnit=value
              item.waterAmount=sumEachAmount(value,item.waterVolume)
              item.totalAmount=sumTotal(item.waterAmount,item.electricAmount,item.gasAmount)
              form.setFieldsValue(item)
              setWaterAmount(item.waterAmount)
              setTotalAmount(item.totalAmount)
              // setItem(item)
            }}/>
          </Form.Item>

          <Form.Item
            name="waterVolume"
            label="用量(单位：吨)"
            rules={[
              {
                required: true
              },
            ]}
          >
            <InputNumber min={0} max={1000000} onChange={(value)=>{
              item.waterVolume=value
              item.waterAmount=sumEachAmount(item.waterUnit,value)
              item.totalAmount=sumTotal(item.waterAmount,item.electricAmount,item.gasAmount)
              form.setFieldsValue(item)
              setWaterAmount(item.waterAmount)
              setTotalAmount(item.totalAmount)
            }}/>
          </Form.Item>

          <Form.Item
            name="waterAmount"
            label="总价(单位：元)"
          >
            {/* <InputNumber min={0} max={1000000}/> */}
             <span className="ant-form-text">{waterAmount}</span>
          </Form.Item>

          <br/>

          <Form.Item
            // name="label2"
          >
            <span className="ant-form-text">电费</span>
          </Form.Item>
          <Form.Item
            name="electricUnit"
            label="单价(单位：元)"
            rules={[
              {
                required: true
              },
            ]}
          >
            <InputNumber min={0} max={1000000} onChange={(value)=>{
              item.electricUnit=value
              item.electricAmount=sumEachAmount(value,item.electricVolume)
              item.totalAmount=sumTotal(item.waterAmount,item.electricAmount,item.gasAmount)
              form.setFieldsValue(item)
              setElectricAmount(item.electricAmount)
              setTotalAmount(item.totalAmount)
            }}/>
          </Form.Item>

          <Form.Item
            name="electricVolume"
            label="用量(单位：度)"
            rules={[
              {
                required: true
              },
            ]}
          >
            <InputNumber min={0} max={1000000} onChange={(value)=>{
              item.electricVolume=value
              item.electricAmount=sumEachAmount(item.electricUnit,value)
              item.totalAmount=sumTotal(item.waterAmount,item.electricAmount,item.gasAmount)
              form.setFieldsValue(item)
              setElectricAmount(item.electricAmount)
              setTotalAmount(item.totalAmount)
            }}/>
          </Form.Item>

          <Form.Item
            name="electricAmount"
            label="总价(单位：元)"
            rules={[
              {
                required: true
              },
            ]}
          >
            <span className="ant-form-text">{electricAmount}</span>
          </Form.Item>

          <Form.Item
            // name="label3"
          >
            <span className="ant-form-text">煤气费</span>
          </Form.Item>
          <Form.Item
            name="gasUnit"
            label="单价(单位：元)"
            rules={[
              {
                required: true
              },
            ]}
          >
            <InputNumber min={0} max={1000000} onChange={(value)=>{
              item.gasUnit=value
              item.gasAmount=sumEachAmount(value,item.gasVolume)
              item.totalAmount=sumTotal(item.waterAmount,item.electricAmount,item.gasAmount)
              form.setFieldsValue(item)
              setGasAmount(item.gasAmount)
              setTotalAmount(item.totalAmount)
            }}/>
          </Form.Item>

          <Form.Item
            name="gasVolume"
            label="用量(单位：立方米)"
            rules={[
              {
                required: true
              },
            ]}
          >
            <InputNumber min={0} max={1000000} onChange={(value)=>{
              item.gasVolume=value
              item.gasAmount=sumEachAmount(item.gasUnit,value)
              item.totalAmount=sumTotal(item.waterAmount,item.electricAmount,item.gasAmount)
              form.setFieldsValue(item)
              setGasAmount(item.gasAmount)
              setTotalAmount(item.totalAmount)
            }}/>
          </Form.Item>

          <Form.Item
            name="gasAmount"
            label="总价(单位：元)"
          >
            <span className="ant-form-text">{gasAmount}</span>
          </Form.Item>

          <Form.Item
            name="label4"
          >
            <span className="ant-form-text">总价</span>
          </Form.Item>
          <Form.Item
            name="totalAmount"
            label="总价(单位：元)"
            rules={[
              {
                required: true
              },
            ]}
          >
            <span className="ant-form-text">{totalAmount}</span>
          </Form.Item>


        </Form>
      </Modal>
    </div>
  );
};

export default utilities;
