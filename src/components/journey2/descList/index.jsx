import React from 'react';
import style from './index.module.less';

export const DescList = ({
    data
}) => {
    if (!data) {
        return '';
    }
    const list = data.map((item, index) => {
        if (index > 0 && index % 2) {
            return (
                <li key={index} className={style.item}>
                    <div className={style.line} />
                </li>

            );
        }
        return (
            <li key={index} className={style.item}>
                <label className={style.label} dangerouslySetInnerHTML={{ __html: item.title }} />
                <div className={style.c}>
                    <b><s dangerouslySetInnerHTML={{ __html: item.number }} /></b>
                    <span dangerouslySetInnerHTML={{ __html: item.numberDesc }} />
                </div>
            </li>
        );
    });
    return (
        <ul className={style.descUl}>
            {list}
        </ul>
    );
};
