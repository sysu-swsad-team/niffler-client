import axios from 'axios'

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
    return user
  }
}
