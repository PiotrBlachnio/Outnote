import validator from '../views/auth/authValidator';

export default {
  methods: {
    validateForm() {
      const formFields = Object.entries(this.form);

      try {
        validator(formFields);

        return true;
      } catch (error) {
        this.$store.dispatch('notificationActivate', {
          content: error.message,
          type: 'error'
        });

        return false;
      }
    }
  }
};