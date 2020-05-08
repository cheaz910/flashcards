import React from 'react';

import styles from './sets.module.css';
import { mergeClassNames } from "../../_helpers";
import {Link} from "react-router-dom";

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
                            <Link key={set.id} to={`/checkCards/${set.id}`} className={styles.sets__outer}>
                                <li className={styles.sets__set}>
                                    <span className={styles.set__title}>{set.name}</span>
                                    <span className={styles.set__description}>[DESCRIPTION][DESCRIPTION][DESCRIPTION][DESCRIPTION][DESCRIPTION][DESCRIPTION][DESCRIPTION][DESCRIPTION][DESCRIPTION][DESCRIPTION][DESCRIPTION]</span>
                                </li>
                            </Link>
                        )}
                        <li className={styles.sets__new}>
                            <span className={styles.set__new} />
                        </li>
                    </ul>
                }
            </div>
        );
    }
}