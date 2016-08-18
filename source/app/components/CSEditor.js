import React from 'react';
// import classNames from 'classnames';
import isEqual from 'lodash/fp/isEqual';

import * as entryTypes from '../entry-types';

import CSTextfield from './CSTextfield';
import CSTextarea from './CSTextarea';
import CSTitleTextfield from './CSTitleTextfield';

class CharacterSheet extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {};

		this.handlers = {
			addForm: () => this.addFieldEntry( [ 'forms' ], entryTypes.FORM ),
		};

		// Though, if we want to do that, should just use whatever React does for native HTML components.
		// Actually, I think you can pass in strings...
		// this.FormTitleWrapper = "h4"
		this.BoundTextfield = this.wrapInputField( CSTextfield );
		this.BoundTextarea = this.wrapInputField( CSTextarea );
		this.BoundTitleTextfield = this.wrapInputField( CSTitleTextfield );
	}

	fieldValue( fieldPath ) {
		// Totally safe.  Yep.
		// (Though, more seriously, given that any dynamic parts are generated from the CS itself, it should be.)
		return fieldPath.reduce( ( value, pathEl ) => value[ pathEl ], this.props.cs );
	}

	fieldIsActive( fieldPath ) {
		let activeFieldPath = this.props.editorState.activeField;

		return (
			activeFieldPath != null
			&& activeFieldPath.length === fieldPath.length
			// && activeFieldPath.every( ( pathEl, i ) => pathEl === fieldPath[ i ] )
			&& isEqual( activeFieldPath, fieldPath )
		);
	}

	activateField( fieldPath ) {
		this.props.onActivateField( fieldPath );
	}

	deactivateField( fieldPath ) {
		this.props.onDeactivateField( fieldPath );
	}

	updateField( fieldPath, value ) {
		this.props.onUpdateField( fieldPath, value );
	}

	addFieldEntry( fieldPath, form ) {
		this.props.onAddFieldEntry( fieldPath, form );
	}

	wrapInputField( Field ) {
		return ( props ) => {
			let { fieldPath } = props;

			return (
				<Field
					{ ...props }
					id={ fieldPath.join( '.' ) }
					active={ this.fieldIsActive( fieldPath ) }
					value={ this.fieldValue( fieldPath ) }
					onActivate={ () => this.activateField( fieldPath ) }
					onDeactivate={ () => this.deactivateField( fieldPath ) }
					onChange={ nextValue => this.updateField( fieldPath, nextValue ) }
					/>
			);
		};
	}

	render() {
		let { BoundTextfield, BoundTextarea, BoundTitleTextfield } = this;

		return (
			<div className="cs cs__tutorial-click-tip well flexbox--child__grow">

				<div className="alert alert-info alert-dismissible">
					{/*<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>*/}
					You can edit each part of the CS by clicking on it.
				</div>

				<section className="cs--section form-group">
					<BoundTextfield
						fieldPath={[ 'note' ]}
						label="Note"
						placeholder="An optional note about the CS in general for you, the GMs, or no one in particular."
						/>
					<BoundTextfield
						fieldPath={[ 'fullName' ]}
						label="Full Name"
						placeholder="Full name of the Character.  May be longer than the name in the CS title."
						/>
					<BoundTextfield
						fieldPath={[ 'species' ]}
						label="Species"
						placeholder="Species designation.  Detailed description goes in the Physical Profile."
						/>
					<BoundTextfield
						fieldPath={[ 'gender' ]}
						label="Gender"
						placeholder="Gender of the character."
						/>
					<BoundTextfield
						fieldPath={[ 'player' ]}
						label="Player"
						placeholder="Your online name, and IRC nick if it's usually different."
						/>
				</section>

				<section className="cs--section physical form-group">
					<h3>Physical Profile</h3>

					{ this.props.cs.forms.map( ( form, i ) => (
						<section key={ [ 'forms', i ].join( '.' ) } className="physical--form physical--form__visible form-group">
							{/*<h4>{ this.fieldValue([ 'forms', i, 'name' ]).trim() || "(Form Name Here)" }</h4>*/}
							{/* TODO: Add support for: onExpand, onContract, onRemove */}
							<BoundTitleTextfield
								className="cs-control-group--subgroup"
								fieldPath={[ 'forms', i, 'name' ]}
								label="Form Name"
								placeholder="Name of this physical form."
								/>
							<div className="physical--details">
								<BoundTextfield
									fieldPath={[ 'forms', i, 'heightAndWeight' ]}
									label="Height and Weight"
									placeholder="How heavy they are, and their general dimensions.  Bipedal and quad if they can go between."
									/>
								<BoundTextfield
									fieldPath={[ 'forms', i, 'apparentAge' ]}
									label="Apparent Age"
									placeholder="General description of how old they appear relative to their species."
									/>
								<BoundTextfield
									fieldPath={[ 'forms', i, 'build' ]}
									label="Build"
									placeholder="Summary of how their body is built; stocky, tall, wide, thin, fat, toned, lanky, etc."
									/>
								<BoundTextfield
									fieldPath={[ 'forms', i, 'clothingStyle' ]}
									label="Clothing Style"
									placeholder="How the character usually dresses."
									/>
								<BoundTextfield
									fieldPath={[ 'forms', i, 'voice' ]}
									label="Voice"
									placeholder="How the character's voice sounds."
									/>
								<BoundTextfield
									fieldPath={[ 'forms', i, 'usualScents' ]}
									label="Usual Scents"
									placeholder="What scents hang around the character."
									/>
								{ /* Not sure how I want to handle pictures... Links, I guess. */ }
								<div className="text-info">TODO: Pictures</div>
								<BoundTextarea
									fieldPath={[ 'forms', i, 'description' ]}
									label="Full Description"
									placeholder="Detailed description of what someone will see when they look at this character."
									/>
							</div>
						</section>
					)) }

					<div className="physical--controls form-group">
						<div
							onClick={ this.handlers.addForm }
							className="btn btn-default btn-sm">
							<i className="glyphicon glyphicon-plus"></i>
							{'  '}
							Add Form
						</div>
					</div>
				</section>

				{ /* Inventory: Array of Sections. */ }
				<section className="cs--section inventory form-group">
					<h4>Inventory</h4>


				</section>
				{ /* Skills and Abilities... */ }
				{ /* Paranormal Abilities: Array */ }
				{ /* Background... */ }
			</div>
		);
	}
}

CharacterSheet.propTypes = {
	// cs: Character Sheet Data Object
	cs: React.PropTypes.any,
	// editorState: Current UI state of this Editor.
	editorState: React.PropTypes.any,
	// Hooks.
	onActivateField: React.PropTypes.func.isRequired,
	onDeactivateField: React.PropTypes.func.isRequired,
	onUpdateField: React.PropTypes.func.isRequired,
	onAddFieldEntry: React.PropTypes.func.isRequired,
};

export default CharacterSheet;
