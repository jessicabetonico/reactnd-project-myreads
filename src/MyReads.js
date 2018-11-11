import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'
import './App.css'

class MyReads extends Component {
  static propTypes = {
    shelfs: PropTypes.object.isRequired,
    onUpdateShelfs: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
  }
  
  render() {
    const {shelfs, onUpdateShelfs, loading} = this.props

    const shelfsKeys = Object.keys(shelfs)
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {loading && <div className='loader-center'/>}
          {shelfsKeys.map((key) => (
            <BookShelf 
              key={key} 
              name={shelfs[key].name} 
              books={shelfs[key].books}
              onUpdateShelfs={onUpdateShelfs}
            />
          ))}
        </div>
        
        <Link
          to='/search'
          className="open-search"
        >Add a book</Link>

      </div>
    )
  }
}

export default MyReads