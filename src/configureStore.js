import { createStore, applyMiddleware } from 'redux';
import {rootReducer, rootEpic} from './reducers';
import { createEpicMiddleware } from 'redux-observable';

const epicMiddleware = createEpicMiddleware(rootEpic);

export default function configureStore () {
  return createStore(
    rootReducer,
    applyMiddleware(
      epicMiddleware,
    )
  );
}
