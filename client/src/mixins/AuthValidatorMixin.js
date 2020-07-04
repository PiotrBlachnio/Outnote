import validator from '../views/auth/authValidator';

export default {
  methods: {
    validateForm(fields) {
      const formFields = fields || Object.entries(this.form);

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
