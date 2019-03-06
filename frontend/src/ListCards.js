import React, { Component } from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import Card from './Card.js'
import './ListCards.css';
const update = require('immutability-helper');

class ListCards extends Component {
  state = {
    cards: [],
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

  componentDidMount() {
    this.setState({ cards: this.props.cards})
  }
  render() {
    return (
      <div className="list-cards">
        <h1>{this.props.category}</h1>
        {this.state.cards.map((card, i) => (
          <Card
            key = {card.id}
            index = {i}
            id = {card.id}
            title = {card.title}
            moveCard = {this.moveCard}
          />
        ))}
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(ListCards);
