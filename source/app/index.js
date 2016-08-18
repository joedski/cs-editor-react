
import 'whatwg-fetch';

// Shouldn't this be covered by jsx:true?  Or babel-preset-react?
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';

import { getStore } from './store';

let localStorageStateRaw = localStorage.getItem( 'state' );
let localStorageState;
try {
	localStorageState = localStorageStateRaw ? JSON.parse( localStorageStateRaw ) : null;
}
catch( error ) {
	console.warn( `Error while trying to parse localStorage state:` );
	console.warn( error );

	localStorageState = null;
}
let store = getStore( localStorageState );

store.subscribe( () => {
	let state = store.getState();

	localStorage.setItem( 'state', JSON.stringify( state ) );
});

ReactDOM.render(
	<Provider store={ store }>
		<App />
	</Provider>,
	document.querySelector( '.app-root' )
);
