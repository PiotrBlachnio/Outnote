<template>
  <div class="note__checkbox">
    <input
      type="checkbox"
      id="noteCheckbox"
      :checked="checked"
      @change="$emit('change', $event.target.checked)"
    />
    <label for="noteCheckbox">
      Private note
    </label>
  </div>
</template>

<script>
export default {
  props: {
    checked: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.note__checkbox {
  color: $noteCheckboxColor;
}
</style>
