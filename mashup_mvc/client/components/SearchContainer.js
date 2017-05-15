import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchTextInput from './SearchTextInput';


export default class SearchContainer extends Component {
  render() {
    return (
      <div className='search-container'>
        <SearchTextInput empty={true}
                         onSearch={this.props.searchCodes}
                         actions={this.props.actions}
                         foundCodes={this.props.foundCodes}
                         placeholder='Enter your postal code'/>
      </div>
    );
  }
}


SearchContainer.propTypes = {
  searchCodes: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired
};
