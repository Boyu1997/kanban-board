import React, { Component } from 'react';
import { Route } from 'react-router-dom';
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
    const id = cards['todo'].length + cards['inProgress'].length
               + cards['codeReview'].length + cards['done'].length + 1
    const randomWords = require('random-words');
    const card = {
      id: id,
      title: randomWords({ min: 1, max: 3, join: ' ' }),
      content: randomWords({ min: 2, max: 6, join: ' ' })
    }
    cards[category].push(card)
    this.setState({ cards: cards })
  }

  createCard = (card) => {
    const cards = this.state.cards;
    card.id = cards['todo'].length + cards['inProgress'].length
              + cards['codeReview'].length + cards['done'].length + 1
    cards[card.category].push(card)
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
          <Route path='/create' render={({ history }) => (
            <div>
              <CreateCard
                createCard={this.createCard}
                history={history}
              />
            </div>
          )} />
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
