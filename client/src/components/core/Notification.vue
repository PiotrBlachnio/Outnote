<template>
  <transition name="slide">
    <div
      ref="notification"
      class="notification"
      v-if="isActive"
      :class="'notification--' + type"
    >
      <div class="notification__content" v-html="notificationContent"></div>
    </div>
  </transition>
</template>

<script>
export default {
  computed: {
    isActive() {
      return this.$store.state.notification.active;
    },
    notificationContent() {
      return this.$store.state.notification.content;
    },
    type() {
      return this.$store.state.notification.type;
    }
  }
};
</script>

<style lang="scss" scoped>
.notification {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 1rem;
  transition: all 0.2s ease-in-out;
  border-radius: 0.25rem;
  border-left: 0.25rem solid $primary;
  background-color: $notificationBackground;

  &--info {
    border-color: $notificationBorderInfo;
  }

  &--error {
    border-color: $notificationBorderError;
  }

  &--success {
    border-color: $notificationBorderSuccess;
  }

  &__content {
    color: $notificationContentColor;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.4s ease-out, opacity 0.6s;
}
.slide-enter-active {
  opacity: 1;
  transform: translateX(0);
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-50%);
}
</style>
