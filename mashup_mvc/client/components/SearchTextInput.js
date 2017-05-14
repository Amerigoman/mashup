import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class SearchTextInput extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    text: PropTypes.string,
    placeholder: PropTypes.string,
    editing: PropTypes.bool,
    empty: PropTypes.bool
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      text: this.props.text || ''
    };
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }
  
  handleSearchCodes(e) {
    this.props.onSearch(this.state.text);
  }

  render() {
    return (
      <div>
      <input
             type='text'
             placeholder={this.props.placeholder}
             autoFocus='true'
             value={this.state.text}
             onChange={::this.handleChange}
             onKeyUp={::this.handleSearchCodes}
      />
        <ul>
          <li>1</li>
          <li>2</li>
        </ul>
      </div>
    );
  }
}
