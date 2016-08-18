import expect from 'expect';

import * as actions from '../source/app/actions';
import reducer from '../source/app/reducers';

describe( `reducer`, function() {
	it( `should handle UPDATE_MESSAGE actions`, function() {
		const stateBefore = {
			message: "Hello world!",
		};

		const stateAfterExpected = {
			message: "Hello my baby, Hello my darling!",
		};

		const stateAfterActual = reducer( stateBefore, actions.updateMessage( stateAfterExpected.message ) );

		expect( stateAfterActual ).toEqual( stateAfterExpected );
	});
});
