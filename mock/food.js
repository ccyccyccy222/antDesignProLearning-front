export default {
  'GET /api/food':
    [{
      name:"番茄牛尾汤红酒牛肉面",
      imgUrl:'https://i.loli.net/2021/08/26/NGk8ftO7932prLS.png'
    },
      {
        name:"香辣火锅汤雪花肥牛面",
        imgUrl:'https://i.loli.net/2021/08/25/unrTgHfkWaX7GDe.png'
      },
      {
        name:"番茄香草汤半筋半肉面",
        imgUrl:'https://i.loli.net/2021/08/26/6mTuINJftweOn1A.png'
      },
      {
        name:"经典酸辣汤猪小排面",
        imgUrl:'https://i.loli.net/2021/08/26/Wd6yVPxYa2BK94R.png'
      }
    ],
  'POST /api/food/add':async (req, res) => {
    console.log(req)
    res.send({
      "name": "xxx.png",
      "status": "done",
      "url": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      "thumbUrl": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    });

  }
}
