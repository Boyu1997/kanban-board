import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';

import Card from './Card.js';
import './style/ListCard.css';

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
  deleteCardHandler = () => {
    const { category, index, deleteCard } = this.props;
    deleteCard(category, index);
  }
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
          <div className="list-card">
            <Card
              card={card}
              isDragging={isDragging}
              deleteCardHandler={this.deleteCardHandler}
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
