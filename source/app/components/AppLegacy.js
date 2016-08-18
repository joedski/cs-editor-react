import React from 'react';
import { connect } from 'react-redux';
// import MessageForm from './MessageForm';

const App = ( props ) => {

	let smallItem = ({ label, id, placeholder }) => (
		<div className="col-xs-12 col-md-6">
			<div className="form-group">
				<label htmlFor={ id } className="control-label">{ label }</label>
				<div className=""><input type="text" className="form-control" id={ id } placeholder={ placeholder } /></div>
			</div>
		</div>
	);

	return (
		<div className="app-container full-window flex-column">
			<nav className="app-header-controls navbar-default flex-fixed">
				<div className="app-controls--brand navbar-header">
					<span className="navbar-brand">CS Editor</span>
				</div>
				<ul className="app-controls--main-controls navbar-nav nav">
					<li className=""><a href="#non" className="">CS: Whatseirface</a></li>
					<li className=""><a href="#non" className="">Save CS</a></li>
					<li className=""><a href="#non" className="">Save Zip of All CSs</a></li>
				</ul>
			</nav>

			<div className="app-content flex-row flex-grow flex-padded">
				<section className="app-content--section cs-editor flex-item">
					<section className="container-fluid">
						<h4>Preamble</h4>
						{ /* omitting container-fluid so as to not add the usual padding. */ }
						<div className="row">
							<div className="col-xs-12">
								<div className="form-group">
									<textarea className="form-control" name="cs-pre-note" id="cs-pre-note" placeholder="A note about this CS..."></textarea>
								</div>
							</div>
							{ smallItem({ label: "Full Name", id: 'cs-pre-charname', placeholder: "Character's full name" }) }
							{ smallItem({ label: "Species", id: 'cs-pre-species', placeholder: "Quick designation of character's species" }) }
							{ smallItem({ label: "Gender", id: 'cs-pre-gender', placeholder: "Character's gender" }) }
							{ smallItem({ label: "Player", id: 'cs-pre-player', placeholder: "Your name, and IRC nick if different" }) }
						</div>
					</section>
					<section className="container-fluid">
						<h4>Physical Profile</h4>
						{
							<div className="panel panel-default cs-physical-form">
								<div className="panel-heading">
									{ /* Maybe do a thing where the title is text until the user clicks on it?  Or hits an edit button. */ }
									<div className="flex-row flex-padded-children">
										<input type="text" id="cs-physical-form-0-name" className="form-control flex-grow" placeholder="Name of Form" />
										<button className="btn btn-default">Show  <i className="glyphicon glyphicon-folder-open"></i></button>
									</div>
								</div>
								<div className="panel-body">
										<div className="row">
											{ smallItem({ label: "Height & Weight", id: 'cs-physical-form-0-height-weight', placeholder: "Bipedal and/or Quad" }) }
											{ smallItem({ label: "Apparent Age", id: 'cs-physical-form-0-age', placeholder: "How old they appear" }) }
											{ smallItem({ label: "Build", id: 'cs-physical-form-0-build', placeholder: "Lithe, Ripped, Stocky, Tall, etc." }) }
											{ smallItem({ label: "Clothing Style", id: 'cs-physical-form-clothing', placeholder: "Usual apparel worn" }) }
											{ smallItem({ label: "Voice", id: 'cs-physical-form-voice', placeholder: "How they sound speaking" }) }
											{ smallItem({ label: "Usual Scents", id: 'cs-physical-form-scents', placeholder: "Smells usually on them" }) }
										</div>
								</div>
								<div className="panel-body">
									Pictures!
								</div>
								<div className="panel-body">
									Description!
								</div>
							</div>
						}
					</section>
					<section className="container-fluid">
						<h4>Inventory</h4>
						<p>Array (min: 0) of assets they either usually have on hand, or notable assets they have ownership of.</p>
					</section>
					<section className="container-fluid">
						<h4>Skills and Abilities</h4>
						<p>Various things they are able to do that are play or plot relevant.</p>
					</section>
					<section className="container-fluid">
						<h4>Paranormal Abilities</h4>
						<p>Array (min: 0) of atypical abilities, whether through super science, magic, psionics, or other things above typical biological or mechanical baselines.</p>
					</section>
					<section className="container-fluid">
						<h4>Background</h4>
						<p>Stuff about the origins of this Character.</p>
					</section>
				</section>

				<section className="app-content--section cs-preview flex-item flex-column">
					<div className="cs-preview--controls flex-fixed">
						<ul className="nav nav-pills">
							<li role="presentation" className="active"><a href="#non">Forum Preview</a></li>
							<li role="presentation"><a href="#non">BBCode</a></li>
						</ul>
					</div>
					<div className="cs-preview--render flex-grow">BBCODE OH GOD AAAAAAAAAH wait that's Godzilla.</div>
				</section>
			</div>
		</div>
	);
};

App.propTypes = {
	message: React.PropTypes.string.isRequired
};

// NOTE: In a larger app you would (usually!) create separate connected components from
// the normal layout components, but it's not always immediately clear when to do that,
// so starting out in the same file like this is reasonable.

const mapState = state => ({
	message: state.message
});

const mapDispatch = () => ({});

const CurrentApp = connect( mapState, mapDispatch )( App );

export default CurrentApp;
