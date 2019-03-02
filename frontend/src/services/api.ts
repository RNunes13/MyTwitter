
import axios from 'axios';

const api = axios.create({
  // tslint:disable-next-line: strict-boolean-expressions
  baseURL: process.env.API || 'http://localhost:3333',
});

export default api;
