import React from 'react';
import style from './index.module.less';
import { BasicTitleDesc } from '@components/basicTitleDesc';

//  产品架构
export const ProductArchitecture = ({
    productArchitectureData
}) => {
    productArchitectureData = productArchitectureData || {};
    let list;
    const { content } = productArchitectureData;
    if (content) {
        const len = content.length;
        list = content.map((item, index) => {
            return (
                <PAListItem key={index} data={item} index={len - index} />
            );
        });
    }
    return (
        <div className={style.productStruction}>
            <div className={style.productStrctIn}
                style={{ backgroundImage: `url(${productArchitectureData.img || ''})` }}>
                <BasicTitleDesc data={productArchitectureData} isLight={true} />
                <ul className={style.list}>
                    {list}
                </ul>
            </div>
        </div>
    );
};

const PAListItem = ({ data, index }) => {
    return (
        <li className={style.item}>
            <p className={style.name}>
                <i className={style.i}>{index}</i>
                <span className={style.span} dangerouslySetInnerHTML={{ __html: data.title }} />
            </p>
            <div className={style.desc} dangerouslySetInnerHTML={{ __html: data.desc }} />
        </li>
    );
};