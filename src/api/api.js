import axios from 'axios'

// let base = 'http://127.0.0.1:8080'
axios.defaults.baseURL = 'http://127.0.0.1:8000'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'

export const postLogin = params => {
  return axios.post('/questionnaire/login/', params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
}

export const deleteQN = params => {
  return axios.post('/questionnaire/mine/delete/', params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
}

export const postRegister = params => {
  return axios.post('/questionnaire/register/', params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
}

export const postAvatar = params => {
  return axios.post('/questionnaire/avatar/', params, {headers: {'Content-Type': 'image/jpeg'}})
}

export const postVercode = params => {
  return axios.post('/questionnaire/register/vercode/', params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
}

export const summitQN = params => {
  return axios.post('questionnaire/create/', params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
}

export const getAllQN = params => {
  return axios.get('questionnaire/', params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
}

export const getMyQN = params => {
  return axios.get('questionnaire/mine/', params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
}

export const getMyQNFilter = params => {
  return axios.get('questionnaire/mine/filter', params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
}

// export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }) }

// export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }) }

// export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }) }

// export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }) }

// export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }) }

// export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }) }
