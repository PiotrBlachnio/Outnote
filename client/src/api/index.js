import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:4000/api/v1';

// axios.post('/auth/logout')

export default axios;
