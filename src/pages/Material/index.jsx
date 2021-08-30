import {Button, Table,Input} from 'antd';
import {DownCircleTwoTone, UpCircleTwoTone} from "@ant-design/icons";
import styles from './index.less';

const { Search } = Input;

const columns = [
  {title: '材料名', dataIndex: 'name', key: 'name'},
  {title: '剩余量', dataIndex: 'remaining', key: 'remaining'},
  {
    // title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => <a>更新</a>,
  },
  {
    title: '上次更新时间', dataIndex: 'date', key: 'date',
    sorter: (a, b) => {
      const aDate = new Date(a.date)
      const bDate = new Date(b.date)
      if (aDate > bDate) return 1
      return -1
    },
    sortDirections: ['ascend', 'descend','ascend'],
    defaultSortOrder:'descend'
  },
];

const data = [
  {
    key: 1,
    name: 'John Brown',
    remaining: 32,
    date: '2014-12-24 23:12:01',
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    name: 'Jim Green',
    remaining: 42,
    date: '2014-12-24 23:12:02',
    address: 'London No. 1 Lake Park',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    name: 'Not Expandable',
    remaining: 29,
    date: '2014-12-24 23:22:00',
    address: 'Jiangsu No. 1 Lake Park',
    description: 'This not expandable',
  },
  {
    key: 4,
    name: 'Joe Black',
    remaining: 32,
    date: '2014-12-24 23:12:00',
    address: 'Sidney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
];

// eslint-disable-next-line no-console
const onSearch = value => console.log(value);

const material = () => {
  return (
    <div className={styles.container}>
      <div className={styles.tableHead}>
        <Search placeholder="请输入查询的材料名"
                onSearch={onSearch} enterButton
                style={{width:300,marginRight:15}}/>
        <Button type="primary">添加新材料</Button>
      </div>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: record => <p style={{margin: 0}}>{record.description}</p>,
          rowExpandable: record => record.name !== 'Not Expandable',
          expandIconColumnIndex: 3,
          // fixed:"right",
          expandIcon: ({expanded, onExpand, record}) =>
            expanded ? (
              <UpCircleTwoTone onClick={e => onExpand(record, e)}/>
            ) : (
              <DownCircleTwoTone onClick={e => onExpand(record, e)}/>
            )
        }}
        dataSource={data}
      />
    </div>

  )
}

export default material

