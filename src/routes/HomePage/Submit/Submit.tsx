import React, { memo } from 'react';
import submitStyle from './Submit.scss';

export default memo(function Submit() {
  return (
    <div className={submitStyle.submit}>
      <button type="submit" className={submitStyle.submit_button}>
        搜索
      </button>
    </div>
  );
});
