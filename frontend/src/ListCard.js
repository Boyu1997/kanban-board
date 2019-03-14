import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import flow from 'lodash/flow';

import Card from './Card.js';
import './ListCard.css';

const cardSource = {
  beginDrag(props) {
    console.log(props)
    return {
      id: props.id,
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
    const hoverId = props.id

    // hover over itself, do nothing
    if (dragCategory===hoverCategory && dragIndex===hoverIndex) {
      return;
    }


    props.dragFunctions.hoverSpace(hoverCategory, hoverIndex, hoverId);
  },
  drop(props, monitor,component) {
    console.log(props)
    const dragCategory = monitor.getItem().category
    const dragIndex = monitor.getItem().index
    const hoverCategory = props.category
    const hoverIndex = props.index
    console.log('drop')
    console.log([dragCategory, dragIndex, hoverCategory, hoverIndex])

    // drop over itself, do nothing
    if (dragCategory===hoverCategory && dragIndex===hoverIndex) {
      return;
    }

    props.dragFunctions.moveCard(dragCategory, dragIndex, hoverCategory, hoverIndex);
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
