import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import Menu from './Menu.js';
import Board from './Board.js';
import CreateCard from './CreateCard.js'
import './style/App.css';
import data from './data.json'

class App extends Component {
  state = {
    cards : data.cards,
  }
  randomCard = () => {
    const cards = this.state.cards;
    const categorys = ['todo', 'inProgress', 'codeReview', 'done'];
    const category = categorys[Math.floor(Math.random()*4)]
    const card = {
      id: [...Array(10)].map(i=>(~~(Math.random()*36)).toString(36)).join(''),
      title: [...Array(10)].map(i=>(~~(Math.random()*36)).toString(36)).join('')
    }
    cards[category].push(card)
    this.setState({ cards: cards })
  }

  render() {
    const { cards } = this.state;
    return (
      <div className='App'>
        <div className='app-container'>
          <Route exact path='/' render={() => (
            <div className='container'>
              <Menu randomCard={this.randomCard} />
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
