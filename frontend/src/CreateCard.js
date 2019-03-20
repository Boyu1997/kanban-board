import React, { Component } from 'react';

import './style/CreateCard.css';

class CreateCard extends Component {
  state = {
    title: '',
    content: '',
    category: 'todo',
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.title === "") {
      alert('Title is required!');
      return;
    }
    if (this.state.content === "") {
      alert('Content is required!');
      return;
    }
    // if this.state.
    // alert('A card was submitted: ' + this.state.title + this.state.category);
    this.props.createCard(this.state);
    this.props.history.push("/");
    return;
  }
  render() {
    const { title, content, category } = this.state;
    return (
      <div className='create-form'>
        <form onSubmit={this.handleSubmit}>
          <div className='input-line-container'>
            <label htmlFor="title" className='input-label'>Title:</label>
            <div className='input-area-container'>
              <input
                type="text"
                id="title"
                className='input-text'
                value={title}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className='input-line-container'>
            <label htmlFor="content" className='input-label'>Content:</label>
            <div className='input-area-container'>
              <textarea
                type="text"
                id="content"
                className='input-textarea'
                value={content}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className='input-line-container'>
            <label htmlFor="category" className='input-label'>Category:</label>
            <div className='input-area-container'>
              <select
                id='category'
                name='category'
                className='input-select'
                value={category}
                onChange={this.handleChange}
              >
                <option value="todo">Todo</option>
                <option value="inProgress">In Progress</option>
                <option value="codeReview">Code Review</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>
          <div className='input-line-container'>
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
