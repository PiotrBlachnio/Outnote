<template>
  <input
    class="note__input note__input--title"
    type="text"
    placeholder="Note title"
    @input="$emit('input', $event.target.value)"
    :value="value"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import './inputSettings';

.note__input {
  &--title {
    font-size: 1.5rem;
  }

  @include inputSettings;
  @include mq {
    &--title {
      font-size: 2rem;
    }
  }
}
</style>
