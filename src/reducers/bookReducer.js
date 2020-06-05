import { READ_BOOKS_SUCCESFUL, NEW_POST, READ_BOOKS_PENDING, READ_BOOKS_FAILURE } from '../constants/actionTypes';

const initialState = {
  items: [],
  item: {}
};



export default function bookReducer(state = {}, action) {
  switch (action.type) {
    case READ_BOOKS_SUCCESFUL:
      return {...state, bookData: { books: action.data, requestSucessful: true } };
    case READ_BOOKS_PENDING:
      return {...state, bookData: {requestPending: true } };
    case NEW_POST: //in 
      return {
        ...state, 
        bookData: {
          books: action.data,
          requestPending: true 
        } 
      };
    case READ_BOOKS_FAILURE:  
      return {...state, bookData: { requestFailed: true } };
    default:
      return state;
  }
}
