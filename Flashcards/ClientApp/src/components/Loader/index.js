import React from 'react';

import styles from './loader.module.css';

class Loader extends React.Component {
    render() {
        return (
            <div className={styles.ldsDualRing}></div>
        );
    }
}

export { Loader };