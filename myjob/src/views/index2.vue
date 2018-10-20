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
        <div class="commodity" v-for="(item,index) in list" :key="index" v-bind:style="{ 'background-color': !(index % 2) ?'':'#fff'  }">
          <div class="news" @click="toNews(item.link)">
            <div class="com-l" v-bind:class="{ 'go-r': index % 2}">
              <div class="l-name">
                <span class="l-text1">{{item.name}}</span>
              </div>
              <div class="l-name2">{{item.spec}}</div>
              <div class="price">原价：￥{{item.price}}</div>
              <div class="new-price">{{item.priceActivity}}元</div>
              <div class="tip-money"></div>
            </div>
            <div class="com-r"  v-bind:style="{ 'margin-left': !(index % 2) ?'':'0.3rem'  }"></div>
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
            <div class="process-price1"  v-bind:class="{ 'show-money': item.actualPopularity < 1000 }">
              ￥{{item.price}}
            </div>
            <div class="process-price2" v-bind:class="{ 'show-money': item.actualPopularity >= 1000 && item.actualPopularity <3000}">
              ￥{{item.priceList[0].prices}}
            </div>
            <div class="process-price3" v-bind:class="{ 'show-money': item.actualPopularity >= 3000 }">
              ￥{{item.priceList[1].prices}}
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
import wxShowMenu from "../../static/js/share.js";
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
    list:[],
    totalGoodsLink:'',
    newGiftLink:'',
    endData:''
    };
  },
  created() {
      this.getData();
      this.sendDot('B000040100');
      this.myShare();
  },
  methods: {
    myShare(){
      wxShowMenu.wxShowMenu({
        title1: 'Swisse嗨购预热', // 分享标题
        title2: '在吗？可否接过这把刀！', // 分享标题
        desc1: 'Pick出心头好 邀好友一起砍出11.11低价', //分享描述
        desc2: 'Pick出你的心头好 和我一起砍价11.11低价', //分享描述
        link1: window.location.origin + process.env.ROATER + '/#/index',// 分享链接
        link2: window.location.origin + process.env.ROATER + '/#/index',// 分享链接
      },() =>{
        // 判断是不是最后点击月亮分享
        this.sendDot('B000040101');
      })
    },
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
          this.endData = Date.parse(new Date(data.data.data.endStr));
          setInterval(this.getDate,1000);
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
      let tarUrl = url;
      if(this.$route.query.assisAccount) tarUrl += ('&assisAccount=' + this.$route.query.assisAccount);
      if(this.$route.query.termCode) tarUrl += ('&termCode=' + this.$route.query.termCode);
      if(this.$route.query.guiderSourceSystem) tarUrl += ('&guiderSourceSystem=' + this.$route.query.guiderSourceSystem);
      if(this.$route.query.guiderSourceBusiness) tarUrl += ('&guiderSourceBusiness=' + this.$route.query.guiderSourceBusiness);
      if(this.$route.query.guiderBusinessId) tarUrl += ('&guiderBusinessId=' + this.$route.query.guiderBusinessId);
      if(this.$route.query.fromSubsystem) tarUrl += ('&fromSubsystem=' + this.$route.query.fromSubsystem);
      if(num ==1){
        this.sendDot('B000040122',function(){window.location.href = tarUrl;})
      } else {
        this.sendDot('B000040121',function(){window.location.href = tarUrl;})
      }
    },
    toNews(url){
      let tarUrl = url;
      if(this.$route.query.assisAccount) tarUrl += ('&assisAccount=' + this.$route.query.assisAccount);
      if(this.$route.query.termCode) tarUrl += ('&termCode=' + this.$route.query.termCode);
      if(this.$route.query.guiderSourceSystem) tarUrl += ('&guiderSourceSystem=' + this.$route.query.guiderSourceSystem);
      if(this.$route.query.guiderSourceBusiness) tarUrl += ('&guiderSourceBusiness=' + this.$route.query.guiderSourceBusiness);
      if(this.$route.query.guiderBusinessId) tarUrl += ('&guiderBusinessId=' + this.$route.query.guiderBusinessId);
      if(this.$route.query.fromSubsystem) tarUrl += ('&fromSubsystem=' + this.$route.query.fromSubsystem);
      window.location.href = tarUrl;
    },
    cutOne(item){
      axios
        .post(
          "/goodscall/api/call/addCall",
          qs.stringify({
            openId: window.openId ,
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
     if(num < 1000){
       (Math.floor(num * 100 / 2000) + '%')
     }else if(num >=3000) {
       return '100%'
     } else {
       return (Math.floor((num -1000) * 100 / 4000) + 50 + '%')
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
     let query ={};
     for (const key in this.$route.query) {
       query[key] = this.$route.query[key];
     }
     this.$router.push({
            name:'rules',
            query
          }); 
   },
   getDate(){
      let leftTime = this.endData - Date.parse(new Date());
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
  left: 2.5rem;
}
.time2{
  left: 3.27rem;
}
.text-times{
  padding-right:0.4rem;
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
  left: 4.7rem;
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
.show-money{
  font-size: 0.36rem;
  color:red;
  margin-left: -0.1rem;
}
</style>
