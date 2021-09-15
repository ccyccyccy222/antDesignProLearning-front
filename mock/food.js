export default {
  'GET /api/food':
    [{
      name:"番茄牛尾汤红酒牛肉面",
      imgUrl:'https://i.loli.net/2021/08/26/NGk8ftO7932prLS.png',
      price:30
    },
      {
        name:"香辣火锅汤雪花肥牛面",
        imgUrl:'https://i.loli.net/2021/08/25/unrTgHfkWaX7GDe.png',
        price:30
      },
      {
        name:"番茄香草汤半筋半肉面",
        imgUrl:'https://i.loli.net/2021/08/26/6mTuINJftweOn1A.png',
        price:30
      },
      {
        name:"经典酸辣汤猪小排面",
        imgUrl:'https://i.loli.net/2021/08/26/Wd6yVPxYa2BK94R.png',
        price:30
      },
      {
        name:"大师素油拌面",
        imgUrl:'https://i.loli.net/2021/09/06/kYGAobSn7sFNZh2.png',
        price:30
      },
      {
        name:"西北酱小排拌面",
        imgUrl:'https://i.loli.net/2021/09/06/blBuTVrICGFtKqE.png',
        price:30
      },
      {
        name:"老火油红酒牛肉拌面",
        imgUrl:'https://i.loli.net/2021/09/06/kWVL6BDt2wbxyvP.png',
        price:30
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
