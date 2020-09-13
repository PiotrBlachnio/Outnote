<template>
  <textarea
    name="note-content"
    id="note-content"
    placeholder="Note content..."
    class="note__textarea"
    spellcheck="false"
    autofocus
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
.note__textarea {
  padding: 2rem 3rem;
  letter-spacing: 0.05rem;
  width: 100%;
  height: 100%;
  border-radius: 0.25rem;
  color: $noteInputColor;
  border: none;
  background-color: transparent;
  transition: background-color 0.2s;

  &::placeholder {
    color: $noteInputPlaceholderColor;
    transition: color 0.2s;
  }

  &:focus::placeholder {
    color: $noteInputPlaceholderFocusColor;
  }

  &:focus {
    outline: none;
  }

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
