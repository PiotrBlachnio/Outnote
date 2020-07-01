export default {
  data() {
    return {
      formLoading: false
    };
  },
  methods: {
    enableFormLoading() {
      this.formLoading = true;
    },
    disableFormLoading() {
      this.formLoading = false;
    }
  }
};
