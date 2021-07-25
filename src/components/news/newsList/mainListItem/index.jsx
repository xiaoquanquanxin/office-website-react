import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '@store/reduxMap';
import { matchReg, transformDateType } from '@utils/utils';
import style from './index.module.less';
//  每一项
export const MainListItem = connect(
    mapStateToProps,
    mapDispatchToProps
)(({
    data,
    REDUCER_NEWS_TAB_BOX,
}) => {
    const { newsCategoryDataMap } = REDUCER_NEWS_TAB_BOX;
    if (newsCategoryDataMap === null) {
        return '';
    }
    const categoryData = newsCategoryDataMap[data.category_id];
    //  console.log(newsCategoryDataMap[data.category_id].img);
    return (
        <li key={data.id} className={style.mainListItem}>
            <a href={`./news-detail.html?id=${data.id}`} className={style.mainListItemInner}>
                <div className={style.imgBox}>
                    <img src={data.thumb} className={style.mainImg} alt={data.span} />
                    <div className={style.belongType}>
                        <img src={categoryData.img} className={style.belongTypeImg}
                            alt={data.span} />
                        <span className={style.span}>{categoryData.name || ''}</span>
                    </div>
                </div>
                <div className={style.titleDateDesc}>
                    <p className={style.title}>{data.title}</p>
                    <p className={style.date}>{transformDateType(data.publish_date)}</p>
                    <div className={style.desc}
                        dangerouslySetInnerHTML={{ __html: matchReg(data.content).slice(0, 150) }} />
                </div>
            </a>
        </li>
    );
});