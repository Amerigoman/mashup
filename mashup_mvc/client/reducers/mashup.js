import {
  GET_POSTAL_CODES,
  GET_ARTICLES_SAME,
  GET_ARTICLES,
  SEARCH_CODE,
  SET_CENTER,
  SET_LANGUAGE,
  RESET_PLACE
} from '../constants/MashupTypes';
import { EN, RU, UA } from '../constants/ArticlesFilters';

const initialState = {
  pos: { lat: 49.9151803, lng: 36.416867 },
  articles: {},
  foundCodes: [],
  chosenMarker: '',
  lang: UA
};

export default function mashup(state = initialState, action) {
  switch (action.type) {

  case GET_POSTAL_CODES:
    return { ...state, codes: action.codes };
    
  case GET_ARTICLES:
    return { ...state, articles: action.articles };
    
  case GET_ARTICLES_SAME:
    return { ...state };
    
  case SEARCH_CODE:
    return { ...state, foundCodes: action.foundCodes };
    
  case SET_CENTER:
    return { ...state, pos: action.position, foundCodes: []};
    
  case SET_LANGUAGE:
    return { ...state, lang: action.lang };

  case RESET_PLACE:
    return { ...state, chosenMarker: action.chosenMarker };
  
  default:
    return state;
  }
}
