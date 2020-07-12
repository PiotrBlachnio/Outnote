<template>
  <transition name="width">
    <div class="sub-navigation" v-show="isActive">
      <input
        type="text"
        class="sub-navigation__input"
        placeholder="Search..."
      />

      <note-thumbnail
        class="sub-navigation__note-thumbnail"
        v-for="note in notes"
        :key="note._id"
        :title="note.title"
        :tags="note.tags"
        :content="note.content"
      />
    </div>
  </transition>
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
    },
    notes: {
      type: Array,
      required: true
    }
  },
  components: {
    NoteThumbnail
  },
  data() {
    return {};
  },
  watch: {
    notes(state) {
      if (state.length > 0) {
        gsap.fromTo(
          '.sub-navigation__note-thumbnail',
          state ? 0.5 : 0,
          { opacity: 0, x: '-2rem' },
          { stagger: 0.1, x: 0, opacity: 1, delay: 0.2 }
        );
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

  &__input {
    width: 100%;
    color: #eee;
    border-radius: 0.25rem;
    padding: 0.5rem 1rem;
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

.width-enter-active,
.width-leave-active {
  transition: all 0.3s ease;
}
.width-enter-to,
.width-leave {
  opacity: 1;
}
.width-enter,
.width-leave-to {
  opacity: 0;
}
</style>
