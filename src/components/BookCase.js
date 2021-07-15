import React from 'react'
import PropTypes from 'prop-types'
import Shelve from './Shelve'

class BookCase extends React.Component {
    state = {
        sortType: 'no'
    }

    sort = event => {
        this.setState({sortType: event.target.value})
    }

    render() {
        let books = this.props.books.slice(0)

        if (this.state.sortType === 'title') {
            books.sort((prev, next) => {
                if (prev.title < next.title) {
                    return -1
                } else {
                    return 1
                }
            })
        } else if (this.state.sortType === 'author') {
            books.sort((prev, next) => {
                if (prev.author < next.author) {
                    return -1
                } else {
                    return 1
                }
            })
        } else {
            books = this.props.books.slice(0)
        }

        const shelves = []

        let index = 0
        let prevNumber = 0
        this.props.numbers.forEach(number => {
            shelves.push({ id: index++, books: books.slice(0 + prevNumber, number + prevNumber) })
            prevNumber += number
        })

        return (
            <div className="bookcase">
               {shelves.map(shelve => {
                return <Shelve books={shelve.books} 
                key={shelve.id} 
                displayBook={this.props.displayBook}
                currentBook={this.props.currentBook}
               />
               })}
               <div className="sort">
                    <span>Сортировка &nbsp;</span>
                    <select className="sort__select" value={this.state.sortType} onChange={this.sort}>
                        <option value="no">нет</option>
                        <option value="title">по названию</option>
                        <option value="author">по автору</option>
                    </select>
               </div>
            </div>
        )
    }
}

BookCase.propTypes = {
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    numbers: PropTypes.arrayOf(PropTypes.number).isRequired,
    displayBook: PropTypes.func.isRequired,
    currentBook: PropTypes.object.isRequired
}

export default BookCase