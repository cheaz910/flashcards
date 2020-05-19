import React from 'react';

import styles from './setItem.module.css';
import { mergeClassNames } from "../../_helpers";
import {Link} from "react-router-dom";

export class SetItem extends React.Component {
    render() {
        const { set } = this.props;
        return (
            <>
                <Link to={`/checkCards/${set.id}`} className={styles.set}>
                    <span className={styles.set__title}>{set.name}</span>
                    <span className={styles.set__description}>[DESCRIPTION][DESCRIPTION][DESCRIPTION][DESCRIPTION][DESCRIPTION][DESCRIPTION][DESCRIPTION][DESCRIPTION][DESCRIPTION][DESCRIPTION][DESCRIPTION]</span>
                </Link>
                <Link to={`/sets/${set.id}`} className={styles.set__footer}>
                    <span>Изменить</span>
                </Link>
            </>
        );
    }
}