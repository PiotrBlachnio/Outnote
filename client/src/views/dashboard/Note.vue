<template>
  <div class="note">
    {{ note.content }}
  </div>
</template>

<script>
import gsap from 'gsap';

export default {
  watch: {
    $route() {
      gsap.fromTo(
        '.note',
        0.3,
        { opacity: 0, x: '-3rem' },
        { opacity: 1, x: 0 }
      );
    }
  },

  computed: {
    note() {
      return this.$store.state.notes.categories
        .find(c => c._id == this.$route.params.categoryId)
        .notes.find(n => n._id == this.$route.params.noteId);
    }
  }
};
</script>

<style lang="scss" scoped>
.note {
  color: #eee;
}
</style>
