import React from 'react';
import style from './index.module.less';
//  发展历程
export const AboutUsHistory = ({
    historyInfoMap,
    historyInfoList,
}) => {
    let list;
    if (historyInfoMap) {
        list = historyInfoList.map(item => {
            return (
                <HistoryYearItem key={item}
                    year={item}
                    monthList={historyInfoMap[item]}
                />
            );
        });
    }
    return (
        <div className={style.history}>
            <div className={style.historyInner}>
                <div className={style.title}>发展历程</div>
                {list}
            </div>
        </div>
    );
};

//  每一年
const HistoryYearItem = ({
    monthList,
    year,
}) => {
    const list = monthList.map(item => {
        return (
            <HistoryMonthItem data={item} key={item.id} />
        );
    });
    return (
        <dl className={style.yearItem}>
            <dt className={style.yearTitle}>{year}</dt>
            {list}
        </dl>
    );
};

//  每一月
const HistoryMonthItem = ({
    data
}) => {
    return (
        <dd className={style.monthItem}>
            <span className={style.month}>{data.month}月</span>
            <i className={style.dot} />
            <div className={style.monthText}>
                <em className={style.subTitle}>{data.month}月</em>
                <div className={style.text}>{data.title}</div>
            </div>
        </dd>
    );
};
