import React, { Component } from 'react';
import { Provider } from 'react-redux';
import TodoApp from './MashupApp';

export default class Root extends Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <TodoApp />
      </Provider>
    );
  }
}
