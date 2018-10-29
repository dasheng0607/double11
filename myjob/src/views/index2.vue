<template>
    <div class="center-back">
      <div v-transfer-dom @click="show2=fasle">
        <loading :show="show2" text="Loading"></loading>
      </div>
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
        <div class="commodity" v-for="(item,index) in list" :key="index" v-bind:style="{ 'background-color': !(index % 2) ?'':'#fff','text-align':  !(index % 2) ? 'left':'right'  }">
          <div class="news" @click="toNews(item.link)">
            <div class="com-l" v-bind:class="{ 'go-r': index % 2}">
              <div class="l-name">
                <span class="l-text1">{{item.name}}</span>
              </div>
              <div class="l-name2">{{item.spec}}</div>
              <div class="price">原价：￥{{item.price}}</div>
              <div class="new-price">{{item.priceActivity}}元</div>
              <div class="tip-money" v-if="item.actualPopularity <3000"> 
                加油鸭！人气越高,价格越低！
              </div>
              <div class="tip-money tip-img" v-else>
                砍价完成！11.1开始买！
              </div>
            </div>
            <div class="com-r"  v-bind:style="{ 'margin-left': !(index % 2) ?'':'0.3rem' ,'background-image':'url('+ item.img+')'}"></div>
          </div>
          <div class="process">
            <div class="process-top" v-bind:style="{ left: dealLeft(item.actualPopularity) }">当前人气值:{{item.actualPopularity}}</div>
            <div class="process-line">
              <div  v-show="item.show" class="process-line-show2" v-bind:style="{ width: dealWidth1(item.actualPopularity) }">
                <transition name="bounce">
                  <div v-show="item.show" class="scroll-run"></div>
                </transition>
              </div>
              <div  class="process-line-show" v-bind:style="{ width: dealWidth1(item.actualPopularity) }"></div>
              <div   v-show="item.show" class="process-line-show process-line-show3" v-bind:style="{ width: dealWidth1(item.actualPopularity) }"></div>
              <span class="money1">1000</span>
              <span class="money2">3000</span>
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
          <div class="isclick to-click" v-if="!item.state" @click="cutOne(item,index)"></div>
          <div class="isclick no-click"  v-else></div>
        </div>
        <div class="to-top" @click="toTop">回到顶部</div>
        <!-- <p style="font-size:12px;">测试数据(会删除)
          endData：{{endData}}
          tdata{{tdata}}
        </p> -->
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
import wxShowMenu from "../js/share.js";
import qs from "qs";
import { Loading,TransferDomDirective as TransferDom } from 'vux'
// import { setInterval } from 'timers';
export default {
  directives: {
    TransferDom
  },
  components: {
    Loading
  },
  data() {
    return {
      num:3006,
      show2:false,
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
    endData:'',
    tdata:'',
    btnclose: true
    };
  },
  created() {
    this.show2 = true;
    axios
    .post(
      "/goodsCall/api/member/addMember",
      qs.stringify({
        openId: window.openId || this.num,
        customerId: window.customerId,
        headImageUrl: window.user.headimgurl || 'http://www.swisse-china.com.cn/swisse-wmall/activityDemo/shoppingGuide/index.html?_campaign=20181015095645_11590',
        nickName: window.user.nickname || 'test',
        link: window.location.href
      })
    )
    .then((data) => {
        this.getData();
        this.sendDot('B000040100');
        this.myShare();
    })
    .catch(function (error) {
      console.log(error);
    });
  },
  mounted () {
    this.toTop()
  },
  methods: {
    closeScroll(index){
      let item = this.list[index];
      item.show = true;
      setTimeout(() => {
        item.show = false;
      }, 5100);
    },
    myShare(){
      wxShowMenu.wxShowMenu({
        title1: 'Swisse嗨购预热 | Pick出心头好 邀好友一起砍出11.11低价', // 分享标题
        title2: '在吗？可否接过这把刀！', // 分享标题
        desc2: 'Pick出你的心头好 和我一起砍价11.11低价', //分享描述
        link1: window.location.origin + process.env.ROATER + '/#/index',// 分享链接
        link2: window.location.origin + process.env.ROATER + '/#/index',// 分享链接
        img1:'https://hhcoverbaby.oss-cn-shenzhen.aliyuncs.com/goodsCall-h5/static/images/share.jpg'
      },() =>{
        // 判断是不是最后点击月亮分享
        this.sendDot('B000040101');
      })
    },
    getData(index=-1){
      this.show2 =true;
      axios
        .post(
          "/goodsCall/api/product/getProductList",
          qs.stringify({
            openId: window.openId || this.num,
          })
        )
        .then((data) => {
          this.votes = data.data.data.votes ;
          this.totalGoodsLink = data.data.data.totalGoodsLink;
          this.newGiftLink = data.data.data.newGiftLink;
          let tarTime = data.data.data.endStr.split('-').join('/');
          this.tdata = tarTime;
          this.endData = Date.parse(new Date(tarTime));
          setInterval(this.getDate,1000);
          this.list = data.data.data.productList.map((ele) =>{
            if(ele.state){
              ele.actualPopularity +=1;
              if(ele.actualPopularity  >= 3000){
                ele.priceActivity = ele.priceList[1].prices;
              }else if(ele.actualPopularity  >= 1000) {
                ele.priceActivity = ele.priceList[0].prices;
              } else {
                ele.priceActivity = ele.price
              }
            }
            ele.show = false;
            return ele;
          });
          this.show2 =false;
          this.$nextTick((ele) =>{
            if(localStorage.getItem("scroll")){
              document.documentElement.scrollTop  = localStorage.getItem("scroll") *1;
              document.body.scrollTop = localStorage.getItem("scroll") *1; 
              localStorage.clear();
              this.btnclose = false;
            }else {
              if(this.btnclose){ // 一次性开关，返回头部
                this.btnclose = false;
                this.toTop();
              }
            }
            if(index >= 0) {
              this.showSuccess = true;
              setTimeout(() => {
                this.showSuccess = false;
              }, 1500);
              this.closeScroll(index);
            }
          })
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
      localStorage.setItem("scroll",document.documentElement.scrollTop);
      window.location.href = tarUrl;
    },
    cutOne(item,index){
      axios
        .post(
          "/goodsCall/api/call/addCall",
          qs.stringify({
            openId: window.openId || this.num,
            productId: item.id
          })
        )
        .then((data) => {
          if(data.data.errMsg ==='成功'){
            // item.state = 1;
            // item.actualPopularity++;
            // this.dealmoney(item)
            this.getData(index)
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    dealmoney(item){
      if(item.actualPopularity  == 1000){
        item.priceActivity = item.priceList[0].prices;
      }else if(item.actualPopularity  == 3000) {
        item.priceActivity = item.priceList[1].prices;
      }
    },
    toTop() {
      document.documentElement.scrollTop  = 0;
      document.body.scrollTop = 0; 
    },
   dealWidth1(num){
     if(num <= 1000){
       if(!num) return '0%'
      return ( (Math.ceil(num * 100 / 2000) >= 5 ? Math.ceil(num * 100 / 2000) : 5) + '%')
     }else if(num >=3000) {
       return '100%'
     } else {
       return (Math.ceil((num -1000) * 100 / 4000) + 50 + '%')
     }
   },
   dealLeft(num){
    if(num <= 1000){
      return (num * 2.5/ 1000).toFixed(2) +'rem';
    }else if(num >=3000) {
      return '5rem'
    } else {
      return 2.5 + ((num -1000) * 2.5/ 2000).toFixed(2) * 1 +'rem';
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
<style >
*{
  box-sizing: border-box;
  -webkit-backface-visibility: hidden;
}
.bounce-enter-active {
  animation: bounce-in 5s;
}
@keyframes bounce-in {
  0% {
    /* transform: scale(0); */
    /* transform: translateX(-50vw);
     */
      background: url("../../static/images/scroll.png") 0 top repeat;
  }
  100% {
    /* transform: scale(1); */
    /* transform: translateX(0); */
     background: url("../../static/images/scroll.png") -50vw top repeat;
  }
}
.weui-icon_toast{
  margin-top: 40vh !important;
}
.weui-toast{
  top: 0 !important;
  width: 100vw;
  bottom: 0;
}
.weui-toast__content{
  font-size: 16px;
}
.load{
  width: 100vw;
  /* height: 100vh; */
  background-color: rgba(17, 17, 17, 0.7);
  z-index: 100;
  position: fixed;
}
.weui-toast{

}
.success{
  position: fixed;
  width: 100vw;
  top: 0;
  height: 100vh;
  background: url("../../static/images/success.png") center center no-repeat;
  background-size: 5.20rem 2.12rem;
}
.center-back{
  width: 100vw;
  /* height: 100vh; */
  background-color: red;
  position: relative;
}
.scroll-center{
  width: 100vw;
  /* position: absolute; */
  /* top: 0px; */
  /* bottom: 1.1rem; */
  /* overflow-y: scroll; */
  margin-bottom: 1.1rem;
  background-color: rgb(254, 248, 248);
}

.center-img{
 
}
.top-img{
  position: relative;
  width: 100vw;
  height: 10.78rem;
  background: url("../../static/images/top1.png") left top no-repeat;
  background-size: 100vw 10.78rem;
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
  font-size: 14px;
  color:#fff;
}
.time1{
  left: 2.566rem;
}
.time2{
  left: 3.288rem;
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
  left: 4.025rem;
}
.time4{
  left: 4.752rem;
}
.ways{
  margin-top: 0.5rem;
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
  /* text-align: left; */
  color:#000;
}
.l-name2{ 
  color:rgb(52, 52, 52);
  width: 100%;
  height: 0.42rem;
  line-height: 0.42rem;
  font-size: 0.35rem;
  padding: 0 0.36rem;
  font-weight: bold;
  /* text-align: left; */
}
.price{
  height: 0.93rem;
  padding: 0  0.46rem 0 0.36rem;
  font-size: 0.24rem;
  padding-top: 0.5rem;
  /* text-align: left; */
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
  text-align: left;
}
.tip-money{
  /* width: 2.65rem; */
  margin: 0.15rem  0.36rem;
  /* height: 0.21rem; */
  /* background: url("../../static/images/tip1.png") left top no-repeat; */
  /* background-size: 2.65rem 0.21rem; */
  font-size: 0.20rem;
  color:rgb(155, 155, 155);
  /* text-align: left; */
}
.tip-img{
   /* background: url("../../static/images/tip2.png") left top no-repeat; */
  /* background-size: 2.65rem 0.21rem; */
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
  text-align: center;
}
.process-line{
  width: 6.25rem;
  height: 0.28rem;
  background: url("../../static/images/progress-line2.png") left top no-repeat;
  background-size: 6.25rem 0.28rem;
  position: absolute;
  top: 0.80rem;
  left: 0.62rem;
  overflow: hidden;
 -webkit-border-radius:0.28rem;
      -moz-border-radius:0.28rem;
      -ms-border-radius:0.28rem;
        -o-border-radius:0.28rem;
          border-radius:0.28rem;
}
.process-line-show,.process-line-show2{
  background-color: rgba(253, 157, 150, 1);
  height: 0.28rem;
  overflow: hidden;
  -webkit-border-radius:0.28rem;
      -moz-border-radius:0.28rem;
      -ms-border-radius:0.28rem;
        -o-border-radius:0.28rem;
          border-radius:0.28rem;
}
.process-line-show2{
  position: absolute;
  left: 0;
  top: 0;
}
.process-line-show3{
  background-color: rgba(255, 255, 255, 0);
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
}
.scroll-run{
  /* position: absolute; */
  z-index: -1;
  width: 200vw;
  height: 0.28rem;
  background: url("../../static/images/scroll.png") left top repeat;
}
.money1,.money2{
  color:rgb(255, 255, 255);
  font-size: 0.16rem;
  /* font-weight: bold; */
  position:absolute;
  left: 2.85rem;
  top:0.06rem;
  height: 0.18rem;
  width: 0.5rem;
  font-size: 0.18rem;
  line-height: 0.18rem;
}
.money2{
  left:5.41rem;
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
  /* text-align: left; */
  width: 0.90rem;
  height: 0.38rem;
  position: absolute;
  top: 1.42rem;
  left: 0.70rem;
  font-size: 0.26rem;
  font-weight: bold;
  color:rgb(154, 154, 154)
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
  position: fixed;
  width: 100vw;
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
