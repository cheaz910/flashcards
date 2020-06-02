import React from "react";


export class TableRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wordEn: props.card.text,
            wordRu: props.card.translation,
            isMutable: props.card.isMutable
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
                    <button type="button" onClick={() => this.setState({ isMutable: !this.state.isMutable })}>Изменить</button>
                </th>
            </tr>
        );
    }

    render() {
        return (this.state.isMutable) ? this.getMutableRow() : this.getImmutableRow();
    }

    save() {
        if (this.state.wordEn !== "" && this.state.wordRu !== "") {
            this.setState({ isMutable: !this.state.isMutable });
            if (this.state.wordEn !== this.props.card.wordEn
                || this.state.wordRu !== this.props.card.wordRu) {
                //отправка слова на сервер card
            }
        }
    }
}
