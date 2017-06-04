import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


export default class ToggleLanguage extends Component {
	render() {
		let { chosenMarker } = this.props.mashup;
		let { languages } = this.props;
		
		return (
  		<div className='head-container'>
			  <h1 className='title pull-left'>{chosenMarker ? chosenMarker : 'Choose a place'}</h1>
			  <ul className={classnames({
				  'toggle-language': true,
				  hidden: !chosenMarker
			  })}>
				  {languages.map(
				    lang => <li key={lang} style={{ cursor: 'hand' }}
					              onClick={this.handleLangOnClick.bind(this, lang)}
					              className={classnames({
						              active: lang === this.props.mashup.lang,
						              'pull-right': true
					              })}>{lang}</li>
				  )}
			  </ul>
		  </div>
	  )
	}
	
	handleLangOnClick(lang) {
  	let { mashup } = this.props;
  	let { getArticles, setLanguageFilter } = this.props.actions;
  	
  	if (mashup.lang !== lang) {
  		getArticles(mashup.chosenMarker, lang);
  		setLanguageFilter(lang);
	  }
  }
}

ToggleLanguage.propTypes = {
	languages: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired,
	mashup: PropTypes.object.isRequired
};
