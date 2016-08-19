import { combineReducers } from 'redux';
import * as actions from '../actions';

import isEqual from 'lodash/fp/isEqual';
import assocIn from 'lodash/fp/set';
import getIn from 'lodash/fp/get';
import dropRight from 'lodash/fp/dropRight';
import last from 'lodash/fp/last';

import * as entryTypes from '../entry-types';



const createInitialPicture = () => ({
	title: '',
	url: '',
})

const createInitialPhysicalForm = () => ({
	name: '',
	heightAndWeight: '',
	apparentAge: '',
	build: '',
	clothingStyle: '',
	voice: '',
	usualScents: '',
	pictures: [],
	description: '',
});

const createInitialInventoryItem = () => ({
	name: '',
	description: '',
});

const createInitialParanormalAbility = () => ({
	name: '',
	description: '',
	system: '',
});

const createInitialCS = () => ({
	//// Preamble
	// The name shown at the top.  (May be shorter than the full name.)
	name: '',
	note: '',
	fullName: '',
	species: '',
	gender: '',
	player: '',

	//// Physical Profile
	forms: [
		createInitialPhysicalForm(),
	],

	//// Inventory
	inventory: [],

	//// Skills and Abilities
	combatExperienc: '',
	weaponTraining: '',
	education: '',
	vocationalHistory: '',
	languageFluency: '',

	//// Paranormal Abilities
	paranormalAbilities: [],

	//// Character Background
	actualAge: '',
	worldInformation: '',
	characterHistory: '',
	hiddenBackgroundInformation: '',
});

const createInitialEntryForType = ( fieldType ) => {
	switch( fieldType ) {
		case entryTypes.FORM: return createInitialPhysicalForm();
		case entryTypes.INVENTORY: return createInitialInventoryItem();
		case entryTypes.PARANORMAL: return createInitialParanormalAbility();
		case entryTypes.PICTURE_LINK: return createInitialPicture();
		default: throw new Error( `Unrecognized entry type ${ fieldType }` );
	}
}

const initialEditor = {
	cs: createInitialCS(),
	state: {
		// We can do this because only one field can have focus at a time.
		activeField: null,
	},
};

function editor( state = initialEditor, action ) {
	switch( action.type ) {
		// TODO: Separate Editor State Reducer from Editor CS Reducer.

		//// Editor: State

		case actions.ACTIVATE_FIELD: {
			return {
				cs: state.cs,
				state: {
					activeField: action.payload.field,
				},
			};
		}

		case actions.DEACTIVATE_FIELD: {
			if( isEqual( state.state.activeField, action.payload.field ) ) {
				return {
					cs: state.cs,
					state: {
						activeField: null
					}
				};
			}

			return state;
		}

		case actions.DEACTIVATE_CURRENT_FIELD: {
			return {
				cs: state.cs,
				state: {
					activeField: null
				}
			};
		}

		//// Editor: CS

		case actions.UPDATE_FIELD: {
			return {
				state: state.state,
				cs: assocIn( action.payload.field, action.payload.value, state.cs ),
			};
		}

		case actions.ADD_FIELD_ENTRY: {
			let newEntry = createInitialEntryForType( action.payload.fieldType );
			// let newFieldValue = concat( newEntry, getIn( action.payload.field, state.cs ) );
			let newFieldValue = getIn( action.payload.field, state.cs ).slice( 0 );
			newFieldValue.push( newEntry );

			return {
				state: state.state,
				cs: assocIn( action.payload.field, newFieldValue, state.cs ),
			};
		}

		case actions.DELETE_FIELD_ENTRY: {
			let fieldEntryIndex = last( action.payload.field );
			let field = dropRight( 1, action.payload.field );
			let newFieldValue = getIn( field, state.cs ).slice( 0 );

			newFieldValue.splice( fieldEntryIndex, 1 );

			return {
				state: state.state,
				cs: assocIn( field, newFieldValue, state.cs ),
			}
		}

		default: {
			return state;
		}
	}
}

export default combineReducers({
	editor,
});
