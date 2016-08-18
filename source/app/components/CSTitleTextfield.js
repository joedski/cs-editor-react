import React from 'react';
import classNames from 'classnames';

class CSTitleTextfield extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
		};

		this.handlers = {
			clickExpansionToggle: event => this.handleClickExpansionToggle( event ),
			clickText: event => this.handleClickText( event ),
			clickRemove: event => this.handleClickRemove( event ),
			submit: event => this.handleSubmit( event ),
			blur: event => this.handleBlur( event ),
			change: event => this.handleChange( event ),
		};

		let Wrapper = props.wrapper;

		if( Wrapper ) {
			this.Wrapper = props => <Wrapper { ...props } />;
		}
		else {
			// TODO: Probably shouldn't leave the h4 as default wrapper.
			this.Wrapper = "h4";
		}
	}

	handleClickExpansionToggle( event ) {
		event.preventDefault();
		event.stopPropagation();

		if( this.props.expanded ) {
			console.log( 'CSTitleTextfield/handleClickExpansionToggle: stub' );
		}
		else {
			console.log( 'CSTitleTextfield/handleClickExpansionToggle: stub' );
		}
	}

	handleClickText( event ) {
		event.preventDefault();
		event.stopPropagation();

		if( this.props.active ) {
			return;
		}

		this.props.onActivate();
	}

	handleClickRemove( event ) {
		event.preventDefault();
		event.stopPropagation();

		console.log( 'CSTitleTextfield/handleClickRemove: stub' );
	}

	handleSubmit( event ) {
		event.preventDefault();
		event.stopPropagation(); // do form events even propagate?

		this.props.onDeactivate();
	}

	handleBlur( event ) {
		event.stopPropagation(); // I'm pretty sure blur doesn't propagate.

		this.props.onDeactivate();
	}

	handleChange( event ) {
		this.props.onChange( event.target.value );
	}

	render() {
		let { Wrapper } = this;

		return (
			<Wrapper
				className={ classNames( 'cs-title-textfield', this.props.className, {
					'cs-title-textfield__active': this.props.active === true,
				})}
				>
				<div className={ classNames( 'cs-control-group' ) }>
					<div className="cs-control-group--subgroup cs-control-group--subgroup__fixed">
						{/* expand, delete
							Or maybe delete should be part of the edit controls so it's not as easy?
							I dunno.
						 */}
						<div
							className="cs-control-button physical--form-toggle physical--form-toggle__visible"
							onClick={ this.handlers.clickExpansionToggle }
							>
							<i className="glyphicon glyphicon-chevron-down"></i>
						</div>
					</div>

					{/* This div is the original plain text field.*/}
					<div
						onClick={ this.handlers.clickText }>
						<div className="cs-title-textfield--text">
							{ this.props.showLabel
								? <span className="cs-title-textfield--text-label">{ this.props.label }:</span>
								: ' '
							}
							{' '}
							{ this.props.value.trim()
								? <div className="cs-title-textfield--text-value">{ this.props.value.trim() }</div>
								: <div className="cs-title-textfield--text-value cs-title-textfield--text-value__placeholder">({ this.props.placeholder })</div>
							}
						</div>
					</div>
				</div>

				<form className={ classNames( 'cs-title-textfield--form', {
						'cs-title-textfield--form__hidden': this.props.active === false,
					})}
					onSubmit={ this.handlers.submit }>
					<div className="input-group">
						<div className="cs-title-textfield--form-label input-group-addon">
							<div className="cs-title-textfield--form-label-control-group">
								<div
									className="btn btn-default"
									onClick={ this.handlers.clickRemove }
									>
									<i className="glyphicon glyphicon-remove"></i>
								</div>
							</div>

							{ this.props.label }:
						</div>
						<input
							type="text"
							className="form-control cs-title-textfield--form-input"
							placeholder={ this.props.placeholder }
							value={ this.props.value }
							onBlur={ this.handlers.blur }
							onChange={ this.handlers.change } />
					</div>
				</form>
			</Wrapper>
		);
	}
}

CSTitleTextfield.propTypes = {
	wrapper: React.PropTypes.element,
	className: React.PropTypes.string,
	expanded: React.PropTypes.bool,
	value: React.PropTypes.string,
	active: React.PropTypes.bool,
	label: React.PropTypes.string.isRequired,
	showLabel: React.PropTypes.bool,
	placeholder: React.PropTypes.string.isRequired,
	onActivate: React.PropTypes.func.isRequired,
	onDeactivate: React.PropTypes.func.isRequired,
	onChange: React.PropTypes.func.isRequired,
};

CSTitleTextfield.defaultProps = {
	value: '',
	active: false,
	showLabel: false,
	expanded: true,
};

export default CSTitleTextfield;
