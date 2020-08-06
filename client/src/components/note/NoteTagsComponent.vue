<template>
  <div class="note__tags-component">
    <input
      type="text"
      class="note__input"
      placeholder="New tag (separate tags using comma)"
      v-model="tagContent"
      @keyup.188="separateTags"
    />

    <div class="note__tags" type="text">
      <button
        class="note__tag"
        v-for="tag in propTags"
        :key="tag"
        @click="$emit('remove-tag', tag)"
      >
        {{ tag }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    propTags: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      tagContent: '',
      tags: []
    };
  },
  created() {
    this.tags = this.propTags;
  },
  methods: {
    separateTags() {
      if (this.tagContent.length < 3) return;

      this.tags.push(this.tagContent.slice(0, -1));
      this.tagContent = '';
      this.$emit('tagSeparated');
    }
  }
};
</script>

<style lang="scss" scoped>
@import './inputSettings';

.note {
  &__input {
    @include inputSettings;
  }

  &__tags {
    display: flex;
    margin-top: 0.5rem;
  }

  &__tag {
    cursor: pointer;
    white-space: nowrap;
    display: flex;
    align-self: center;
    padding: 0.25rem 0.5rem;
    margin-right: 0.25rem;
    font-size: 0.75rem;
    color: $noteTagColor;
    border-radius: 0.25rem;
    background-color: $noteTagBackground;
    display: inline-block;
    transition: background-color 0.2s;

    &:hover {
      background-color: $noteTagHoverRemoveColor;
    }
  }
}
</style>
