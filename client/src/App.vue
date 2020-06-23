<template>
  <div id="app" data-theme="dark">
    <!-- <navigation /> -->
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
// import Navigation from './components/core/Navigation';
// TODO: move navigation to other view/component

export default {
  components: {
    // Navigation
  }
};
</script>

<style lang="scss">
@import './style/_base';

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.9s;
}
.fade-enter-active {
  opacity: 1;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

#app {
  height: 100vh;
  background-color: $backgroundColor;
}
</style>
