import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import BoardList from './BoardList.js';
import './Board.css';
import update from 'immutability-helper';

function mapCardsByStatus(cards) {
  const mappedCards = {
    'todo': [],
    'inProgress': [],
    'codeReview': [],
    'done': [],
  }

  cards.map(card => {
    mappedCards[card.status].push(card)
  })

  return mappedCards
}

class Board extends Component {
  componentWillMount() {
    this.setState({ cards: mapCardsByStatus(this.props.cards) })
  }

  moveCard = (dragCategory, dragIndex, hoverCategory, hoverIndex) => {
    const cards = this.state.cards
    const dragCard = cards[dragCategory][dragIndex]
    const hoverCard = cards[hoverCategory][hoverIndex]

    cards[dragCategory][dragIndex] = hoverCard
    cards[hoverCategory][hoverIndex] = dragCard

    console.log(cards)
    this.setState({ cards: cards })
  }

  render() {
    const { cards } = this.state
    return (
      <div className="board-container">
        <BoardList className='BoardList'
          listName='To Do'
          category='todo'
          cards={cards.todo}
          moveCard={this.moveCard}
        />
        <BoardList className='BoardList'
          listName='In Progress'
          category='inProgress'
          cards={cards.inProgress}
          moveCard={this.moveCard}
        />
        <BoardList className='BoardList'
          listName='Code Review'
          category='codeReview'
          cards={cards.codeReview}
          moveCard={this.moveCard}
        />
        <BoardList className='BoardList'
          listName='Done'
          category='done'
          cards={cards.done}
          moveCard={this.moveCard}
        />
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(Board);
