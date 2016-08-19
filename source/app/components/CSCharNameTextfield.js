import React from 'react';
import classNames from 'classnames';

class CSTitleTextfield extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
		};

		this.handlers = {
			clickText: event => this.handleClickText( event ),
			submit: event => this.handleSubmit( event ),
			blur: event => this.handleBlur( event ),
			change: event => this.handleChange( event ),
		};

		let Wrapper = props.wrapper;

		if( Wrapper ) {
			// this.Wrapper = props => <Wrapper { ...props } />;
			this.Wrapper = Wrapper;
		}
		else {
			// TODO: Probably shouldn't leave the h4 as default wrapper.
			this.Wrapper = "h4";
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
				className={ classNames( 'cs-char-name-textfield', this.props.className, {
					'cs-char-name-textfield__active': this.props.active === true,
				})}
				>
				<div className={ classNames( 'cs-control-group' ) }>
					{/* This div is the original plain text field.*/}
					<div
						onClick={ this.handlers.clickText }>
						<div className="cs-char-name-textfield--text">
							{ this.props.showLabel
								? <span className="cs-char-name-textfield--text-label">{ this.props.label }:</span>
								: ' '
							}
							{' '}
							{ this.props.value.trim()
								? <div className="cs-char-name-textfield--text-value">{ this.props.valuePrefix }{ this.props.value.trim() }</div>
								: <div className="cs-char-name-textfield--text-value cs-char-name-textfield--text-value__placeholder">{ this.props.valuePrefix }({ this.props.placeholder })</div>
							}
						</div>
					</div>
				</div>

				<form className={ classNames( 'cs-char-name-textfield--form', {
						'cs-char-name-textfield--form__hidden': this.props.active === false,
					})}
					onSubmit={ this.handlers.submit }>
					<div className="input-group">
						<div className="cs-char-name-textfield--form-label input-group-addon">
							{ this.props.label }:
						</div>
						<input
							type="text"
							className="form-control cs-char-name-textfield--form-input"
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
	wrapper: React.PropTypes.string,
	className: React.PropTypes.string,
	expanded: React.PropTypes.bool,
	value: React.PropTypes.string,
	valuePrefix: React.PropTypes.string,
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
	valuePrefix: '',
};

export default CSTitleTextfield;
