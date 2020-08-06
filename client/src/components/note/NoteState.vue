<template>
  <div class="note__state" :class="{ 'note__state--active': isVisible }">
    Saved <i class="fas fa-check"></i>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.note__state {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0.5rem;
  text-align: center;
  color: $color1;
  margin: -4rem 0;
  transform: translateY(-2rem);
  transition: transform 0.35s;

  &--active {
    transform: translateY(0);
  }

  @include mq {
    margin: -2rem 0;
  }
}
</style>
