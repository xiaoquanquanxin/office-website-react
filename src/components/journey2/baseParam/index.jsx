import React from 'react';
import style from './index.module.less';

export const BaseParam = ({
    baseParamData,
    customWidth,
}) => {
    baseParamData = baseParamData || {};
    let list;
    //  数据的数量
    let len;
    if (baseParamData.list) {
        len = baseParamData.list.length;
    }

    if (len) {
        list = baseParamData.list.map((item, index) => {
            return (
                <BaseParamItem data={item} key={index} lastIsOdd={!!(index === (len - 1) && (len % 2))} />
            );
        });
    }
    let customWidthClass;
    switch (customWidth) {
        case 18:
            customWidthClass = style.customWidth18;
            break;
        default:
            break;
    }
    //  console.log(baseParamData)
    return (
        <div className={`${style.baseParam} ${customWidthClass}`}>
            <div className={style.baseParamIn}>
                <p className={style.listTitle} dangerouslySetInnerHTML={{ __html: baseParamData.title }} />
                <ul className={style.baseParamList}>
                    {list}
                </ul>
            </div>
        </div>
    );
};

const BaseParamItem = ({
    data,
    //  最后一个是奇数
    lastIsOdd,
}) => {
    return (
        <li className={`${style.baseParamItem} ${lastIsOdd ? style.lastIsOdd : ''}`}>
            <label className={style.label} dangerouslySetInnerHTML={{ __html: data.label }} />
            <div className={style.c} dangerouslySetInnerHTML={{ __html: data.desc }} />
        </li>
    );
};