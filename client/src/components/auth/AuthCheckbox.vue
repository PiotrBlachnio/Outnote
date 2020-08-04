<template>
  <div class="auth__checkbox">
    <input
      type="checkbox"
      class="auth__field"
      :id="id"
      v-model="isChecked"
      @change="$emit('change', isChecked)"
    />
    <label :for="id" class="auth__label" v-html="label"></label>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isChecked: false
    };
  }
};
</script>

<style lang="scss" scoped>
.auth__checkbox {
  margin-bottom: 2rem;
}

.auth__label {
  color: $baseInputFieldColor;
  font-size: 0.8rem;
  padding-left: 0.5rem;
}

.auth__field {
  margin: 0;
  transform: translateY(1px);
}
</style>
