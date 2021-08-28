import { Card } from 'antd';
import {EditOutlined} from "@ant-design/icons";
import {getFoodList} from "@/services/ant-design-pro/api";
import {useEffect,useState} from "react";

const { Meta } = Card;

const pushFoodCardArray=(foodArray)=>{
  const foodCardArray=[]

  for(let i=0;i<foodArray.length;i+=1){
    // eslint-disable-next-line no-console
    console.log(i)
    foodCardArray.push( <Card
      style={{width:300,borderRadius:15,overflow:"hidden",margin:20}}
      cover={<img
        alt="example"
        src={foodArray[i].imgUrl}
      />}
      key={i}
    >
      <Meta title={foodArray[i].name}  avatar={<EditOutlined key="edit" />}/>
    </Card>)
  }
  return foodCardArray
}

const food=()=>{

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [foodCardArray,setFoodCardArray]=useState([])

  // 第2个参数需要给上，就可以让它只在第一次渲染的时候触发，即挂载前触发
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(async ()=>{
      const foodArray=await getFoodList()
    // eslint-disable-next-line no-console
      console.log(foodArray)
      const array=pushFoodCardArray(foodArray)
      setFoodCardArray(array)
  },[])


  // eslint-disable-next-line no-console
  console.log(foodCardArray)

  // eslint-disable-next-line no-console
  // console.log("foodArray：",foodArray)

  return (
    <div style={{display:"flex"}}>
      {foodCardArray}
    </div>
  )
}

export default food
