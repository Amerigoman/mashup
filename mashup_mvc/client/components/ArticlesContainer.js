import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Articles from '../components/Articles';
import ArticlesToggle from '../components/ArticlesToggle';


export default class ArticlesContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { articlesIsVisible: false };
  }

  render() {
  	const { articles } = this.props.articles;
  	
    return (
    	<div className='articles-container'>
		    { this.renderToggleButton() }
		    <div className={classnames({
			    hidden: !this.state.articlesIsVisible,
			    article: true
		    })}>
			    { this.renderArticles() }
		    </div>
	    </div>
    );
  }
  
  renderToggleButton() {
  	return (
  		<div className='toggle-button' onClick={::this.toggleArticles}>
			  <span>Click</span>
		  </div>
	  )
  }
  
  renderArticles() {
  	const { articles, chosenMarker } = this.props;
  	let chosenArticles = chosenMarker in articles ? articles[chosenMarker] : {};
  	
	  return <Articles articles={chosenArticles} />
  }
  
  toggleArticles() {
  	console.log('toggleArticles');
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
