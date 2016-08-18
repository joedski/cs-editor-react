import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

// Example of a Component that has local state, where changes in props should take precedence.

class MessageForm extends React.Component {
	constructor( props ) {
		super( props );

		// NOTE: ES6 classes do not use getInitialState().
		this.state = { message: props.message };

		// NOTE: In the element event handlers in render(), I use (e => this.handleWhatever( e )).
		// If you want to not write arrow functions there, (possibly fewer prop updates?)
		// then you should bind handler instance methods here.
		// eg: this.handleChange = this.handleChange.bind( this ), etc.
	}

	render() {
		return (
			<div className="panel panel-default">
				<div className="panel-heading">Change the Message</div>
				<div className="panel-body">
					<form onSubmit={ e => this.handleSubmit( e ) }>
						<div className="input-group">
							<input
								type="text"
								className="form-control"
								placeholder="Say something...!"
								value={ this.state.message }
								onChange={ e => this.handleChange( e ) } />
							<span className="input-group-btn">
								<button
									className="btn btn-primary"
									type="submit"
									>Set</button>
							</span>
						</div>
					</form>
				</div>
			</div>
		);
	}

	handleChange( event ) {
		this.setState({
			message: event.target.value,
		});
	}

	handleSubmit( event ) {
		event.preventDefault();

		// NOTE: This will fire even if you don't change the input!
		// If you want to prevent that, add a check for this.state.message === this.props.message.
		this.props.onUpdate( this.state.message );
	}

	componentWillReceiveProps( nextProps ) {
		let nextState = {};

		// Only resync message if the new message is actually different from the previous.
		if( nextProps.message !== this.props.message ) {
			nextState.message = nextProps.message;
		}

		this.setState( nextState );
	}
}

MessageForm.propTypes = {
	message: React.PropTypes.string,
	onUpdate: React.PropTypes.func,
};

// NOTE: In a larger app you would (usually!) create separate connected components from
// the normal layout components, but it's not always immediately clear when to do that,
// so starting out in the same file like this is reasonable.

function mapState( state ) {
	return {
		message: state.message,
	};
}

function mapDispatch( dispatch ) {
	return {
		onUpdate( message ) {
			dispatch( actions.updateMessage( message ) );
		}
	}
}

const CurrentMessageForm = connect( mapState, mapDispatch )( MessageForm );

export default CurrentMessageForm;
