<template>
  <div class="sub-navigation" :class="{ 'sub-navigation--active': isActive }">
    <p class="sub-navigation__title" v-if="isActive && mode === 'categories'">
      Your categories
    </p>
    <p class="sub-navigation__title" v-else-if="isActive">
      <button class="sub-navigation__back-button" @click="mode = 'categories'">
        <i class="fas fa-chevron-left"></i>
      </button>
      {{ categoryName }}'s notes
    </p>

    <notes-menu
      v-if="isActive && mode === 'notes'"
      :categoryId="categoryId"
      @selected-note="openNote"
    />
    <categories-menu
      v-else-if="isActive && mode === 'categories'"
      @selected-category="expandNotes"
    />
  </div>
</template>

<script>
import NotesMenu from './NotesMenu';
import CategoriesMenu from './CategoriesMenu';

export default {
  props: {
    isActive: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  components: {
    NotesMenu,
    CategoriesMenu
  },
  data() {
    return {
      categoryId: '',
      mode: 'categories'
    };
  },
  methods: {
    expandNotes(categoryId) {
      this.categoryId = categoryId;
      this.mode = 'notes';
    },
    openNote(noteId) {
      this.$router.push(`/dashboard/note/${this.categoryId}/${noteId}`);
    }
  },
  watch: {
    isActive(state) {
      if (!state) {
        this.mode = 'categories';
      }
    }
  },
  computed: {
    categoryName() {
      return this.$store.state.cache.categories[this.categoryId].name;
    }
  }
};
</script>

<style lang="scss" scoped>
.sub-navigation {
  order: 1;
  height: 0;
  max-height: calc(100% - 4rem);
  transition: height 0.25s;

  @include mq {
    order: 2;
    width: 0;
    max-height: 100vh;
    transition: width 0.25s;
  }

  &--active {
    height: calc(100vh - 4rem);
    border-bottom: 1px solid $color3;

    @include mq {
      width: 320px;
      height: 100%;
      border-bottom: none;
      border-left: 1px solid $color3;
    }
  }

  &__title {
    margin: 2rem 0;
    text-align: center;
    font-weight: bold;
    color: $color2;
    position: relative;
    white-space: nowrap;
  }

  &__back-button {
    color: $color1;
    left: 2rem;
    top: 50%;
    font-size: 1.25rem;
    transform: translateY(-50%);
    position: absolute;
  }
}
</style>
