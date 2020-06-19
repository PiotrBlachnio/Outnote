<template>
  <div id="app" data-theme="dark">
    <navigation />
    <router-view />
  </div>
</template>

<script>
import Navigation from './components/core/Navigation';

export default {
  components: {
    Navigation
  }
};
</script>

<style lang="scss">
@import './style/_base';

#app {
  height: 100vh;
  background-color: $backgroundColor;
}
</style>
