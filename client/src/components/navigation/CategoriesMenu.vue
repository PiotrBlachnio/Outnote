<template>
  <div class="categories">
    <ul class="categories__list">
      <li class="categories__element categories__element--new">
        <a href="#" class="categories__link">
          <i class="fas fa-plus categories__link__icon"></i> Create new
        </a>
      </li>
      <li
        class="categories__element"
        v-for="category in categories"
        :key="category._id"
      >
        <a
          href="#"
          @click.prevent="$emit('selected-category', category._id)"
          class="categories__link"
        >
          {{ category.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import gsap from 'gsap';

export default {
  data() {
    return {
      categories: {}
    };
  },
  mounted() {
    gsap.fromTo(
      '.categories__element',
      0.5,
      { x: '-2.5rem', opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.1 }
    );
  },

  created() {
    this.fetchCategories();
  },
  methods: {
    fetchCategories() {
      this.categories = this.$store.state.cache.categories;
    }
  }
};
</script>

<style lang="scss" scoped>
.categories {
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

  &__element--new {
    border: 1px dashed $color2;

    &:hover {
      border-color: $success;
    }
  }

  &__link {
    display: block;
    padding: 1rem 2rem;
    white-space: nowrap;
    color: $subNavigationLinkColor;
    transition: background-color 0.25s;

    &:hover {
      background-color: $color5;
      border-left: 2px solid $color2;
    }

    &__icon {
      margin-right: 0.5rem;
    }
  }
}
</style>
