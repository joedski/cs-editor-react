
import { createStore, applyMiddleware } from 'redux';
import createReduxLogger from 'redux-logger';
import reducer from './reducers';

export function getStore( hydrate ) {
	let hydrateFn, store;

	let enhancer = applyMiddleware(
		createReduxLogger()
	);

	if( hydrate == null ) {
		store = createStore(
			reducer,
			enhancer
		);
	}
	else if( typeof hydrate === 'function' ) {
		hydrateFn = hydrate;

		store = createStore(
			reducer,
			enhancer
		);
	}
	else {
		store = createStore(
			reducer,
			hydrate,
			enhancer
		);
	}

	if( hydrateFn ) {
		hydrateFn( store );
	}

	return store;
}
