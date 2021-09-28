# 基于ant design pro的前后端分离的小型餐馆管理系统

### 安装配置

#### 前端

1. **下载代码**

   [Github  antDesignProLearning-front]: https://github.com/ccyccyccy222/antDesignProLearning-front

2. **安装依赖，在命令行输入命令```npm install```或```yarn```**

   官方推荐使用 [tyarn](https://www.npmjs.com/package/tyarn) 来进行包管理，可以极大地减少 install 的时间和失败的概率，并且完全兼容 npm。

3. **按需要修改部分代码**

   + 页脚

     在src/components/Footer/index.jsx修改

   + 后端接口地址

     在config/proxy.js修改

     我的项目接口地址默认是```localhost:8080/api/```

   + 其他，参考官方文档

     [Ant Design Pro官方文档]: https://pro.ant.design/zh-CN/docs/overview
     [UmiJS官方文档]: https://umijs.org/zh-CN/docs/getting-started
     [b站良心教程：React项目全程实录#电商项目#react+UmiJS+Antd Pro#React全套技术#融职教育出品]: https://www.bilibili.com/video/BV1i5411c7xp?p=1

4. **输入启动命令**

   - 使用mock

     ```tyarn start```

   - 不使用mock

     ```tyarn start:dev```

   - 备注：我的项目可以以上述任一方式启动。只是mock数据不太完善，所以可能有些功能会出现问题；第二种方法需要连接后端，启动后端的服务器，这个经过测试各种功能都正常。

#### 后端

1. **下载代码**

   [Github  hefuNoodles-back]: https://github.com/ccyccyccy222/hefuNoodles-back

2. **按需要修改部分代码**

   + 数据库配置

     SqlHelper.java

   + 上传图片地址设置

     UploadServlet.java

     
     fileUploadPath变量定义上传的路径；uploadImage变量是该图片路径的url地址。在该文件种会将本地路径fileUploadPath转变成url，以方便访问，需要自己再配置共享网络
     

3. **配置好tomcat服务器**

4. **启动服务器**



### 功能

#####基本列表：菜品管理、原材料管理、外卖管理、费用管理

+ 菜品管理

  可以对菜品进行添加、修改信息、上传菜品图片

  ![image-20210928085652327](https://i.loli.net/2021/09/28/msDPpZRiGxclJoy.png)

  ![image-20210928085718619](https://i.loli.net/2021/09/28/5awdjvlOBCNnfEX.png)

  ![image-20210928085730468](https://i.loli.net/2021/09/28/faQNwKBizYoSDOq.png)

  ![image-20210928085805486](https://i.loli.net/2021/09/28/jJNbaOhyf2kdtWs.png)

  ![image-20210928085815022](https://i.loli.net/2021/09/28/h8gReyDNnOTtGra.png)

+ 原材料管理

  可以实现对原材料的添加、修改、查询、筛选

  ![image-20210928091454325](https://i.loli.net/2021/09/28/MltZpAO51hCDPJc.png)

+ 外卖管理

  可以实现外卖状态的更改

  ![image-20210928091427119](https://i.loli.net/2021/09/28/Kc3tnBSMEkiAPYd.png)

+ 费用管理

  可以实现对人工费、水电煤气费的添加、修改、查询、筛选

  ![image-20210928091519606](https://i.loli.net/2021/09/28/iXPUdMQ4jYcRosk.png)

  

##### 权限管理

这里一共定义了4种角色，每种角色看到的菜单列表是不一样的

登录角色为admin时，显示全部菜单
![image-20210928091742025](https://i.loli.net/2021/09/28/CInZgqyYVFokTNv.png) 

登录角色为chef时，显示部分菜单
![image-20210928091803425](https://i.loli.net/2021/09/28/M5VKnxUGwlfFC9e.png) 

其他角色同理
![image-20210928091811757](https://i.loli.net/2021/09/28/KgP8niNcXHkWx3l.png) 
![image-20210928091820212](https://i.loli.net/2021/09/28/aFADMEqVTrUHSzi.png)

