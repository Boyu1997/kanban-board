import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import BoardList from './BoardList.js';
import './style/Board.css';

function mapCardsByCategory(cards) {
  const mappedCards = {
    'todo': [],
    'inProgress': [],
    'codeReview': [],
    'done': [],
  }

  cards.map(card => {
    mappedCards[card.category].push(card)
  })

  return mappedCards
}

class Board extends Component {
  state = {
    hoverPlaceholderCard: 'None'
  }
  componentWillMount() {
    this.setState({ cards: mapCardsByCategory(this.props.cards) })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ cards: mapCardsByCategory(nextProps.cards) })
  }

  moveCard = (dragCategory, dragIndex, hoverCategory, hoverIndex) => {
    const cards = this.state.cards
    const dragCard = cards[dragCategory][dragIndex]

    cards[dragCategory].splice(dragIndex, 1)
    cards[hoverCategory].splice(hoverIndex, 0, dragCard)

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
