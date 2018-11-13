import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import MyReads from './MyReads';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI';

class BooksApp extends React.Component {
  state = {
    shelfs: {
      currentlyReading: {
        name: 'Currently Reading',
        books: [],
      },
      wantToRead: {
        name: 'Want To Read',
        books: [],
      },
      read: {
        name: 'Read',
        books: [],
      },
    },
    loading: true,
  }

  componentDidMount() {
    let {shelfs} = this.state;
    BooksAPI.getAll()
      .then((books) => {
        books.forEach(book => {
          shelfs[book.shelf].books.push(book);
        })
        this.updateStateShelfs(shelfs);
      });
  }

  findIndexBook = (book, shelf, shelfsKeys) => {
    const {shelfs} = this.state;
    for (const key of shelfsKeys) {
      if (key !== shelf ) {
        const index = shelfs[key].books.findIndex(bookOfShelf => bookOfShelf.id === book.id);
        if (index !== -1) {
          return [index, key];
        }
      }
    }
    return [-1, undefined];
  }

  updateShelfsFromUser = (bookId, shelf) => {
    const {shelfs} = this.state;
    const shelfsKeys = Object.keys(shelfs);

    this.setState({ loading: true });

    BooksAPI.get(bookId)
      .then(book => {
        BooksAPI.update(book, shelf)
          .then(_ => {
            const [index, oldShelf] = this.findIndexBook(book, shelf, shelfsKeys);

            if (oldShelf) {
              shelfs[oldShelf].books.splice(index, 1);
            }

            book.shelf = shelf;
            if (shelf !== 'none') {
              shelfs[shelf].books.push(book);
            }

            this.updateStateShelfs(shelfs);
          });
      });
  }

  updateStateShelfs = (shelfs) =>{
    this.setState(() => ({
      shelfs,
      loading: false,
    }));
  }

  render() {
    const {shelfs, loading} = this.state;
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <MyReads loading={loading} onUpdateShelfs={this.updateShelfsFromUser} shelfs={shelfs} />
        )} />

        <Route path='/search' render={({history}) => (
          <SearchBooks updating={loading} onUpdateShelfs={this.updateShelfsFromUser} shelfs={shelfs} />
        )} />
      </div>
    )
  }
}

export default BooksApp;
