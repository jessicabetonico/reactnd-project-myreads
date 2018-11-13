import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

class Book extends Component {
  static propTypes = {
    bookId: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onUpdateShelfs: PropTypes.func.isRequired,
    authors: PropTypes.array,
    shelf: PropTypes.string,
  }

  static defaultProps = {
    shelf: "none",
    authors: [],
  }

  handleSelect = (shelfOption, bookId) => {
    const {onUpdateShelfs} = this.props;
    onUpdateShelfs(bookId, shelfOption);
  }

  render() {
    const {thumbnail, title, authors, shelf, bookId} = this.props;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url("${thumbnail}")`
              }}>
            </div>
            <div className="book-shelf-changer">
              <select onChange={(event) => this.handleSelect(event.target.value, bookId)} value={shelf}>
                <option value="none" disabled>Move to...</option>
                <option hidden={shelf === 'currentlyReading'} value="currentlyReading">Currently Reading</option>
                <option hidden={shelf === 'wantToRead'} value="wantToRead">Want to Read</option>
                <option hidden={shelf === 'read'} value="read">Read</option>
                <option hidden={shelf === 'none'} value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{authors.map(author => {
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
