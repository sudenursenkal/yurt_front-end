// store.js (örnek bir Redux store oluşturmak için)
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers'; // Reducerlarınızı içeri aktarın
import thunk from 'redux-thunk'; // Redux Thunk'ı ekleyin (isteğe bağlı)

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
