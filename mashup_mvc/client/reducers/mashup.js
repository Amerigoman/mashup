import {
  GET_POSTAL_CODES,
  GET_ARTICLES_SAME,
  GET_ARTICLES,
  SET_INFO_WINDOW,
  SEARCH_CODE
} from '../constants/MashupTypes';

const initialState = {
  pos: { lat: 49.9151803, lng: 36.416867 },
  articles: {},
  fetching: false,
  iwIsVisible: false,
  activeMarker: {},
  selectedPlace: {}
};

export default function mashup(state = initialState, action) {
  switch (action.type) {

  case GET_POSTAL_CODES:
    return { ...state, codes: action.codes };
    
  case GET_ARTICLES:
    return Object.assign({}, state, {
      articles: action.articles
    });
    
  case GET_ARTICLES_SAME:
    return { ...state };
    
  case SET_INFO_WINDOW:
    return { ...state, activeMarker: action.activeMarker, iwIsVisible: true };
    
  case SEARCH_CODE:
    return { ...state, foundCodes: action.foundCodes };
    
  // case ADD_TODO:
  //   return [...state, action.todo];
  //
  // case DELETE_TODO:
  //   return state.filter(todo =>
  //     todo.id !== action.id
  //   );
  //
  // case EDIT_TODO:
  //   return state.map(todo =>
  //     todo.id === action.todo.id ? action.todo : todo
  //   );

  // Not importatnt to implement these for the talk
  // case MARK_TODO:
  //   return state.map(todo =>
  //     todo.id === action.id ?
  //       { ...todo, marked: !todo.marked } :
  //       todo
  //   );
  //
  // case MARK_ALL:
  //   const areAllMarked = state.every(todo => todo.marked);
  //   return state.map(todo => ({
  //     ...todo,
  //     marked: !areAllMarked
  //   }));
  //
  // case CLEAR_MARKED:
  //   return state.filter(todo => todo.marked === false);

  default:
    return state;
  }
}
