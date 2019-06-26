import axios from 'axios'

// var getStackTrace = function () {
//   var obj = {}
//   Error.captureStackTrace(obj, getStackTrace)
//   return obj.stack
// }
// var log = console.log
// console.log = function () {
//   var stack = getStackTrace() || ''
//   var matchResult = stack.match(/\(.*?\)/g) || []
//   var line = matchResult[1] || ''
//   for (var i in arguments) {
//   }
//   if (typeof arguments[i] === 'object') {
//     arguments[i] = JSON.stringify(arguments[i])
//   }
//   arguments[i] += '----' + line.replace('(', '').replace(')', '')
//   log.apply(console, arguments)
// }

export default {
  /* get cookie value by key */
  getCookie: function (name) {
    var cookieValue = null
    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';')
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim()
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        }
      }
    }
    return cookieValue
  },
  getUserByProfile: function (profile, email = null) {
    var user = profile
    if (email) {
      user.email = email
    }
    user.avatar = `${axios.defaults.baseURL}/${user.avatar}`
    console.log('getUserByProfile user', user)
    return user
  }
}
