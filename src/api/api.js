import axios from 'axios'

// let base = 'http://127.0.0.1:8000'
// axios.defaults.baseURL = 'http://127.0.0.1:8080'

export const requestLogin = params => {
  return axios.post('/user/login', params)
}

export const deleteQN = params => {
  return axios.post('/questionnaire/mine/delete', params)
}

// export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }) }

// export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }) }

// export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }) }

// export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }) }

// export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }) }

// export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }) }
