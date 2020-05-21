import React from 'react';

import styles from './sets.module.css';
import { mergeClassNames } from "../../_helpers";
import {Link} from "react-router-dom";
import {SetItem} from "../SetItem";

export class Sets extends React.Component {
    render() {
        const { sets } = this.props;
        // {set.cards.map(card =>
        //                                 <li key={card.id}>{card.wordEn} - {card.wordRu}</li>)}
        return (
            <div className={styles.sets}>
                {sets &&
                    <ul className={styles.sets__list}>
                        {sets.map(set =>
                            <li key={set.id} className={styles.sets__set}>
                                <SetItem set={set} />
                            </li>
                        )}
                        <li className={mergeClassNames(styles.sets__set)}>
                            <Link key={-1} to={`/sets/`} className={styles.sets__new}>
                                <span className={styles.set__new} />
                            </Link>
                        </li>
                    </ul>
                }
            </div>
        );
    }
}