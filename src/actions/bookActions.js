
import axios from 'axios'
//NEW POST IN
import { READ_BOOKS_SUCCESFUL, NEW_POST, READ_BOOKS_FAILURE, READ_BOOKS_PENDING} from '../constants/actionTypes';

export const readBooks = () => {
  return dispatch => {
      dispatch(_readBookStarted());

      return axios.get(`http://www.mocky.io/v2/5daca80c30000092002987ad`)
      .then(res => {
          dispatch(_readBookSuccess(res));
      })
      .catch( (error) => {
          console.log(error);
          dispatch(_readBookFailed(error));
      });
  };
}

//action to push a new book on the old state or api?
export const postBook = (newBook) => {
    return dispatch => {
        dispatch(_readBookStarted());

        return axios.get(`http://www.mocky.io/v2/5daca80c30000092002987ad`)
        .then(res => {
            
            dispatch(_readBookSuccess(res).data.push(newBook));
            //or
            
        })
        .then(dispatch(postSuccess())
        .catch( (error) => {
            console.log(error);
            dispatch(_readBookFailed(error));
        });

        
    };
  }


const postSuccess = (res) => {
    return {
        type: NEW_POST,
        data:  res.data
    };
}

const _readBookSuccess = (res) => {
    return {
        type: READ_BOOKS_SUCCESFUL,
        data:  res.data
    };
}

const _readBookFailed = (error) => {
    return {
        type: READ_BOOKS_FAILURE,
        error  
    };
}

const _readBookStarted = () => {
    return {
        type: READ_BOOKS_PENDING
    };
}