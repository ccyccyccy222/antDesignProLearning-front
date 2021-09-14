import {Button, Table, Input, Modal, Form, Select, InputNumber} from 'antd';
import styles from './index.less';
import React, {useEffect, useState} from "react";
import {getMaterialList, updateMaterialList} from "@/services/ant-design-pro/api";
import useForm from "antd/es/form/hooks/useForm";

const {Search} = Input;
const {Option} = Select;

const formItemLayout = {
  labelCol: {span: 6},
  wrapperCol: {span: 14},
};

// 模糊查询
const fuzzyQuery=(list,keyword)=>{
  const arr=[]
  for(let i=0;i<list.length;i+=1){
    if(list[i].name.indexOf(keyword)>=0){
      arr.push(list[i]);
    }
  }
  return arr;
}



const material = () => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form] = useForm();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [data, setData] = useState([])
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isModalVisible, setIsModalVisible] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [ifFilter, setIfFilter] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [filterData, setFilterData] = useState(data);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isUpdate, setIsUpdate] = useState(true);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentName, setCurrentName] = useState('');



  // eslint-disable-next-line react-hooks/rules-of-hooks,react-hooks/exhaustive-deps
  useEffect(async () => {
    const result = await getMaterialList()
    setData(result)
  }, [])

  // 更新列表
  const updateList=async (values)=>{
    // 调用service中的方法，修改状态，返回修改后的数组
    const res=await updateMaterialList(values)
    const result = await getMaterialList()
    setData(result)
    return res
  }

  // 处理查找

  const inputChange=(event)=>{
    // 使用过滤后的数据
    setIfFilter(true)
    const {value} = event.target
    if(value===''){
      setIfFilter(false)
      setFilterData(data)
    }else{
      //  进行模糊搜索
      const newData=fuzzyQuery(data,value)
      setFilterData(newData)
    }
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
    {title: '名称', dataIndex: 'name', key: 'name'},
    {
      title: '类别', dataIndex: 'type', key: 'type',
      filters: [
        {
          text: '五谷杂粮',
          value: '五谷杂粮'
        },
        {
          text: '干货杂货',
          value: '干货杂货'
        },
        {
          text: '肉',
          value: '肉'
        },
        {
          text: '调味',
          value: '调味'
        },
        {
          text: '冻货',
          value: '冻货'
        }
      ],
      onFilter: (value, record) => record.type.indexOf(value) === 0
    },
    {title: '单位', dataIndex: 'unit', key: 'unit'},
    {title: '现库存', dataIndex: 'remaining', key: 'remaining'},
    {
      title: '更新时间', dataIndex: 'date', key: 'date',
      sorter: (a, b) => {
        const aDate = new Date(a.date)
        const bDate = new Date(b.date)
        if (aDate > bDate) return 1
        return -1
      },
      sortDirections: ['descend','ascend'],
      // defaultSortOrder:'descend'
    },
    {
      // title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_,record) => <a onClick={() =>
      {
        // eslint-disable-next-line no-console
        console.log(record)
        setIsUpdate(true)
        setCurrentName(record.name)
        form.setFieldsValue(record)
        showModal()
      }}>
        更新</a>,
    },
  ];


  return (
    <div className={styles.container}>
      <div className={styles.tableHead}>
        <Search placeholder="请输入查询的材料名"
                enterButton
                onChange={inputChange}
                style={{width: 300, marginRight: 15}}/>
        <Button type="primary" onClick={() =>
        {
          setIsUpdate(false)
          const record={
            name:'',
            type:'',
            unit:'',
            remaining:0
          }
          form.setFieldsValue(record)
          showModal()
        }}>添加材料</Button>
      </div>
      <Table
        columns={columns}
        dataSource={ifFilter?filterData:data}
      />
      {/* 模态框 */}
      <Modal title={isUpdate?"修改":"添加"} visible={isModalVisible}
             onOk={handleOk} onCancel={handleCancel}
             width={500}
             bodyStyle={{padding: 20}}>
        <Form
          form={form}
          name="validate_other"
          {...formItemLayout}
          // onFinish={handleOk}
        >
          <Form.Item
            name="name"
            label="材料名"
            rules={[
              {
                required: true,
                message: '请输入材料名',
              },
            ]}
          >
            {isUpdate?
              <span className="ant-form-text">{currentName}</span>:
              <Input placeholder="请输入材料名"/>
            }

          </Form.Item>

          <Form.Item
            name="type"
            label="类别"
            hasFeedback
            rules={[{required: true, message: '请选择材料类别'}]}
          >
            <Select placeholder="请选择材料类别">
              <Option value='五谷杂粮'>五谷杂粮</Option>
              <Option value="干货杂货">干货杂货</Option>
              <Option value='肉'>肉</Option>
              <Option value="调味">调味</Option>
              <Option value="冻货">冻货</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="unit"
            label="单位"
            rules={[
              {
                required: true,
                message: '请输入单位',
              },
            ]}
          >
            <Input placeholder="请输入单位"/>
          </Form.Item>

          <Form.Item label="现存量" rules={[{required: true, message: '请输入现存量'}]}>
            <Form.Item name="remaining" noStyle>
              <InputNumber min={0} max={1000}/>
            </Form.Item>
          </Form.Item>

        </Form>
      </Modal>
    </div>
  )
}

export default material

