import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import Board from './Board.js';
import CreateCard from './CreateCard.js'
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
          <Route exact path='/' render={() => (
            <div>
              <Link to='/create' className='button'>New Card</Link>
              <Board cards={cards} />
            </div>
          )} />
          <Route path='/create' render={() => (
            <div>
              <CreateCard />
            </div>
          )} />
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
