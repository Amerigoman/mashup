import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Articles from '../components/Articles';
import ToggleLanguage from '../components/ToggleLanguage';
import { RU, UA, EN } from '../constants/ArticlesFilters';

const ARTICLES_FILTERS = {
	[EN]: EN,
	[RU]: RU,
	[UA]: UA
};


export default class ArticlesContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    	articlesIsVisible: false
    };
  }

  render() {
  	const { articles, chosenMarker, lang } = this.props.mashup;
  	
  	let chosenArticles = chosenMarker in articles ? articles[chosenMarker] : {};
  	let languages = Object.keys(ARTICLES_FILTERS).map(function(key) {
  		return ARTICLES_FILTERS[key];
  	});
  	
    return (
    	<div className='articles-container'>
		    { this.renderToggleButton() }
		      <div className={classnames({
			      hidden: !this.state.articlesIsVisible,
			      'lang-article-container': true
		      })}>
			      <ToggleLanguage languages={languages}
			                      actions={this.props.actions}
			                      mashup={this.props.mashup} />
			      <Articles articles={chosenArticles} lang={lang} chosenMarker={chosenMarker} />
			    </div>
	    </div>
    );
  }
  
  renderToggleButton() {
  	return (
  		<div className='toggle' onClick={::this.toggleArticles}>
			  <span className={classnames({
				  toggle_open: !this.state.articlesIsVisible,
				  toggle_close: this.state.articlesIsVisible
		  })} />
		  </div>
	  )
  }
  
  toggleArticles() {
  	this.setState({
		  ...this.state,
		  articlesIsVisible: !this.state.articlesIsVisible
  	})
  }
}

ArticlesContainer.propTypes = {
	actions: PropTypes.object.isRequired,
	mashup: PropTypes.object.isRequired
};
