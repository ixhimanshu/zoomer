import { createStore, combineReducers} from 'redux';
import commonReducer from '../reducer/reducer';
 
const rootReducer = combineReducers({
  id: commonReducer,
});
 
export const store = createStore(rootReducer);