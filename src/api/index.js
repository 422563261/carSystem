import axios from 'axios'
import model from './model'
import address from './adress'

let baseURL = model.type ? '/car' : '/Server';

const request = axios.create({
  baseURL: baseURL
});
console.log(address)
export default {
  getCategory: () => request.get(address.getCategory),
  getCountScore: (value) => request.get(address.getCountScore, {params: {category: value}}),
  getCountTop5: (value) => request.get(address.getCountTop5, {params: {category: value}}),
  getMore: (value) => request.get(address.getMore, {params: {category: value}}),
  getDetail: (value, word) => request.get(address.getDetail, {params: {category: value, opinionWord: word}}),
  getFeature: (value) => request.get(address.getFeature, {params: {category: value}})
}
