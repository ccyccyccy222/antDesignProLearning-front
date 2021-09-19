import React, {useEffect, useState} from "react";
import {Form, Card, Input, Modal, InputNumber, Upload} from 'antd';
import {EditOutlined, LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import {getFoodList, updateFoodList} from "@/services/ant-design-pro/api";
import useForm from "antd/es/form/hooks/useForm";
// eslint-disable-next-line import/no-absolute-path
// import img from "C:/Users/ccy/Pictures/数据库课设图片/foodMenu/image/大师素油拌面.png";


const {Meta} = Card;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}


const food = () => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form] = useForm();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [foodCardArray, setFoodCardArray] = useState([])
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isModalVisible, setIsModalVisible] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentID, setCurrentID] = useState('');
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [ifAdd, setIfAdd] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [imageUrl, setImageUrl] = useState(false);

  const pushFoodCardArray = (foodList) => {
    const array = []

    for (let i = 0; i < foodList.length; i += 1) {
      array.push(<Card
        style={{width: 300, borderRadius: 15, overflow: "hidden", margin: 20}}
        cover={<img
          alt="example"
          src={foodList[i].imgUrl}
          // src={img}
          // src={"C:/Users/ccy/Pictures/数据库课设图片/foodMenu/image/大师素油拌面.png"}
        />}
        key={i}
      >
        <Meta title={foodList[i].name} avatar={<EditOutlined key="edit"/>}
              description={`价格：${foodList[i].price}元`}
              onClick={
                () => {
                  setIfAdd(false)
                  setCurrentID(foodList[i].id)
                  form.setFieldsValue(foodList[i])
                  setIsModalVisible(true);
                }
              }
        />
      </Card>)
    }
    return array
  }

  // 更新列表
  const updateList = async (values) => {
    // eslint-disable-next-line no-console
    console.log("value :", values)
    // 调用service中的方法，修改状态，返回修改后的数组
    const res = await updateFoodList(values)
    getFoodList().then(result => {
      const cardArray = pushFoodCardArray(result)
      setFoodCardArray(cardArray)
    })
    return res
  }

  // 第2个参数需要给上，就可以让它只在第一次渲染的时候触发，即挂载前触发
  // eslint-disable-next-line react-hooks/rules-of-hooks,react-hooks/exhaustive-deps
  useEffect(async () => {
    getFoodList().then(result => {
      const cardArray = pushFoodCardArray(result)
      setFoodCardArray(cardArray)
    })
  }, [])


  // 处理模态框

  const handleOk = (type) => {
    form.validateFields().then(value => {
      updateList({type, currentID, ...value}).then(res => {
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
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined/> : <PlusOutlined/>}
      <div style={{marginTop: 8}}>Upload</div>
    </div>
  );

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, getImageUrl => {
          setLoading(true)
          setImageUrl(getImageUrl)
        }
      );
    }
  };

  return (
    <>
      <div style={{display: "flex", flexWrap: "wrap"}}>
        {foodCardArray}
        {/* 添加新菜单项 */}
        <Card
          style={{width: 84, height: 82, borderRadius: 15, overflow: "hidden", margin: 20}}
          bodyStyle={{padding: 0, margin: 0}}
          hoverable={true}
          onClick={() => {
            setIfAdd(true)
            setIsModalVisible(true);
            const len = foodCardArray.length + 1;
            const id = `00${len}`;
            setCurrentID(id);
            form.setFieldsValue({name: '', price: 0})
          }}
        >
          <img
            alt="example"
            src="https://i.loli.net/2021/08/28/8vboYXkjeL7a5th.jpg"
            style={{width: 80, height: 80}}
          />
        </Card>
      </div>
      <Modal title={ifAdd ? "添加菜品" : "修改菜品"} visible={isModalVisible}
             onOk={() => handleOk(ifAdd ? 0 : 1)} onCancel={handleCancel}
             width={450}
             bodyStyle={{padding: 40}}>
        <Form
          form={form}
          name="basic"
          labelCol={{span: 5}}
          wrapperCol={{span: 15}}
          autoComplete="off"
        >
          <Form.Item
            label="菜品名"
            name="name"
            rules={[{required: true, message: '请输入菜品名！'}]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label="价格"
          >
            <Form.Item name="price" noStyle>
              <InputNumber min={0} max={1000}/>
            </Form.Item>
            <span className="ant-form-text"> 元</span>
          </Form.Item>

          <Form.Item
          >
            <Upload
              name="picture"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="/api/upload"
              onChange={handleChange}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{width: '100%'}}/> : uploadButton}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>

  )
}

export default food
