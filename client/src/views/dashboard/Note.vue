<template>
  <div>
    {{ note.content }}
  </div>
</template>

<script>
export default {
  computed: {
    note() {
      return this.$store.state.notes.categories
        .find(c => c._id == this.$route.params.categoryId)
        .notes.find(n => n._id == this.$route.params.noteId);
    }
  }
};
</script>

<style lang="scss" scoped></style>
