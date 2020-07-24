<template>
  <transition name="width">
    <div class="sub-navigation" :class="{ 'sub-navigation--active': isActive }">
      <input
        type="text"
        class="sub-navigation__input"
        placeholder="Search..."
        v-show="isActive"
      />

      <div
        class="sub-navigation__notes"
        v-show="isActive"
        v-if="notes.length > 0"
      >
        <note-thumbnail
          ref="note"
          class="sub-navigation__note-thumbnail"
          v-for="note in notes"
          :key="note._id"
          :note="note"
        />
      </div>

      <i class="sub-navigation__empty-string" v-else v-show="isActive">
        Nothing to show...
      </i>
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
      type: Object,
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
    async notes(state) {
      this.$nextTick(() => {
        gsap
          .fromTo(
            '.sub-navigation__note-thumbnail',
            state ? 0.5 : 0,
            { opacity: 0, x: '-2rem' },
            { stagger: 0.1, x: 0, opacity: 1, delay: 0.2 }
          )
          .play();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.sub-navigation {
  width: 100%;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  z-index: 100;
  transition: width 0.2s;
  background-color: $navigationBackground;

  @include mq {
    width: 0;
    position: inherit;
    border-left: 1px solid $subNavigationBorderLeftColor;
  }

  &--active {
    padding: 1rem;
    height: 100vh;

    @include mq {
      width: 420px;
      flex-shrink: 0;
    }
  }

  &__input {
    width: 100%;
    color: $subNavigationSearchbarColor;
    border-radius: 0.25rem;
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    background-color: $subNavigationSearchbarBackground;
    transition: border-color 0.2s;

    &:focus {
      border-color: $primary;
    }
  }

  &__notes {
    width: 100%;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__empty-string {
    color: $color3;
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
