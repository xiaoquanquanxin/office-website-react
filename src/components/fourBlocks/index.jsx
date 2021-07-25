import React from 'react';
import style from './index.module.less';

//  四个一块的
export const FourBlocks = ({
    data,
    //  是浅色背景？
    isLight
}) => {
    if (!data || !data.length) {
        return '';
    }
    const list = data.map((item, index) => {
        return (
            <FourBlocksItem key={index} data={item} />
        );
    });
    let dataLengthClassName;
    //  一共几个？
    switch (data.length) {
        case 4:
            dataLengthClassName = style.dataLength4;
            break;
        case 5:
            dataLengthClassName = style.dataLength5;
            break;
        default:
            break;
    }
    return (
        <ul className={`${style.cdrb} ${isLight ? style.isLight : ''} ${dataLengthClassName}`}>
            {list}
        </ul>
    );
};

//  每一项
const FourBlocksItem = ({
    data,
}) => {
    return (
        <li className={style.item}>
            <img className={style.imgCenter2} src={data.img} alt="" />
            <p className={style.name} dangerouslySetInnerHTML={{ __html: data.title }} />
        </li>
    );
};