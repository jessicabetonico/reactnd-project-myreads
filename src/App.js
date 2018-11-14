import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MyReads from './MyReads';
import SearchBooks from './SearchBooks';
import NoMatch from  './NoMatch';
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

  updateShelfsFromUser = (book, shelf) => {
    const {shelfs} = this.state;
    const shelfsKeys = Object.keys(shelfs);

    this.setState({ loading: true });

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
        <Router>
          <Switch>
            <Route exact path='/' render={() => (
              <MyReads loading={loading} onUpdateShelfs={this.updateShelfsFromUser} shelfs={shelfs} />
            )} />

            <Route path='/search' render={() => (
              <SearchBooks updating={loading} onUpdateShelfs={this.updateShelfsFromUser} shelfs={shelfs} />
            )} />
            <Route component={NoMatch}></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default BooksApp;
