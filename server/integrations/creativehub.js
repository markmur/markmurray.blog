import axios from 'axios'

const endpoints = {
  products: '/api/v1/products/query',
}

class CreativeHub {
  constructor(apiKey) {
    this.apiKey = apiKey
  }

  post(url, data = {}, headers = {}) {
    return axios.post(url, data, { headers })
  }

  getProducts() {
    return this.post(endpoints.products)
  }
}

export default CreativeHub
