import React from 'react'
import PropTypes from 'prop-types'

class BookForm extends React.Component {
    constructor(params) {
        super(params)

        let buttonName, {title, author, year, pages} = this.props.book
        if (this.props.formType === 'edit') {
            buttonName = 'Сохранить'
        } else {
            buttonName = 'Добавить'
            title = author = year = pages = ''
        }

        this.state = {
            buttonName,
            book: { title, author, year, pages },
            errorMessage: ''
        }
    }

    onChange = event => {
        this.setState(prevState => ({
            ...prevState,
            book: {
                ...prevState.book,
                [event.target.name]: event.target.value
            }
        }))
    }

    submitHandler = event => {
        event.preventDefault()

        if (this.state.book.title.trim() === '') {
            this.setState({errorMessage: 'Укажаите название книги'})
            return
        }
        
        if (this.state.book.author.trim() === '') {
            this.setState({errorMessage: 'Укажаите автора'})
            return
        }

        if (this.props.formType === 'edit') {
            this.props.editBook(this.props.book.id, this.state.book)
        } else if (this.props.formType === 'add') {
            this.props.addBook(this.state.book)
        }
        
        this.setState({ book: { title: '', author: '', year: '', pages: '' } })
        this.props.closeForm()
    }

    render() {
        return (
            <form className="book-form" onSubmit={this.submitHandler}>
                <div>
                    <label htmlFor="title">Название:</label>
                    <input name="title"
                        maxLength="16"
                        type="text"
                        autoComplete="off"
                        value={this.state.book.title}
                        onChange={this.onChange}
                    />
                </div>
                <div>
                    <label htmlFor="author">Автор:</label>
                    <input
                        name="author"
                        maxLength="20"
                        type="text"
                        autoComplete="off"
                        value={this.state.book.author}
                        onChange={this.onChange}
                    />
                </div>
                <div>
                    <label htmlFor="year">Год написания:</label>
                    <input
                        name="year"
                        maxLength="9"
                        type="text"
                        autoComplete="off"
                        value={this.state.book.year}
                        onChange={this.onChange}
                    />
                </div>
                <div>
                    <label htmlFor="pages">Количество страниц:</label>
                    <input
                        name="pages" 
                        maxLength="5"
                        type="text"
                        autoComplete="off"
                        value={this.state.book.pages}
                        onChange={this.onChange}
                    />
                </div>
                <div className="book-form-button">
                    <p className="book-form__error-message">{this.state.errorMessage}</p>
                    <button className="book-form__button button" type="submit">{this.state.buttonName}</button>
                </div>
            </form>
        )
    }
}

BookForm.propTypes = {
    formType: PropTypes.string,
    closeForm: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired,
    editBook: PropTypes.func.isRequired,
    addBook: PropTypes.func.isRequired
}

export default BookForm