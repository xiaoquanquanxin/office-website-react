import React from 'react';
import style from './index.module.less';
import { BasicTitleDesc } from '@components/basicTitleDesc';

//  核心算法介绍
export const CoreAlgorithm = ({
    coreAlgorithmData
}) => {
    coreAlgorithmData = coreAlgorithmData || {};
    let list;
    if (coreAlgorithmData.list) {
        list = coreAlgorithmData.list.map((item, index) => {
            return (
                <CoreAlgorithmItem key={index} data={item} />
            );
        });
    }

    return (
        <div className={style.coreAlgorithms}>
            <div className={style.coreAlgorithmsIn}>
                <BasicTitleDesc data={coreAlgorithmData} isLight={true} />
                <ul className={style.list}>
                    {list}
                </ul>
            </div>
        </div>
    );
};

//  每一项
const CoreAlgorithmItem = ({ data }) => {
    return (
        <li className={style.item}>
            <img src={data.img} alt='' className={style.img} />
            <div className={style.nameDesc}>
                <div className={style.name} dangerouslySetInnerHTML={{ __html: data.title }} />
                <div className={style.desc} dangerouslySetInnerHTML={{ __html: data.desc }} />
            </div>
        </li>
    );
};