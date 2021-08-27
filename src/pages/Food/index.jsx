import { Card } from 'antd';
import {EditOutlined} from "@ant-design/icons";
import {getFoodList} from "@/services/ant-design-pro/api";

const { Meta } = Card;

const foodCardArray=[]
// let foodArrayLength;

const setFoodCardArray=(foodArray)=>{
  // foodArrayLength=foodArray.length

  for(let i=1;i<=foodArray.length;i+=1){
    // eslint-disable-next-line no-console
    console.log(i)
    // const imgurl=`@/image/food${i}.png`
    foodCardArray.push( <Card
      style={{width:300,borderRadius:15,overflow:"hidden",margin:20}}
      cover={<img
        alt="example"
        src="https://i.loli.net/2021/08/26/NGk8ftO7932prLS.png"
        // src={imgurl}
      />}
      key={i}
    >
      <Meta title="{foodArray[i].name}"  avatar={<EditOutlined key="edit" />}/>
    </Card>)
  }
}

const food=()=>{
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const [foodArray,setFoodArray]=useState([])

  if(foodCardArray.length===0){
    getFoodList().then(res=>{
      setFoodCardArray(res)
    })
  }

  // eslint-disable-next-line no-console
  console.log(foodCardArray)

  // eslint-disable-next-line no-console
  // console.log("foodArray：",foodArray)

  // console.log(foodArray)
  // ESLint推荐用ES6的Template String来拼接字符串，而不能用+号
  // 解决办法：我是字符串部分，${我是参数部分}，我是字符串部分

  return (
    <div style={{display:"flex"}}>
      {foodCardArray}
    </div>
  )
}

export default food
