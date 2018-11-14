import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

class Book extends Component {
  static propTypes = {
    book: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      imageLinks: PropTypes.shape({
        thumbnail: PropTypes.string,
      }),
      authors: PropTypes.array,
      shelf: PropTypes.string,
    }).isRequired,
    onUpdateShelfs: PropTypes.func.isRequired,
  }

  handleSelect = (event) => {
    const {onUpdateShelfs, book} = this.props;
    const shelfOption = event.target.value;
    
    onUpdateShelfs(book, shelfOption);
  }

  render() {
    const {book} = this.props;
    const {imageLinks, title, authors, shelf} = book;
    
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url("${imageLinks ? imageLinks.thumbnail: ''}")`
              }}>
            </div>
            <div className="book-shelf-changer">
              <select onChange={this.handleSelect} value={shelf ? shelf : 'none'}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{authors && authors.map(author => {
            return (
              <div key={author}>
                {author} <br/>
              </div>
            )
            })}
          </div>
        </div>
      </li>
    )
  }
}

export default Book;
