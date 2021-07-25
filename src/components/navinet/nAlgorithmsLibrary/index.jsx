import React from 'react';
import style from './index.module.less';
import { BasicTitleDesc } from '@components/basicTitleDesc';

//  算法库
export const NAL = ({
    nALData
}) => {
    nALData = nALData || {};
    return (
        <div className={style.algorithmLib}>
            <div className={style.algorithmLibIn}>
                <BasicTitleDesc data={nALData} isLight={true} />
                <div className={style.makeLocal}>
                    <MakeFun makeFnData={nALData.makeFnData} />
                    <LocalFun localFunData={nALData.localFunData} />
                </div>
            </div>
        </div>
    );
};
//  建图功能
const MakeFun = ({ makeFnData }) => {
    if (!makeFnData) {
        return '';
    }
    const { thMap, dataList } = makeFnData;
    //  头部信息
    const ThMapList = thMap.list.map((item, index) => {
        return (
            <div className={style.c} dangerouslySetInnerHTML={{ __html: item }} key={index} />
        );
    }
    );
    //  主数据
    const contentList = dataList.map((item, index) => {
        const { list, label } = item;
        return (
            <li key={index} className={style.makeFunItem}>
                <label dangerouslySetInnerHTML={{ __html: label }} className={style.label} />
                {list.map((_item, _index) => {
                    return (
                        <div className={style.c} key={_index}>
                            <s className={_item ? style.tick : style.hLine} />
                        </div>
                    );
                })}
            </li>
        );
    });
    return (
        <div className={style.makeFun}>
            <p className={style.makeFunName}>{makeFnData.title}</p >
            <ul className={style.makeFunList}>
                <li className={style.makeFunItem}>
                    <label dangerouslySetInnerHTML={{ __html: thMap.title }} className={style.label} />
                    {ThMapList}
                </li>
                {contentList}
            </ul>
        </div>
    );
};

//  定位功能
const LocalFun = ({ localFunData }) => {
    if (!localFunData) {
        return '';
    }

    const { dataList, thMap } = localFunData;
    //  console.log('🍌', dataList);
    //  主数据
    const contentList = dataList.map((item, index) => {
        const { list, label } = item;
        return (
            <li key={index} className={style.localFunItem}>
                <label dangerouslySetInnerHTML={{ __html: label }} className={style.label} />
                <div className={style.c}>
                    {list.map((_item, _index) => {
                        return (
                            <span key={_index}
                                className={style.span}
                                dangerouslySetInnerHTML={{ __html: _item }} />
                        );
                    })}
                </div>
            </li>
        );
    });
    return (
        <div className={style.localFun}>
            <p className={style.localFunName} dangerouslySetInnerHTML={{ __html: localFunData.title }} />
            <ul className={style.localFunList}>
                <li className={style.localFunItem}>
                    <label className={style.label} dangerouslySetInnerHTML={{ __html: thMap.label }} />
                    <div className={style.c} dangerouslySetInnerHTML={{ __html: thMap.content }}
                        style={{ justifyContent: 'left' }} />
                </li>
                {contentList}
            </ul>
        </div>
    );
};