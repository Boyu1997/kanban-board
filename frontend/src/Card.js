import React, { Component } from 'react';

import './style/Card.css';
import trashIcon from './icon/icons8-trash.svg';


class Card extends Component {
  render() {
    const { card, isDragging, deleteCardHandler } = this.props;
    return (
      <div className="card-container" style={{
          opacity: isDragging ? 0.3 : 1,
        }}>
        <p>{card.title}</p>
    	  <img src={trashIcon} onClick={deleteCardHandler} alt="Delete"/>
      </div>
    )
  }
}

export default Card;
