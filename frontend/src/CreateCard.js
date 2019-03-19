import React, { Component } from 'react';

import './style/CreateCard.css';

class CreateCard extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
  render() {
    return (
      <div className='create-form'>
        <form onSubmit={this.handleSubmit}>
          <div className='input-container'>
            <label for="title" className='input-label'>Title:</label>
            <input
              type="text"
              id="title"
              className='input-text'
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div className='input-container'>
            <label for="content" className='input-label'>Content:</label>
            <input
              type="text"
              id="title"
              className='input-text'
              value={this.state.content}
              onChange={this.handleChange}
            />
          </div>
          <div className='input-container'>
            <label for="category" className='input-label'>Category:</label>
            <input
              type="text"
              id="title"
              className='input-text'
              value={this.state.category}
              onChange={this.handleChange}
            />
          </div>
          <div className='input-container'>
            <input
              type="submit"
              className='submit-button'
              value="Create"
            />
          </div>
        </form>
      </div>
    )
  }
}

export default CreateCard;
