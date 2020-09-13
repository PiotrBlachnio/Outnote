<template>
  <div class="notes">
    <ul class="notes__list">
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

export default {
  props: {
    categoryId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      notes: {}
    };
  },
  mounted() {
    gsap.fromTo(
      '.notes__element',
      0.5,
      { x: '-2.5rem', opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.1 }
    );
  },
  created() {
    this.fetchnotes();
  },
  methods: {
    fetchnotes() {
      this.notes = this.$store.state.cache.categories[this.categoryId].notes;
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
}
</style>
