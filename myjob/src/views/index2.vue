<template>
    <div class="center-back">
      <div class="scroll-center" id="top">
        <div class="center-img">
          <div class="top-img">
            <div class="rule" @click="toRule"></div>
            <div class="time1">{{fn3(tdate.d,2)}}</div>
            <div class="time2">{{fn3(tdate.h,2)}}</div>
            <div class="time3">{{fn3(tdate.m,2)}}</div>
            <div class="time4">{{fn3(tdate.s,2)}}</div>
            <div class="text-times">我的剩余投票数：{{votes}}</div>
          </div>
        </div>
        <div class="ways"></div>
        <div class="commodity" v-for="(item,index) in list" :key="index">
          <div class="news">
            <div class="com-l" v-bind:class="{ 'go-r': index % 2}">
              <div class="l-name">
                <span class="l-text1">{{item.name}}</span>
              </div>
              <div class="l-name2">{{item.spec}}</div>
              <div class="price">原价：￥{{item.price}}</div>
              <div class="new-price">{{item.priceActivity}}元</div>
              <div class="tip-money"></div>
            </div>
            <div class="com-r"></div>
          </div>
          <div class="process">
            <div class="process-top" v-bind:style="{ left: dealLeft(item.actualPopularity) }">
              当前人气值:{{item.actualPopularity}}
            </div>
            <div class="process-line">
              <div class="process-line-show" v-bind:style="{ width: dealWidth1(item.actualPopularity) }"></div>
            </div>
            <div class="process-arrow1">
            </div>
            <div class="process-arrow2">
            </div>
            <div class="process-arrow3">
            </div>
            <div class="process-price1">
              ￥143
            </div>
            <div class="process-price2">
              ￥99
            </div>
            <div class="process-price3">
              ￥86
            </div>
          </div>
          <div class="isclick to-click" v-if="!item.state" @click="cutOne(item)"></div>
          <div class="isclick no-click" v-else></div>
        </div>
        <div class="to-top" @click="toTop">回到顶部</div>
      </div>
       <div class="btn-bottom">
        <div class="btn-l" @click="toUrl(totalGoodsLink,1)"></div>
        <div class="btn-r" @click="toUrl(newGiftLink,2)"></div>
       </div>
       <div class="success" v-if="showSuccess" @click="showSuccess = false"></div>
    </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
