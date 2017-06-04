import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class Articles extends Component {
	constructor(props, context) {
		super(props, context);
	}
	
	render() {
		return (
			<div>
				{this.loading()}
				{this.renderArticles()}
			</div>
		);
	}
	
	cutString(text, maxStrLength){
    if(text.length > maxStrLength) {
    	let prettyCut = text.slice(0, maxStrLength);
    	prettyCut = prettyCut.slice(0, this.regexLastIndexOf(prettyCut, /[.,]?[\s]/));
    	
    	return prettyCut + '...';
    }
    
    return text;
	}
	
	regexLastIndexOf(str, regex, startpos) {
    regex = (regex.global) ? regex : new RegExp(regex.source, "g" + (regex.ignoreCase ? "i" : "") + (regex.multiLine ? "m" : ""));
    if(typeof (startpos) === "undefined") {
        startpos = str.length;
    } else if(startpos < 0) {
        startpos = 0;
    }
    let stringToWorkWith = str.substring(0, startpos + 1);
    let lastIndexOf = -1;
    let nextStop = 0;
    let result;
    while((result = regex.exec(stringToWorkWith)) !== null) {
        lastIndexOf = result.index;
        regex.lastIndex = ++nextStop;
    }
    return lastIndexOf;
}
	
	renderArticles() {
		const { lang, articles } = this.props;
		
		if (lang in articles && articles[lang].length) {
			return (
				<ul className='article'>
					{ articles[lang].map(article =>
						<li key={article.href}>
							<a href={article.href} target='_blank'>{this.cutString(article.title, 75)}</a>
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
