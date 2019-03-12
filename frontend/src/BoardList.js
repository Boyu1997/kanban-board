import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import ListCard from './ListCard.js';

class BoardList extends Component {

  render() {
    const { cards, listName, category, moveCard } = this.props;
    return (
      <div className="board-list">
        <h1>{listName}</h1>
        {cards.map((card, i) => (
          <ListCard
            key = {card.id}
            card = {card}
            category = {category}
            index = {i}
            moveCard = {moveCard}
          />
        ))}
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(BoardList);
