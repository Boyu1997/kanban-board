import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Menu.css';


class Menu extends Component {
  render() {
    const { randomCard } = this.props;
    return (
      <div className='button-container'>
        <Link to='/create'>
          <button>Create Card</button>
        </Link>
        <button onClick={randomCard}>Random Card</button>
      </div>
    )
  }
}

export default Menu;
