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

let articles = {};

export function getArticles(place, lang='ua') {
  let params_array = [`place=${place}`, `lang=${lang}`];
  let params = '?' + params_array.join('&');
  
  let key = place + ':' + lang;
  console.log(key in articles);
  
  if (!(key in articles))
    return fetch(Urls['mashup:articles']() + params, {
      credentials: 'same-origin'
    }).then(response => response.json()).then(function(json) {
      articles[key] = json;
      
      return {
        type: types.GET_ARTICLES,
        articles: articles
      }
    });
  else return {
      type: types.GET_ARTICLES_SAME,
    }
}

export function setInfoWindow(selectedPlace, activeMarker) {
  console.log('setInfoWindow');
  return {
    type: types.SET_INFO_WINDOW,
    activeMarker: activeMarker
  }
}

export function searchCodes(text) {
  console.log(text);
  return fetch(Urls['mashup:search_codes'](text), {
    credentials: 'same-origin'
  }).then(response => response.json()).then(json => ({
    type: types.SEARCH_CODE,
    foundCodes: json.result
  }));
}
