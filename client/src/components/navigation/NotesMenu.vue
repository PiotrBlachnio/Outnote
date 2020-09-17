<template>
  <div class="notes">
    <span class="notes__empty-message" v-if="!doesNotesExist">
      Nothing to show...
    </span>

    <create-new-item
      class="notes__add-new"
      mode="note"
      :categoryId="categoryId"
      @added-note="notesKey += 1"
    />

    <ul class="notes__list" v-if="doesNotesExist" :key="notesKey">
      <li class="notes__element" v-for="note in notes" :key="note._id">
        <a
          href="#"
          @click.prevent="$emit('selected-note', note._id)"
          class="notes__note"
        >
          <p class="notes__title">{{ note.title }}</p>
          <span class="notes__content" v-if="note.content">
            {{
              note.content.length > 32
                ? note.content.substr(0, 32).concat('...')
                : note.content
            }}
          </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import gsap from 'gsap';
import CreateNewItem from './CreateNewItem';

export default {
  props: {
    categoryId: {
      type: String,
      required: true
    }
  },
  components: {
    CreateNewItem
  },
  data() {
    return {
      notes: {},
      notesKey: 0
    };
  },
  watch: {
    notes() {
      if (this.doesNotesExist) {
        this.$nextTick(() => {
          gsap.fromTo(
            '.notes__element',
            0.5,
            { x: '-2.5rem', opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.1 }
          );
        });
      } else {
        gsap.fromTo(
          '.notes__empty-message, .notes__add-new',
          0.5,
          { x: '-2.5rem', opacity: 0 },
          { x: 0, opacity: 1 }
        );
      }
    }
  },
  created() {
    this.fetchnotes();
  },
  methods: {
    async fetchnotes() {
      const cachedNoted = this.$store.state.cache.categories[this.categoryId]
        .notes;

      if (!cachedNoted) {
        const response = await this.$store.dispatch(
          'fetchNotes',
          this.categoryId
        );

        this.notes = response.data;
      } else {
        this.notes = cachedNoted;
      }
    }
  },
  computed: {
    doesNotesExist() {
      return Object.entries(this.notes).length > 1;
    }
  }
};
</script>

<style lang="scss" scoped>
.notes {
  height: 100%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0.25rem;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: $color3;
  }

  &__note {
    display: block;
    padding: 1rem 2rem;
    white-space: nowrap;
    color: $subNavigationLinkColor;
    transition: background-color 0.25s;

    &:hover {
      background-color: $color5;
    }
  }

  &__title {
    margin: 0;
  }

  &__content {
    display: block;
    margin-top: 0.5rem;
    color: $color3;
  }

  &__empty-message {
    display: block;
    text-align: center;
    color: $color3;
    padding: 1rem;
  }
}
</style>
