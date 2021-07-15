import React from 'react'
import PropTypes from 'prop-types'

const BookInfo = ({ closeModal, text, action, args, cancel }) => (
    <div className="modal">
        <div className="modal-window">
            <h3>{text}</h3>
            <div className="modal-window-buttons">
                <button className="modal-window-buttons__button button"
                    onClick={() => {
                        closeModal()
                        action(...args)
                    }}
                >Да</button>
                <button className="modal-window-buttons__button button"
                    onClick={cancel}
                >Нет</button>
            </div>
        </div>
    </div>
)

BookInfo.propTypes = {
    closeModal: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    args: PropTypes.array
}

export default BookInfo