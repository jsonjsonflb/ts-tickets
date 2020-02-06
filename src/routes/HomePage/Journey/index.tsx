import React from 'react';
import { helpers } from '@/utils';
import styles from './index.scss';

const Journey = (props: any) => {
  const { from = '', to = '', showCitySelector, exchangeFromTo } = props;

  return (
    <div className={styles.journey_wrap}>
      <div onClick={() => showCitySelector(true)} className={styles.station}>
        <input
          type="text"
          readOnly
          name={'from'}
          value={from}
          className={helpers.concatClass(styles.input, styles.from)}
        />
      </div>
      <div
        onClick={() => {
          exchangeFromTo();
        }}
        className={styles.switch}
      >
        切换
      </div>
      <div onClick={() => showCitySelector(false)} className={styles.station}>
        <input
          type="text"
          readOnly
          name={'to'}
          value={to}
          className={helpers.concatClass(styles.input, styles.to)}
        />
      </div>
    </div>
  );
};

export default Journey;
