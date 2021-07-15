import React from 'react'
import PropTypes from 'prop-types'
import BookInfo from './BookInfo'
import BookForm from './BookForm'

class BookControl extends React.Component {
    state = {
        showForm: false,
        formType: 'edit',
        addButtonName: 'Добавить книгу'
    }

    closeForm = () => {
        this.setState({ formType: '' })
        this.setState({ showForm: false })
        this.setState({ addButtonName: 'Добавить книгу' })
    }

    editBook = () => {
        this.setState({ formType: 'edit' })
        this.setState({ showForm: true })
    }

    deleteBook = () => {
        this.props.showModal({ type: 'deleteBook', payload: { id: this.props.book.id } })
    }

    addBook = () => {
        if (this.state.formType === 'add') {
            this.closeForm()
            return
        }
        this.setState({ formType: 'add' })
        this.setState({ showForm: true })
        this.setState({ addButtonName: 'Отменить' })
    }

    render() {
        return (
            <div className="book-control">
                <div>
                    <BookInfo book={this.props.book}/>
                    <div className="book-actions">
                        <button className="edit-button button"
                            disabled={this.props.book.title === ''}
                            onClick={this.editBook}
                        >Редактировать книгу</button>
                        <button className="delete-button button"
                            disabled={this.props.book.title === ''}
                            onClick={this.deleteBook}
                        >Удалить книгу</button>
                    </div>
                </div>
                {this.state.showForm ?
                    <BookForm 
                        formType={this.state.formType}
                        closeForm={this.closeForm}
                        book={this.props.book}
                        editBook={this.props.editBook}
                        addBook={this.props.addBook}
                    />
                : null}
                <button className="add-button button"
                    disabled={this.props.bookCaseIsFull}
                    title={this.props.bookCaseIsFull ? 'Шкаф заполнен' : ''}
                    onClick={this.addBook}
                >{this.state.addButtonName}</button>
            </div>
        )
    }
}

BookControl.propTypes = {
    book: PropTypes.object.isRequired,
    editBook: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
    addBook: PropTypes.func.isRequired,
    bookCaseIsFull: PropTypes.bool.isRequired
}

export default BookControl