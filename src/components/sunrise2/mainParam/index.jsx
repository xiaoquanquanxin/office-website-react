import React from 'react';
import style from './index.module.less';

//  旭日2，主要参数
export const Sunrise2mainParam = ({
    mainParamData,
    //  有下边框
    hasBorderBottom
}) => {
    mainParamData = mainParamData || {};
    let list;
    if (mainParamData.list) {
        list = mainParamData.list.map((item, index) => {
            return (
                <MainParamItem key={index} data={item} />
            );
        });
    }
    return (
        <div className={`${style.mainParam} ${hasBorderBottom ? style.isNext : {}}`}>
            <p className={style.title} dangerouslySetInnerHTML={{ __html: mainParamData.title }} />
            <ul className={`${style.list} ${hasBorderBottom ? style.hasBorderBottom : ''}`}>
                {list}
            </ul>
        </div>
    );
};
//  每一项
const MainParamItem = ({
    data,
}) => {
    data = data || {};
    let list;
    if (data.list) {
        list = data.list.map((item, index) => {
            item = item.replace('●', '<i>●</i>');
            return (
                <dd key={index} className={style.dd}>
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                </dd>
            );
        });
    }
    return (
        <li className={style.item}>
            <label className={style.label} dangerouslySetInnerHTML={{ __html: data.label }} />
            <dl className={style.itemContent}>
                {list}
            </dl>
        </li>
    );
};