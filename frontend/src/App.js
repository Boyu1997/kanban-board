import React, { Component } from 'react';
import ListCards from './ListCards.js';
import './App.css';
import cards from './data.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <ListCards
            category="To Do"
            cards={cards.todo}
          />
          <ListCards
            category="In Progress"
            cards={cards.inProgress}
          />
          <ListCards
            category="Code Review"
            cards={cards.codeReview}
          />
          <ListCards
            category="Done"
            cards={cards.done}
          />
        </div>
      </div>
    );
  }
}

export default App;
