import React from 'react';
import { helpers } from '@/utils';
import highSpeedstyle from './highSpeed.scss';

interface HighSpeedTypes {
  highSpeed: boolean;
  toggle: () => void;
}

export default function HighSpeed(props: HighSpeedTypes) {
  const { highSpeed, toggle } = props;
  return (
    <div className={highSpeedstyle.high_speed}>
      <div className={highSpeedstyle.high_speed_label}>只看高铁/动车</div>
      <div
        className={highSpeedstyle.high_speed_switch}
        onClick={() => toggle()}
      >
        <input type="hidden" name={'highSpeed'} value={highSpeed as any} />
        <div
          className={helpers.concatClass(
            highSpeedstyle.high_speed_track,
            highSpeed ? highSpeedstyle.checked : ''
          )}
        >
          <span
            className={helpers.concatClass(
              highSpeedstyle.high_speed_handle,
              highSpeed ? highSpeedstyle.checked : ''
            )}
          ></span>
        </div>
      </div>
    </div>
  );
}
