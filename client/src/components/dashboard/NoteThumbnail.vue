<template>
  <router-link
    class="note-thumbnail"
    :to="`/dashboard/note/${note.categoryId}/${note._id}`"
  >
    <span class="note-thumbnail__title">{{ note.title }}</span>
    <span class="note-thumbnail__content">{{ note.content }}</span>

    <div class="note-thumbnail__tags">
      <span class="note-thumbnail__tag" v-for="tag in note.tags" :key="tag">
        #{{ tag }}
      </span>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.note-thumbnail {
  cursor: pointer;
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
    margin-top: 1rem;
    color: #bdbdbd;
    font-size: 0.85rem;
  }

  &__tags {
    margin-top: 0.5rem;
  }

  &__tag {
    font-size: 0.75rem;
    padding: 0.05rem 0.25rem;
    margin-right: 0.25rem;
    border-radius: 0.25rem;
    background-color: purple;
  }
}
</style>