// import { setInterval } from 'timers';
export default {
  data() {
    return {
    showSuccess:false,
     tdate:{
       d:0,
       h:0,
       m:0,
       s:0
     },
     votes: 9,
    // 中间的内容
    list:[
        {
            "priceActivity":109,
            "img":"http://goods-call-dev.oss-cn-shenzhen.aliyuncs.com/product/2018101814512826.jpg",
            "price":156,
            "name":"葡萄籽片 14250mg 180片",
            "link":"http://www.swisse-china.com.cn/swisse-wmall/o2o/product4.2/products_detail_v4.2.html?prodId=124128&terminalCode=912849",
            "id":1,
            "state":1,
            "actualPopularity":3001,
            "spec":"红润美肌“小能手”",
            "priceList":[
                {
                    "number":"1000",
                    "prices":"128"
                },
                {
                    "number":"3000",
                    "prices":"109"
                }
            ]
        },
        {
            "priceActivity":89,
            "img":"http://goods-call-dev.oss-cn-shenzhen.aliyuncs.com/product/2018101814523109.jpg",
            "price":114,
            "name":"高浓度蔓越莓胶囊 25000mg 30粒",
            "link":"http://www.swisse-china.com.cn/swisse-wmall/o2o/product4.2/products_detail_v4.2.html?prodId=124121&terminalCode=912849",
            "id":2,
            "state":1,
            "actualPopularity":1116,
            "spec":"呵护女性秘密花园",
            "priceList":[
                {
                    "number":"1000",
                    "prices":"89"
                },
                {
                    "number":"3000",
                    "prices":"79"
                }
            ]
        },
        {
            "priceActivity":132,
            "img":"http://goods-call-dev.oss-cn-shenzhen.aliyuncs.com/product/2018101814536071.jpg",
            "price":132,
            "name":"儿童钙+维生素D3胶囊 50粒",
            "link":"http://www.swisse-china.com.cn/swisse-wmall/o2o/product4.2/products_detail_v4.2.html?prodId=127803&terminalCode=912849",
            "id":3,
            "state":0,
            "actualPopularity":3,
            "spec":"长高高的小秘密",
            "priceList":[
                {
                    "number":"1000",
                    "prices":"99"
                },
                {
                    "number":"3000",
                    "prices":"89"
                }
            ]
        },
        {
            "priceActivity":80,
            "img":"http://goods-call-dev.oss-cn-shenzhen.aliyuncs.com/product/2018101814545823.jpg",
            "price":80,
            "name":"Ultiboost补铁片 30片",
            "link":"http://www.swisse-china.com.cn/swisse-wmall/o2o/product4.2/products_detail_v4.2.html?prodId=153406&terminalCode=912849",
            "id":4,
            "state":0,
            "actualPopularity":0,
            "spec":"有效补铁 孕期可用",
            "priceList":[
                {
                    "number":"1000",
                    "prices":"65"
                },
                {
                    "number":"3000",
                    "prices":"59"
                }
            ]
        },
        {
            "priceActivity":131,
            "img":"http://goods-call-dev.oss-cn-shenzhen.aliyuncs.com/product/2018101814545397.jpg",
            "price":131,
            "name":"儿童益生菌片 40片",
            "link":"http://www.swisse-china.com.cn/swisse-wmall/o2o/product4.2/products_detail_v4.2.html?prodId=127903&terminalCode=912849",
            "id":5,
            "state":0,
            "actualPopularity":2,
            "spec":"守护孩子肚肚的小卫士",
            "priceList":[
                {
                    "number":"1000",
                    "prices":"98"
                },
                {
                    "number":"3000",
                    "prices":"69"
                }
            ]
        },
        {
            "priceActivity":131,
            "img":"http://goods-call-dev.oss-cn-shenzhen.aliyuncs.com/product/2018101814556545.jpg",
            "price":131,
            "name":"儿童复合维生素片 120片 /瓶",
            "link":"http://www.swisse-china.com.cn/swisse-wmall/o2o/product4.2/products_detail_v4.2.html?prodId=124135&terminalCode=912849",
            "id":6,
            "state":0,
            "actualPopularity":0,
            "spec":"给挑食宝宝均衡的爱",
            "priceList":[
                {
                    "number":"1000",
                    "prices":"99"
                },
                {
                    "number":"3000",
                    "prices":"89"
                }
            ]
        },
        {
            "priceActivity":132,
            "img":"http://goods-call-dev.oss-cn-shenzhen.aliyuncs.com/product/2018101814573494.jpg",
            "price":132,
            "name":"儿童益智DHA胶囊 30粒",
            "link":"http://www.swisse-china.com.cn/swisse-wmall/o2o/product4.2/products_detail_v4.2.html?prodId=152609&terminalCode=912849",
            "id":7,
            "state":0,
            "actualPopularity":2,
            "spec":"DHA有助大脑发育",
            "priceList":[
                {
                    "number":"1000",
                    "prices":"109"
                },
                {
                    "number":"3000",
                    "prices":"89"
                }
            ]
        },
        {
            "priceActivity":68,
            "img":"http://goods-call-dev.oss-cn-shenzhen.aliyuncs.com/product/2018101814585683.jpg",
            "price":68,
            "name":"深海保湿调节喷雾 125ML",
            "link":"http://www.swisse-china.com.cn/swisse-wmall/o2o/product4.2/products_detail_v4.2.html?prodId=124127&terminalCode=912849",
            "id":8,
            "state":0,
            "actualPopularity":0,
            "spec":"滋养肌肤 补充水分",
            "priceList":[
                {
                    "number":"1000",
                    "prices":"54"
                },
                {
                    "number":"3000",
                    "prices":"49"
                }
            ]
        },
        {
            "priceActivity":133,
            "img":"http://goods-call-dev.oss-cn-shenzhen.aliyuncs.com/product/2018101814589235.jpg",
            "price":133,
            "name":"摩洛哥坚果眼霜 15ml",
            "link":"http://www.swisse-china.com.cn/swisse-wmall/o2o/product4.2/products_detail_v4.2.html?prodId=117932&terminalCode=912849",
            "id":9,
            "state":0,
            "actualPopularity":2,
            "spec":"紧致保湿 淡化黑眼圈",
            "priceList":[
                {
                    "number":"1000",
                    "prices":"99"
                },
                {
                    "number":"3000",
                    "prices":"59"
                }
            ]
        },
        {
            "priceActivity":176,
            "img":"http://goods-call-dev.oss-cn-shenzhen.aliyuncs.com/product/2018101814599340.jpg",
            "price":176,
            "name":"镁钙维生素D3片 120片",
            "link":"http://www.swisse-china.com.cn/swisse-wmall/o2o/product4.2/products_detail_v4.2.html?prodId=137204&terminalCode=912849",
            "id":10,
            "state":0,
            "actualPopularity":0,
            "spec":"镁+钙科学搭配易吸收",
            "priceList":[
                {
                    "number":"1000",
                    "prices":"119"
                },
                {
                    "number":"3000",
                    "prices":"99"
                }
            ]
        },
        {
            "priceActivity":220,
            "img":"http://goods-call-dev.oss-cn-shenzhen.aliyuncs.com/product/2018101814593465.jpg",
            "price":220,
            "name":"孕期叶酸+复合维生素胶囊（含500mcg叶酸）90粒 /瓶",
            "link":"http://www.swisse-china.com.cn/swisse-wmall/o2o/product4.2/products_detail_v4.2.html?prodId=124106&terminalCode=912849",
            "id":11,
            "state":0,
            "actualPopularity":2,
            "spec":"孕期营养“好装备”",
            "priceList":[
                {
                    "number":"1000",
                    "prices":"159"
                },
                {
                    "number":"3000",
                    "prices":"109"
                }
            ]
        }
    ],
    totalGoodsLink:'',
    newGiftLink:''
    };
  },
  created() {
      setInterval(this.getDate,1000);
      this.getData();
      this.sendDot('B000040100');
  },
  methods: {
    getData(){
      axios
        .post(
          "/goodscall/api/product/getProductList",
          qs.stringify({
            openId: window.openId || 123,
          })
        )
        .then((data) => {
          this.votes = data.data.data.votes ;
          this.list = data.data.data.productList || [];
          this.totalGoodsLink = data.data.data.totalGoodsLink;
          this.newGiftLink = data.data.data.newGiftLink;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    sendDot(code,suc) {
      axios
        .post(
          process.env.SET_DOT,
          {
            platform: 2,
            point_code: code,
            user_mark:window.openId,
            customer_id:window.customerId,
            created_time: new Date().getTime()
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then(response => {
          console.log(response);
          suc && suc();
        })
        .catch(error => {
          console.log(error);
        });
    },
    toUrl(url,num){
      if(!url) return;
      if(num ==1){
        this.sendDot('B000042100',function(){window.location.href = url;})
      } else {
        this.sendDot('B000042200',function(){window.location.href = url;})
      }
    },
    cutOne(item){
      axios
        .post(
          "/goodscall/api/call/addCall",
          qs.stringify({
            openId: window.openId || 123,
            productId: item.id
          })
        )
        .then((data) => {
          if(data.data.errMsg ==='成功'){
            item.state = 1;
            item.actualPopularity++;
            this.dealmoney(item)
            this.showSuccess = true;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    dealmoney(item){
      if(item.actualPopularity  == 1000){
        item.price = item.priceList[0].prices;
      }else if(item.actualPopularity  == 3000) {
        item.price = item.priceList[1].prices;
      }
    },
    toTop() {
      document.getElementById("top").scrollTop = 0;
    },
   dealWidth1(num){
     if(num >=3000) {
       return '100%'
     } else {
       return (Math.floor(num * 100 / 3000) + '%')
     }
   },
   dealLeft(num){
    if(num >=3000) {
       return '5rem'
     } else {
       return ((num * 5 / 3000) + 'rem')
     }
   },
   toRule(){
     this.$router.push({
            name:'rules',
          }); 
   },
   getDate(){
      let leftTime = 1541001599000 - Date.parse(new Date());
      this.tdate.d = Math.floor(leftTime/1000/60/60/24);
      this.tdate.h = Math.floor(leftTime/1000/60/60%24);  
      this.tdate.m = Math.floor(leftTime/1000/60%60);
      this.tdate.s = Math.floor(leftTime/1000%60);
   },
  fn3(num, length) {  
      return (Array(length).join('0') + num).slice(-length);  
    } 
  }
};
</script>
<style scoped>
*{
  box-sizing: border-box;
}
.success{
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: url("../../static/images/success.png") center center no-repeat;
  background-size: 5.20rem 2.12rem;
}
.center-back{
  width: 100vw;
  height: 100vh;
  background-color: red;
  position: relative;
}
.scroll-center{
  width: 100vw;
  position: absolute;
  top: 0px;
  bottom: 1.1rem;
  overflow-y: scroll;
  background-color: rgb(254, 248, 248);
}

.center-img{
 
}
.top-img{
  position: relative;
  width: 100vw;
  height: 11.53rem;
  background: url("../../static/images/top.png") left top no-repeat;
  background-size: 100vw 11.53rem;
}
.rule{
  position: absolute;
  top: 0;
  right: 0;
  width: 2.25rem;
  height: 0.62rem;
}
.time1,.time2,.time3,.time4{
  position: absolute;
  top: 9.25rem;
  font-size: 16px;
  color:#fff;
}
.time1{
  left: 2.55rem;
}
.time2{
  left: 3.27rem;
}
.text-times{
  position: absolute;
  top: 10.2rem;
  font-size: 12px;
  color:rgb(32, 32, 32);
  font-weight: bold;
  width: 100vw;
  text-align: center;
  text-indent: 2em;
}
.time3{
  left: 4.01rem;
}
.time4{
  left: 4.75rem;
}
.ways{
  width: 100vw;
  height: 6.02rem;
  background: url("../../static/images/ways.png") center center no-repeat;
  background-size: 5.64rem 6.02rem;
  /* background-color: rgb(255, 255, 255); */
}
.commodity{
  position: relative;
  width: 100vw;
  height: 7.97rem;
  padding-top: 1.04rem;
}
.com-l,.com-r{
  float: left;
  width: 50vw;
  height: 3.42rem;
}
.news{
  height: 3.42rem;
}
.go-r{
  float: right;
}
.com-r{
  width: 3.42rem;
  background: url("../../static/images/shop.jpg") center center no-repeat;
  background-size: 3.42rem 3.42rem;
}
.l-name{
  height: 0.9rem;
  /* padding-top: 0.53rem; */
  font-size: 0.27rem;
  position: relative;
}
.l-text1{
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0 0.36rem;
  width: 100%;
  text-align: left;
  color:#000;
}
.l-name2{
  width: 100%;
  height: 0.42rem;
  font-size: 0.36rem;
  padding: 0 0.36rem;
  font-weight: bold;
  text-align: left;
}
.price{
  height: 0.93rem;
  padding: 0 0.36rem;
  font-size: 0.24rem;
  padding-top: 0.5rem;
  text-align: left;
}
.new-price{
  width: 2.95rem;
  margin: 0 0.36rem;
  height: 0.36rem;
  background: url("../../static/images/money.png") left top no-repeat;
  background-size: 2.95rem 0.36rem;
  font-size: 0.26rem;
  font-weight: bold;
  color:#fff;
  padding-left: 1.96rem;
}
.tip-money{
 width: 2.94rem;
  margin: 0 0.36rem;
  height: 0.36rem;
  background: url("../../static/images/tip-money.png") left top no-repeat;
  background-size: 2.94rem 0.36rem;
}
.process{
  height: 1.86rem;
  width: 100vw;
  position: relative;
}
.process-top{
  color: rgb(183,43,65);
  font-size: 0.20rem;
  font-weight: bold;
  width: 2.38rem;
  height: 0.44rem;
  background: url("../../static/images/progress.png") left top no-repeat;
  background-size: 2.38rem 0.44rem;
  position: absolute;
  top: 0.28rem;
  left: 0rem;
}
.process-line{
  width: 6.25rem;
  height: 0.28rem;
  background: url("../../static/images/progress-line1.png") left top no-repeat;
  background-size: 6.25rem 0.28rem;
  position: absolute;
  top: 0.80rem;
  left: 0.62rem;
}
.process-line-show{
  width: 0%;
  background-color: rgba(238, 45, 31, .2);
  height: 0.28rem;
  border-radius: 0.28rem;
}
.process-arrow1,.process-arrow2,.process-arrow3{
  width: 0.21rem;
  height: 0.13rem;
  background: url("../../static/images/arrow1.png") left top no-repeat;
  background-size: 0.21rem 0.13rem;
  position: absolute;
  top: 1.20rem;
  left: 0.90rem;
}
.process-arrow2{
  left: 3.70rem;
}
.process-arrow3{
  left: 6.18rem;
}
.process-price1,.process-price2,.process-price3{
  text-align: left;
  width: 0.90rem;
  height: 0.38rem;
  position: absolute;
  top: 1.42rem;
  left: 0.70rem;
  font-size: 0.26rem;
  font-weight: bold;
}
.process-price2{
  left: 3.48rem;
}
.process-price3{
  left: 6rem;
}
.isclick{
  width: 6.18rem;
  height: 0.55rem;
  position: absolute;
  top: 6.58rem;
  left: 0.66rem;
}
.no-click {
  background: url("../../static/images/has-click.png") left top no-repeat;
  background-size: 6.18rem 0.55rem;
}
.to-click {
   background: url("../../static/images/no-click.png") left top no-repeat;
  background-size: 6.18rem 0.55rem;
}
.to-top{
  width: 100vw;
  height: 1.34rem;
  padding-top: 0.28rem;
  text-align: center;
  font-size: 0.24rem;
  font-weight: bold;
  background: url("../../static/images/to-top.png") center top no-repeat;
  background-size: 0.37rem 0.27rem;
  color:#000;
}
.to-go{
  width: 100vw;
  height: 1.34rem;
  display: inline-block;
}
.btn-bottom{
  position: absolute;
  width: 100vh;
  height: 1.1rem;
  bottom: 0;
  background-color: skyblue;
  background: url("../../static/images/btn.png") left center no-repeat #fff;
  background-size: 100vw 1.1rem;
}
.btn-l{
  height: 1.1rem;
  width: 50vw;
  float: left;
  /* background-color: gray; */
}
.btn-r{
  height: 1.1rem;
  width: 50vw;
  float: left;
  /* background-color: red; */
}
</style>
