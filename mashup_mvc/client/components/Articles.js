import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SHOW_RU, SHOW_UA, SHOW_EN } from '../constants/ArticlesFilters';

const ARTICLES_FILTERS = {
  [SHOW_RU]: SHOW_RU,
  [SHOW_UA]: SHOW_RU,
  [SHOW_EN]: SHOW_RU
};

export default class Articles extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {filter: SHOW_UA};
	}
	
	render() {
	  const { articles } = this.props;
	  
		return (
      <ul>
        {'ua' in articles && articles.ua.map(article =>
          <li key={article.href}>
            <a href={article.href} target='_blank'>{article.title}</a>
          </li >
        )}
      </ul>
		);
	}
}

Articles.propTypes = {
  articles: PropTypes.object
};
