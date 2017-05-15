import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Articles from '../components/Articles';
import ArticlesToggle from '../components/ArticlesToggle';


export default class ArticlesContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { ArticlesIsVisible: true };
  }

  render() {
  	const { articles } = articles;
  	
    return (
    	<div>
		   
	    </div>
    );
  }
}

// ArticlesContainer.propTypes = {
// };
