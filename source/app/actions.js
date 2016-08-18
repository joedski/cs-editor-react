
//////// Editor Actions.

//// Editor: State

export const ACTIVATE_FIELD = 'ACTIVATE_FIELD';
export const activateField = ( field, meta = {} ) => ({
	type: ACTIVATE_FIELD,
	payload: {
		field
	},
	meta
});

export const DEACTIVATE_FIELD = 'DEACTIVATE_FIELD';
export const deactivateField = ( field, meta = {} ) => ({
	type: DEACTIVATE_FIELD,
	payload: {
		field
	},
	meta
});

//// Editor: CS

export const UPDATE_FIELD = 'UPDATE_FIELD';
export const updateField = ( field, value, meta = {} ) => ({
	type: UPDATE_FIELD,
	payload: {
		field,
		value
	},
	meta
});

// DELETE_FIELD_ENTRY
// ADD_FIELD_ENTRY (Only adds to end.)

export const ADD_FIELD_ENTRY = 'ADD_FIELD_ENTRY';
export const addFieldEntry = ( field, fieldType, meta = {} ) => ({
	type: ADD_FIELD_ENTRY,
	payload: {
		field,
		fieldType,
	},
	meta,
});

// REORDER_FIELD (Should only apply to array fields.)
