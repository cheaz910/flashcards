import React from "react";


export class TableRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wordEn: props.card.text,
            wordRu: props.card.translation,
            isMutable: props.card.isMutable,
            currentToken: localStorage.getItem('token'),
            cardId: 0
        };
    }

    getMutableRow() {
        return (
            <tr>
                <th>
                    <input type="text"
                           defaultValue={this.state.wordEn}
                           onChange={
                               (event) => this.setState({wordEn: event.target.value})
                           }/>
                </th>
                <th>
                    <input type="text"
                           defaultValue={this.state.wordRu}
                           onChange={
                               (event) => this.setState({wordRu: event.target.value})
                           }/>
                </th>
                <th>
                    <button type="button" onClick={() => this.save()}>Сохранить</button>
                </th>
            </tr>
        );
    }

    getImmutableRow() {
        return (
            <tr>
                <th>{this.state.wordEn}</th>
                <th>{this.state.wordRu}</th>
                <th>
                    <button type="button" onClick={() => this.delete()}>Удалить</button>
                </th>
            </tr>
        );
    }

    render() {
        console.log(this.props, this.state);
        if (this.state.isMutable === null) {
            return null;
        }
        return (this.state.isMutable) ? this.getMutableRow() : this.getImmutableRow();
    }

    delete() {
        this.setState({ isMutable: null });
        let cardIdToDelete = this.state.cardId;
        if (cardIdToDelete === 0) {
            cardIdToDelete = this.props.card.id;
        }
        fetch(`api/users/cards/${cardIdToDelete}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(data => {console.log(data)});
    }

    save() {
        if (this.state.wordEn !== "" && this.state.wordRu !== "") {
            this.setState({ isMutable: !this.state.isMutable });
            if (this.state.wordEn !== this.props.card.wordEn
                || this.state.wordRu !== this.props.card.wordRu) {
                //отправка слова на сервер card
                let body = JSON.stringify({
                    'Text': this.state.wordEn,
                    'Translation': this.state.wordRu
                });
                fetch(`api/users/${this.state.currentToken}/decks/${this.props.setId}/cards`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: body
                }).then(data => data.json()).then(data => this.setState({cardId: data.id}));
            }
        }
    }  
}
