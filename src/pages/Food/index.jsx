import {Form, Card, Input, Modal, Upload, message, InputNumber} from 'antd';
import {EditOutlined,LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import {getFoodList} from "@/services/ant-design-pro/api";
import {useEffect,useState} from "react";
import useForm from "antd/es/form/hooks/useForm";

const { Meta } = Card;


const food=()=>{

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form] = useForm();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [foodCardArray,setFoodCardArray]=useState([])
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isModalVisible, setIsModalVisible] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [imageUrl , setImageUrl ] = useState(false);

  const showUpdateModal = () => {
    setIsUpdateModalVisible(true);
  };

  const handleUpdateModalOk = () => {
    setIsUpdateModalVisible(false);
  };

  const handleUpdateModalCancel = () => {
    setIsUpdateModalVisible(false);
  };

  const pushFoodCardArray=(foodArray)=>{
    const array=[]

    for(let i=0;i<foodArray.length;i+=1){
      // eslint-disable-next-line no-console
      // console.log(i)
      array.push( <Card
        style={{width:300,borderRadius:15,overflow:"hidden",margin:20}}
        cover={<img
          alt="example"
          src={foodArray[i].imgUrl}
        />}
        key={i}
      >
        <Meta title={foodArray[i].name}  avatar={<EditOutlined key="edit" />}
              description={`价格：${foodArray[i].price}元`}
              onClick={showUpdateModal}/>
      </Card>)
    }
    return array
  }


  // 第2个参数需要给上，就可以让它只在第一次渲染的时候触发，即挂载前触发
  // eslint-disable-next-line react-hooks/rules-of-hooks,react-hooks/exhaustive-deps
  useEffect(async ()=>{
      const foodArray=await getFoodList()
    // eslint-disable-next-line no-console
    //   console.log(foodArray)
      const array=pushFoodCardArray(foodArray)
      setFoodCardArray(array)
  },[])




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





  // 处理上传

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      // eslint-disable-next-line no-console
      console.log(info.file)
      // eslint-disable-next-line no-console
      console.log(info.file.status)
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, image =>{
          setLoading(false)
          setImageUrl(image)
      }
      );
    }
  };

  const uploadButton = (
    <div style={{marginTop:20}}>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>菜品图片</div>
    </div>
  );

  // eslint-disable-next-line no-console
  // console.log(foodCardArray)

  // eslint-disable-next-line no-console
  // console.log("foodArray：",foodArray)

  return (
    <>
      <div style={{display:"flex",flexWrap:"wrap"}}>
        {foodCardArray}
        {/* 注释前后需要加空格 */}
        {/* 添加新菜单项 */}
        <Card
          style={{width:84,height:82,borderRadius:15,overflow:"hidden",margin:20}}
          bodyStyle={{padding:0,margin:0}}
          hoverable={true}
          onClick={showModal}
        >
          <img
            alt="example"
            src="https://i.loli.net/2021/08/28/8vboYXkjeL7a5th.jpg"
            style={{width:80,height:80}}
          />
        </Card>
      </div>
      <Modal title="新增菜品" visible={isModalVisible}
             onOk={handleOk} onCancel={handleCancel}
              width={450}
             bodyStyle={{padding:40}}>
        <Input placeholder="菜品名称"
        maxLength={5}
        size="middle"
        width={200}/>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          // action='/api/food/add‘'
          beforeUpload={beforeUpload}
          onChange={handleChange}
          style={{marginTop:20}}
          >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>

      </Modal>
      <Modal title="修改菜品" visible={isUpdateModalVisible}
             onOk={handleUpdateModalOk} onCancel={handleUpdateModalCancel}
             width={450}
             bodyStyle={{padding:40}}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          autoComplete="off"
        >
          <Form.Item
            label="菜品名"
            name="name"
            rules={[{ required: true, message: '请输入菜品名！!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="价格"
            name="price"
            rules={[{ required: true, message: '请输入价格！!' }]}
          >
            <Form.Item name="input-number" noStyle>
              <InputNumber min={0} max={1000} />
            </Form.Item>
            <span className="ant-form-text"> 元</span>
          </Form.Item>
        </Form>
      </Modal>
    </>

  )
}

export default food
