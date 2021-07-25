import React from 'react';
import style from './index.module.less';

export const RobotoCondensed = ({
    data
}) => {
    return (
        <li className={style.robotoCondensed}>
            <label className={style.label} dangerouslySetInnerHTML={{ __html: data.title }} />
            <div className={style.c}>
                <b className={style.b} dangerouslySetInnerHTML={{ __html: data.number }} />
                <span className={style.span} dangerouslySetInnerHTML={{ __html: data.numberDesc }} />
            </div>
        </li>
    );
};

//  竖线
export const RobotoCondensedLine = () => {
    return (
        <li className={style.robotoCondensedLine}>
            <div className={style.line} />
        </li>
    );
};