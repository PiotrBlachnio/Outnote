<template>
  <div class="dashboard">
    <notification />
    <navigation
      :categories="categories"
      @selectedCategory="showSubmenu"
      @navigationClosed="submenuActive = false"
    />
    <sub-navigation :is-active="submenuActive" :notes="notes" />

    <div class="dashboard__content"></div>

    <button class="dashboard__add-button"><span>+</span></button>
  </div>
</template>

<script>
import { errors } from '../auth/consts';
import Navigation from '@/components/core/Navigation';
import SubNavigation from '@/components/dashboard/SubNavigation.vue';

export default {
  components: {
    Navigation,
    SubNavigation
  },
  created() {
    // this.fetchCategories();
    this.fetchNotes();
  },
  data() {
    return {
      submenuActive: false,
      categories: [],
      notes: []
    };
  },
  methods: {
    showSubmenu(category) {
      this.notes = this.$store.state.notes.notes.filter(
        note => note.categoryId === category._id
      );
      this.submenuActive = true;
    },
    async fetchCategories() {
      const execute = await this.$store.dispatch('notesCategoriesCache');

      if (execute.success) {
        this.categories = execute.data;
      } else {
        console.log(execute);
        if (execute.data.error.id === 101) {
          this.$store.dispatch('authSignOut');
        }

        this.$store.dispatch('notificationActivate', {
          content: errors[execute.data.error.id].message,
          type: 'error'
        });
      }
    },
    async fetchNotes() {
      const execute = await this.$store.dispatch('notesCache');

      if (!execute.success) {
        this.$store.dispatch('notificationActivate', {
          content: errors[execute.data.error.id].message,
          type: 'error'
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  display: flex;
  position: relative;

  &__content {
    width: auto;
  }

  &__add-button {
    width: 64px;
    height: 64px;
    display: flex;
    align-self: center;
    justify-content: center;
    border-radius: 50%;
    color: #eee;
    font-size: 3rem;
    padding: 1rem;
    background-color: $success;
    position: absolute;
    bottom: 2rem;
    right: 2rem;
  }
}
</style>
