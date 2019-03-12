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

  console.log(cards)

  cards.map(card => {
    mappedCards[card.status].push(card)
  })

  return mappedCards
}

class Board extends Component {
  componentWillMount() {
    this.setState({ cards: mapCardsByStatus(this.props.cards) })
  }

  moveCard = (dragIndex, hoverIndex) => {
    const { cards } = this.state
    const dragCard = cards[dragIndex]

    this.setState(
      update(this.state, {
        cards: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
        },
      }),
    )
  }

  render() {
    const { cards } = this.state
    return (
      <div className="board-container">
        <BoardList className='BoardList'
          listName='To Do'
          category='todo'
          cards={cards.todo}
        />
        <BoardList className='BoardList'
          listName='In Progress'
          category='inProgress'
          cards={cards.inProgress}
        />
        <BoardList className='BoardList'
          listName='Code Review'
          category='codeReview'
          cards={cards.codeReview}
        />
        <BoardList className='BoardList'
          listName='Done'
          category='done'
          cards={cards.done}
        />
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(Board);
