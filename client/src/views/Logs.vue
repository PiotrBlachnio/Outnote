<template>
  <div class="logs">
    <div
      class="logs__box"
      v-for="log in logs"
      :key="log.time"
      :class="`logs__box--${log.type}`"
    >
      <p class="logs__message">
        <span class="logs__label">Message: </span>
        {{ log.message }}
      </p>
      <p class="logs__place">
        <span class="logs__label">Place: </span>
        {{ log.place }}
      </p>
      <p class="logs__time">
        <span class="logs__label">Time:</span>
        {{ new Date(log.time).toLocaleTimeString() }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      logs: null
    };
  },
  created() {
    this.fetchLogs();
  },
  methods: {
    async fetchLogs() {
      try {
        const response = await axios({
          method: 'get',
          url: '/logs'
        });

        this.logs = response.data.reverse();
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.logs {
  padding: 2rem;

  &__box {
    color: #eee;
    padding: 1rem;
    margin-bottom: 1rem;
    border-left: 4px solid transparent;
    border-radius: 0.25rem;
    display: flex;
    flex-direction: column;

    &--info {
      border-color: $info;
    }

    &--error {
      border-color: $error;
    }

    p {
      margin: 0;
    }
  }

  &__label {
    color: #999;
  }
}
</style>
