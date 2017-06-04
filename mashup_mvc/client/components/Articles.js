import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { cutString } from '../utils/functions';


export default class Articles extends Component {
	render() {
		return (
			<div>
				{this.loading()}
				{this.renderArticles()}
			</div>
		);
	}
	
	renderArticles() {
		const { lang, articles } = this.props;
		
		if (lang in articles && articles[lang].length) {
			return (
				<ul className='article'>
					{ articles[lang].map(article =>
						<li key={article.href}>
							<a href={article.href} target='_blank'>{cutString(article.title, 70)}</a>
						</li>
					)}
				</ul>
			)
		} else if (lang in articles && !articles[lang].length) {
			return (
				<h1 className='title'>There is no article for this place</h1>
			)
		}
	}
	
	loading() {
		const { lang, articles, chosenMarker } = this.props;
		
		if (!(lang in articles) && chosenMarker) {
			return <div className='spinner' />
		}
	}
}

Articles.propTypes = {
  articles: PropTypes.object,
	lang: PropTypes.string.isRequired,
	chosenMarker: PropTypes.string.isRequired
};
