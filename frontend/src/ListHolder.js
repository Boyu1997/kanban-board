import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

import './style/ListCard.css';

const cardTarget = {
  hover(props, monitor, component) {
    const dragCategory = monitor.getItem().category
    const dragIndex = monitor.getItem().index
    const hoverCategory = props.category
    const hoverIndex = props.index

    // drag source is the last card of the same list, do nothing
    if (dragCategory===hoverCategory && dragIndex===hoverIndex-1) {
      return;
    }

    // otherwise, update card position
    props.moveCard(dragCategory, dragIndex, hoverCategory, hoverIndex);
    monitor.getItem().index = hoverIndex;
    monitor.getItem().category = hoverCategory;
  }
}

function dropCollect(connect) {
  return {
    connectDropTarget: connect.dropTarget(),
  }
}

class ListHolder extends Component {
  render() {
    const { connectDropTarget } = this.props;
    return (
      connectDropTarget(
        <div className="list-card"></div>
      )
    )
  }
}

export default DropTarget('card', cardTarget, dropCollect)(ListHolder);
