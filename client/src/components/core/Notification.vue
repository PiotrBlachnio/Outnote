<template>
  <transition name="slide">
    <div class="notification" v-if="isActive" :class="'notification--' + type">
      <span class="notification__content">
        <slot />
      </span>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      required: false,
      default: false
    },
    activeDuration: {
      type: Number,
      required: false,
      default: 3000
    },
    type: {
      type: String,
      required: true,
      validator(value) {
        return ['info', 'error', 'success'].includes(value);
      }
    }
  },
  data() {
    return {
      isActive: false
    };
  },
  watch: {
    active() {
      this.actiateNotification();
    }
  },
  methods: {
    actiateNotification() {
      this.isActive = true;

      setTimeout(() => {
        this.isActive = false;
        this.$emit('closed');
      }, this.activeDuration || 3000);
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
    border-color: #33b5e5;
  }

  &--error {
    border-color: #ff4444;
  }

  &--success {
    border-color: #00c851;
  }

  &__content {
    color: #ddd;
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
