import React from 'react'
import BookCase from './components/BookCase'
import BookControl from './components/BookControl'
import Modal from './components/Modal'
import { books } from './books'

class App extends React.Component {
  constructor() {
    super()

    let count = books.length
    let min = count / 5
    const max = count / 2
    const numbers = []
    let numberOfBooks = this.getRandomNumber(min, max)
    numbers.push(numberOfBooks)
    count -= numberOfBooks
    min = count / 2
    numberOfBooks = this.getRandomNumber(min, max)
    numbers.push(numberOfBooks)
    numberOfBooks = count - numberOfBooks
    numbers.push(numberOfBooks)

    this.state = {
      books,
      currentBook: {
        title: '',
        author: '',
        year: '',
        pages: ''
      },
      numbers,
      bookCaseIsFull: false,
      modal: {
        isOpened: false,
        text: '',
        action: null,
        args: []
      }
    }
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  displayBook = book => {
    this.setState({ currentBook: book })
  }

  editBook = (id, newBook) => {
    console.log('editing', newBook)
    this.setState(prevState => ({
      ...prevState,
      books: prevState.books.map(book => {
        if (book.id === id) {
          return newBook
        }
        return book
      })
    }))
    this.setState({ currentBook: newBook })
  }

  deleteBook = id => {
    this.setState({ books: this.state.books.filter(book => {
        return book.id !== id
      }) 
    })
    let bookIndex = 0
    let stopIncreasing = false
    this.state.books.forEach(book => {
      if (book.id === id) {
        stopIncreasing = true
      }
      if (stopIncreasing) {
        return
      }
      bookIndex++
    })
    let reduced = false
    this.setState({ numbers: this.state.numbers.map(number => {
        if (bookIndex < number && !reduced) {
          reduced = true
          return number - 1
        } 
        bookIndex -= number
        return number
      })
    })
  }

  addBook = book => {
    debugger
    
    let shelveNumber = 0
    for (let i = 1; i < this.state.numbers.length; i++) {
      if (this.state.numbers[i] < this.state.numbers[i - 1]) {
        shelveNumber = i
      }
    }
    let bookNumber = 0
    let currentShelveNumber = 0
    let stopIncreasing = false
    this.state.numbers.forEach(number => {
      if (!stopIncreasing) {
        bookNumber += number
      }
      if (currentShelveNumber === shelveNumber) {
        stopIncreasing = true
      }
      currentShelveNumber++
    })
    if (bookNumber === this.state.books.length) {
      this.setState({ books: this.state.books.concat({ ...book, id: new Date().getMilliseconds }) })
    } else {
      const newBooks = []
      for (let i = 0; i < this.state.books.length; i++) {
        if (i === bookNumber) {
          newBooks.push({ ...book, id: new Date().getMilliseconds })
        }
        newBooks.push(this.state.books[i])
      }
      this.setState({ books: newBooks })
    }
    let currentNumber = 0
    this.setState({ numbers: this.state.numbers.map(number => {
      if (currentNumber++ === shelveNumber) {
        return number + 1
      }
      return number
    }) })
  }

  showModal = action => {
    let text
    let method
    let args = []
    if (action.type === 'deleteBook') {
      text = 'Удалить книгу?'
      method = this.deleteBook
      args.push(action.payload.id)
    }
    this.setState({ modal: { isOpened: true, text, action: method, args } })
  }

  closeModal = () => {
    this.setState({ modal: { isOpened: false, text: '', action: null } })
  }

  componentDidUpdate() {
    let bookCaseIsFull = true
    this.state.numbers.forEach(number => {
      if (number < 10) {
        bookCaseIsFull = false
      }
    })
    if (bookCaseIsFull !== this.state.bookCaseIsFull) {
      this.setState({ bookCaseIsFull })
    }
  }

  render() {
    return (
      <>
        <div className="wrapper">
          <BookCase books={this.state.books}
            numbers={this.state.numbers}
            displayBook={this.displayBook}
            currentBook={this.state.currentBook}
          />
          <BookControl 
            book={this.state.currentBook}
            editBook={this.editBook}
            showModal={this.showModal}
            addBook={this.addBook}
            bookCaseIsFull={this.state.bookCaseIsFull}
          />
        </div>
        {this.state.modal.isOpened ? 
        <Modal closeModal={this.closeModal}
          text={this.state.modal.text}
          action={this.state.modal.action}
          args={this.state.modal.args}
          cancel={this.closeModal}
        /> : null}
      </>
    )
  }
}

export default App