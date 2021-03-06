import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';

class SearchBooks extends Component {
  static propTypes = {
    onUpdateShelfs: PropTypes.func.isRequired,
    shelfs: PropTypes.object.isRequired,
    updating: PropTypes.bool.isRequired,
  }

  state = {
    books: [],
    query: '',
    loading: false,
    firstSearch: false
  }

  updateQuery = event => {
    const {firstSearch} = this.state;
    const query = event.target ? event.target.value : event;

    this.setState(() => ({
      query: query,
      loading: true,
    }));

    if (!firstSearch) {
      this.setState({
        firstSearch: true,
      });
    }

    this.searchBooks(query);
  }

  treatBooks = books => {
    return !books.hasOwnProperty('length') ? [] : books;
  }

  updateStateBooks = books => {
    this.setState(() => ({
      books: books,
      loading: false,
    }));
  }

  searchBooks = query => {
    const {shelfs} = this.props;
    const shelfKeys = Object.keys(shelfs);

    const currentBooksIds = shelfKeys.reduce((acc, currValue) => {
      return [...acc, ...shelfs[currValue].books.map(book => book.id)];
    }, []);

    if (query !== '') {
      BooksAPI.search(query, 10)
        .then((books) => {
          books = this.treatBooks(books);
          const searchedBooks = books.filter(book => !currentBooksIds.includes(book.id));
          this.updateStateBooks(searchedBooks);
        });
    } else {
      this.updateStateBooks([]);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {updating} = this.props;

    if (prevProps.updating !== updating){
      this.updateQuery(prevState.query);
    }
  }

  render() {
    const {books, query, loading, firstSearch} = this.state;
    const {onUpdateShelfs, updating} = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search"
          >Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={query}
              onChange={this.updateQuery}
              placeholder="Search by title or author" />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {loading || updating ? <div className="loader"/> :
              books.length > 0 ? books.map(book => (
                <Book
                  key={book.id}
                  book={book}
                  onUpdateShelfs={onUpdateShelfs}
                />
              )): firstSearch && <h2>Results doesn't match.</h2>}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks;