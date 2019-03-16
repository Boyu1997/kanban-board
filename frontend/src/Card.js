import React, { Component } from 'react';

import './style/Card.css';


class Card extends Component {
  render() {
    const { card, isDragging, deleteCardHandler } = this.props;
    return (
      <div className="card-container" style={{
          opacity: isDragging ? 0.3 : 1,
        }}>
        <p>{card.title}</p>
        <button className='delete-button' onClick={deleteCardHandler}>Delete</button>
      </div>
    )
  }
}

export default Card;
