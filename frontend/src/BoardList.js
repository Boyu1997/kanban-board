import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import ListCard from './ListCard.js';
import ListHolder from './ListHolder.js';

import './style/BoardList.css';

class BoardList extends Component {

  render() {
    const { cards, listName, category, moveCard, deleteCard } = this.props;
    return (
      <div className={category==='todo' ? 'board-list-left': 'board-list'}>
        <h1>{listName}</h1>
        <div className='name-card-separate' />
        {cards.map((card, i) => (
          <ListCard
            key = {card.id}
            id = {card.id}
            card = {card}
            category = {category}
            index = {i}
            moveCard={moveCard}
            deleteCard={deleteCard}
          />
        ))}
        <ListHolder
          id = {category}
          category = {category}
          index = {cards.length}
          moveCard={moveCard}
        />
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(BoardList);
