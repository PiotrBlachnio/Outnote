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

.note__input--title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;

  @include inputSettings;
  @include mq {
    font-size: 1.6rem;
  }
}
</style>
