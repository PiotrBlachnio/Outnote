<template>
  <transition name="fade">
    <div
      class="base-dialog"
      v-if="$store.state.dialog.isActive"
      @click.self="$store.dispatch('closeDialog')"
    >
      <div class="base-dialog__content">
        <p class="base-dialog__title">{{ dialogData.title }}</p>
        <input
          type="text"
          class="base-dialog__input"
          :value="dialogData.defaultValue || ''"
          v-if="dialogData.type === 'prompt'"
          @input="$emit('input', $event.target.value)"
        />

        <div class="base-dialog__buttons">
          <button
            class="base-dialog__button base-dialog__button--cancel"
            @click="
              $emit('dialog-cancel');
              $store.dispatch('closeDialog');
            "
          >
            cancel
          </button>

          <button
            class="base-dialog__button base-dialog__button--save"
            @click="$emit('dialog-save')"
            v-if="dialogData.mode === 'save'"
          >
            save
          </button>

          <button
            class="base-dialog__button base-dialog__button--remove"
            @click="$emit('dialog-remove')"
            v-else-if="dialogData.mode === 'remove'"
          >
            remove
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      dialogData: {}
    };
  },
  mounted() {
    this.dialogData = this.$store.state.dialog.data;
  }
};
</script>

<style lang="scss" scoped>
@mixin baseDialogBackgroundMixin($color) {
  background-color: $color;
  transition: background-color 0.2s;

  &:hover {
    background-color: darken($color, 5%);
  }
}

.base-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100vw;
  height: 100vh;
  display: block;
  content: '';
  display: flex;
  z-index: 199;
  transform: translate(-50%, -50%);
  background-color: rgba(#000, 0.75);

  &__content {
    color: $color1;
    margin: auto;
    padding: 1rem;
    min-width: 75vw;
    max-width: 75vw;
    border: 1px solid $primary;
    border-radius: 0.25rem;
    background-color: $color6;

    @include mq {
      min-width: 30rem;
    }
  }

  &__input {
    width: 100%;
    color: $color1;
    border-radius: 0.25rem;
    border: 1px solid transparent;
    background-color: $color5;
    padding: 0.5rem 1rem;
    transition: border-color 0.2s;

    &:focus {
      border-color: $primary;
    }
  }

  &__buttons {
    margin-top: 2rem;
    text-align: right;
  }

  &__button {
    text-transform: uppercase;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    font-weight: bold;
    letter-spacing: 0.05rem;

    &:first-of-type {
      margin-right: 1rem;
    }

    &--cancel {
      @include baseDialogBackgroundMixin($color5);
    }

    &--save {
      @include baseDialogBackgroundMixin($success);
    }

    &--remove {
      @include baseDialogBackgroundMixin($error);
    }
  }
}
</style>
