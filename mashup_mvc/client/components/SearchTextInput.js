import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchSuggestions from './SearchSuggestions';
import classnames from 'classnames';

export default class SearchTextInput extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      text: this.props.text || '',
      empty: this.props.empty
    };
  }

  handleChange(e) {
    if(e.target.value.length)
      this.setState({ ...this.state, text: e.target.value, empty: false });
    else
      this.setState({ ...this.state, text: e.target.value, empty: true });
  }
  
  handleSearchCodes(e) {
    if(this.state.text.length > 1)
      this.props.onSearch(this.state.text);
  }

  render() {
    return (
      <div>
        <input type='text'
               placeholder={this.props.placeholder}
               autoFocus='true'
               value={this.state.text}
               onChange={::this.handleChange}
               onKeyUp={::this.handleSearchCodes}/>
        <ul className="suggestions">
          {this._renderSearchSuggestions()}
        </ul>
      </div>
    );
  }
  
  _handleClick(lat, lng) {
    this.props.actions.setCenter(lat, lng);
    this.setState({ ...this.state, text: '', empty: true })
  }
  
  _renderSearchSuggestions() {
    const { foundCodes } = this.props;
    
    if(foundCodes.length && !this.state.empty)
      return foundCodes.map( code =>
          <SearchSuggestions setCenter={::this._handleClick}
                             code={code} key={code.postal_code} />
      );
    else if(!foundCodes.length && !this.state.empty)
      return <li>not found</li>
  }
}

SearchTextInput.propTypes = {
  onSearch: PropTypes.func.isRequired,
  foundCodes: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  editing: PropTypes.bool,
  empty: PropTypes.bool
};
