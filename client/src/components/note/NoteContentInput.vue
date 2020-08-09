<template>
  <textarea
    name="note-content"
    id="note-content"
    placeholder="Note content..."
    class="note__textarea"
    spellcheck="false"
    @input="$emit('input', $event.target.value)"
    :value="value"
  ></textarea>
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

.note__textarea {
  flex: 2;
  resize: vertical;
  letter-spacing: 0.05rem;

  &::-webkit-scrollbar {
    display: none;
  }

  @include inputSettings;
}
</style>
