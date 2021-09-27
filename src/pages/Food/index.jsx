import React, {useEffect, useState} from "react";
import {Form, Card, Input, Modal, InputNumber, Upload,message} from 'antd';
import {EditOutlined, LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import {getFoodList, updateFoodList} from "@/services/ant-design-pro/api";
import useForm from "antd/es/form/hooks/useForm";


const {Meta} = Card;

// 将图片进行getBase64转码的方法
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  // readAsDataURL 方法会读取指定的 Blob 或 File 对象。
  // 读取操作完成的时候，readyState 会变成已完成DONE，并触发 loadend (en-US) 事件
  // 即执行callback回调
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

  // 该方法接收从后端传来的foodList列表，里面有菜品的各种信息
  // jsx可以将这些菜品都渲染出来，即可以在js代码中写react组件，也可以在react组件中写js代码
  const pushFoodCardArray = (foodList) => {
    const array = []

    for (let i = 0; i < foodList.length; i += 1) {
      // Card使用了ant design组件库
      array.push(<Card
        style={{width: 300, borderRadius: 15, overflow: "hidden", margin: 20}}
        cover={<img
          alt="example"
          src={foodList[i].imgUrl}
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

  // 该处使用了react hook,使得可以在函数组件中也拥有类似class组件的生命周期
  // 这里用来进行页面初始化，即在页面渲染前完成操作
  // 从后端拿到foodList数据，并调用pushFoodCardArray方法进行渲染
  // 并使用setFoodCardArray()方法对foodCardArray这个变量进行初始化
  // 第2个参数需要给上，就可以让它只在第一次渲染的时候触发，即挂载前触发
  // eslint-disable-next-line react-hooks/rules-of-hooks,react-hooks/exhaustive-deps
  useEffect(async () => {
    getFoodList().then(result => {
      const cardArray = pushFoodCardArray(result)
      setFoodCardArray(cardArray)
    })
  }, [])


  // 处理模态框

  // 添加菜单项的模态框，用户点击“确认”后调用的方法
  const handleOk = (type) => {
    // type是处理的事件类型
    // 若type=0，表示是添加操作
    // 若type=1，表示是修改操作
    if(!imageUrl) {
      message.error("请上传图片！");
      return;
    }
    // 把表单的值传给api.js（负责前端和后端交互的文件）中的updateList方法
    form.validateFields().then(value => {
      updateList({type, currentID, imageUrl, ...value}).then(res => {
        // 前端拿到后端数据时执行的回调
        let content = ''
        // 根据返回值的不同显示不同的消息提示框
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
    // 隐藏模态框
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setImageUrl(false);
    setIsModalVisible(false);
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined/> : <PlusOutlined/>}
      <div style={{marginTop: 8}}>Upload</div>
    </div>
  );

  // 处理upload组件变化的方法
  const handleChange = info => {
    // 如果文件上传状态是正在上传，则设置loading变量值为true
    if (info.file.status === 'uploading') {
      setLoading(true)
      return;
    }
    if (info.file.status === 'done') {
      // 如果文件上传状态是已上传完成，则设置loading变量值为false，并且进行base64转码
      // eslint-disable-next-line no-console
      console.log(info.file)
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, getImageUrl => {
          setLoading(false)
          setImageUrl(getImageUrl)
          // eslint-disable-next-line no-console
          // console.log(getImageUrl)
        }
      );
    }
  };

  // 上传前图片格式检测
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      // 如果图片格式不是jpg格式或者png格式，则提示错误
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      // 如果图片格式大于2M，提示错误
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  return (
    <>
      <div style={{display: "flex", flexWrap: "wrap"}}>
        {/* 最后在此处调用foodCardArray变量即可渲染出所有组件，代码非常简洁 */}
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

          {/* 上传图片的表单组件 */}
          <Form.Item>
            <Upload
              name="picture"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="/api/upload"
              onChange={handleChange}
              beforeUpload={beforeUpload}
            >
              {/* imageUrl是否存在，若存在，则说明已上传，显示该图片；
              若不存在，则说明未上传或正在上传，显示uploadButton组件 */}
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{width: '100%'}}/> : uploadButton}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>

  )
}

export default food
