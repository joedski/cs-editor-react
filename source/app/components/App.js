import React from 'react';
import { connect } from 'react-redux';
// import classNames from 'classnames';

import * as actions from '../actions';

import CSEditor from './CSEditor';
// import CSTextfield from './CSTextfield';
// import CSTextarea from './CSTextarea';

// An In Situ editor which just presents a CS for them to click on and edit rather than a form.

const mapCSState = state => ({
	cs: state.editor.cs,
	editorState: state.editor.state,
});

const mapCSDispatch = dispatch => ({
	onActivateField: fieldPath => dispatch( actions.activateField( fieldPath ) ),
	onDeactivateField: fieldPath => dispatch( actions.deactivateField( fieldPath ) ),
	onUpdateField: ( fieldPath, value ) => dispatch( actions.updateField( fieldPath, value ) ),
	onAddFieldEntry: ( fieldPath, fieldType ) => dispatch( actions.addFieldEntry( fieldPath, fieldType ) ),
});

const CurrentCSEditor = connect( mapCSState, mapCSDispatch )( CSEditor );

const App = ( props ) => {

	return (
		<div className="app-container full-window   flexbox flexbox__column">
			<nav className="app-header-controls navbar navbar-default flexbox--child__fixed">
				<div className="app-controls--brand navbar-header">
					<span className="navbar-brand">CS Editor</span>
				</div>
				<ul className="app-controls--main-controls navbar-nav nav">
					<li className=""><a href="#non" className="">CS: { props.currentCS.name || "(Untitled)" }</a></li>
					<li className=""><a href="#non" className="">Save CS</a></li>
					<li className=""><a href="#non" className="">Save Zip of All CSs</a></li>
				</ul>
			</nav>

			<div className="app-content   flexbox--child__grow   flexbox flexbox__padded-box flexbox__column">
				<div className="form-group flexbox--child__fixed">
					<input type="text" className="form-control input-lg" placeholder="Character's Name" />
				</div>
				<CurrentCSEditor />
			</div>
		</div>
	);
};

App.propTypes = {
	cs: React.PropTypes.any,
};

// NOTE: In a larger app you would (usually!) create separate connected components from
// the normal layout components, but it's not always immediately clear when to do that,
// so starting out in the same file like this is reasonable.

const mapState = state => ({
	currentCS: state.editor.cs,
});

const mapDispatch = () => ({});

const CurrentApp = connect( mapState, mapDispatch )( App );

export default CurrentApp;
