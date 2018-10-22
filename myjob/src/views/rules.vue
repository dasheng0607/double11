<template>
    <div id="singIn">
        <div class="back" @click="back"></div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "rules",
  data() {
    return {
      
    }
  },
  mounted() {},
  methods: {
    back(){
      let query ={};
     for (const key in this.$route.query) {
       query[key] = this.$route.query[key];
     }
      this.$router.push({
            name:'index',
            query
          }); 
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
#singIn{
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url("../../static/images/rules.png") center 0.2rem no-repeat rgb(255, 239, 232);
  background-size: 6.85rem 9.91rem;
}
.back{
  width: 2.20rem;
  height: 0.37rem;
  position: absolute;
  left: 0;
  top: 0.2rem;
}
</style>
