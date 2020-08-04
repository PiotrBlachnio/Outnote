<template>
  <div id="app" data-theme="dark">
    <notification />
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import './style/_base';

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

#app {
  height: 100vh;
  background-color: $appBackgroundColor;
}
</style>
