<template>
  <div class="note-thumbnail" @mouseleave="isDropdownActive = false">
    <router-link
      class="note-thumbnail__redirect"
      :to="`/dashboard/note/${note.categoryId}/${note._id}`"
    >
      <span class="note-thumbnail__title">{{ note.title }}</span>
      <span class="note-thumbnail__content">{{ noteContent }}</span>

      <div class="note-thumbnail__tags">
        <span class="note-thumbnail__tag" v-for="tag in note.tags" :key="tag">
          #{{ tag }}
        </span>
      </div>
    </router-link>

    <div class="note-thumbnail__dropdown">
      <button
        class="note-thumbnail__dropdown-toggle-button"
        @click="toggleDropdown()"
      >
        <i class="fas fa-ellipsis-h"></i>
      </button>

      <ul
        class="note-thumbnail__dropdown-menu"
        :class="{ 'note-thumbnail__dropdown-menu--active': isDropdownActive }"
      >
        <li class="note-thumbnail__dropdown-element">
          <button class="note-thumbnail__dropdown-button">
            <i
              class="fas fa-edit 
            note-thumbnail__dropdown-icon 
            note-thumbnail__dropdown-icon--edit"
            ></i>
            <span>Edit</span>
          </button>
        </li>
        <li class="note-thumbnail__dropdown-element">
          <button class="note-thumbnail__dropdown-button">
            <i
              class="fas fa-heading
            note-thumbnail__dropdown-icon 
            note-thumbnail__dropdown-icon--edit"
            ></i>
            <span>Edit title</span>
          </button>
        </li>
        <li class="note-thumbnail__dropdown-element">
          <button class="note-thumbnail__dropdown-button">
            <i
              class="fas fa-tags 
            note-thumbnail__dropdown-icon 
            note-thumbnail__dropdown-icon--edit"
            ></i>
            <span>Edit tags</span>
          </button>
        </li>
        <li class="note-thumbnail__dropdown-element">
          <button class="note-thumbnail__dropdown-button">
            <i
              class="fas fa-trash 
            note-thumbnail__dropdown-icon 
            note-thumbnail__dropdown-icon--remove"
            ></i>
            <span>Remove</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap';

export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isDropdownActive: false
    };
  },
  computed: {
    noteContent() {
      const { content } = this.note;

      return content.length > 64
        ? content.substr(0, 64).concat(' [...]')
        : content;
    }
  },
  methods: {
    toggleDropdown() {
      this.isDropdownActive = !this.isDropdownActive;

      gsap.fromTo(
        '.note-thumbnail__dropdown-element',
        this.isDropdownActive ? 0.1 : 0,
        { opacity: 0, x: '-0.75rem' },
        { stagger: 0.1, opacity: 1, x: 0 }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.note-thumbnail {
  &__redirect {
    cursor: pointer;
    width: 100%;
    color: #eee;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    position: relative;
    margin-bottom: 1rem;
    border-radius: 0.25rem;
    background-color: #141414;

    &:first-of-type {
      margin-top: 1rem;
    }
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

  &__dropdown {
    top: 0;
    right: 0.5rem;
    z-index: 10;
    opacity: 0;
    text-align: right;
    padding: 0.5rem;
    position: absolute;
    transition: opacity 0.2s;
  }

  &:hover &__dropdown {
    opacity: 1;
  }

  &__dropdown-toggle-button {
    color: #eee;
  }

  &__dropdown-menu {
    max-height: 0;
    overflow-y: hidden;

    &--active {
      max-height: 100px;
    }
  }

  &__dropdown-element {
    color: #eee;
    text-align: left;
    font-size: 0.75rem;
    border-radius: 0.25rem;
    margin-bottom: 1px;
    background-color: rgb(34, 34, 34);
  }

  &__dropdown-button {
    width: 100%;
    text-align: left;
    padding: 0.25rem 0.5rem;
  }

  &__dropdown-icon {
    margin-right: 0.5rem;

    &--remove {
      color: $error;
    }
  }
}
</style>
