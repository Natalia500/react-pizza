import React from 'react';
import style from './NotFoundInfo.module.scss';

const NotFoundInfo = () => {
  return (
    <div className={style.root}>
      <h2>404</h2>
      <p>Oops! Page not found</p>
    </div>
  );
};
export default NotFoundInfo;
