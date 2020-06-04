import React from 'react';
import Modal from 'react-modal';

import styles from './setItem.module.css';
import { mergeClassNames } from "../../_helpers";
import {Link} from "react-router-dom";
import {authenticationService} from "../../_services";

const customStyles = {
    content : {
        width: '380px',
        height: '80px',
        margin: '0 auto',
        top: 'calc(50% - 100px)',
        border: '1px solid black',
    }
};

export class SetItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false
        };
    }

    deleteDeck(id) {
        this.setState({ modalIsOpen: false });
        fetch(`api/decks/${id}`, { method: 'DELETE' });
        this.props.deleteDeck(id);
    }

    componentWillMount() {
        Modal.setAppElement('body');
    }

    render() {
        const { set } = this.props;
        return (
            <>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={() => this.setState({ modalIsOpen: true })}
                    style={customStyles}
                >
                    <div className={styles.modalWindow}>
                        <span>Вы действительно хотите удалить?</span>
                        <div className={styles.modalWindow__buttons}>
                            <button className={styles.buttons__yes} onClick={() => this.deleteDeck(set.id)}>Да</button>
                            <button className={styles.buttons__no} onClick={() => this.setState({ modalIsOpen: false })}>Нет</button>
                        </div>
                    </div>
                </Modal>
                <Link to={`/checkCards/${set.id}`} className={styles.set}>
                    <span className={styles.set__title}>{set.title}</span>
                    <span className={styles.set__description}>{set.description}</span>
                </Link>
                <Link to={`/sets/${set.id}`} className={styles.set__changeButton}>
                    <span>Изменить</span>
                </Link>
                <div className={styles.set__deleteButton} onClick={() => this.setState({modalIsOpen:true})}>
                    <span>Удалить</span>
                </div>
            </>
        );
    }
}