import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

import './Card.css';

const cardSource = {
  beginDrag(props) {
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}


class Card extends Component {
  render() {
    const { isDragging, connectDragSource } = this.props;
    return connectDragSource(
      <div className="Card" style={{
          opacity: isDragging ? 0.5 : 1,
          fontSize: 25,
          fontWeight: 'bold',
          cursor: 'move'
        }}>
        <p>{this.props.title}</p>
      </div>
    );
  }
}

export default DragSource('card', cardSource, collect)(Card);
