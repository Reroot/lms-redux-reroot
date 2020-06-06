import { createStore, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';//use combinde reducers
//store is imuttable, cannot mutate state directly
//use one store, then reducers
function configureStore(initialState) {
  const middlewares = [
    reduxImmutableStateInvariant(),
    thunk,
  ];

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );

  return store;
}

export default configureStore;
