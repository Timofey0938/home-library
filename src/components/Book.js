import React from 'react'
import PropTypes from 'prop-types'

class Book extends React.Component {
    constructor(params) {
        super(params)

        this.state = {
            book: this.props.book,
            bookSpineAnimationClass: '',
            bookFaceAnimationClass: '',
            bookSpineTakenClass: '',
            bookFaceTakenClass: ''
        }

        if (this.props.currentBook === this.props.book) {
            this.state.bookSpineTakenClass = 'book-spine_taken'
            this.state.bookFaceTakenClass = 'book-face_taken'
        }
    }

    componentDidUpdate() {
        if (this.props.currentBook !== this.props.book
            && this.state.bookFaceAnimationClass === 'book-face_take') {
            this.putBook()
        }
    }

    takeBook() {
        if (this.state.bookSpineAnimationClass === ''
            || this.state.bookSpineAnimationClass === 'book-spine_put') {
            this.setState({ bookSpineAnimationClass: 'book-spine_take' })
            this.setState({ bookFaceAnimationClass: 'book-face_take' })
        } else {
            this.setState({ bookSpineAnimationClass: '' })
            this.setState({ bookFaceAnimationClass: '' })
        }
    }

    putBook() {
        if (this.state.bookSpineAnimationClass === 'book-spine_take'
        || this.state.bookSpineTakenClass === 'book-spine_taken') {
            this.setState({bookSpineAnimationClass: 'book-spine_put'})
            this.setState({bookFaceAnimationClass: 'book-face_put'})
        } else {
            this.setState({bookSpineAnimationClass: ''})
            this.setState({bookFaceAnimationClass: ''})
        }

        this.setState({ bookSpineTakenClass: '' })
        this.setState({ bookFaceTakenClass: '' })
    }

    render() {
        return (
            <div className="book">
                <div className={
                        'book-spine '
                        + this.state.bookSpineAnimationClass + ' ' 
                        + this.state.bookSpineTakenClass
                    } 
                    onClick={() => {
                        this.takeBook(this)
                        this.props.displayBook(this.props.book)
                    }}>
                    <div className="book-spine__title book-spine-inscription">{this.props.book.title}</div>
                    <div className="book-spine__author book-spine-inscription">{this.props.book.author}</div>
                </div>
                <div className={
                        'book-face '
                        + this.state.bookFaceAnimationClass + ' ' 
                        + this.state.bookFaceTakenClass
                    }
                    onClick={() => {
                        this.putBook(this)
                    }}
                >
                    <div className="book-face__title book-face-inscription">{this.props.book.title}</div>
                    <div className="book-face__author book-face-inscription">{this.props.book.author}</div>
                </div>
            </div>
        )
    }
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    displayBook: PropTypes.func.isRequired,
    currentBook: PropTypes.object.isRequired
}

export default Book