<template>
  <Employees></Employees>
</template>

<script>
import Employees from './components/Employees.vue'

export default {
  name: 'App',
  components: {
    Employees
  }
}
</script>

<style>
* {
  color: white;
  background-color: #2c3e50;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  margin-top: 60px;
  background-color: #2c3e50;
}


@import'~bootstrap/dist/css/bootstrap.css'
</style>
