import {Button, Table, Input, Modal, Form, Select, InputNumber} from 'antd';
import styles from './index.less';
import {useEffect, useState} from "react";
import {getMaterialList} from "@/services/ant-design-pro/api";
import useForm from "antd/es/form/hooks/useForm";

const {Search} = Input;
const {Option} = Select;

const formItemLayout = {
  labelCol: {span: 6},
  wrapperCol: {span: 14},
};


// eslint-disable-next-line no-console
const onSearch = value => console.log(value);

const material = () => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form] = useForm();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [data, setData] = useState([])
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isModalVisible, setIsModalVisible] = useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks,react-hooks/exhaustive-deps
  useEffect(async () => {
    const result = await getMaterialList()
    setData(result)
  }, [])

  // 处理模态框

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
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
      sortDirections: ['ascend', 'descend'],
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
        form.setFieldsValue(record)
        showModal()
      }}>
        更新</a>,
    },
  ];

  // 处理表单
  const onFinish = (values) => {
    // eslint-disable-next-line no-console
    console.log('Received values of form: ', values);
  };


  return (
    <div className={styles.container}>
      <div className={styles.tableHead}>
        <Search placeholder="请输入查询的材料名"
                onSearch={onSearch} enterButton
                style={{width: 300, marginRight: 15}}/>
        <Button type="primary" onClick={() =>
        {
          const record={
            name:'',
            type:'',
            uit:'',
            remaining:0
          }
          form.setFieldsValue(record)
          showModal()
        }}>添加材料</Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
      />
      {/* 模态框 */}
      <Modal title="修改材料内容" visible={isModalVisible}
             onOk={handleOk} onCancel={handleCancel}
             width={500}
             bodyStyle={{padding: 20}}>
        <Form
          form={form}
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
          // initialValues={{
          //   // 'input-number': 300,
          //   ...{defaultFormValue}
          // }}
        >
          <Form.Item
            name="name"
            label="名称"
            rules={[
              {
                required: true,
                message: '请输入材料名',
              },
            ]}
          >
            <Input placeholder="请输入材料名"/>
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

