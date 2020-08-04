<template>
  <form class="create-note" @submit.prevent>
    <input
      class="create-note__input create-note__input--title"
      type="text"
      placeholder="Note title"
      :readonly="readonly"
      v-model="note.title"
    />

    <div class="create-note__divider"></div>

    <textarea
      name="note-content"
      id="note-content"
      placeholder="Note content..."
      class="create-note__textarea"
      spellcheck="false"
      :readonly="readonly"
      v-model="note.content"
    ></textarea>

    <div
      class="create-note__divider"
      v-if="note.tags.length > 0 || !readonly"
    ></div>

    <input
      type="text"
      class="create-note__tag-input"
      placeholder="New tag (separate tags using comma)"
      v-model="tagContent"
      v-if="!readonly"
      @keyup.188="separateTags"
    />

    <div class="create-note__tags" type="text">
      <button
        class="create-note__tag"
        v-for="tag in note.tags"
        :key="tag"
        @click="removeTag(tag)"
      >
        {{ tag }}
      </button>
    </div>

    <div class="create-note__divider" v-if="!readonly"></div>

    <auth-checkbox
      class="create-note__checkbox"
      id="isPrivate"
      v-model="note.isPrivate"
      v-if="!readonly"
      label="<i class='fas fa-lock'></i> Private note"
    />

    <button class="create-note__button" v-if="!readonly">save</button>
  </form>
</template>

<script>
import AuthCheckbox from '@/components/auth/AuthCheckbox';

export default {
  data() {
    return {
      readonly: false,
      tagContent: '',
      isNew: null,
      note: {
        title: '',
        content: '',
        tags: [],
        isPrivate: null
      }
    };
  },
  components: {
    AuthCheckbox
  },
  created() {
    if (this.$route.params.noteId === 'new') {
      this.isNew = true;
    } else {
      this.isNew = false;
    }

    this.reloadNote();
  },
  methods: {
    selectedOption() {},
    separateTags() {
      if (this.tagContent.length < 3) return;

      this.note.tags.push(this.tagContent.slice(0, -1));
      this.tagContent = '';
    },
    removeTag(tag) {
      if (this.readonly) return;
      const tagIndex = this.note.tags.indexOf(tag);

      this.note.tags.splice(tagIndex, 1);
    },
    async reloadNote() {
      if (!this.isNew) {
        const { categoryId, noteId } = this.$route.params;
        const cache = this.$store.state.cache.categories[categoryId].notes;

        if (!(cache && cache[noteId])) {
          const exec = await this.$store.dispatch('fetchSingleNote', noteId);

          if (exec.data.error.id === 600) {
            this.$router.replace(`/dashboard/note/${categoryId}/new`); // todo: FIX THIS SHIT, MVP
          } else {
            this.note = exec.data;
          }
        } else {
          this.note = cache[noteId];
        }
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
@mixin inputSettings {
  width: 100%;
  border-radius: 0.25rem;
  padding: 0.5rem;
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
    background-color: $noteInputFocusBackground;
  }

  &:read-only:focus {
    background-color: transparent;
  }

  @include mq {
    padding: 1rem;
  }
}

.create-note {
  &__select {
    margin-bottom: 2rem;
  }

  &__input {
    &--title {
      font-size: 1.5rem;
    }

    @include inputSettings;
    @include mq {
      &--title {
        font-size: 2rem;
      }
    }
  }

  &__divider {
    width: 100%;
    height: 1px;
    margin: 1rem 0;
    background-color: $noteDividerColor;
  }

  &__textarea {
    height: 60vh;
    resize: vertical;
    letter-spacing: 0.05rem;

    @include inputSettings;
  }

  &__tags {
    display: flex;
    margin-top: 0.5rem;
  }

  &__tag-input {
    @extend .create-note__input;
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

  &__checkbox {
    margin: 1rem 0;
  }

  &__button {
    color: $noteButtonColor;
    font-weight: bold;
    text-transform: uppercase;
    padding: 1rem 2rem;
    border-radius: 0.25rem;
    letter-spacing: 0.1rem;
    background-color: $noteButtonBackground;
  }
}
</style>
