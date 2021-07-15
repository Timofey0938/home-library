import React from 'react'
import PropTypes from 'prop-types'

const BookInfo = ({ book }) => (
    <div className="book-info">
        <div><span className="info-title">Название:  </span>{book.title}</div>
        <div><span className="info-title">Автор:  </span>{book.author}</div>
        <div><span className="info-title">Год написания:  </span>{book.year}</div>
        <div><span className="info-title">Количество страниц:  </span>{book.pages}</div>
    </div>
)

BookInfo.propTypes = {
    book: PropTypes.object.isRequired
}

export default BookInfo