import React from 'react';
import classNames from 'classnames';

class CSTextarea extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
		};

		this.handlers = {
			click: event => this.handleClick( event ),
			submit: event => this.handleSubmit( event ),
			blur: event => this.handleBlur( event ),
			change: event => this.handleChange( event ),
		};
	}

	handleClick( event ) {
		event.preventDefault();
		event.stopPropagation();

		if( this.props.active ) {
			return;
		}

		this.props.onActivate();
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
		// TODO: Bind these handlers in the constructor to prevent prop thrashing.
		return (
			<div
				className={ classNames( 'cs-textarea', {
					'cs-textarea__active': this.props.active === true,
				})}
				onClick={ this.handlers.click }>
				<div className="cs-textarea--text">
					<div className="cs-textarea--text-label">{ this.props.label }:</div>
					{ this.props.value.trim()
						? <div className="cs-textarea--text-value">{ this.props.value.trim() }</div>
						: <div className="cs-textarea--text-value cs-textarea--text-value__placeholder">({ this.props.placeholder })</div>
					}
				</div>

				<form className={ classNames( 'cs-textarea--form', {
						'cs-textarea--form__hidden': this.props.active === false,
					})}
					onSubmit={ this.handlers.submit }>
					<div className="panel panel-default">
						<div className="cs-textarea--form-label panel-heading">
							<div className="">{ this.props.label }:</div>
						</div>
						{/* @name and @id? */}
						<textarea
							rows="4"
							className="cs-textarea--form-input form-control"
							placeholder={ this.props.placeholder }
							value={ this.props.value }
							onBlur={ this.handlers.blur }
							onChange={ this.handlers.change }
							></textarea>
					</div>
				</form>
			</div>
		);
	}
}

CSTextarea.propTypes = {
	value: React.PropTypes.string,
	active: React.PropTypes.bool,
	label: React.PropTypes.string.isRequired,
	placeholder: React.PropTypes.string.isRequired,
	onActivate: React.PropTypes.func.isRequired,
	onDeactivate: React.PropTypes.func.isRequired,
	onChange: React.PropTypes.func.isRequired,
};

CSTextarea.defaultProps = {
	value: '',
	active: false,
};

export default CSTextarea;
