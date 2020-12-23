<template>
  <div>
<img src="../../src/assets/go.png" height="500px" width="450px">
<br>
<v-btn
  elevation="20"
  x-large
  @click="onBegin"
  style="position: relative ;right: 0.1%">Let's Go</v-btn>
    </div>
  </template>
<script>
    export default {
        name: 'App',
        methods:{
            onBegin () {
                this.$router.push({ path: '/login' })
            }
        }
    }
</script>
