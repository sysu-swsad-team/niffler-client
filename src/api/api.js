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

export const queryTask = params => {
  return axios.get('questionnaire/task/' + params, null, header)
}

export const summitTask = params => {
  return axios.post('questionnaire/task/', params, header)
}
/* ***************** end task: questionnaire and errand ***************** */

/* ***************** questionnaire ***************** */

export const getQNDetail = params => {
  return axios.get(`questionnaire/task/${params.id}/`, params, header)
}

/* ***************** end questionnaire ***************** */

/* ***************** errand ***************** */

export const takeErrand = params => {
  return axios.post('questionnaire/participantship/', params, header)
}

export const queryParticipant = params => {
  return axios.get(`questionnaire/profile/${params.id}`, params, header)
}
/* ***************** end errand ***************** */

/* balance */
export const makePayment = params => {
  return axios.get('payment/', params, header)
}
