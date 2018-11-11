import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class BookShelf extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onUpdateShelfs: PropTypes.func.isRequired,
  }

  render() {
    const {name, books, onUpdateShelfs} = this.props
    return (      
      <div className="bookshelf">
        <h2 className="bookshelf-title">{name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <Book 
                key={book.id} 
                bookId={book.id}
                thumbnail={book.imageLinks.thumbnail}
                title={book.title}
                authors={book.authors}
                shelf={book.shelf}
                onUpdateShelfs={onUpdateShelfs}
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf