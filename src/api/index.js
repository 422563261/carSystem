import axios from 'axios'

let model = 0;
let baseURL = model ? '' : '/Server';

const request = axios.create({
  baseURL: baseURL
})

export default {
  getCategory: () => request.get('/category'),
  getCountScore: (value) => request.get('/countScore', {params: {category: value}}),
  getCountTop5: (value) => request.get('/countTop5', {params: {category: value}})
}
