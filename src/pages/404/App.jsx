import React from 'react';
import style from './index.module.less';

export const App = () => {
    return (
        <div className={`${style.flexCenter} ${style.positionRef} ${style.fullHeight}`}>
            <div className={style.code}>404</div>
            <div className={style.message}>Not Found</div>
        </div>
    );
};
