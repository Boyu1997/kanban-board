import React, { Component } from 'react';
import { DragSource, DropTarget, isDragging } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import flow from 'lodash/flow';

import Card from './Card.js';
import './ListCard.css';

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      category: props.category,
      index: props.index,
    }
  },
  isDragging(props, monitor) {
    return props.id === monitor.getItem().id;
  }
}

const cardTarget = {
  hover(props, monitor, component) {
    const dragCategory = monitor.getItem().category
    const dragIndex = monitor.getItem().index
    const hoverCategory = props.category
    const hoverIndex = props.index
    const hoverId = props.id

    // hover over itself, do nothing
    if (dragCategory===hoverCategory && dragIndex===hoverIndex) {
      return;
    }

    // otherwise, update card position
    props.moveCard(dragCategory, dragIndex, hoverCategory, hoverIndex);
    monitor.getItem().index = hoverIndex;
    monitor.getItem().category = hoverCategory;
  }
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
              isDragging = {isDragging}
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
