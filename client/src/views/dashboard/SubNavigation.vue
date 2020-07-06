<template>
  <div class="sub-navigation" :class="{ 'sub-navigation--active': isActive }">
    <input type="text" class="sub-navigation__input" placeholder="Search..." />

    <note-thumbnail
      class="sub-navigation__note-thumbnail"
      v-for="note in notes"
      :key="note.id"
      :title="note.title"
      :tags="note.tags"
      :description="note.description"
    />
  </div>
</template>

<script>
import gsap from 'gsap';
import NoteThumbnail from '@/components/dashboard/NoteThumbnail';

export default {
  props: {
    isActive: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  components: {
    NoteThumbnail
  },
  data() {
    return {
      notes: [
        {
          id: 1,
          title: 'Note title',
          description: 'XDDDDD XDDDDDDd XDDDDDDD',
          tags: ['work', 'school']
        },
        {
          id: 2,
          title: 'Note title',
          description: 'XDDDDD XDDDDDDd XDDDDDDD',
          tags: ['life', 'school']
        },
        {
          id: 3,
          title: 'Note title',
          description: 'XDDDDD XDDDDDDd XDDDDDDD',
          tags: ['homework']
        }
      ]
    };
  },
  watch: {
    isActive(state) {
      const animation = gsap.fromTo(
        '.sub-navigation__note-thumbnail',
        state ? 0.5 : 0,
        { opacity: 0, x: '-2rem' },
        { stagger: 0.1, x: 0, opacity: 1, delay: 0.2 }
      );

      if (state) {
        setTimeout(() => {
          animation.play();
        }, 1000);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.sub-navigation {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  position: fixed;
  z-index: 5;
  background-color: lighten($navigationBackground, 1%);

  @include mq {
    width: 420px;
    position: inherit;
  }

  &--active {
  }

  &__input {
    width: 100%;
    color: #eee;
    padding: 1rem;
    border-radius: 0.25rem;
    border: 1px solid transparent;
    background-color: #1c1c1c;
    transition: border-color 0.2s;

    &:focus {
      border-color: $primary;
    }
  }

  &__note-thumbnail {
    opacity: 0;
  }
}
</style>
