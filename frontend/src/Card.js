import React, { Component } from 'react';

import './Card.css';


class Card extends Component {
  render() {
    const { card, isDragging } = this.props;
    return (
      <div className="card-container" style={{
          opacity: isDragging ? 0.3 : 1,
        }}>
        <p>{card.title}</p>
      </div>
    )
  }
}

export default Card;
