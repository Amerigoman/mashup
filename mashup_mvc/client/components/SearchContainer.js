import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchTextInput from './SearchTextInput';


export default class SearchContainer extends Component {
  handleSearch(text) {
    if (text.length !== 0) {
      this.props.searchCodes(text);
    }
  }

  render() {
    return (
      <div className='search-container'>
        <SearchTextInput empty={true}
                         onSearch={::this.handleSearch}
                         placeholder='Enter your postal code' />
      </div>
    );
  }
}


SearchContainer.PropTypes = {
  searchCodes: PropTypes.func.isRequired
};
