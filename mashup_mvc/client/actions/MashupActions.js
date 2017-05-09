import * as types from '../constants/MashupTypes';

// from: https://docs.djangoproject.com/en/dev/ref/csrf/#ajax
function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie != '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) == (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export function getPostalCodes(sw, ne) {
  return fetch(Urls['mashup:coords'](sw , ne), {
    credentials: 'same-origin'
  }).then(response => response.json()).then(json => ({
    type: types.GET_POSTAL_CODES,
    codes: json
  }));
}
