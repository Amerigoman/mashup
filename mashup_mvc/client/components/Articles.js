import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Articles extends Component {
	constructor(props, context) {
		super(props, context);
	}
	
	render() {
	  const { lang, articles } = this.props;
	  
		return (
			<div>
				<ul className='article'>
					{this.loading()}
					{lang in articles && articles[lang].map(article =>
						<li key={article.href}>
							<a href={article.href} target='_blank'>{this.cutString(article.title, 20)}</a>
						</li>
					)}
					</ul>
			</div>
		);
	}
	
	cutString(text, maxStrLength){
    if(text.length > maxStrLength) {
        let pattern = /^(.{maxStrLength}[^\s]*).*/; // ^(.{11}[^\s]*).*/
	      console.log(text.replace(pattern, '$1'));
	      
        return text.replace(pattern, '$1');
    }
    
    return text;
	}
	
	loading() {
		const { lang, articles } = this.props;
		
		if (!(lang in articles)) {
			return (
				<div>
					loading...
				</div>
			)
		}
	}
}

Articles.propTypes = {
  articles: PropTypes.object,
	lang: PropTypes.string.isRequired
};
