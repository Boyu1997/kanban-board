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

  hoverSpace = () => {
    console.log("h")
  }

  moveCard = (dragCategory, dragIndex, hoverCategory, hoverIndex) => {
    const cards = this.state.cards
    const dragCard = cards[dragCategory][dragIndex]

    cards[hoverCategory].splice(hoverIndex, 0, dragCard)
    cards[dragCategory].splice(dragIndex, 1)

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
          dragFunctions={{
            'moveCard': this.moveCard,
            'hoverSpace': this.hoverSpace,
          }}
        />
        <BoardList className='BoardList'
          listName='In Progress'
          category='inProgress'
          cards={cards.inProgress}
          dragFunctions={{
            'moveCard': this.moveCard,
            'hoverSpace': this.hoverSpace,
          }}
        />
        <BoardList className='BoardList'
          listName='Code Review'
          category='codeReview'
          cards={cards.codeReview}
          dragFunctions={{
            'moveCard': this.moveCard,
            'hoverSpace': this.hoverSpace,
          }}
        />
        <BoardList className='BoardList'
          listName='Done'
          category='done'
          cards={cards.done}
          dragFunctions={{
            'moveCard': this.moveCard,
            'hoverSpace': this.hoverSpace,
          }}
        />
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(Board);
