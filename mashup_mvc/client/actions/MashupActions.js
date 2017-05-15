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
  let articleFetchedOnce = place in articles;
  let langFetched = null;
  if(articleFetchedOnce) {
    langFetched = lang in articles[place]
  }
  
  console.log(articleFetchedOnce);
  console.log(place, lang, params);
  
  if (!articleFetchedOnce || !langFetched)
    return fetch(Urls['mashup:articles']() + params, {
      credentials: 'same-origin'
    }).then(response => response.json()).then(function(json) {
      if(!articleFetchedOnce)
        articles[place] = {};
      articles[place][lang] = json;
      
      return {
        type: types.GET_ARTICLES,
        articles: articles,
        chosenMarker: place
      }
    });
  else {
	  return {
		  type: types.GET_ARTICLES_SAME,
		  chosenMarker: place
	  }
  }
}

export function searchCodes(text) {
  return fetch(Urls['mashup:search_codes'](text), {
    credentials: 'same-origin'
  }).then(response => response.json()).then(json => ({
    type: types.SEARCH_CODE,
    foundCodes: json.result
  }));
}

export function setCenter(lat, lng) {
  return {
    type: types.SET_CENTER,
    position: {lat: lat, lng: lng}
  }
}
