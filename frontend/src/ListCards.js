import React, { Component } from 'react'
import Card from './Card.js'
import './ListCards.css';

class ListCards extends Component {
  render() {
    return (
      <div className="list-cards">
        <h1>{this.props.category}</h1>
        {this.props.cards.map((card) => (
          <Card
            key={card.id}
            title={card.title}
          />
        ))}
      </div>
    )
  }
}

export default ListCards
