import React from 'react';
import style from './index.module.less';
import layout from '@css/layout.module.less';
import { BasicTitleDesc } from '@components/basicTitleDesc';

//  特色与优势
export const Advantages = ({
    advantagesData
}) => {
    advantagesData = advantagesData || {};
    let list;
    if (advantagesData.list) {
        list = advantagesData.list.map((item, index) => {
            return (
                <AdvantagesItem key={index} data={item} />
            );
        });
    }
    //  内容的数量
    const itemCount = advantagesData.list && advantagesData.list.length;
    let itemCountClassName;
    switch (itemCount) {
        case 3:
            itemCountClassName = style.itemCount3;
            break;
        case 4:
            itemCountClassName = style.itemCount4;
            break;
        default:
            break;
    }
    return (
        <div className={style.advantages}>
            <div className={style.advantagesIn}>
                <BasicTitleDesc data={advantagesData} isLight={true} />
                <ul className={`${style.list} ${layout.clearfix} ${itemCountClassName}`}>
                    {list}
                </ul>
            </div>
        </div>
    );
};

//  每一项
const AdvantagesItem = ({
    data,
}) => {

    return (
        <li className={style.item}>
            <div className={style.imgBox}>
                <img src={data.img} alt='' className={style.img} />
            </div>
            <p className={style.title} dangerouslySetInnerHTML={{ __html: data.title }} />
            <div className={style.desc} dangerouslySetInnerHTML={{ __html: data.desc }} />
        </li>
    );
};