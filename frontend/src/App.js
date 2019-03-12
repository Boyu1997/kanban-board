import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import Board from './Board.js';
import './App.css';
import data from './data.js'

class App extends Component {
  state = {
    cards : [],
  }
  componentWillMount() {
    this.setState({ cards: data.cards })
  }

  render() {
    const { cards } = this.state;
    return (
      <div className='App'>
        <div className='app-container'>
          <Board
            cards={cards}
          />
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
