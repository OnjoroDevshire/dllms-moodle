import axios from 'axios';

const MOODLE_API_URL = import.meta.env.VITE_MOODLE_API_URL;
const MOODLE_TOKEN = import.meta.env.VITE_MOODLE_API_TOKEN;

const moodleApi = axios.create({
  baseURL: MOODLE_API_URL,
  headers: {
    // You may need to set the correct headers if required
  },
  params: {
    wstoken: MOODLE_TOKEN,
    moodlewsrestformat: 'json',
  },
});

export default moodleApi;

