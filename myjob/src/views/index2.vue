<template>
    <div class="center-back">
      <div class="scroll-center">
        <div class="center-img">
          <div class="top-img">
            <div class="rule" @click="toRule"></div>
            <div class="time1">{{fn3(tdate.d,2)}}</div>
            <div class="time2">{{fn3(tdate.h,2)}}</div>
            <div class="time3">{{fn3(tdate.m,2)}}</div>
            <div class="time4">{{fn3(tdate.s,2)}}</div>
            <div class="text-times">我的剩余投票数：{{tapNum}}</div>
          </div>
        </div>
        <div class="ways"></div>
        <div class="commodity">
          <div class="com-l">
            <div class="l-name">
              <span class="l-text1">Swisse葡萄籽片 14250mg 180片</span>
            </div>
            <div class="l-name2">红润美肌“小能手”</div>
            <div class="price">原价：￥168</div>
          </div>
          <div class="com-r"></div>
        </div>
      </div>
       <div class="btn-bottom">
         <div class="btn-l"></div>
         <div class="btn-r"></div>
       </div>
    </div>
</template>

<script>
import axios from "axios";
// import { setInterval } from 'timers';
export default {
  data() {
    return {
     tdate:{
       d:0,
       h:0,
       m:0,
       s:0
     },
     tapNum: 9
    };
  },
  created() {
      setInterval(this.getDate,1000);
  },
  methods: {
   toRule(){
     alert(1)
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
  width: 100vw;
  height: 7.97rem;
  padding-top: 1.04rem;
}
.com-l,.com-r{
  float: left;
  width: 50vw;
  height: 3.42rem;
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
  padding-top: 0.3rem;
  text-align: left;
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
