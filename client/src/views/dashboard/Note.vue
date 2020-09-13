<template>
  <div style="height: 100%;">
    <form class="note" @submit.prevent v-if="doesNoteExist">
      <note-state :isVisible="isStateVisible" />

      <!-- <note-title @input="cacheNote('title')" v-model="note.title" /> -->

      <!-- <div class="note__divider"></div> -->

      <note-content @input="cacheNote('content')" v-model="note.content" />

      <!-- <div class="note__divider"></div>

      <note-tags
        :propTags="note.tags"
        @tagSeparated="cacheNote('tags')"
        @remove-tag="tag => removeTag(tag)"
      />

      <div class="note__divider"></div>

      <note-checkbox
        :checked="note.isPrivate"
        @change="
          note.isPrivate = !note.isPrivate;
          cacheNote('isPrivate');
        "
      /> -->
    </form>

    <div class="note--doesnt-exist" v-else>
      Note does not exist.
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
// import NoteTitle from '@/components/note/NoteTitleInput';
import NoteContent from '@/components/note/NoteContentInput';
// import NoteTags from '@/components/note/NoteTagsComponent';
import NoteState from '@/components/note/NoteState';
// import NoteCheckbox from '@/components/note/NoteCheckbox';

export default {
  data() {
    return {
      doesNoteExist: true,
      isStateVisible: false,
      note: {
        title: '',
        content: '',
        tags: [],
        isPrivate: false
      }
    };
  },
  components: {
    NoteState,
    // NoteTitle,
    NoteContent
    // NoteTags,
    // NoteCheckbox
  },
  created() {
    this.reloadNote();
  },
  methods: {
    removeTag(tag) {
      const tagIndex = this.note.tags.indexOf(tag);

      this.note.tags.splice(tagIndex, 1);
      this.cacheNote('tags');
    },
    cacheNote: _.debounce(function(field) {
      this.$store.dispatch('saveNote', {
        note: this.note,
        field: field,
        data: this.note[field]
      });
      this.isStateVisible = true;
      setTimeout(() => (this.isStateVisible = false), 1500);
    }, 1000),
    async reloadNote() {
      const { categoryId, noteId } = this.$route.params;
      const cache = this.$store.state.cache.categories[categoryId].notes;

      if (!(cache && cache[noteId])) {
        const exec = await this.$store.dispatch('fetchSingleNote', noteId);

        if (exec.data.error.id === 600) {
          this.doesNoteExist = false;
        } else {
          this.note = exec.data;
        }
      } else {
        this.note = cache[noteId];
      }
    }
  },
  watch: {
    $route() {
      this.reloadNote();
    }
  }
};
</script>

<style lang="scss" scoped>
.note {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  position: relative;

  &--doesnt-exist {
    color: $noteDoesntExistColor;
  }

  &__divider {
    width: 100%;
    height: 1px;
    margin: 0.5rem 0;
    background-color: $noteDividerColor;
  }
}
</style>
