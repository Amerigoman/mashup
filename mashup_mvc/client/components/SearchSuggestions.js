import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class SearchSuggestions extends Component {

  render() {
  	const { code, setCenter } = this.props;
  	
    return (
      <li onClick={ setCenter.bind(this, code.latitude, code.longitude) }>
	      { code.postal_code + ' ' + code.area + ' ' +
	        code.region + ' ' + code.city }
      </li>
    );
  }
}

SearchSuggestions.propTypes = {
	code: PropTypes.object.isRequired,
	setCenter: PropTypes.func.isRequired
};
