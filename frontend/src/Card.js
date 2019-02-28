import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Card.css';

class Card extends Component {
  render() {
    return (
      <div className="Card">
        <p>{this.props.title}</p>
      </div>
    );
  }
}

export default Card;
