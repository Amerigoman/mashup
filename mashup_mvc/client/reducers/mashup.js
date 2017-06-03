import {
  GET_POSTAL_CODES,
  GET_ARTICLES_SAME,
  GET_ARTICLES,
  SEARCH_CODE,
  SET_CENTER
} from '../constants/MashupTypes';

const initialState = {
  pos: { lat: 49.9151803, lng: 36.416867 },
  articles: {},
  foundCodes: [],
  chosenMarker: ''
};

export default function mashup(state = initialState, action) {
  switch (action.type) {

  case GET_POSTAL_CODES:
    return { ...state, codes: action.codes };
    
  case GET_ARTICLES:
    return { ...state, articles: action.articles, chosenMarker: action.chosenMarker };
    
  case GET_ARTICLES_SAME:
    return { ...state, chosenMarker: action.chosenMarker };
    
  case SEARCH_CODE:
    return { ...state, foundCodes: action.foundCodes };
    
  case SET_CENTER:
    return { ...state, pos: action.position, foundCodes: []};
    

  default:
    return state;
  }
}
