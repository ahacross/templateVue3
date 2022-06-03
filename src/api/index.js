import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use(
  (config) => {
    // console.info('axios.js request : ', config)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (res) => {
    // console.info('axios.js response : ', res)
    if (res.status === 200) {
      if (res.config.isPromise) {
        return res
      } else {
        return res.data
      }
    } else {
      return res
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance
