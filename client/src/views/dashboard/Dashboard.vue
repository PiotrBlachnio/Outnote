<template>
  <div class="dashboard">
    <navigation
      :categories="categories"
      @selected-category="showSubmenu"
      @navigationClosed="submenuActive = false"
    />
    <sub-navigation :is-active="submenuActive" :notes="notes" />

    <div class="dashboard__content">
      <router-view />
    </div>
  </div>
</template>

<script>
import { errors } from '@/assets/consts';
import Navigation from '@/components/core/Navigation';
import SubNavigation from '@/components/dashboard/SubNavigation.vue';

export default {
  components: {
    Navigation,
    SubNavigation
  },
  async created() {
    this.fetchUser();
    this.fetchCategories();
  },
  data() {
    return {
      submenuActive: false,
      categories: {},
      notes: {}
    };
  },
  methods: {
    async showSubmenu(category) {
      const notes = this.$store.state.cache.categories[category._id].notes;

      if (!notes) {
        const exec = await this.$store.dispatch('fetchNotes', category._id);

        if (!exec.success) {
          this.$store.dispatch('notificationActivate', {
            content: errors[exec.data.error.id].message,
            type: 'error'
          });
        } else {
          this.notes = exec.data;
        }
      } else {
        this.notes = notes;
      }

      this.submenuActive = true;
    },
    async fetchUser() {
      if (!this.$store.getters.doesUserExist) {
        const execute = await this.$store.dispatch('fetchUserData');

        if (!execute.success) {
          this.$store.dispatch('notificationActivate', {
            content: errors[execute.data.error.id].message,
            type: 'error'
          });
        }
      }
    },
    async fetchCategories() {
      if (!this.$store.getters.areCategoriesCached) {
        const execute = await this.$store.dispatch('fetchNotesCategories');

        if (execute.success) {
          this.categories = this.$store.state.cache.categories;
        } else {
          if (execute.data.error.id === 101) {
            this.$store.dispatch('signOut');
          }

          this.$store.dispatch('notificationActivate', {
            content: errors[execute.data.error.id].message,
            type: 'error'
          });
        }
      } else {
        this.categories = this.$store.state.cache.categories;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  display: flex;

  &__content {
    // width: 100%;
    flex-grow: 1;
    padding: 2rem;
    max-width: 100%;
    height: 100vh;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }

    @include mq {
      padding: 2rem;
    }
  }
}
</style>
