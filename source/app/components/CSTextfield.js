import React from 'react';
import classNames from 'classnames';

class CSTextfield extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			// value: props.value,
		};

		this.handlers = {
			click: event => this.handleClick( event ),
			submit: event => this.handleSubmit( event ),
			blur: event => this.handleBlur( event ),
			change: event => this.handleChange( event ),
		};
	}

	// componentWillReceiveProps( nextProps ) {
	// 	let { value, active } = nextProps;

	// 	if( this.props.active === false ) {
	// 		this.setState({ value });
	// 	}
	// }

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
		// this.setState({ value: event.target.value });
		this.props.onChange( event.target.value );
	}

	render() {
		return (
			<div
				className={ classNames( 'cs-textfield', {
					'cs-textfield__active': this.props.active === true,
				})}
				onClick={ this.handlers.click }>
				<div className="cs-textfield--text">
					<span className="cs-textfield--text-label">{ this.props.label }:</span>
					{' '}
					{ this.props.value.trim()
						? <span className="cs-textfield--text-value">{ this.props.value.trim() }</span>
						: <span className="cs-textfield--text-value cs-textfield--text-value__placeholder">({ this.props.placeholder })</span>
					}
				</div>

				<form className={ classNames( 'cs-textfield--form', {
						'cs-textfield--form__hidden': this.props.active === false,
					})}
					onSubmit={ this.handlers.submit }>
					<div className="input-group">
						<div className="cs-textfield--form-label input-group-addon">{ this.props.label }:</div>
						<input
							type="text"
							className="form-control cs-textfield--form-input"
							placeholder={ this.props.placeholder }
							value={ this.props.value }
							onBlur={ this.handlers.blur }
							onChange={ this.handlers.change } />
					</div>
				</form>
			</div>
		);
	}
}

CSTextfield.propTypes = {
	value: React.PropTypes.string,
	active: React.PropTypes.bool,
	label: React.PropTypes.string.isRequired,
	placeholder: React.PropTypes.string.isRequired,
	onActivate: React.PropTypes.func.isRequired,
	onDeactivate: React.PropTypes.func.isRequired,
	onChange: React.PropTypes.func.isRequired,
};

CSTextfield.defaultProps = {
	value: '',
	active: false,
};

export default CSTextfield;
