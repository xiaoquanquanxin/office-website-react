import React from 'react';
import style from './index.module.less';
import { BasicTitleDesc } from '@components/basicTitleDesc';
//  算法库
export const AlgorithmsLibrary = ({
    algorithmsLibraryData
}) => {
    algorithmsLibraryData = algorithmsLibraryData || {};
    const { content } = algorithmsLibraryData;
    let list;
    if (content) {
        list = content.map((item, index) => {
            return (
                <ALItem key={index} data={item} />
            );
        });
    }

    return (
        <div className={style.modelBase}>
            <div className={style.modelBaseIn}>
                <BasicTitleDesc data={algorithmsLibraryData} isLight={true} positionText={'left'} />
                <ul className={style.list}>
                    {list}
                </ul>
            </div>
        </div>
    );
};

const ALItem = ({ data }) => {
    const { list } = data;
    let ddList;
    if (list) {

        ddList = list.map((item, index) => {
            return (
                <dd className={style.dd} key={index}>
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                </dd>
            );
        });
    }
    return (
        <li className={style.item}>
            <label className={style.title} dangerouslySetInnerHTML={{ __html: data.title }} />
            <dl className={style.dl}>
                {ddList}
            </dl>
        </li>
    );
};