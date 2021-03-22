<template>
  <div>
    <router-view/>  
  </div>
  
  <!-- <div id="nav">
    <router-link to="/">HOME</router-link>
    <br>
    <router-link to="/login">LOGIN</router-link>
  </div> -->
</template>

<script>



export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
