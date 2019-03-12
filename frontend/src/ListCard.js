import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import flow from 'lodash/flow';

import Card from './Card.js';
import './ListCard.css';

const cardSource = {
  beginDrag(props) {
    return {
      id: props.card.id,
      category: props.category,
      index: props.index,
    }
  }
}

const cardTarget = {
  hover(props, monitor, component) {
    const dragCategory = monitor.getItem().category
    const dragIndex = monitor.getItem().index
    const hoverCategory = props.category
    const hoverIndex = props.index
    console.log([dragCategory, dragIndex, hoverCategory, hoverIndex])

    // hover over itself, do nothing
    if (dragCategory===hoverCategory && dragIndex===hoverIndex) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragCategory, dragIndex, hoverCategory, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
    monitor.getItem().category = hoverCategory;
  },
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
