<template>
  <div class="dashboard">
    <notification />
    <navigation
      :categories="categories"
      @selectedCategory="showSubmenu"
      @navigationClosed="submenuActive = false"
    />
    <sub-navigation :is-active="submenuActive" :notes="notes" />

    <div class="dashboard__content">
      <router-view />
    </div>

    <button class="dashboard__add-button"><span>+</span></button>
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
    showSubmenu(category) {
      this.notes = this.$store.state.cache.categories[category._id].notes;

      this.submenuActive = true;
    },
    async fetchUser() {
      if (!this.$store.getters.exist) {
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
  position: relative;

  &__content {
    // width: 100%;
    flex-grow: 1;
    padding: 4rem 2rem;
    max-width: 100%;

    @include mq {
      padding: 2rem;
    }
  }

  &__add-button {
    width: 64px;
    height: 64px;
    display: flex;
    align-self: center;
    justify-content: center;
    border-radius: 50%;
    color: $dashboardAddNoteButtonColor;
    font-size: 3rem;
    padding: 1rem;
    background-color: $success;
    position: absolute;
    bottom: 2rem;
    right: 2rem;
  }
}
</style>
