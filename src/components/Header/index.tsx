import React from 'react';
import styles from './index.scss';
interface PropTypes {
  onBack?: () => void;
  title: string;
  [random: string]: any;
}
export default function Header(props: PropTypes) {
  const { title = '', onBack } = props;

  return (
    <div className={styles.header_wrap}>
      <div
        className={styles.header_back}
        onClick={() => {
          if (onBack) {
            onBack();
          }
        }}
      >
        <svg width={42} height={42}>
          <polyline
            points={'25,13 16,21 25,29'}
            stroke={'#fff'}
            strokeWidth={'2'}
            fill={'none'}
          />
        </svg>
      </div>
      <h1 className={styles.header_title}>{title}</h1>
    </div>
  );
}
