<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      theme: this.$store.state.app.themeColor
    }
  }
}
</script>
