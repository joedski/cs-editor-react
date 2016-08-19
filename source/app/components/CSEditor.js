import React from 'react';
// import classNames from 'classnames';
import isEqual from 'lodash/fp/isEqual';

import * as entryTypes from '../entry-types';

import CSTextfield from './CSTextfield';
import CSTextarea from './CSTextarea';
import CSTitleTextfield from './CSTitleTextfield';
import CSCharNameTextfield from './CSCharNameTextfield';

class CSEditor extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {};

		// Though, if we want to do that, should just use whatever React does for native HTML components.
		// Actually, I think you can pass in strings...
		// this.FormTitleWrapper = "h4"
		this.BoundTextfield = this.wrapInputField( CSTextfield );
		this.BoundTextarea = this.wrapInputField( CSTextarea );
		this.BoundTitleTextfield = this.wrapInputField( CSTitleTextfield );
		this.BoundCharNameTextfield = this.wrapInputField( CSCharNameTextfield );
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

	deleteFieldEntry( fieldPath ) {
		this.props.onDeactivateCurrentField();
		this.props.onDeleteFieldEntry( fieldPath );
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
					valuePrefix="CS: "
					onActivate={ () => this.activateField( fieldPath ) }
					onDeactivate={ () => this.deactivateField( fieldPath ) }
					onChange={ nextValue => this.updateField( fieldPath, nextValue ) }
					/>
			);
		};
	}

	render() {
		let { BoundTextfield, BoundTextarea, BoundTitleTextfield, BoundCharNameTextfield } = this;

		return (
			<div className="app-content   flexbox--child__grow   flexbox flexbox__padded-box flexbox__column">
				<BoundCharNameTextfield
					wrapper="h3"
					className="cs--title"
					toggle={ false }
					fieldPath={[ 'name' ]}
					label="Character Name"
					placeholder="The name of this new character."
					/>
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
							<section key={ [ 'forms', i ].join( '.' ) } className="physical--form physical--form__visible expanding-item form-group">
								{/*<h4>{ this.fieldValue([ 'forms', i, 'name' ]).trim() || "(Form Name Here)" }</h4>*/}
								{/* TODO: Add support for: onExpand, onContract, onRemove */}
								<BoundTitleTextfield
									fieldPath={[ 'forms', i, 'name' ]}
									label="Form Name"
									placeholder="Name of this physical form."
									onDelete={ () => this.deleteFieldEntry([ 'forms', i ]) }
									/>
								<div className="physical--details expanding-item--content">
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
								onClick={ () => this.addFieldEntry( [ 'forms' ], entryTypes.FORM ) }
								className="btn btn-default btn-sm">
								<i className="glyphicon glyphicon-plus"></i>
								{'  '}
								Add Form
							</div>
						</div>
					</section>

					{ /* Inventory: Array of Sections. */ }
					<section className="cs--section inventory form-group">
						<h3>Inventory</h3>

						{ this.props.cs.inventory.map( ( item, i ) => (
							<section key={ [ 'inventory', i ].join( '.' ) } className="inventory--item expanding-item form-group">
								<BoundTitleTextfield
									wrapper="div"
									fieldPath={[ 'inventory', i, 'name' ]}
									label="Item Name"
									placeholder="Name of this item or asset."
									onDelete={ () => this.deleteFieldEntry([ 'inventory', i ]) }
									/>
								<div className="expanding-item--content">
									<BoundTextarea
										fieldPath={[ 'inventory', i, 'description' ]}
										label="Item Description"
										placeholder="What the item or asset is, does, how it looks, etc.  Only unusual items need lengthy descriptions."
										/>
								</div>
							</section>
						))}

						<div className="inventory--controls form-group">
							<div
								onClick={ () => this.addFieldEntry( [ 'inventory' ], entryTypes.INVENTORY ) }
								className="btn btn-default btn-sm">
								<i className="glyphicon glyphicon-plus"></i>
								{'  '}
								Add Item or Asset
							</div>
						</div>
					</section>

					{ /* Skills and Abilities... */ }
					<section className="cs--section skills form-group">
						<h3>Skills and Abilities</h3>

						<BoundTextarea
							fieldPath={[ 'combatExperience' ]}
							label="Combat Experience"
							placeholder="What sort of general combat experience this character has.  Anything from martial arts to fighting as a soldier to directing troops or strategizing."
							/>
						<BoundTextarea
							fieldPath={[ 'weaponTraining' ]}
							label="Weapon Training"
							placeholder="What sort of weaponry they have experience with and how well they can handle them."
							/>
						<BoundTextarea
							fieldPath={[ 'education' ]}
							label="Education"
							placeholder="Level of education this character attained, whether through matriculation, infodumps, or living on the streets."
							/>
						<BoundTextarea
							fieldPath={[ 'vocationalHistory' ]}
							label="Vocational History"
							placeholder="Summary of what sort of jobs or occupations have they held, if they have held any."
							/>
						<BoundTextarea
							fieldPath={[ 'languageFluency' ]}
							label="Language Fluency"
							placeholder="What language(s) they can speak and how well."
							/>
					</section>

					{ /* Paranormal Abilities: Array */ }
					<section className="cs--section paranormal-abilities form-group">
						<h3>Paranormal Abilities</h3>

						{ this.props.cs.paranormalAbilities.map( ( item, i ) => (
							<section key={ [ 'paranormalAbilities', i ].join( '.' ) } className="paranormal-abilities--item expanding-item form-group">
								<BoundTitleTextfield
									wrapper="div"
									fieldPath={[ 'paranormalAbilities', i, 'name' ]}
									label="Ability Name"
									placeholder="Name of this ability."
									onDelete={ () => this.deleteFieldEntry([ 'paranormalAbilities', i ]) }
									/>
								<div className="expanding-item--content">
									<BoundTextarea
										fieldPath={[ 'paranormalAbilities', i, 'description' ]}
										label="Ability Description"
										placeholder="What the character can and can't do with this ability or power, how it works, etc."
										/>
									<BoundTextfield
										fieldPath={[ 'paranormalAbilities', i, 'system' ]}
										label="System"
										placeholder="An existing game or story system or mythology, if any, that this ability was drawn from; can sometimes make for quick reference for other players.  Saying 'No System' or 'Custom System' is acceptible."
									/>
								</div>
							</section>
						))}

						<div className="inventory--controls form-group">
							<div
								onClick={ () => this.addFieldEntry( [ 'paranormalAbilities' ], entryTypes.PARANORMAL ) }
								className="btn btn-default btn-sm">
								<i className="glyphicon glyphicon-plus"></i>
								{'  '}
								Add Ability
							</div>
						</div>
					</section>

					{ /* Background... */ }
					<section className="cs--section background form-group">
						<h3>Background</h3>

						<BoundTextfield
							fieldPath={[ 'actualAge' ]}
							label="Actual Age"
							placeholder="How old they are in, both in native and Earth Equivalent time."
							/>
						<BoundTextarea
							fieldPath={[ 'worldInformation' ]}
							label="World Information"
							placeholder="A description of the world they came from; may be short if it's just our Earth, or our Earth plus something; probably longer if otherwise."
							/>
						<BoundTextarea
							fieldPath={[ 'characterHistory' ]}
							label="Character History"
							placeholder="At least two or three paragraphs describing how the character got to where they are today.  More are fine, usually, but you don't necessarily have to go into nitty gritty."
							/>
						<BoundTextarea
							fieldPath={[ 'hiddenBackgroundInformation' ]}
							label="Hidden Background Information"
							placeholder="Things that likely won't be publicly known to other characters, but may be plot relevant if you want the GMs to toy with your character."
							/>
					</section>
				</div>
			</div>
		);
	}
}

CSEditor.propTypes = {
	// cs: Character Sheet Data Object
	cs: React.PropTypes.any,
	// editorState: Current UI state of this Editor.
	editorState: React.PropTypes.any,
	// Hooks.
	onActivateField: React.PropTypes.func.isRequired,
	onDeactivateField: React.PropTypes.func.isRequired,
	onDeactivateCurrentField: React.PropTypes.func.isRequired,
	onUpdateField: React.PropTypes.func.isRequired,
	onAddFieldEntry: React.PropTypes.func.isRequired,
	onDeleteFieldEntry: React.PropTypes.func.isRequired,
};

export default CSEditor;
