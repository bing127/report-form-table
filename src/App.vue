<template>
  <div id="app">
    <design />
  </div>
</template>

<script>
import Design from "./components/test"
export default {
  name: 'app',
  components: {
    Design
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
@import url("./style/normalize.css");
html,body{
  height: 100%;
}
#app{
  height: 100%;
}
</style>
