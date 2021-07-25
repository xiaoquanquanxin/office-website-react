import React from 'react';
import style from './index.module.less';
import { BasicTitleDesc } from '@components/basicTitleDesc';

//  技术方案
export const TechnicalSolution = ({
    technicalSolutionData
}) => {
    technicalSolutionData = technicalSolutionData || {};
    let list;
    if (technicalSolutionData.list) {
        list = technicalSolutionData.list.map((item, index) => {
            return (
                <TechnicalSolutionItem data={item} key={index} />
            );
        });
    }
    return (
        <div className={style.technicalWay}>
            <div className={style.technicalWayIn}>
                <BasicTitleDesc data={technicalSolutionData} isLight={true} />
                <ul className={style.list}>
                    {list}
                </ul>
            </div>
        </div>
    );
};
//  每一项
const TechnicalSolutionItem = ({
    data
}) => {
    //  蓝色hover的内容
    const moreList = (data.more && data.more.split('\n')) || [];
    const list = moreList.map((item, index) => {
        return <dd className={style.dd} key={index}
            dangerouslySetInnerHTML={{ __html: item }} />;
    });
    return (
        <li className={style.item} style={{ backgroundImage: `url(${data.img || ''})` }}>
            <p className={style.title} dangerouslySetInnerHTML={{ __html: data.title }} />
            <div className={style.desc} dangerouslySetInnerHTML={{ __html: data.desc }} />
            <div className={style.mask}>
                <dl className={style.dl}>
                    {list}
                </dl>
            </div>
        </li>
    );
};