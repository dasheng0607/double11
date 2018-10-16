<template>
    <div class="center-back">
      <div class="scroll-center">
        <div class="center-img">
          <div class="top-img">
            <div class="rule" @click="toRule"></div>
            <div class="time1">00</div>
            <div class="time2">00</div>
            <div class="time3">00</div>
            <div class="time4">00</div>
            <div class="text-times">我的剩余投票数：9</div>
          </div>
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
export default {
  data() {
    return {
     
    };
  },
  created() {
      
  },
  methods: {
   toRule(){
     alert(1)
   }
  }
};
</script>
<style scoped>
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
  background: royalblue;
  overflow-y: scroll;
}
.top-img{
  position: relative;
  width: 100vw;
  height: 11.53rem;
  background: url("../../static/images/top.png") left top no-repeat #fff;
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

.center-img{
  height: 1000px;
  background-color: fuchsia;
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
