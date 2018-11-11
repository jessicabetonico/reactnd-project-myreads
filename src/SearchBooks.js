import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  static propTypes = {
    onUpdateShelfs: PropTypes.func.isRequired, 
  }

  state = {
    books: [],
    query: '',
    loading: false,
    firstSearch: false
  }

  updateQuery = query => {
    const {firstSearch} = this.state

    this.setState(() => ({
      query: query,
      loading: true
    }))

    if (!firstSearch) {
      this.setState({
        firstSearch: true
      })
    }
    
    this.searchBooks(query)
  }
  
  updateBooks = books => {
    if (!books.hasOwnProperty('length')) {
      books = []
    }
    this.updateStateBooks(books)
  }

  updateStateBooks = books => {
    this.setState(() => ({
      books: books,
      loading: false
    }))
  }

  searchBooks = query => {
    if (query !== ''){
      BooksAPI.search(query, 10)
        .then((books) => {
          this.updateBooks(books)
        })      
    } else {
      this.updateBooks([])
    }
    
  };

  render() {
    const {books, query, loading, firstSearch} = this.state
    const {onUpdateShelfs} = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            className='close-search'
          >Close</Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)} 
              placeholder="Search by title or author" />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {loading ? <div className='loader'/> :
              books.length > 0 ? books.map(book => (
                <Book 
                  key={book.id} 
                  bookId={book.id} 
                  thumbnail={book.imageLinks.thumbnail}
                  title={book.title}
                  authors={book.authors}
                  shelf={book.shelf}
                  onUpdateShelfs={onUpdateShelfs}
                />
              )): firstSearch && <h2>Results doesn't match.</h2>}              
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks