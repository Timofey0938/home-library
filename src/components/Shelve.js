import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

function Shelve(props) {
    return (
        <div className="shelve">
            {props.books.map(book => {
                return <Book book={book} 
                    key={book.title} 
                    displayBook={props.displayBook}
                    currentBook={props.currentBook}
                />
            })}
        </div>
    )
}

Shelve.propTypes = {
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    displayBook: PropTypes.func.isRequired,
    currentBook: PropTypes.object.isRequired
}

export default Shelve