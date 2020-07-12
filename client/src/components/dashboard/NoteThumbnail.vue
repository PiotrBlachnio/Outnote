<template>
  <div class="note-thumbnail">
    <span class="note-thumbnail__title">{{ title }}</span>
    <span class="note-thumbnail__content">{{ content }}</span>

    <div class="note-thumbnail__tags">
      <span class="note-thumbnail__tag" v-for="tag in tags" :key="tag">
        #{{ tag }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    tags: {
      type: Array,
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>
.note-thumbnail {
  width: 100%;
  color: #eee;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.25rem;
  background-color: #141414;

  &:first-of-type {
    margin-top: 1rem;
  }

  &__title {
    color: #e0e0e0;
    font-weight: bold;
  }

  &__content {
    color: #bdbdbd;
  }

  &__tags {}


  &__tag {
    font-size: 0.75rem;
    padding: 0.05rem 0.25rem;
    margin-right: 0.25rem;
    border-radius: 0.25rem;
    background-color: purple;
  }
}
</style>
