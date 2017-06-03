import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Articles from '../components/Articles';
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
    	articlesIsVisible: false,
	    filter: UA
    };
  }

  render() {
    return (
    	<div className='articles-container'>
		    { this.renderToggleButton() }
		      <div className={classnames({
			      hidden: !this.state.articlesIsVisible,
			      'lang-article-container': true
		      })}>
			      { this.renderToggleLanguage() }
			      { this.renderArticles() }
			    </div>
	    </div>
    );
  }
  
  renderToggleLanguage() {
  	let { chosenMarker } = this.props;
  	let languages = Object.keys(ARTICLES_FILTERS).map(function(key) {
  		return ARTICLES_FILTERS[key];
  	});
  	
  	return (
  		<div className='head-container'>
			  <h1 className='title pull-left'>{chosenMarker ? chosenMarker : 'Choose a place'}</h1>
			  <ul className={classnames({
				  'toggle-language': true,
				  hidden: !chosenMarker
			  })}>
			  { languages.map( lang => <li key={lang}
			                               style={{ cursor: 'hand' }}
			                               className={classnames({
				                               active: lang === this.state.filter,
				                               'pull-right': true
			                               })}
			                               onClick={this.handleLangOnClick.bind(this, lang)}
			                             >
				                           {lang}
															   </li>)
			  }
		  </ul>
		  </div>
  		
  		
	  )
  }
  
  handleLangOnClick(lang) {
  	let currentLang = this.state.filter;
  	let { chosenMarker, getArticles } = this.props;
  	
  	
  	if (currentLang !== lang) {
  		getArticles(chosenMarker, lang);
  		this.setState({ ...this.state, filter: lang });
	  }
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
  
  renderArticles() {
  	const { articles, chosenMarker } = this.props;
  	let chosenArticles = chosenMarker in articles ? articles[chosenMarker] : {};
  	
	  return <Articles articles={chosenArticles} lang={this.state.filter} chosenMarker={chosenMarker} />
  }
  
  toggleArticles() {
  	this.setState({
		  ...this.state,
		  articlesIsVisible: !this.state.articlesIsVisible
  	})
  }
}

ArticlesContainer.propTypes = {
  articles: PropTypes.object.isRequired,
	getArticles: PropTypes.func.isRequired,
	chosenMarker: PropTypes.string.isRequired
};
