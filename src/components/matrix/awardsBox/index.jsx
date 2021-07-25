import React from 'react';
import style from './index.module.less';

//  荣获多项国际大奖
export const AwardsBox = ({
    awardsBoxData
}) => {
    awardsBoxData = awardsBoxData || {};
    let list;
    if (awardsBoxData.list) {
        list = awardsBoxData.list.map((item, index) => {
            return (
                <AwardsBoxItem key={index} data={item} />
            );
        });
    }
    return (
        <div className={style.awardsBox}>
            <p className={style.title} dangerouslySetInnerHTML={{ __html: awardsBoxData.title }} />
            <ul className={style.awardsList}>
                {list}
            </ul>
        </div>
    );
};
//  每一项
const AwardsBoxItem = ({
    data,
}) => {
    return (
        <li className={style.awardsBoxItem}>
            <div className={style.imgCenter2} style={{ backgroundImage: `url(${data.img || ''})` }} />
            <p className={style.name} dangerouslySetInnerHTML={{ __html: data.title }} />
            <div className={style.nameDesc} dangerouslySetInnerHTML={{ __html: data.desc }} />
        </li>
    );
};