import axios from 'axios'

// config
// axios.defaults.baseURL = 'http://129.204.53.183:8000'

const header = {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}

/* ***************** user ***************** */
export const postLogin = params => {
  return axios.post('login/', params, header)
}

export const postRegister = params => {
  return axios.post('register/', params, header)
}

export const getLogout = _params => {
  return axios.get('logout/', null, header)
}

export const getProfile = _params => {
  return axios.get('questionnaire/profile/', null, header)
}

export const changeProfile = params => {
  return axios.post('questionnaire/profile/', params, header)
}

export const postAvatar = params => {
  return axios.post('avatar/', params, {headers: {'Content-Type': 'image/jpeg'}})
}

/* 点击获取验证码按钮，请求后端发送验证码到邮箱 */
export const requestSendVercode = params => {
  return axios.get('register/' + params, null, header)
}

export const postVercode = params => {
  return axios.post('questionnaire/register/vercode/', params, header)
}
/* ***************** end user ***************** */

/* ***************** task: questionnaire and errand ***************** */
export const claimTask = params => {
  return axios.post(`questionnaire/task/claim/${params.id}/`, null, header)
}

export const cancelTask = params => {
  return axios.post(`questionnaire/task/cancel/${params.id}/`, null, header)
}
/* ***************** end task: questionnaire and errand ***************** */

/* ***************** questionnaire ***************** */
export const summitQN = params => {
  return axios.post('questionnaire/task/', params, header)
}

export const queryQN = params => {
  return axios.get('questionnaire/task/' + params, null, header)
}

export const getQNDetail = params => {
  return axios.get(`questionnaire/task/${params.id}/`, params, header)
}

export const getMyQN = params => {
  return axios.get('questionnaire/mine/', params, header)
}

export const getMyQNFilter = params => {
  return axios.get('questionnaire/mine/filter', params, header)
}

/* ***************** end questionnaire ***************** */

/* ***************** errand ***************** */
export const summitErrand = params => {
  return axios.post('questionnaire/task/', params, header)
}

export const queryErrand = params => {
  return axios.get('questionnaire/task/' + params, null, header)
}

export const takeErrand = params => {
  return axios.post('questionnaire/participantship/', params, header)
}

export const removeErrand = params => {
  return axios.post(`questionnaire/task/cancel/${params.id}/`, params, header)
}

export const queryParticipant = params => {
  return axios.get(`questionnaire/profile/${params.id}`, params, header)
}
/* ***************** end errand ***************** */

// export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }) }

// export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }) }

// export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }) }

// export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }) }

// export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }) }

// export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }) }
