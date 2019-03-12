import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import flow from 'lodash/flow';

import Card from './Card.js';
import './ListCard.css';

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    }
  }
}

const cardTarget = {
}


function dragCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

function dropCollect(connect) {
  return {
    connectDropTarget: connect.dropTarget(),
  }
}

class ListCard extends Component {
  render() {
    const {
      card,
      category,
      index,
      moveCard,
      isDragging,
      connectDragSource,
      connectDropTarget,
    } = this.props;
    return (
      connectDragSource(
        connectDropTarget(
          <div className="list-card-container">
            <Card
              card = {card}
            />
          </div>
        )
      )
    )
  }
}

export default flow(
  DragSource('card', cardSource, dragCollect),
  DropTarget('card', cardTarget, dropCollect),
)(ListCard);
