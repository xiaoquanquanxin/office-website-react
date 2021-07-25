import React from 'react';
import style from './index.module.less';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';

export const Crumb = connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    ({ REDUCER_NEWS_TAB_BOX, mainData }) => {
        //  redux里的数据，一个对于新闻菜单的map
        const { newsCategoryDataMap } = REDUCER_NEWS_TAB_BOX;

        let data = null;
        if (mainData && newsCategoryDataMap) {
            //  这是新闻菜单数据
            data = newsCategoryDataMap[mainData.category_id];
        }

        //  console.log(data);
        return (
            <div className={style.crumb}>
                <a href={`./news.html`} className={style.link}>新闻中心</a>
                <span className={style.arrows}>&gt;</span>
                {mainData && <a href={`./news.html?id=${mainData.category_id}`} className={style.subLink}>{data && data.name}</a>}
                <span className={style.arrows}>&gt;</span>
                <span className={style.arrows} style={{ marginLeft: 0 }}>{mainData && mainData.title}</span>
            </div>
        );
    }
);